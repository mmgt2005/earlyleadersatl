import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resend } from "./_lib/resend";
import { isValidEmail } from "./_lib/validate";
import { recordNewsletterSignup } from "./_lib/sheetsWrite";

interface SubscribePayload {
  email: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email } = (req.body ?? {}) as Partial<SubscribePayload>;

  if (!email?.trim() || !isValidEmail(email)) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }

  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!segmentId) {
    console.error("RESEND_SEGMENT_ID is not set");
    res.status(502).json({ error: "Failed to subscribe" });
    return;
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
    });

    if (error) {
      console.error("Resend rejected subscribe request", error);
      res.status(502).json({ error: "Failed to subscribe" });
      return;
    }

    recordNewsletterSignup({ email }).catch((err) => {
      // Best-effort: the Resend segment is the source of truth for the actual
      // mailing list, so a sheet write failure shouldn't fail the signup.
      console.error("Failed to record newsletter signup in sheet", err);
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to subscribe", err);
    res.status(502).json({ error: "Failed to subscribe" });
  }
}
