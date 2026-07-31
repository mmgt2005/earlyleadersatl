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

## Form submission sheet logging (Apps Script)

Both forms write to the sheet in addition to sending an email, via the same Apps
Script project used for the Cover Images sync (Extensions → Apps Script on the
sheet) — so you have a durable record of every submission even if the notification
email fails to send (e.g. before a domain is verified in Resend):

- **RSVP** increments that event's `Registered` count in the Events tab, and appends
  a row to an `RSVPs` log tab (timestamp, event, name, email, guests).
- **Get Involved** appends a row to a `Get Involved` log tab (timestamp, name, email,
  interest, message).

Both log tabs are created automatically the first time they're needed — no need to
add them manually.

**Setup:**
1. Add this to the Apps Script project's `Code.gs`, alongside the existing
   `syncCoverImages` code (replace any previous `doPost`/`jsonResponse`/`getOrCreateSheet`
   if you added an earlier version):

   ```javascript
   function doPost(e) {
     try {
       const payload = JSON.parse(e.postData.contents);
       const expectedSecret = PropertiesService.getScriptProperties().getProperty("RSVP_SECRET");

       if (!expectedSecret || payload.secret !== expectedSecret) {
         return jsonResponse({ ok: false, error: "Unauthorized" });
       }

       const type = String(payload.type || "rsvp");
       if (type === "get-involved") {
         return handleGetInvolved(payload);
       }
       return handleRsvp(payload);
     } catch (err) {
       return jsonResponse({ ok: false, error: String(err) });
     }
   }

   function handleRsvp(payload) {
     const eventTitle = String(payload.eventTitle || "").trim();
     const guests = Math.max(1, parseInt(payload.guests, 10) || 1);
     const name = String(payload.name || "").trim();
     const email = String(payload.email || "").trim();

     if (!eventTitle) {
       return jsonResponse({ ok: false, error: "Missing eventTitle" });
     }

     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const eventsSheet = ss.getSheetByName("Events");
     const numRows = eventsSheet.getLastRow();
     const headers = eventsSheet.getRange(1, 1, 1, eventsSheet.getLastColumn()).getValues()[0];

     const titleCol = headers.indexOf("Title") + 1;
     const registeredCol = headers.indexOf("Registered") + 1;

     if (!titleCol || !registeredCol) {
       return jsonResponse({ ok: false, error: "Missing Title or Registered column" });
     }

     let updated = null;
     for (let row = 2; row <= numRows; row++) {
       const rowTitle = String(eventsSheet.getRange(row, titleCol).getValue() || "").trim();
       if (rowTitle === eventTitle) {
         const current = Number(eventsSheet.getRange(row, registeredCol).getValue()) || 0;
         updated = current + guests;
         eventsSheet.getRange(row, registeredCol).setValue(updated);
         break;
       }
     }

     if (updated === null) {
       return jsonResponse({ ok: false, error: "Event not found" });
     }

     const logSheet = getOrCreateSheet(ss, "RSVPs", ["Timestamp", "Event", "Name", "Email", "Guests"]);
     logSheet.appendRow([new Date(), eventTitle, name, email, guests]);

     return jsonResponse({ ok: true, registered: updated });
   }

   function handleGetInvolved(payload) {
     const name = String(payload.name || "").trim();
     const email = String(payload.email || "").trim();
     const interest = String(payload.interest || "").trim();
     const message = String(payload.message || "").trim();

     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const logSheet = getOrCreateSheet(ss, "Get Involved", ["Timestamp", "Name", "Email", "Interest", "Message"]);
     logSheet.appendRow([new Date(), name, email, interest, message]);

     return jsonResponse({ ok: true });
   }

   function getOrCreateSheet(spreadsheet, name, headerRow) {
     let sheet = spreadsheet.getSheetByName(name);
     if (!sheet) {
       sheet = spreadsheet.insertSheet(name);
       sheet.appendRow(headerRow);
     }
     return sheet;
   }

   function jsonResponse(obj) {
     return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. In the Apps Script editor, click the gear icon (**Project Settings**) in the left
   sidebar → **Script Properties** → **Add script property** → key `RSVP_SECRET`,
   value: a long random string (ask Claude to generate one, or run
   `openssl rand -hex 32` yourself). Save. Skip this if already set up from an earlier
   version — it's unchanged and now guards both form types.
3. **If you don't have a Web app deployment yet:** click **Deploy → New deployment** →
   gear icon next to "Select type" → **Web app**. Configuration: Execute as **Me**,
   Who has access **Anyone**. Click **Deploy**, then copy the URL (ends in `/exec`).
   **If you already deployed an earlier version:** editing `Code.gs` alone doesn't
   update the live endpoint — go to **Deploy → Manage deployments**, click the pencil
   (edit) icon on the existing deployment, change **Version** to **New version**, and
   click **Deploy**. This keeps the same `/exec` URL, so you don't need to touch
   Vercel again.
4. In Vercel, set `GOOGLE_APPS_SCRIPT_RSVP_URL` to that URL, and `SHEET_RSVP_SECRET`
   to the *same* random value used for `RSVP_SECRET` in step 2 — these must match
   exactly, or every request will be rejected as unauthorized. Skip if already set;
   these two vars now serve both `/api/rsvp` and `/api/get-involved` despite the
   "RSVP" naming.

If either env var is missing, both endpoints silently skip the sheet update (the
email notification still sends normally) rather than failing the visitor's
submission — check the Vercel function logs for `"Failed to record RSVP in sheet"` /
`"Failed to record Get Involved submission in sheet"` if rows aren't appearing as
expected.

## Known gaps (carried over from the design handoff)

- The "Buy Now" / book cover clicks all point to a single shared Square Payment
  Link, which doesn't support a real multi-item cart. For real checkout, wire up
  Square Online Store or the Buy Button/Checkout API per book.
- RSVP increments `Registered` but doesn't enforce `Capacity` — someone can RSVP past
  a full event and it'll still say "Full" without actually blocking them.
