# SudoStudy

CompTIA Security+ SY0-701 exam prep site. Built by Terry.

## Project

- Brand: SudoStudy — "sudo" = elevated privileges. Credibility signal to security audience.
- Domain: sudostudy.online
- Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Fuse.js, next-pwa
- Deploy target: Vercel (free tier)

## Directory

```
app/                 Next.js app
  src/
    app/             Routes (App Router)
    components/      UI components
    data/            All question and glossary data (no database)
    lib/             utils, search, exam-state
    types/           TypeScript types
  public/            Static assets, manifest.json, PWA icons
assets/logo/         SVG logos (3 options — Terry picks one)
```

## Data

- 500 exam questions across 5 TypeScript files (exam-1.ts through exam-5.ts)
- ~200 glossary terms in glossary.ts
- No database — all data is static TypeScript
- Session state lives in localStorage (keys prefixed `sudostudy:`)

## Getting Started

1. Install Node.js (nodejs.org) if not already installed
2. `cd app`
3. `npm install`
4. `npm run dev` — runs at localhost:3000

## Logo Selection

Open `assets/logo/PREVIEW.html` in a browser to compare all three logo options.
After choosing, copy the chosen `logo-X-full.svg` to `app/public/logo.svg`.

## AdSense

Edit `app/src/components/ads/AdSlot.tsx` — add your `data-ad-client` and `data-ad-slot`
values once your AdSense account is approved.

## Passing Score

750 / 900 scaled = 83.3% raw. Defined in `app/src/types/index.ts` as `PASSING_SCORE = 83`.

## Security Headers

Configured in `app/next.config.ts`. Includes CSP (allows Google AdSense domains), HSTS,
X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
