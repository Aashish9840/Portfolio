"use server";
import { contactSchema, ContactInput } from "../data/contactSchema";

export type ContactResult = { ok: true } | { ok: false; error: string };

// Delivers the message through Resend's HTTP API.
// Needs RESEND_API_KEY and CONTACT_TO_EMAIL in the environment.
export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Some fields are invalid. Check the form and try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return {
      ok: false,
      error: "The contact form isn't connected yet. Reach me on LinkedIn or by phone instead.",
    };
  }

  const { name, email, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return { ok: false, error: "Your message didn't go through. Try again in a minute." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Your message didn't go through. Try again in a minute." };
  }
}
