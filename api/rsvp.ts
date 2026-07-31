import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resend, TO_EMAIL, FROM_EMAIL } from "./_lib/resend";
import { escapeHtml } from "./_lib/escapeHtml";
import { isValidEmail } from "./_lib/validate";

interface RsvpPayload {
  name: string;
  email: string;
  guests: string;
  eventTitle: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, guests, eventTitle } = (req.body ?? {}) as Partial<RsvpPayload>;

  if (!name?.trim() || !email?.trim() || !isValidEmail(email)) {
    res.status(400).json({ error: "Name and a valid email are required" });
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `RSVP: ${eventTitle || "Event"} — ${name}`,
      html: `
        <p><strong>Event:</strong> ${escapeHtml(eventTitle || "")}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Guests attending:</strong> ${escapeHtml(guests || "1")}</p>
      `,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send RSVP email", err);
    res.status(502).json({ error: "Failed to send email" });
  }
}
