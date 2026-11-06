import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ProgramVideoConfig } from "../src/types";
import { fetchSheetRows, normalizeKey } from "./_lib/sheets";

const PROGRAM_VIDEO_GID = process.env.GOOGLE_SHEET_PROGRAM_VIDEO_GID;

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  const normalized = (value ?? "").trim().toLowerCase();
  if (!normalized) return fallback;
  return normalized === "true" || normalized === "yes" || normalized === "y";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!PROGRAM_VIDEO_GID) {
    res.status(404).json({ error: "Program video sheet not configured" });
    return;
  }

  try {
    const rows = await fetchSheetRows(PROGRAM_VIDEO_GID);
    const row = rows[0];
    if (!row) {
      res.status(404).json({ error: "No program video row found" });
      return;
    }

    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(row)) {
      normalized[normalizeKey(key)] = value.trim();
    }

    const config: ProgramVideoConfig = {
      heading: normalized["heading"] || "",
      description: normalized["description"] || "",
      showDonateButton: parseBoolean(normalized["showdonatebutton"], true),
      showShopButton: parseBoolean(normalized["showshopbutton"], true),
      showNewsletterButton: parseBoolean(normalized["shownewsletterbutton"], true),
    };

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(config);
  } catch (err) {
    console.error("Failed to load program video config from sheet", err);
    res.status(502).json({ error: "Failed to load program video config" });
  }
}
