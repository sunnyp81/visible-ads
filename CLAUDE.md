# visible-ads — Project Brain

Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here. (Folds visible-ads-boh-proposal-jun9 + visible-ads-facts.)

## Current state
- Client site visible-ads.com (Boh Tjarks + Joe). Boh = referral partner who sends Sunny clients. Engagement: AI-visibility + content pilot AGREED Jun 14 2026.
- Stack: Astro 6 + Tailwind 4, tokens navy/electric/cta, Plus Jakarta + Inter. Forms → `/api/submit`.
- Repo: `sunnyp81/visible-ads` (master). Local: `C:\Users\sunny\repos\visible-ads`. Deploy: CF Pages auto-deploy from master.
- Pricing (de-salesed): pilot £350 standard / £250 partner; retainer £400 / £250/mo partner (£250 = floor; partner resells at standard, keeps margin).

## Pilot scope (agenda)
4 AEO pages + homepage sections (team-values block, "Find your path" role selector). Framework name = **PCF™ (Profit Contribution Framework)** = entity anchor (mirrors judeluxe's BOI®). About + gated Pricing Guide = retainer/add-on, NOT pilot.

## Pilot pages — now LIVE (was "not pushed", superseded Jul 4)
✅ The 3 pilot pages are committed, pushed and LIVE (verified 200 Jul 4): `/how-we-audit/` (PCF™), `/roas-vs-profit/` (+ProfitCalculator POAS hook), `/high-sku-advertising/`. Working tree clean, in sync with origin before the Jul 4 SEO commit below.
Remaining pilot work: page 4 (challenger/results block, Avis "We Try Harder" copy) + homepage sections (team-values, "Find your path" role selector).

## Jul 4 SEO pass — PUSHED + LIVE (`14f0a7f`, in sync with origin)
The SEO commit is live on Boh's site (master in sync, verified this session). Contents:
1. Homepage `<title>` → "Google Ads Agency London | Profit-First PPC | Visible Ads" (was "Digital Advertising Agency | Visible Ads, Ads That Convert"; site ranks pos ~1.8 for "google ads agency" but title omitted it).
2. `/free-ads-audit` sitelink renamed to "Book a Profit Audit" (Boh request) across title, H1 ("Book Your Free Profit Audit"), nav CTAs desktop+mobile, WebPage+breadcrumb schema. URL unchanged.
3. Stripped all 316 em-dashes site-wide (house rule).
NOTE: `visible-ads-optimization-tracker.md` in `G:\My Drive\clients\visible-ads\` is STALE; the site now has ~25 blog posts + service/case-study pages. Trust this brain + live site over that tracker.

## Jul 4 — NEW definitive-guide blog post (pilot item 2) — build verified, pushing
`/blog/profit-first-ppc/` — "Profit-First PPC: Run Google Ads for Profit, Not Revenue" (Strategy). Methodology HUB that reinforces + hub-links all 3 pilot pages: /roas-vs-profit/ (POAS calc), /how-we-audit/ (PCF), /high-sku-advertising/ (margin segmentation), plus /blog/what-is-ecro/. Sections: revenue trap, POAS vs ROAS, four numbers (contribution margin / break-even ROAS / target POAS / CAC:LTV), map profit first, margin-adjusted bidding, the weekly scaling rulebook (VA's substantiated ROAS-threshold rulebook, safe facts only), structure by margin, profit leaks, 5-FAQ. Article+FAQPage+Breadcrumb schema. Distinct intent from /roas-vs-profit/ (no cannibalisation). 0 em/en dashes, semantic-audit ~88 (>=85). Registered top of `blog.astro` posts array. Build = 52 pages OK.
Still open for VA content push: deeper on-page pass (a few overlong titles: google-ads-vs-bing-ads 81ch, what-is-ecro 85ch, how-much-google-ads-cost-uk 75ch), internal linking; homepage sections (team-values, "Find your path"); early-Aug re-measure baseline for pilot delta.

## Already DEPLOYED
- robots.txt two-lane fix (`7034379`, pushed): ALLOW citation bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot/User), BLOCK training bots (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, cohere-ai, Diffbot), keep `Content-Signal: search=yes,ai-train=no`. (CF managed layer had been injecting Disallow; Sunny removed the override — origin file is now source of truth.)
- Homepage title rewrite DRAFTED, not deployed (fastest proof: ranks 1.8 for "google ads agency"; GSC lift expected 2-3wk).

## Key facts & warnings
- 🔴 Do NOT publish VA performance figures / case-study numbers until Boh supplies/signs them off (no-unverified-site-claims). VA-supplied facts below ARE safe to publish.
- 🔴 ASA risk: avoid "never lose money" wording. Use the real weekly ROAS-threshold rulebook instead (see below) or "cap spend below break-even ROAS, scale down not off".
- Don't write negatively about Cloudflare / the existing build — Sunny's team built the site.
- GSC baseline (sc-domain:visible-ads.com, gsc-sunnypat81): ranks but doesn't convert clicks. "google ads agency" pos 1.8 / 93 impr / 0 clicks; near-me + local Kingston/Richmond terms pos ~1 / 0 clicks; ~93% of clicks are brand. Cause = homepage title lacks "Google Ads agency". Bing healthy (~60 pages indexed, 0 blocks, 0 5xx). Agency based Kingston-upon-Thames.
- Deliverables: `G:\My Drive\clients\visible-ads\` — `Boh-AI-Visibility-Proposal-2026-06-09.{html,md,pdf}` + `Visible-Ads-Progress-Snapshot-2026-06-09.html` + robots.txt.

### Verified VA company facts (from Boh's May 2026 deck — safe to publish)
- Positioning: "Profit-First Search & Social Ecom Ads". London-based, founder-led. Tagline "Get MORE sales with the SAME ad spend". Clients D2C & B2B, UK/US/EU, £1-20M revenue.
- Trust stats: managing **£3M annual ad spend**. Certs: Google Partner, Microsoft Advertising Partner, Amazon Ads Verified Partner, Meta Business Partner. Awards: UK Search Awards 2022 WINNER; 2024 Finalist; UK eCommerce Awards 2024 Finalist; National Digital Awards 2026 Finalist.
- Client logos incl. Japan Centre, CFW.co.uk, Sephra, Huntsman Air Sports (= the £200 audit client), OnlyBBGuns, plus others.
- "How We Scale Ad Spend" rulebook (the substantiated, non-ASA-risky claim, weekly, ROAS-threshold based): >1,200% ROAS → +20% budget/wk; 900-1,100% → +10%/wk; 600-800% → hold; 300-500% → reduce 20%; <300% → switch off.
- Case studies (real): CFW Google 1,165% all-time ROAS / £4.14M sales on £380K over 3yr; Japan Centre relaunch 11 ROAS / £32K on £2.9K in 3wk; Kitchen & Worktops leadgen leads 6→107 in 4mo (CPL -75%); CFW Amazon 8.5 ROAS, £769K sales.
- Pricing (per channel, +VAT/mo, excl. creatives + one-off £1k tracking setup, 3mo min then rolling): SILVER £1k (≤£3k budget, 10h); GOLD £1.5k (≤£20k, 20h); PLATINUM £2k +5% (£20k+, 35h, click-fraud protection); PERFORMANCE = reduced/zero retainer, rev-share, by application.
- 🔴 TENSION: VA's proof is ROAS-forward but Boh wants profit/POAS OVER ROAS. Reconcile — profit = the goal, ROAS = the lever they manage (the weekly rulebook). Soften PCF page's anti-ROAS tone so it doesn't fight VA's award-winning ROAS story.

## History
- 2026-06-09 — Proposal + baseline built; robots two-lane fix deployed (`7034379`); title/meta rewrites drafted.
- 2026-06-14 — Boh agreed pilot; judeluxe-modelled brief; 3 of 4 pilot pages + ProfitCalculator built + verified (NOT pushed); 3 open Qs sent to Boh (trust stats / pricing / claim wording).
- 2026-06-19 — Boh pivoting VA messaging to POAS (already the spine of built pages). Wants the 7 judeluxe problem-hub topics covered (JS-rendered, need browser extract; current scope = 4 pages) and `/free-ads-audit/` renamed to "BOOK A PROFIT AUDIT" (sitelinks are algorithmic — fix = rename title/H1/nav at `src/pages/free-ads-audit.astro`, keep URL or 301 to /profit-audit/). Boh invited an invoice (Huntsman £200 + iwholesales audit). 3 pilot pages still unpushed. Decisions pending from Sunny: push-now-vs-hold, Huntsman access type, 7-topic extraction.
