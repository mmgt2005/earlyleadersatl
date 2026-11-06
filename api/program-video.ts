import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ProgramVideoItem } from "../src/types";
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

    const videos: ProgramVideoItem[] = rows
      .map((row): ProgramVideoItem | null => {
        const normalized: Record<string, string> = {};
        for (const [key, value] of Object.entries(row)) {
          normalized[normalizeKey(key)] = value.trim();
        }

        const heading = normalized["heading"];
        const videoFilename =
          normalized["videofilename"] || normalized["videofile"] || normalized["filename"];

        if (!heading || !videoFilename) return null;

        return {
          heading,
          description: normalized["description"] || "",
          videoFilename,
          showDonateButton: parseBoolean(normalized["showdonatebutton"], true),
          showShopButton: parseBoolean(normalized["showshopbutton"], true),
          showNewsletterButton: parseBoolean(normalized["shownewsletterbutton"], true),
        };
      })
      .filter((video): video is ProgramVideoItem => video !== null);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(videos);
  } catch (err) {
    console.error("Failed to load program videos from sheet", err);
    res.status(502).json({ error: "Failed to load program videos" });
  }
}
