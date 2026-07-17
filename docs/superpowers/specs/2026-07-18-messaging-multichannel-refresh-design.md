# Visible Ads: Messaging + Multi-Channel Refresh

Date: 2026-07-18
Status: Approved, ready for implementation plan

## Context

Visible Ads' two differentiators are **POAS (profit-over-ROAS)** and **multi-channel + FMCG focus**, but the site under-represents both:
homepage hero is generic revenue copy, nav is siloed by individual ad channel with no page tying them together, and the POAS
explainer page (`/roas-vs-profit`) is thin next to comparable competitor content (e.g. judeluxe.com's POAS hub).

Scope for this pass, agreed with Sunny:
- Homepage hero + subheadline rewrite (no section reorder — "Sound Familiar?" already sits directly below the hero)
- New `/multi-channel-services` hub page, nav restructured so it sits above the per-channel dropdown
- Differentiator emphasis limited to homepage + new hub page + POAS page (individual channel pages get a lighter follow-up pass later, out of scope here)
- Yo-Yo Desk case study, minimal verified data only (2.5x → 5x ROAS) — no invented spend figures, timeframe, or quotes
- POAS page (`/roas-vs-profit`) expanded with a Symptoms section, a clearly-labeled hypothetical worked example, and a methodology section, modeled structurally on judeluxe.com/hubs/fixing-low-poas but without borrowing any of their claims/data

## A. Homepage hero (`src/pages/index.astro:82-87`)

- H1 (line 83): replace `Get More Sales from the <span class="gradient-text">Same Ad Spend</span>` with `Making Ecom Ads Profitable` (gradient span moves to "Profitable" or is dropped — implementer's call for visual balance).
- Subtitle (line 86): replace with `Full-funnel, multi-channel campaigns across Google, Meta, Amazon, and Bing — built for FMCG and ecommerce brands who care about commercial outcomes, not just ROAS.`
- No other hero markup changes. `Edit` component keys (`hero.heading`, `hero.subtitle`) stay as-is.

## B. Nav restructure + new hub page

### Nav changes (`src/components/Nav.astro`)
- Add a new top-level link **"Multi-Channel Services"** → `/multi-channel-services`, positioned immediately before the "Services" dropdown trigger, in both desktop nav (before line 22) and mobile menu (before line 66's Services block, or as its own top mobile-menu item above the Services list).
- Rename dropdown label from "Services" to **"By Channel"** (text change only, same `services` array/hrefs, lines 2-11).

### New page: `src/pages/multi-channel-services.astro`
Follows the existing page pattern (Layout + schema graph with WebPage + BreadcrumbList, matching `roas-vs-profit.astro`'s schema style). Sections in order:

1. **Hero** — headline framing the multi-touchpoint customer journey (e.g. "One Customer, Many Touchpoints — One Profit Number"), subheadline reinforcing POAS + FMCG focus.
2. **The Multi-Channel Advantage** — explainer: why single-channel silos undersell FMCG/ecom buyers who touch multiple platforms before buying. 2-3 paragraphs, same voice as `roas-vs-profit.astro`'s "plain terms" section.
3. **Customer journey map** — 4-stage visual (reuse the numbered-circle pattern from the homepage Blueprint section, `index.astro:247-271`, as a structural template, not copy): Awareness (Paid Social/Display) → Consideration (Search/SEO) → Purchase (Shopping/Amazon) → Retention (Retargeting/eCRO). Each stage links to its corresponding existing channel page.
4. **Channel grid** — reuse the 8 existing channel cards from the homepage "Growth Services" section (`index.astro:183-235`) as a structural/visual template, but rewrite each card's copy to frame it as "how this channel plays its part in the full-funnel journey" rather than a standalone service.
5. **POAS tie-in** — short section: "We optimise the whole journey to profit, not each channel's ROAS in isolation." Links to `/roas-vs-profit`.
6. **Proof** — `<PartnerBadges compact />`, plus a callout to the Sephra case study (already tagged "Multi-channel" in `case-studies.astro`).
7. **CTA** — "Book a Profit Audit" band, same pattern as other pages' closing CTA sections.

## C. Differentiator emphasis (scoped)

- Homepage "Growth Services That Drive Revenue" subhead (`index.astro:181`): change `A full-funnel approach to paid advertising across every channel that matters.` → `A full-funnel, multi-channel approach to paid advertising, measured on profit, not ROAS.`
- No other homepage copy changes in this pass.
- New hub page and POAS page carry the rest of the differentiator emphasis (sections B and E).

## D. Yo-Yo Desk case study

- Add entry to the `caseStudies` array in `src/pages/case-studies.astro` (pattern at lines 29-74):
  ```
  {
    slug: 'yo-yo-desk',
    title: 'Yo-Yo Desk',
    subtitle: 'Doubling Return on Ad Spend',
    channels: '[fill in — needs confirmation]',
    metric: '5x',
    metricLabel: 'ROAS (from 2.5x)',
    industry: '[fill in — needs confirmation]',
    description: '[short, metric-only — no invented spend/timeframe/quotes]',
    color: '[pick unused gradient]',
  }
  ```
- New `src/pages/case-studies/yo-yo-desk.astro`, mirroring `cfw.astro`'s structure (hero, stats row, challenge, strategy, results, related case studies, CTA) but every section kept short and generic where real detail isn't available — no fabricated challenge narrative, strategy steps, spend figures, or client quote.
- **Known gap**: this will read thinner than CFW/Sephra, which have real £ and channel detail. Flagged to Sunny as a known limitation of this pass; can be fleshed out once real figures/industry/timeframe are provided.

## E. POAS page expansion (`src/pages/roas-vs-profit.astro`)

Structural reference: judeluxe.com/hubs/fixing-low-poas's depth-building pattern (problem → example → methodology → proof → FAQ). Content is original — no claims, data, or copy borrowed from that page.

Insert order (existing sections in parentheses stay where they are):
1. (Hero — unchanged)
2. (Calculator — unchanged)
3. (Explainer "The difference, in plain terms" — unchanged)
4. **NEW: "Signs your ROAS is lying to you"** — 4 generic, non-client-specific warning signs (e.g. flat bank balance despite healthy ROAS, margin compression while scaling, high-revenue/low-profit SKUs, cash erosion from returns). Educational, not a claim about any specific business.
5. **NEW: "A worked example"** — clearly labeled as illustrative/hypothetical (e.g. "Say a £25k/month account..."), not attributed to a real client. Shows dashboard ROAS vs. real P&L profit side by side.
6. (Break-even table — unchanged)
7. **NEW: "How we get you from ROAS to POAS"** — 4-step methodology section (numbered-circle pattern, distinct wording from the homepage Blueprint's Discover/Strategise/Execute/Optimise so it doesn't read as a duplicate).
8. (CTA band — unchanged)
9. (Proof — unchanged)
10. (FAQ — expand from 4 to 6-7 questions, following the existing question/answer pattern at lines 45-50 and 137-149, both in the `faqs` array and the JSON-LD `FAQPage` schema at lines 17-24)

## Out of scope for this pass

- Individual channel pages (Google Ads, Bing Ads, Paid Social, Display, Amazon, eCRO, SEO, High-SKU) — differentiator emphasis follow-up, separate spec
- Awards/PartnerBadges section split-out — confirmed not needed, hero+awards already sit directly above "Sound Familiar?"
- Full Yo-Yo Desk narrative detail — pending real client figures from Sunny
