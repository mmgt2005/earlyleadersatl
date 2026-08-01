import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Book } from "../src/types";
import { fetchSheetRows, normalizeKey } from "./_lib/sheets";

const BOOKS_GID = process.env.GOOGLE_SHEET_BOOKS_GID ?? "0";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const rows = await fetchSheetRows(BOOKS_GID);

    const books: Book[] = rows
      .map((row): Book | null => {
        const normalized: Record<string, string> = {};
        for (const [key, value] of Object.entries(row)) {
          normalized[normalizeKey(key)] = value.trim();
        }

        const title = normalized["title"];
        const cover =
          normalized["coverimageurl"] || normalized["coverurl"] || normalized["cover"];
        const description = normalized["description"] || "";

        if (!title || !cover) return null;

        return { title, cover, alt: `${title} cover`, description };
      })
      .filter((book): book is Book => book !== null);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(books);
  } catch (err) {
    console.error("Failed to load books from sheet", err);
    res.status(502).json({ error: "Failed to load books" });
  }
}
