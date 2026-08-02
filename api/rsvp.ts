import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "./_lib/resend";
import { escapeHtml } from "./_lib/escapeHtml";
import { isValidEmail } from "./_lib/validate";
import { recordRsvp } from "./_lib/sheetsWrite";

interface RsvpPayload {
  name: string;
  email: string;
  guests: string;
  eventTitle: string;
  eventWhen: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, guests, eventTitle, eventWhen } = (req.body ?? {}) as Partial<RsvpPayload>;

  if (!name?.trim() || !email?.trim() || !isValidEmail(email)) {
    res.status(400).json({ error: "Name and a valid email are required" });
    return;
  }

  const guestCount = Number(guests) || 1;

  // Checked before sending anything: a capacity rejection must block the whole
  // RSVP, not just log a warning. Infrastructure failures (missing env vars,
  // Apps Script errors) are best-effort and don't block — only a definitive
  // "full" result does.
  try {
    const outcome = await recordRsvp({
      eventTitle: eventTitle || "",
      guests: guestCount,
      name,
      email,
    });

    if (outcome === "full") {
      res.status(409).json({ error: "This event is now full." });
      return;
    }
  } catch (err) {
    console.error("Failed to record RSVP in sheet", err);
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: `You're Confirmed for ${eventTitle || "the Event"}!`,
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>You're confirmed for <strong>${escapeHtml(eventTitle || "the event")}</strong>${
          eventWhen ? ` — ${escapeHtml(eventWhen)}` : ""
        } (${escapeHtml(guests || "1")} guest${guestCount === 1 ? "" : "s"} attending). We can't wait to see you there!</p>
        <p>Questions? Reach out to us at ${CONTACT_EMAIL}.</p>
        <p>Big Dreams. Brave Hearts. Bright Futures.<br/>— Early Leaders Atl</p>
      `,
    });

    if (error) {
      console.error("Resend rejected RSVP confirmation email", error);
      res.status(502).json({ error: "Failed to send confirmation email" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send RSVP confirmation email", err);
    res.status(502).json({ error: "Failed to send confirmation email" });
  }
}
