async function postToAppsScript(payload: Record<string, unknown>): Promise<void> {
  const url = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
  const secret = process.env.SHEET_RSVP_SECRET;

  if (!url || !secret) {
    console.warn("GOOGLE_APPS_SCRIPT_RSVP_URL or SHEET_RSVP_SECRET not set; skipping sheet update");
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, ...payload }),
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed (status ${response.status})`);
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!result || result.ok !== true) {
    throw new Error(`Sheet update failed: ${result?.error ?? "unknown error"}`);
  }
}

interface RsvpRecord {
  eventTitle: string;
  guests: number;
  name: string;
  email: string;
}

export async function recordRsvp(record: RsvpRecord): Promise<void> {
  await postToAppsScript({ type: "rsvp", ...record });
}

interface GetInvolvedRecord {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export async function recordGetInvolved(record: GetInvolvedRecord): Promise<void> {
  await postToAppsScript({ type: "get-involved", ...record });
}
