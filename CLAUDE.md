# CLAUDE.md — Grably Marketing Website

Standalone marketing site for **Grably**, a B2B cannabis-delivery dispatch SaaS for
licensed BC cannabis retailers. Two jobs: (1) establish credibility on a Google search,
(2) capture demo requests. Tracked as **GRA-79** in Linear. NOT part of the Grably monorepo.

Primary domain: **grably.ca** (grably.io redirects to it). Deployed on its own Vercel
project, separate from the dashboard and admin apps.

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build (run after each section; must pass clean)
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Stack
Next.js 14 (App Router) · TypeScript strict · Tailwind CSS 3.4 · shadcn/ui (`src/components/ui`)
· Resend (form email) · lucide-react (icons) · Vercel.

## Architecture
- `src/app/layout.tsx` — root layout, SEO metadata, fonts, favicon.
- `src/app/page.tsx` — single landing page; assembles all sections in order.
- `src/app/api/demo/route.ts` — demo-form POST handler (Resend + IP rate limit).
- `src/components/layout/` — `Navbar`, `Footer`.
- `src/components/sections/` — `Hero`, `SocialProof`, `Problem`, `ComplianceRisk`,
  `HowItWorks`, `Features`, `Pricing`, `DemoForm` (build/render in this order).
- `src/components/ui/` — shadcn primitives (`button`, `input`, `label`).
- `src/lib/` — `utils.ts` (`cn`), `use-in-view.ts` (scroll fade-in), `scroll.ts` (anchor scroll).

## Brand & design system
Tailwind custom colors (see `tailwind.config.ts`): `grably-dark #0F2E1E`, `grably-mid
#1A4731`, `grably-accent #2ECC71`, `grably-adk #27AE60` (hover), `grably-offwhite #F4F9F6`,
`grably-lightgrn #D4EDDA`, `grably-text #1A2E1A`, `grably-textmid #3D5A47`,
`grably-warn #C0392B` (compliance risk only), `grably-gray #E8EDF0`.

- Headlines: `font-serif` (Georgia). Body: `font-sans` (Inter/system-ui). No web-font downloads.
- Eyebrow label: `text-xs font-bold uppercase tracking-widest text-grably-accent`.
- **Left accent strip** on every dark section: `absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent`.
- **G watermark** (hero only): `absolute right-0 top-0 ~340px opacity-[0.07] pointer-events-none hidden md:block`.
- **Integration pills**: `bg-grably-lightgrn text-grably-mid text-xs font-semibold px-3 py-1 rounded-full`.
- **80/20 rule**: ~80% of the page is `bg-grably-offwhite`/white. `bg-grably-dark` ONLY for
  hero, major dividers, CTA bars, footer. NEVER use `bg-grably-accent` as a large background.

## Logos (`public/logos/`)
- `Logo_GrablyWhite_transparent.png` — dark backgrounds (navbar h-8, footer h-7).
- `Logo_GrablyDark_transparent.png` — light sections.
- `G_Logo_watermark_transparent.png` — hero watermark only (opacity-[0.07]).
- Never stretch/rotate/recolour. Min width 120px. Use `next/image` for all logos.

## Conventions
- TypeScript strict, **no `any`**. Functional components only. **Named exports** (no default
  exports) for components. Props typed with `interface`. Form state via React `useState`
  (no form library). **Tailwind only** — no inline styles, no CSS modules. Mobile-first
  (`md:`/`lg:` for larger). All icons from `lucide-react`. Animations: subtle fade-in on
  scroll only (no bounce/spin/glow). No gradients on text, no drop shadows on text.

## Do NOT
- Reference BreadStack (competitor). Use grably.io as the main domain (it's grably.ca).
- Add gradients on text, glow effects, cookie banners, analytics/ad scripts, stock photos.
- Use Nodemailer (use Resend). Initialize inside the Grably monorepo.

## Env
`.env.local` (gitignored): `RESEND_API_KEY`, optional `DEMO_FROM`. Without `RESEND_API_KEY`
the API route logs the submission to console and returns success (local-dev fallback).
See `.env.example`.
