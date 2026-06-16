# Grably Website

Marketing site for **Grably** — LCRB-compliant cannabis delivery dispatch for licensed BC
retailers. Built to establish credibility and capture demo requests. Tracked as **GRA-79**.

Standalone repo — **not** part of the Grably monorepo. Primary domain: **grably.ca**
(grably.io redirects here). Deployed on its own Vercel project.

## Stack
Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · shadcn/ui · Resend · lucide-react · Vercel

## Getting started
```bash
npm install
cp .env.example .env.local   # optional — add a Resend key, or leave blank for the dev fallback
npm run dev                  # http://localhost:3000
```

## Scripts
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Environment
| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | No (recommended for prod) | Without it, `/api/demo` logs submissions to the console and returns success. |
| `DEMO_FROM` | No | Verified Resend sender. Defaults to `onboarding@resend.dev`. Use a verified `grably.ca` address in production. |

Demo form submissions are emailed to `hello@grably.ca`. The API route rate-limits to one
submission per IP per 10 minutes.

## Project layout
```
src/app/            layout, page, globals, api/demo route
src/components/
  layout/           Navbar, Footer
  sections/         Hero, SocialProof, Problem, ComplianceRisk, HowItWorks, Features, Pricing, DemoForm
  ui/               shadcn primitives (button, input, label)
src/lib/            utils (cn), use-in-view, scroll
public/logos/       brand logos + watermark
```

See [CLAUDE.md](./CLAUDE.md) for the brand/design system and coding conventions.
