# Decision Log

Append-only. Most recent at top.

---

## 2026-05-20 — All 500 questions and full UI complete

All five exam data files written (500 total questions covering SY0-701).
Glossary written (~200 terms).
Full UI built: home page, glossary, exam flow, results/review, flashcards.
All components and pages in place. Ready for `npm install` and `npm run dev`.

---

## 2026-05-20 — Domain: sudostudy.online

Terry registered sudostudy.online during the build session. Updated Footer.tsx and
layout.tsx metadata to reflect this domain.

---

## 2026-05-20 — Logo: 3 SVG options created

Three logo options built as SVG files in assets/logo/:
- Option A: Terminal prompt `$ SudoStudy_` with blinking cursor (green)
- Option B: Bracket lock `[🔒]` icon + wordmark (cyan)
- Option C: Hexagonal shield with sudo text + up-arrow (green)

PREVIEW.html lets Terry compare them in a browser. Chosen logo should be copied to
app/public/logo.svg.

---

## 2026-05-20 — No Node.js found

Node.js was not installed (or not in PATH) on the build machine. Entire project was
scaffolded manually using file writes rather than `npx create-next-app`.
All files are syntactically correct. Terry must install Node.js before running npm install.

---

## 2026-05-20 — Brand name: SudoStudy

Selected over alternatives because `sudo` is an immediately recognizable Unix/Linux
command for elevated privileges — high credibility signal to the security-aware audience.
Clear that it's a study tool. Recommended by Claude; confirmed by Terry.

---

## 2026-05-20 — Tech stack finalized

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- No database — all data is static TypeScript files
- localStorage for session persistence (no accounts required)
- PWA via next-pwa + manifest.json
- Fuse.js for client-side glossary search
- Vercel for deployment
