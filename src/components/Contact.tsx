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
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        Get in touch
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Have a project in mind or just want to say hi? Send a message.
      </p>

      {sent ? (
        // After submit, swap the form out for a confirmation message
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          Thanks, {name || "friend"}! Your message has been received. 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}                              // value comes FROM state
              onChange={(e) => setName(e.target.value)} // typing writes TO state
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-indigo-900"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-indigo-900"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-indigo-900"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Send message
          </button>
        </form>
      )}
    </section>
  );
}
