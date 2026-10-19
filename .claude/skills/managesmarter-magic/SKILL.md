---
name: managesmarter-magic
description: Playbook for changing the Manage Smarter marketing website (managesmarter.app: home, /services, /dalelak, /privacy, /cezeri-competitions). Use for any request to add, edit, delete, translate, restyle or "make something similar" on this site, for SEO, pricing display, contact links, or the quote form. Reply to Maher in Egyptian Arabic.
---

# Manage Smarter Magic — marketing site edition

**This repo is PUBLIC.** Never put in it: client school names, logos, real people's photos, database ids, keys, security findings, internal notes, or anything from the private app repo. The full platform map lives only in the private repo `managesmarter-app` (skill with the same name). Here: the website only.

Owner: Mohamed Maher (non-coder, Chromebook + iPhone). Reply in Egyptian Arabic, short, exact link to check, one recommendation.

## What this repo is
Static HTML on Cloudflare (a push to `main` deploys in 1–2 min). No build step.
- `index.html` — home (single file, ~110 KB: CSS, markup, i18n data, scripts).
- `services/`, `dalelak/`, `privacy/`, `cezeri-competitions/` — separate pages, each its own `index.html`.
- `assets/` — images, film clips (`film/`), social cards (`social/`), `registry.json` (asset registry: add every new asset there).
- `_headers` — strict CSP (scripts self + inline + Cloudflare insights; styles self + Google Fonts; images self + data:; connect self; `form-action 'self'`). New external origins need a deliberate `_headers` change.
- `robots.txt`, `sitemap.xml` — update when a page is added.
The product itself (the school platform) is at `https://app.managesmarter.app`; pricing/quote builder at `https://app.managesmarter.app/pricing/`.

## How the home page works
- Language switch ع / TR / EN. Text is filled from a JS object `D`: `key:["arabic","english","turkish"]`, and elements carry `data-i="key"`. `paint()` sets text, `lang`, `dir`, title. **Every visible string needs all three languages.**
- Placeholders use `data-ph="key"`.
- Sections in order: hero (phone tour) → `#systems` → `#ba` (before/after) → `#how` → trust → `#who` (+ privacy note) → `#faq` → film → `#pricing` (3 plans, "from $300/yr", free-service note, link to full pricing) → `#contact` (WhatsApp, email, quote form) → footer (privacy link).
- Quote form builds a WhatsApp/mail message in the browser (`wa.me/905432295764`, `mailto:info@managesmarter.app`). It stores nothing and has no backend.
- Dark film background is the identity; keep text contrast high (muted text ≥ `#C6DAD3` on the dark base).

## Facts that must stay consistent
- Brand: **Manage Smarter**. Pricing company: **Easylerno** (one word).
- WhatsApp **+90 543 229 5764**, email **info@managesmarter.app**.
- Prices shown: single system from $300/year (up to 250 students, rising with size); up to 10% off the full bundle; one free service for schools over 1,000 students taking two or more. If the real price list changes, change it here, in the app repo's `pricing/`, and the brochures together.
- Hosting claims: data in the EU (Frankfurt). Do not write "daily backups" unless Maher confirmed the Supabase plan includes them.
- No claims of customer counts or named references. Privacy callout explains why clients are not shown.

## Recipes
**Change a sentence / add a translation:** `grep -n 'keyname:' index.html` → edit the three values.
**Add a section:** copy the nearest section's markup, give all text `data-i` keys, add keys to `D` before `ft:`, add CSS near the v2 block at the end of `<style>`, link from nav only if it deserves it.
**Add/replace an image:** put it in `assets/img/` (webp), add to `assets/registry.json`, give `width/height` and an `alt` via `data-alt` when translatable.
**New page:** folder `/<name>/index.html` copying `/privacy/` (small, trilingual) or `/services/`; add to `sitemap.xml`; add `canonical`.
**Link to the app / pricing:** `target="_blank" rel="noopener"`.
**SEO:** `<title>`, description, `og:*`, JSON-LD already on home; separate language URLs are NOT built yet (single URL + JS i18n) — say so if Maher asks for ranking per language, and propose static `/ar /en /tr` pages as the next step.

## Test before every push
1. `python3 -m http.server 8765` in the repo (absolute `/assets/...` paths break under `file://`; do not `pkill -f` patterns that match your own shell).
2. Playwright (chromium at `/opt/pw-browsers/chromium`): screenshot 390 px and 1280 px, switch the three languages, click the quote form buttons, watch for page errors (ignore offline font failures).
3. Read the diff adversarially: unescaped text, missing language, broken CSP, contrast.
4. Commit with a clear message; push `main`; tell Maher the link and to hard refresh.

## Don't
No tracking scripts, no third-party embeds, no forms posting to external services, no fake testimonials or numbers, no recoloring the brand, no giant rewrites when a small diff works.
