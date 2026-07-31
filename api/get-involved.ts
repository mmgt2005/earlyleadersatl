import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resend, TO_EMAIL, FROM_EMAIL } from "./_lib/resend";
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
      to: TO_EMAIL,
      replyTo: email,
      subject: `Get Involved: ${interest || "General"} — ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Interested in:</strong> ${escapeHtml(interest || "")}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    const sheetPromise = recordGetInvolved({
      name,
      email,
      interest: interest || "",
      message: message || "",
    }).catch((err) => {
      // Best-effort: the email notification is the source of truth, so a sheet
      // update failure shouldn't fail the visitor's submission.
      console.error("Failed to record Get Involved submission in sheet", err);
    });

    const [{ error }] = await Promise.all([emailPromise, sheetPromise]);

    if (error) {
      console.error("Resend rejected Get Involved email", error);
      res.status(502).json({ error: "Failed to send email" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send Get Involved email", err);
    res.status(502).json({ error: "Failed to send email" });
  }
}
