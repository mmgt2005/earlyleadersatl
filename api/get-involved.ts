import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "./_lib/resend";
import { escapeHtml } from "./_lib/escapeHtml";
import { isValidEmail } from "./_lib/validate";
import { recordGetInvolved } from "./_lib/sheetsWrite";

interface GetInvolvedPayload {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, interest, message } = (req.body ?? {}) as Partial<GetInvolvedPayload>;

  if (!name?.trim() || !email?.trim() || !isValidEmail(email)) {
    res.status(400).json({ error: "Name and a valid email are required" });
    return;
  }

  try {
    const emailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "Thanks for Your Interest in Early Leaders Atl!",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thank you for your interest in getting involved with Early Leaders Atl${
          interest ? ` — specifically <strong>${escapeHtml(interest)}</strong>` : ""
        }. We've received your message and someone from our team will be in touch soon.</p>
        <p>If you have any immediate questions, feel free to reach out to us directly at ${CONTACT_EMAIL}.</p>
        <p>Big Dreams. Brave Hearts. Bright Futures.<br/>— Early Leaders Atl</p>
      `,
    });

    const sheetPromise = recordGetInvolved({
      name,
      email,
      interest: interest || "",
      message: message || "",
    }).catch((err) => {
      // Best-effort: the confirmation email to the visitor is the required
      // outcome, so a sheet write failure shouldn't fail their submission. The
      // sheet is admins' record of who reached out, not visitor-facing.
      console.error("Failed to record Get Involved submission in sheet", err);
    });

    const [{ error }] = await Promise.all([emailPromise, sheetPromise]);

    if (error) {
      console.error("Resend rejected Get Involved confirmation email", error);
      res.status(502).json({ error: "Failed to send confirmation email" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send Get Involved confirmation email", err);
    res.status(502).json({ error: "Failed to send confirmation email" });
  }
}
