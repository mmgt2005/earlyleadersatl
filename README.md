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

## Known gaps (carried over from the design handoff)

- The "Buy Now" / book cover clicks all point to a single shared Square Payment
  Link, which doesn't support a real multi-item cart. For real checkout, wire up
  Square Online Store or the Buy Button/Checkout API per book.
- The Get Involved and RSVP forms only show a client-side confirmation message —
  submissions aren't sent anywhere yet. Needs a real endpoint (email service, CRM,
  or backend) to capture submissions.
- Event "spots left" is computed from hardcoded capacity/registered numbers, not
  live data. Needs a backend to track real registrations and prevent overbooking.
