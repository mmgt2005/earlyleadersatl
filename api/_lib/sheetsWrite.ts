export async function incrementEventRegistered(eventTitle: string, guests: number): Promise<void> {
  const url = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
  const secret = process.env.SHEET_RSVP_SECRET;

  if (!url || !secret) {
    console.warn("GOOGLE_APPS_SCRIPT_RSVP_URL or SHEET_RSVP_SECRET not set; skipping sheet update");
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, eventTitle, guests }),
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed (status ${response.status})`);
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!result || result.ok !== true) {
    throw new Error(`Sheet update failed: ${result?.error ?? "unknown error"}`);
  }
}
