# visible-ads — Project Brain

Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here. (Folds visible-ads-boh-proposal-jun9 + visible-ads-facts.)

## Current state
- Client site visible-ads.com (Boh Tjarks + Joe). Boh = referral partner who sends Sunny clients. Engagement: AI-visibility + content pilot AGREED Jun 14 2026.
- Stack: Astro 6 + Tailwind 4, tokens navy/electric/cta, Plus Jakarta + Inter. Forms → `/api/submit`.
- Repo: `sunnyp81/visible-ads` (master). Local: `C:\Users\sunny\repos\visible-ads`. Deploy: CF Pages auto-deploy from master.
- Pricing (de-salesed): pilot £350 standard / £250 partner; retainer £400 / £250/mo partner (£250 = floor; partner resells at standard, keeps margin).

## Pilot scope (agenda)
4 AEO pages + homepage sections (team-values block, "Find your path" role selector). Framework name = **PCF™ (Profit Contribution Framework)** = entity anchor (mirrors judeluxe's BOI®). About + gated Pricing Guide = retainer/add-on, NOT pilot.

## Built but NOT pushed (on disk only)
🔴 3 pilot pages + ProfitCalculator + Nav change are UNCOMMITTED on disk (verified `git status` Jun 19). Visible Ads work is NOT live yet — pending Sunny's push-now-vs-hold decision.
1. `src/pages/how-we-audit.astro` — PCF™ page (Profit-not-revenue / Contribution-first bidding / Forecast+control; 8-point checklist, 5-day process, Honesty/Integrity/Candour values, Service/FAQPage/Breadcrumb schema).
2. `src/pages/roas-vs-profit.astro` + `src/components/ProfitCalculator.astro` — THE HOOK: interactive POAS/profit calculator (spend/ROAS/margin → revenue, gross profit, profit-after-ad-spend, POAS, break-even ROAS = 1/margin) with green/amber/red verdict + email-capture lead form (`_form=profit-calculator`).
3. `src/pages/high-sku-advertising.astro` — Google Ads for large SKU catalogues; Scale/Protect/Recover/Pause tiers (tier table marked "illustrative", no fabricated stats).
Remaining: pilot page 4 (challenger/results block, Avis "We Try Harder" positioning = copy only) + homepage sections.

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
