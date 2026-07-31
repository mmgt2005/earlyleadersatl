# Early Leaders Atl

Single-page website for Early Leaders Atl, a nonprofit empowering kids through books,
workshops, and mentoring.

## Stack

React + TypeScript + Vite.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## Structure

- `src/components/` — one component per page section (Header, Hero, Shop, Programs,
  Events, Mascots, Board, DonateCta, Footer) plus the Lightbox / Get Involved / RSVP
  modals.
- `src/data/` — bundled sample book/event data, used as a fallback if the Google
  Sheet is unreachable (and as the data source in local dev, since `/api/*` doesn't
  run under plain `npm run dev`).
- `public/images/` — logo, mascots, and site chrome. Book cover images are hosted
  externally and referenced by URL in the sheet (see below).
- `api/` — Vercel serverless functions: `get-involved.ts` / `rsvp.ts` (email forms via
  Resend), `books.ts` / `events.ts` (read the Google Sheet catalog).

## Book & event catalog (Google Sheets)

Books and events are maintained in a single Google Sheet with two tabs, fetched at
runtime by `/api/books` and `/api/events` — no code changes or deploys needed to add
or edit one.

**Setup:**
1. Share the sheet as "Anyone with the link" → Viewer.
2. Set `GOOGLE_SHEET_ID` in Vercel (the long ID in the sheet's URL).
3. Set `GOOGLE_SHEET_BOOKS_GID` and `GOOGLE_SHEET_EVENTS_GID` to each tab's `gid`
   (visible in the URL, e.g. `...#gid=123456789`, when that tab is selected).

**Books tab columns:**

| Title | Cover Image URL |
|---|---|
| The Champions Coloring Book | https://... |

**Events tab columns:**

| Title | Date | Blurb | When | Capacity | Registered |
|---|---|---|---|---|---|
| Book Fair Kickoff | 2026-09-14 | Community book fair with free titles for every child. | Sat · 10am–2pm · Atlanta, GA | 40 | 28 |

Column headers are matched case-insensitively and ignoring spaces, so exact
capitalization doesn't matter. `Date` accepts anything `new Date()` can parse (ISO
`2026-09-14` or `9/14/2026` both work); the site derives the day/month badge from it.
Row order in the sheet is the display order.

## Form emails (Resend)

The Get Involved and RSVP forms POST to `/api/get-involved` and `/api/rsvp`, which
send an email via Resend to `earlyleaderatl@gmail.com`.

- Set `RESEND_API_KEY` in Vercel Project Settings → Environment Variables (see
  `.env.example`). Never commit the real key.
- These endpoints only run on Vercel — `npm run dev` (plain Vite) can't serve
  `/api/*`, so submissions will show the error state locally. Use `vercel dev` to
  test them locally, or test on a deployed preview.
- Currently sending from Resend's sandbox address (`onboarding@resend.dev`), which
  only delivers to the email address the Resend account is registered under. Verify
  a custom domain in Resend and update `FROM_EMAIL` in `api/_lib/resend.ts` to send
  from `@earlyleadersatl.org` (or similar) and deliver to any recipient.

## Known gaps (carried over from the design handoff)

- The "Buy Now" / book cover clicks all point to a single shared Square Payment
  Link, which doesn't support a real multi-item cart. For real checkout, wire up
  Square Online Store or the Buy Button/Checkout API per book.
- Event "spots left" is computed from the sheet's capacity/registered numbers, not
  live RSVP counts. Registering doesn't decrement it — needs a backend to track real
  registrations and prevent overbooking.
