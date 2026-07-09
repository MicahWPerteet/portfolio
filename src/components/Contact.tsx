// ---------------------------------------------------------------------------
// Another CLIENT COMPONENT — a contact form.
//
// Forms are interactive: we track what the user types (state) and respond when
// they submit (event handler). Both need the browser, so: "use client".
//
// This shows "controlled inputs": React state is the single source of truth for
// each field. The input's `value` comes FROM state, and `onChange` writes back
// TO state. There's no backend here — on submit we just show a thank-you note.
// ---------------------------------------------------------------------------
"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  // Extra UI state: are we mid-request, and did anything go wrong?
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser's default full-page reload
    setSending(true);
    setError("");

    try {
      // POST the form data to our own API route (src/app/api/contact/route.ts),
      // which sends the email server-side.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setSent(true); // swap in the thank-you message
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
        Get in touch
      </h2>
      <p className="mt-2 text-muted">
        Have a project in mind or just want to say hi? Send a message.
      </p>

      {sent ? (
        // After submit, swap the form out for a confirmation message
        <div className="glass mt-8 rounded-2xl p-6 text-foreground">
          Thanks, <span className="font-semibold text-accent">{name || "friend"}</span>! Your message has been received. 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass mt-8 max-w-xl space-y-5 rounded-3xl p-8">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}                              // value comes FROM state
              onChange={(e) => setName(e.target.value)} // typing writes TO state
              className="glass-field w-full rounded-xl px-4 py-2.5 text-heading placeholder:text-muted"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-field w-full rounded-xl px-4 py-2.5 text-heading placeholder:text-muted"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="glass-field w-full rounded-xl px-4 py-2.5 text-heading placeholder:text-muted"
            />
          </div>

          {/* Show an error message if the request failed */}
          {error && (
            <p className="text-sm font-medium text-red-500" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={sending} // prevent double-submits while the request is in flight
            className="btn-accent glow-lift rounded-2xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </section>
  );
}
