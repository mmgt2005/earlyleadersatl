import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { EventItem } from "../src/types";
import { fetchSheetRows, normalizeKey } from "./_lib/sheets";

const EVENTS_GID = process.env.GOOGLE_SHEET_EVENTS_GID ?? "0";

function parseDateParts(dateStr: string): { day: string; month: string } {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return { day: dateStr, month: "" };
  }
  const day = String(parsed.getUTCDate()).padStart(2, "0");
  const month = parsed.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return { day, month };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const rows = await fetchSheetRows(EVENTS_GID);

    const events: EventItem[] = rows
      .map((row): EventItem | null => {
        const normalized: Record<string, string> = {};
        for (const [key, value] of Object.entries(row)) {
          normalized[normalizeKey(key)] = value.trim();
        }

        const title = normalized["title"];
        const dateRaw = normalized["date"];
        if (!title || !dateRaw) return null;

        const { day, month } = parseDateParts(dateRaw);

        return {
          title,
          day,
          month,
          blurb: normalized["blurb"] ?? "",
          when: normalized["when"] ?? "",
          capacity: Number(normalized["capacity"]) || 0,
          registered: Number(normalized["registered"]) || 0,
        };
      })
      .filter((event): event is EventItem => event !== null);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(events);
  } catch (err) {
    console.error("Failed to load events from sheet", err);
    res.status(502).json({ error: "Failed to load events" });
  }
}
