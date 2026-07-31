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
- `src/data/` — book catalog and event listings. Currently hardcoded; a future
  iteration could move these to a CMS or backend so non-engineers can update them
  without a deploy.
- `public/images/` — logo, mascots, and book cover art.
- `api/` — Vercel serverless functions (`get-involved.ts`, `rsvp.ts`) that email form
  submissions via [Resend](https://resend.com).

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
- Event "spots left" is computed from hardcoded capacity/registered numbers, not
  live data. Needs a backend to track real registrations and prevent overbooking.
