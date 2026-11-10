# Ridge — Carranza Dig operating system

Ridge is a self-contained staff site for Carranza Dig Services. It is the working version of what GoHighLevel, Housecall Pro, and HubSpot sell, built for an excavation crew: leads, inbox, estimates, dispatch, spoil, 811, invoices, reviews, and automations that actually fire.

It is not locked to any one AI. Another model can keep building from this folder.

## Run it

```bash
npm install
npm run dev
```

Public site: `/`
Staff door: `/admin` (demo PIN `2580`) — owner floor, AI closers, Salesforce, estimate book
Truck view: `/field` — the same estimate book plus the jobs on the truck
The public homepage is unchanged. Closers and Salesforce live only on the owner and crew doors.

The closers (Mira, Luca, Vega, Noa) work cdigs.bid around the clock inside this app. They qualify a lead and write a free estimate visit onto the calendar. Phone stays 7a–7p. Chat, text, and video do not. A buyer who asks for a person sits in the waiting room until someone hits “Take the visit.” Reset demo in Settings if an older browser file is still showing the yard from before this book.
Customer portal: `/portal` (try `638-555-0142` or `638-555-0133`)
Booking: `/book`
Sample landing page: `/p/septic`

The whole yard is stored in the browser under `localStorage` key `carranza-ridge-v1`. Settings → Export JSON / Import JSON / Reset demo moves the file between machines. Nothing is charged, texted, or posted to a real carrier. Those pipes are intentionally not connected.

## Where the product lives

- `src/lib/ridge/types.ts` — the data model
- `src/lib/ridge/seed.ts` — the Puerto Peñasco demo yard
- `src/lib/ridge/engine.ts` — workflows, scoring, routes, forecast, copilot, merge
- `src/lib/ridge/store.ts` — every action, persisted with Zustand
- `src/lib/ridge/coverage.ts` — the map of HighLevel, Housecall Pro, HubSpot, and dig-only features to a screen
- `src/components/ridge/` — the admin UI
- `src/routes/` — public site, admin, book, portal, field, landing pages

Open Admin → Full coverage. Every row is a real screen, not a label.

## What already runs on its own

Morning sweep (first open each day): overdue invoices text the customer and create a task, permits inside 14 days become tasks, machines near service become tasks.

Also live: new lead, missed call text-back, estimate sent, estimate approved, on-my-way, job complete (drafts the invoice), invoice paid (asks for the review), low review (owner task), lost deal, form submit, sequences (day 0 sends, later days become tasks you send from Tasks).

Agents Rio, Sol, and Dispatch draft from the record. Ask Ridge answers from the yard file, not from a remote model, so the zip still works offline.

## Connect later (do not fake these)

When you wire the real world, keep the store actions and replace the last mile:

- SMS / voice: call `sendMessage` / `addCall` from a Twilio (or similar) webhook
- Email: same inbox, channel `email`
- Card payments: `recordPayment` after the processor confirms
- QuickBooks: the invoice CSV export is the bridge until a real sync exists
- Google reviews: `addReview` from the reviews API, `replyReview` to post back
- Maps: Routes already sorts jobs from the yard at 31.3172, -113.5284

Do not put secrets in the repo. The staff PIN is a local door, not account security.

## Design

Dark soil, bone type, one copper accent. Fraunces for headlines, Outfit for the UI. Keep new screens on those tokens in `src/styles.css`. No second palette.
