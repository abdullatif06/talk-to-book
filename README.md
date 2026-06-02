# TalkToBook 🏨

Arabic-first AI hotel booking assistant. Describe your trip in Arabic, get
curated results with AI-generated Arabic review summaries.

**Stack:** Next.js · Gemini API · RapidAPI (booking-com15) · Vercel
**Cost:** $0/month infrastructure

## Features
- Natural Arabic language hotel search (RTL, Cairo font)
- AI intent extraction + Arabic review summaries (Google Gemini)
- Real hotel results from Booking.com data (top 3, budget-filtered)
- Halal & family-friendly hints
- Booking.com affiliate-ready links
- Bilingual landing page (Arabic / English)

## Getting started

```bash
npm install
# create .env.local and fill in your keys (see table below)
npm run dev
```

Open http://localhost:3000.

### Environment variables (`.env.local`)
| Variable | Where to get it |
|---|---|
| `GEMINI_API_KEY` | https://ai.google.dev |
| `GEMINI_MODEL` | optional — defaults to `gemini-2.5-flash-lite` |
| `RAPIDAPI_KEY` | https://rapidapi.com/DataCrawler/api/booking-com15 |
| `NEXT_PUBLIC_BOOKING_AFFILIATE_ID` | Booking.com affiliate / Travelpayouts (optional) |

> **Note:** No env files are committed to this repo (enforced in `.gitignore`).
> Create `.env.local` locally from the table above.

## Scripts
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build
