interface AppsScriptResponse {
  ok: boolean;
  error?: string;
  registered?: number;
}

async function postToAppsScript(payload: Record<string, unknown>): Promise<AppsScriptResponse | null> {
  const url = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
  const secret = process.env.SHEET_RSVP_SECRET;

  if (!url || !secret) {
    console.warn("GOOGLE_APPS_SCRIPT_RSVP_URL or SHEET_RSVP_SECRET not set; skipping sheet update");
    return null;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, ...payload }),
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed (status ${response.status})`);
  }

  const result = (await response.json().catch(() => null)) as AppsScriptResponse | null;
  if (!result) {
    throw new Error("Invalid response from Apps Script");
  }
  return result;
}

export type RsvpOutcome = "recorded" | "full" | "skipped";

interface RsvpRecord {
  eventTitle: string;
  guests: number;
  name: string;
  email: string;
}

export async function recordRsvp(record: RsvpRecord): Promise<RsvpOutcome> {
  const result = await postToAppsScript({ type: "rsvp", ...record });
  if (result === null) return "skipped";
  if (result.ok) return "recorded";
  if (result.error === "Full") return "full";
  throw new Error(`Sheet update failed: ${result.error ?? "unknown error"}`);
}

interface GetInvolvedRecord {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export async function recordGetInvolved(record: GetInvolvedRecord): Promise<void> {
  const result = await postToAppsScript({ type: "get-involved", ...record });
  if (result === null) return;
  if (!result.ok) {
    throw new Error(`Sheet update failed: ${result.error ?? "unknown error"}`);
  }
}
