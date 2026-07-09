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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser's default full-page reload
    // In a real app you'd send this data to an API here.
    console.log("Message submitted:", { name, email, message });
    setSent(true);
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

          <button
            type="submit"
            className="btn-accent glow-lift rounded-2xl px-6 py-3 text-sm font-semibold"
          >
            Send message
          </button>
        </form>
      )}
    </section>
  );
}
