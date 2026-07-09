// ---------------------------------------------------------------------------
// A ROUTE HANDLER — the App Router's way to build a backend API endpoint.
//
// A file at src/app/api/contact/route.ts creates the URL /api/contact.
// Exporting an async `POST` function handles POST requests to that URL. This
// runs ON THE SERVER, so it's the safe place to use our secret API key — it is
// never sent to the browser.
//
// The contact form (Contact.tsx) fetch()es this endpoint; here we validate the
// data and email it to you via Resend.
// ---------------------------------------------------------------------------

import { Resend } from "resend";
import { NextResponse } from "next/server";

// Where messages get delivered.
const TO_EMAIL = "micah.perteet@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation — never trust data coming from the client.
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in every field." },
        { status: 400 },
      );
    }

    // The API key comes from an environment variable (see .env.local), never
    // hard-coded. We create the client HERE (inside the handler) rather than at
    // the top of the file so the app can still build when the key isn't set yet.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "The email service isn't configured yet." },
        { status: 500 },
      );
    }
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      // Until you verify your own domain in Resend, you must send FROM their
      // shared onboarding address. It can only deliver to the email you signed
      // up with — so sign up for Resend using TO_EMAIL above.
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      // Setting replyTo to the visitor's address means hitting "Reply" in your
      // inbox replies straight to them.
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send the message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
