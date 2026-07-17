# Messaging + Multi-Channel Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the homepage hero, add a new Multi-Channel Services hub page with nav restructure, add a Yo-Yo Desk case study, and expand the POAS (`/roas-vs-profit`) page — implementing the approved spec at `docs/superpowers/specs/2026-07-18-messaging-multichannel-refresh-design.md`.

**Architecture:** Static Astro 6 content site, no CMS, no test framework (no Vitest/Jest in this repo). Every task is a direct edit to `.astro` files. "Testing" in this codebase means: `npm run build` succeeds with the expected page count, and `grep` confirms the new copy landed in the built output — this replaces the unit-test cycle from the standard template, matching this repo's existing verification convention (see `CLAUDE.md`: "Build verified (N pages)").

**Tech Stack:** Astro 6.3.7, Tailwind CSS 4.1.8, static output (no adapter), CF Pages auto-deploy from `master`.

## Global Constraints

- No unit test framework exists in this repo — every task's verification step is `npm run build` (expect page count stated in the task) + `grep` for the new copy in `dist/`.
- Baseline build (verified before this plan started): **60 pages**, 0 errors.
- Copy rules: no invented client facts, no em/en dashes (repo convention per `CLAUDE.md`), UK English spelling (matches existing site copy: "optimise", "colour" etc. — check existing files for exact spelling before writing new copy).
- Colour classes must come from the existing Tailwind palette already used in this repo (`electric`, `navy`, `cta`, `slate`, `sky-tint`, plus standard Tailwind colours like `pink-500`, `cyan-500`, `amber-500`, `emerald-500`, `purple-500`, `indigo-500`, `rose-500` — all already used elsewhere in this codebase except indigo/rose, which are standard Tailwind and safe to introduce).
- Deploy: after all tasks are committed, push `master` to origin — CF Pages auto-deploys from `master` with no manual build/upload step.
- Yo-Yo Desk case study is capped by known-limited data: **only** "ROAS doubled from 2.5x to 5x" is verified. No channel names, spend figures, timeframe, or client quote may be invented (per spec section D).

---

### Task 1: Homepage hero rewrite

**Files:**
- Modify: `src/pages/index.astro:82-87`

**Interfaces:** None (leaf content change, no other file depends on this).

- [ ] **Step 1: Confirm current baseline**

Run: `grep -n "Get More Sales from the" src/pages/index.astro`
Expected: one match on line 83.

- [ ] **Step 2: Replace the H1 and subtitle**

Replace lines 82-87 in `src/pages/index.astro`:

```astro
        <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight">
          <Edit key="hero.heading">Making Ecom Ads <span class="gradient-text">Profitable</span></Edit>
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-slate leading-relaxed max-w-xl">
          <Edit key="hero.subtitle">Full-funnel, multi-channel campaigns across Google, Meta, Amazon, and Bing, built for FMCG and ecommerce brands who care about commercial outcomes, not just ROAS.</Edit>
        </p>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `60 page(s) built` (page count unchanged, this task only edits existing content), 0 errors.

Run: `grep -o "Making Ecom Ads" dist/index.html`
Expected: one match.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Rewrite homepage hero to lead with profitability + multi-channel FMCG positioning"
```

---

### Task 2: Homepage "Growth Services" subhead

**Files:**
- Modify: `src/pages/index.astro:181`

**Interfaces:** None.

- [ ] **Step 1: Confirm current baseline**

Run: `grep -n "A full-funnel approach to paid advertising" src/pages/index.astro`
Expected: one match on line 181.

- [ ] **Step 2: Replace the subhead**

Replace line 181:

```astro
      <p class="mt-4 text-lg text-slate max-w-2xl mx-auto">A full-funnel, multi-channel approach to paid advertising, measured on profit, not ROAS.</p>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `60 page(s) built`, 0 errors.

Run: `grep -o "measured on profit, not ROAS" dist/index.html`
Expected: one match.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Tie Growth Services subhead to profit/multi-channel positioning"
```

---

### Task 3: Nav restructure

**Files:**
- Modify: `src/components/Nav.astro`

**Interfaces:**
- Produces: the URL `/multi-channel-services` is now linked from the nav — Task 4 must create a page at that exact path.

- [ ] **Step 1: Confirm current baseline**

Run: `grep -n "Services" src/components/Nav.astro | head -5`
Expected: matches at line 24 (`Services` dropdown button text) and line 66 (`Services` mobile section label).

- [ ] **Step 2: Add the top-level "Multi-Channel Services" link and rename the dropdown to "By Channel" (desktop)**

In `src/components/Nav.astro`, insert a new `<a>` immediately before the `<div class="relative group">` block (before line 22):

```astro
        <a href="/multi-channel-services" class="text-sm font-medium text-gray-700 hover:text-electric transition-colors">Multi-Channel Services</a>
        <div class="relative group">
          <button class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-electric transition-colors">
            By Channel
```

(This replaces the existing `<div class="relative group">` opening and button text at lines 22-24 — the `Services` text on line 24 becomes `By Channel`; everything else in the dropdown block, lines 25-34, is unchanged.)

- [ ] **Step 3: Mirror the change in the mobile menu**

In `src/components/Nav.astro`, replace line 66:

```astro
    <a href="/multi-channel-services" class="mobile-link flex items-center px-3 py-3 text-base font-medium text-navy hover:text-electric hover:bg-sky-tint rounded-xl transition-colors">Multi-Channel Services</a>
    <p class="px-3 pt-4 pb-2 text-xs font-semibold text-slate uppercase tracking-widest">By Channel</p>
```

(The mobile menu's `<a>` elements need the `mobile-link` class so the existing close-menu script at line 141-143 still applies to it — the added link must carry that class.)

- [ ] **Step 4: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `60 page(s) built` (this task doesn't add a page yet — the link points to a page Task 4 creates), 0 errors.

Run: `grep -o "Multi-Channel Services" dist/index.html | wc -l`
Expected: `2` (nav is rendered on every page including the homepage, once in desktop nav, once in mobile nav).

Run: `grep -o "By Channel" dist/index.html | wc -l`
Expected: `2` (desktop button + mobile label).

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro
git commit -m "Add Multi-Channel Services to nav, relabel channel dropdown"
```

---

### Task 4: New Multi-Channel Services hub page

**Files:**
- Create: `src/pages/multi-channel-services.astro`

**Interfaces:**
- Consumes: `Layout` from `../layouts/Layout.astro` (props: `title`, `description`, `schema` — same signature used by every other page in this repo, e.g. `roas-vs-profit.astro:53`), `PartnerBadges` from `../components/PartnerBadges.astro` (accepts a `compact` boolean prop, used at `roas-vs-profit.astro:129`).
- Produces: the page at `/multi-channel-services`, which Task 3's nav links already point to.

- [ ] **Step 1: Create the file**

Create `src/pages/multi-channel-services.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import PartnerBadges from '../components/PartnerBadges.astro';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Multi-Channel Services | One Customer, One Profit Number",
      "description": "A full-funnel, multi-channel approach to paid advertising for FMCG and ecommerce brands, mapped across Paid Social, Search, Shopping, Amazon, and retention channels, measured on profit not ROAS.",
      "url": "https://visible-ads.com/multi-channel-services",
      "publisher": { "@type": "Organization", "name": "Visible Ads" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visible-ads.com/" },
        { "@type": "ListItem", "position": 2, "name": "Multi-Channel Services", "item": "https://visible-ads.com/multi-channel-services" }
      ]
    }
  ]
};

const journeyStages = [
  {
    number: '1',
    color: 'bg-electric shadow-electric/30',
    title: 'Awareness',
    description: 'Reach FMCG and ecommerce buyers before they start searching, through Paid Social and Display.',
    channels: [
      { name: 'Paid Social', href: '/paid-social' },
      { name: 'Display', href: '/display-advertising' },
    ],
  },
  {
    number: '2',
    color: 'bg-amber-500 shadow-amber-500/30',
    title: 'Consideration',
    description: 'Capture active search intent with Google Ads, Bing Ads, and organic visibility through SEO.',
    channels: [
      { name: 'Google Ads', href: '/google-ads' },
      { name: 'Bing Ads', href: '/bing-ads' },
      { name: 'SEO', href: '/seo' },
    ],
  },
  {
    number: '3',
    color: 'bg-purple-600 shadow-purple-600/30',
    title: 'Purchase',
    description: 'Convert at the point of purchase with Shopping, Performance Max, and Amazon marketplace campaigns.',
    channels: [
      { name: 'Google Ads', href: '/google-ads' },
      { name: 'Amazon', href: '/amazon' },
    ],
  },
  {
    number: '4',
    color: 'bg-emerald-500 shadow-emerald-500/30',
    title: 'Retention',
    description: 'Turn one-time buyers into repeat customers with retargeting and conversion rate optimisation.',
    channels: [
      { name: 'eCRO', href: '/ecro' },
      { name: 'Paid Social', href: '/paid-social' },
    ],
  },
];

const channelGrid = [
  {
    name: 'Google Ads',
    href: '/google-ads',
    color: 'border-electric',
    iconBg: 'bg-electric/15',
    iconColor: 'text-electric',
    icon: 'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
    description: 'The channel most FMCG and ecommerce journeys start or end on. Search, Shopping, and Performance Max, built to capture demand at every stage.',
  },
  {
    name: 'Paid Social',
    href: '/paid-social',
    color: 'border-pink-500',
    iconBg: 'bg-pink-500/15',
    iconColor: 'text-pink-600',
    icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.7 48.7 0 0 0 5.232-.537c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.4 48.4 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
    description: 'The awareness and retargeting layer. Meta, LinkedIn, and TikTok campaigns that put your brand in front of buyers before and after they search.',
  },
  {
    name: 'Bing Ads',
    href: '/bing-ads',
    color: 'border-cyan-500',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-600',
    icon: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25',
    description: 'Lower-cost, high-intent clicks on Microsoft\'s search network, filling the gap Google-only strategies leave on the table.',
  },
  {
    name: 'Display',
    href: '/display-advertising',
    color: 'border-indigo-500',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-600',
    icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z',
    description: 'The visual layer of the funnel. Programmatic and native display placements that stay visible across the sites your buyers actually browse.',
  },
  {
    name: 'Amazon',
    href: '/amazon',
    color: 'border-amber-500',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600',
    icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z',
    description: 'Where the FMCG purchase decision often actually happens. Sponsored Products, Brands, and DSP campaigns that meet buyers at the marketplace.',
  },
  {
    name: 'eCRO',
    href: '/ecro',
    color: 'border-emerald-500',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600',
    icon: 'M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z',
    description: 'The multiplier that makes every other channel more profitable. Landing page and funnel testing that turns more of the traffic you already pay for into buyers.',
  },
  {
    name: 'SEO',
    href: '/seo',
    color: 'border-purple-500',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-600',
    icon: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
    description: 'The compounding channel. Organic visibility that reduces reliance on paid spend for the same demand over time.',
  },
  {
    name: 'Large SKU Catalogues',
    href: '/high-sku-advertising',
    color: 'border-rose-500',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-600',
    icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z',
    description: 'The infrastructure layer for catalogues with hundreds or thousands of SKUs. Feed structure and margin segmentation that make every channel above work at scale.',
  },
];
---

<Layout
  title="Multi-Channel Services | Full-Funnel Ecommerce Advertising | Visible Ads"
  description="A full-funnel, multi-channel approach to paid advertising for FMCG and ecommerce brands. Every channel mapped to a stage of the customer journey, measured on profit, not ROAS."
  schema={schema}
>

  <!-- Hero -->
  <section class="py-20 lg:py-28 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden" data-animate>
    <div class="absolute inset-0 dot-pattern opacity-5"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="max-w-3xl mx-auto text-center">
        <span class="inline-block text-electric-light font-heading font-semibold text-sm tracking-wide uppercase mb-4">Multi-Channel Services</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">One Customer, Many Touchpoints, One Profit Number</h1>
        <p class="text-lg sm:text-xl text-slate-light leading-relaxed">Your buyers don't live in one channel. They see a social ad, search on Google, compare on Amazon, and come back for a second purchase. We plan, run, and measure that entire journey as one system, not eight disconnected accounts.</p>
      </div>
    </div>
  </section>

  <!-- The Multi-Channel Advantage -->
  <section class="py-20 lg:py-28 bg-white" data-animate>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-heading font-bold text-navy mb-6">Why single-channel silos undersell FMCG and ecommerce brands</h2>
      <p class="text-gray-700 leading-relaxed mb-5">Most agencies structure their service around the platform, not the customer. You get a Google Ads team, a separate Meta team, and separate Amazon account management, each optimising to their own channel's numbers with no shared view of the customer underneath.</p>
      <p class="text-gray-700 leading-relaxed mb-5">For FMCG and ecommerce brands, that structure misses how the purchase actually happens. A buyer discovers you on Paid Social, researches on Google, and converts on Amazon days later. Judge each channel in isolation and Paid Social looks like a cost centre with no direct sales, when it was the touchpoint that started the entire journey.</p>
      <p class="text-gray-700 leading-relaxed">We plan every channel against the stage of the journey it actually serves, and we measure the whole system on one number: profit. Not each channel's individual ROAS in isolation.</p>
    </div>
  </section>

  <!-- Customer journey map -->
  <section class="bg-sky-tint" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div class="text-center mb-14">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-navy">The Full-Funnel Journey</h2>
        <p class="mt-4 text-lg text-slate max-w-2xl mx-auto">Four stages, each served by a different combination of channels.</p>
      </div>
      <div class="relative">
        <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-electric via-electric-light to-electric"></div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {journeyStages.map((stage) => (
            <div class="text-center relative">
              <div class={`w-20 h-20 rounded-full text-white flex items-center justify-center text-2xl font-heading font-extrabold mx-auto relative z-10 shadow-lg ${stage.color}`}>{stage.number}</div>
              <h3 class="font-heading text-xl font-bold text-navy mt-6 mb-3">{stage.title}</h3>
              <p class="text-slate text-sm leading-relaxed mb-4">{stage.description}</p>
              <div class="flex flex-wrap justify-center gap-2">
                {stage.channels.map((c) => (
                  <a href={c.href} class="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs font-semibold text-electric hover:bg-electric hover:text-white transition-colors border border-electric/20">{c.name}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <!-- Channel grid -->
  <section class="bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div class="text-center mb-14">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-navy">Every Channel, One Coordinated Strategy</h2>
        <p class="mt-4 text-lg text-slate max-w-2xl mx-auto">Click through to see how we run each channel, and how it plays its part in the full-funnel journey.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {channelGrid.map((c) => (
          <a href={c.href} class={`group bg-white rounded-2xl p-8 shadow-md border border-gray-100 border-t-4 ${c.color} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}>
            <div class={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center mb-6`}>
              <svg class={`w-7 h-7 ${c.iconColor}`} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={c.icon}/></svg>
            </div>
            <h3 class="font-heading text-lg font-bold text-navy mb-3">{c.name}</h3>
            <p class="text-slate text-sm leading-relaxed mb-4">{c.description}</p>
            <span class="text-electric font-semibold text-sm underline underline-offset-2">Learn More &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- POAS tie-in -->
  <section class="bg-gradient-to-b from-electric/5 to-transparent" data-animate>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
      <h2 class="font-heading text-3xl sm:text-4xl font-bold text-navy mb-6">Measured on Profit, Not Channel ROAS</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">A channel-by-channel ROAS report can look healthy while the business underneath loses money. We roll every channel's numbers up into one profit-on-ad-spend view, so budget goes where it actually makes you money, not just where the dashboard looks best.</p>
      <a href="/roas-vs-profit" class="inline-flex items-center justify-center px-8 py-4 bg-cta hover:bg-electric text-white font-heading font-bold text-lg rounded-xl shadow-lg shadow-cta/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        See ROAS vs Profit
        <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
      </a>
    </div>
  </section>

  <!-- Proof -->
  <section class="py-16 lg:py-20 bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PartnerBadges compact />
      <div class="mt-14 text-center">
        <span class="inline-block px-4 py-1.5 bg-electric/10 text-electric text-sm font-semibold rounded-full mb-4">Multi-Channel in Practice</span>
        <h3 class="text-2xl font-heading font-bold text-navy mb-3">Sephra Europe: Google, Shopping, Display, Bing, and Amazon, run as one strategy</h3>
        <p class="text-gray-700 max-w-2xl mx-auto mb-6">A unified measurement framework and cross-channel budget optimisation drove £5.1M in attributable revenue growth.</p>
        <a href="/case-studies/sephra" class="text-electric font-semibold hover:underline">Read the Sephra case study &rarr;</a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-navy" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
      <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Ready for a Coordinated Multi-Channel Strategy?</h2>
      <p class="mt-6 text-lg sm:text-xl text-slate-light max-w-2xl mx-auto leading-relaxed">Get a free, no-obligation audit across your channels, and see where the customer journey is leaking budget.</p>
      <div class="mt-10">
        <a href="/free-ads-audit" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white text-navy font-heading font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:bg-gray-50">
          Get My Free Ads Audit
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
        </a>
      </div>
    </div>
  </section>

</Layout>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `61 page(s) built` (one new page), 0 errors.

Run: `test -f dist/multi-channel-services/index.html && echo FOUND`
Expected: `FOUND`

Run: `grep -o "One Customer, Many Touchpoints" dist/multi-channel-services/index.html`
Expected: one match.

- [ ] **Step 3: Verify every link on the rendered page resolves**

The channel grid and journey-map links are built from JS object properties (`href: '/paid-social'`) and rendered dynamically via `href={c.href}`, so grepping the `.astro` source for a literal `href="..."` pattern won't catch them — check the built HTML output instead, which has every link resolved to a real attribute:

Run: `grep -oE 'href="/[a-z/-]+"' dist/multi-channel-services/index.html | sort -u`
Expected output should include exactly this set (cross-check each against an existing `src/pages/*.astro` file to confirm it exists — all 8 channel pages plus the two extra links already existed before this plan; there will also be `href="/"` from the logo and nav items, which is expected and not part of this check):
```
href="/amazon"
href="/bing-ads"
href="/case-studies/sephra"
href="/display-advertising"
href="/ecro"
href="/free-ads-audit"
href="/google-ads"
href="/high-sku-advertising"
href="/paid-social"
href="/roas-vs-profit"
href="/seo"
```

Run: `test -f src/pages/case-studies/sephra.astro && echo FOUND`
Expected: `FOUND`

- [ ] **Step 4: Commit**

```bash
git add src/pages/multi-channel-services.astro
git commit -m "Add Multi-Channel Services hub page"
```

---

### Task 5: Yo-Yo Desk case study

**Files:**
- Modify: `src/pages/case-studies.astro` (add array entry, pattern at lines 29-74)
- Create: `src/pages/case-studies/yo-yo-desk.astro`

**Interfaces:**
- Consumes: `Layout`, `CountUp` from `../../components/CountUp.astro` (props: `value`, `prefix`, `suffix`, `label` — signature used at `case-studies/cfw.astro:67-70`).
- Produces: `/case-studies/yo-yo-desk`, linked from the new array entry in `case-studies.astro`.

- [ ] **Step 1: Confirm current baseline**

Run: `grep -n "slug: 'sephra'" src/pages/case-studies.astro`
Expected: one match, confirming the array's last entry (insertion point).

- [ ] **Step 2: Add the array entry**

In `src/pages/case-studies.astro`, insert this object after the `sephra` entry (after line 73, before the closing `];` on line 74):

```astro
  {
    slug: 'yo-yo-desk',
    title: 'Yo-Yo Desk',
    subtitle: 'Doubling Return on Ad Spend',
    channels: 'Paid Advertising',
    metric: '5x',
    metricLabel: 'ROAS (from 2.5x)',
    industry: 'Office Furniture',
    description: 'Yo-Yo Desk came to us running at a 2.5x ROAS. We restructured their account management and doubled it to 5x, turning their advertising into a channel worth scaling rather than one that just about broke even.',
    color: 'from-electric to-rose-500',
  },
```

- [ ] **Step 3: Create the detail page**

Create `src/pages/case-studies/yo-yo-desk.astro`. This is intentionally shorter than `cfw.astro` — no Challenge/Strategy/Results-grid/testimonial sections, because only the headline ROAS figure is verified:

```astro
---
import Layout from '../../layouts/Layout.astro';
import CountUp from '../../components/CountUp.astro';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Yo-Yo Desk Case Study, Doubling Return on Ad Spend",
      "description": "How Visible Ads doubled Yo-Yo Desk's return on ad spend from 2.5x to 5x.",
      "datePublished": "2026-07-18",
      "dateModified": "2026-07-18",
      "author": { "@type": "Organization", "name": "Visible Ads", "url": "https://visible-ads.com" },
      "publisher": { "@type": "Organization", "name": "Visible Ads", "url": "https://visible-ads.com" },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://visible-ads.com/case-studies/yo-yo-desk" },
      "about": { "@type": "Organization", "name": "Yo-Yo Desk" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visible-ads.com/" },
        { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://visible-ads.com/case-studies" },
        { "@type": "ListItem", "position": 3, "name": "Yo-Yo Desk", "item": "https://visible-ads.com/case-studies/yo-yo-desk" }
      ]
    }
  ]
};
---

<Layout title="Yo-Yo Desk Case Study, Doubling ROAS | Visible Ads" description="How Visible Ads doubled Yo-Yo Desk's return on ad spend from 2.5x to 5x." schema={schema}>

  <section class="relative py-20 lg:py-28 overflow-hidden" data-animate>
    <div class="absolute inset-0 bg-gradient-to-br from-navy to-navy-light"></div>
    <div class="absolute inset-0 dot-pattern opacity-10"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-slate-light mb-8">
        <a href="/" class="hover:text-white transition-colors">Home</a>
        <span class="mx-2">/</span>
        <a href="/case-studies" class="hover:text-white transition-colors">Case Studies</a>
        <span class="mx-2">/</span>
        <span class="text-white">Yo-Yo Desk</span>
      </nav>
      <span class="inline-block px-4 py-1.5 bg-electric/20 text-electric-light text-sm font-medium rounded-full mb-6">Office Furniture</span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight mb-6">Doubling Return on Ad Spend, From 2.5x to 5x</h1>
      <p class="text-lg sm:text-xl text-slate-light max-w-3xl leading-relaxed">Yo-Yo Desk's advertising was running at a 2.5x ROAS, just about covering its costs. We took over account management and doubled that return to 5x.</p>
    </div>
  </section>

  <section class="py-16 lg:py-20 bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <CountUp value="5" suffix="x" label="ROAS (from 2.5x)" />
        <CountUp value="2" suffix="x" label="Improvement" />
      </div>
    </div>
  </section>

  <section class="py-20 lg:py-28 bg-sky-tint" data-animate>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-lg text-gray-700 leading-relaxed">Yo-Yo Desk is one of the brands we work with. As the partnership develops, we'll add the fuller story here, including the specific channels and strategy behind the result.</p>
    </div>
  </section>

  <section class="py-16 lg:py-20 bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-navy text-center mb-10">Related Case Studies</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <a href="/case-studies/cfw" class="group bg-sky-tint rounded-2xl p-6 hover:shadow-lg transition-all">
          <span class="text-xs font-semibold text-electric uppercase tracking-wide">Food & Beverage</span>
          <h3 class="text-lg font-heading font-bold text-navy mt-2 mb-2 group-hover:text-electric transition-colors">CFW</h3>
          <p class="text-sm text-gray-700">1,165% all-time ROAS through Google Ads.</p>
        </a>
        <a href="/case-studies/iwholesales" class="group bg-sky-tint rounded-2xl p-6 hover:shadow-lg transition-all">
          <span class="text-xs font-semibold text-electric uppercase tracking-wide">eCommerce</span>
          <h3 class="text-lg font-heading font-bold text-navy mt-2 mb-2 group-hover:text-electric transition-colors">iWholesales</h3>
          <p class="text-sm text-gray-700">450% sales growth in a competitive niche market.</p>
        </a>
        <a href="/case-studies/sephra" class="group bg-sky-tint rounded-2xl p-6 hover:shadow-lg transition-all">
          <span class="text-xs font-semibold text-electric uppercase tracking-wide">Food & Beverage</span>
          <h3 class="text-lg font-heading font-bold text-navy mt-2 mb-2 group-hover:text-electric transition-colors">Sephra Europe</h3>
          <p class="text-sm text-gray-700">£5.1M additional revenue through multi-channel advertising.</p>
        </a>
      </div>
    </div>
  </section>

  <section class="py-20 lg:py-28 bg-navy" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">Ready for Results Like These?</h2>
      <p class="text-lg text-slate-light mb-8 max-w-2xl mx-auto">Get a free, no-obligation audit of your advertising accounts. We'll show you exactly where the opportunities are.</p>
      <a href="/free-ads-audit" class="w-full sm:w-auto inline-flex items-center justify-center bg-cta text-white font-semibold px-10 py-4 rounded-xl hover:bg-electric transition-colors text-lg">Get Your Free Ads Audit</a>
    </div>
  </section>

</Layout>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `62 page(s) built` (case-studies.astro doesn't add a page, yo-yo-desk.astro does), 0 errors.

Run: `test -f dist/case-studies/yo-yo-desk/index.html && echo FOUND`
Expected: `FOUND`

Run: `grep -o "2.5x to 5x" dist/case-studies/index.html`
Expected: one match (confirms the card renders on the listing page).

- [ ] **Step 5: Commit**

```bash
git add src/pages/case-studies.astro src/pages/case-studies/yo-yo-desk.astro
git commit -m "Add Yo-Yo Desk case study (metric-only, pending fuller client data)"
```

---

### Task 6: POAS page expansion

**Files:**
- Modify: `src/pages/roas-vs-profit.astro`

**Interfaces:** None (leaf content change).

- [ ] **Step 1: Confirm current baseline**

Run: `grep -n "The difference, in plain terms\|The ROAS you actually need\|We find this in your real account" src/pages/roas-vs-profit.astro`
Expected: three matches, confirming the three section headings this task inserts around.

- [ ] **Step 2: Insert "Signs your ROAS is lying to you" and "A worked example" between the explainer and the break-even table**

In `src/pages/roas-vs-profit.astro`, insert the following two `<section>` blocks immediately after line 83 (`</section>`, the closing tag of "The difference, in plain terms") and before line 86 (`<!-- Break-even table -->`):

```astro
  <!-- Symptoms -->
  <section class="py-20 lg:py-28 bg-gray-50" data-animate>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-heading font-bold text-navy mb-4">Signs your ROAS is lying to you</h2>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">A healthy-looking ROAS can hide a business that is losing money. These are the usual signs.</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-electric">
          <h3 class="font-heading text-lg font-bold text-navy mb-3">Your bank balance doesn't move</h3>
          <p class="text-gray-700 text-sm leading-relaxed">Revenue is up on the dashboard, but the money in the account tells a different story.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-amber-500">
          <h3 class="font-heading text-lg font-bold text-navy mb-3">Margins shrink as you scale</h3>
          <p class="text-gray-700 text-sm leading-relaxed">Every extra pound of spend chases lower-margin sales, quietly diluting the average.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-purple-600">
          <h3 class="font-heading text-lg font-bold text-navy mb-3">Your best-looking SKUs aren't your best-earning ones</h3>
          <p class="text-gray-700 text-sm leading-relaxed">High-revenue products can carry the thinnest margins in the whole catalogue.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-emerald-500">
          <h3 class="font-heading text-lg font-bold text-navy mb-3">Returns eat the profit after the sale</h3>
          <p class="text-gray-700 text-sm leading-relaxed">ROAS is calculated at the point of sale. Profit isn't decided until the return window closes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Worked example -->
  <section class="py-20 lg:py-28 bg-white" data-animate>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-heading font-bold text-navy mb-6">A worked example</h2>
      <p class="text-gray-700 leading-relaxed mb-5">Say a £25,000-a-month account is running at a 4x ROAS. On the dashboard, that looks strong. But the products driving that revenue carry a 22% gross margin, which puts break-even ROAS at 4.55x.</p>
      <div class="grid sm:grid-cols-2 gap-6 my-8">
        <div class="bg-sky-tint rounded-2xl p-6">
          <p class="text-sm font-semibold text-slate uppercase tracking-wide mb-2">What the dashboard shows</p>
          <p class="text-3xl font-heading font-extrabold text-navy mb-1">4x ROAS</p>
          <p class="text-sm text-gray-700">£25,000 spend, £100,000 revenue</p>
        </div>
        <div class="bg-navy rounded-2xl p-6">
          <p class="text-sm font-semibold text-slate-light uppercase tracking-wide mb-2">What the P&L shows</p>
          <p class="text-3xl font-heading font-extrabold text-white mb-1">-£3,000</p>
          <p class="text-sm text-slate-light">£22,000 gross profit, minus £25,000 ad spend</p>
        </div>
      </div>
      <p class="text-gray-700 leading-relaxed">A 4x ROAS reads as a win. The account is actually running at a loss, because it sits below its own break-even ROAS. This is the exact gap a profit audit is built to catch.</p>
    </div>
  </section>

```

- [ ] **Step 3: Insert "How we get you from ROAS to POAS" between the break-even table and the CTA band**

In `src/pages/roas-vs-profit.astro`, insert the following `<section>` block immediately after the break-even table section's closing `</section>` (originally line 112) and before the `<!-- CTA band -->` comment (originally line 114):

```astro
  <!-- Methodology -->
  <section class="py-20 lg:py-28 bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-navy">How We Get You From ROAS to POAS</h2>
        <p class="mt-4 text-lg text-slate max-w-2xl mx-auto">A four-step process that replaces vanity ROAS with a number tied to your real P&L.</p>
      </div>
      <div class="relative">
        <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-electric via-electric-light to-electric"></div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <div class="text-center relative">
            <div class="w-20 h-20 rounded-full bg-electric text-white flex items-center justify-center text-2xl font-heading font-extrabold mx-auto relative z-10 shadow-lg shadow-electric/30">1</div>
            <h3 class="font-heading text-xl font-bold text-navy mt-6 mb-3">Map Margins</h3>
            <p class="text-slate text-sm leading-relaxed">We map true product or category-level margins across your catalogue, not one blended figure.</p>
          </div>
          <div class="text-center relative">
            <div class="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-heading font-extrabold mx-auto relative z-10 shadow-lg shadow-amber-500/30">2</div>
            <h3 class="font-heading text-xl font-bold text-navy mt-6 mb-3">Rebuild Bidding to Profit</h3>
            <p class="text-slate text-sm leading-relaxed">Bid strategy gets rebuilt around margin-weighted targets, not a single blanket ROAS goal.</p>
          </div>
          <div class="text-center relative">
            <div class="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-heading font-extrabold mx-auto relative z-10 shadow-lg shadow-purple-600/30">3</div>
            <h3 class="font-heading text-xl font-bold text-navy mt-6 mb-3">Segment by Profitability</h3>
            <p class="text-slate text-sm leading-relaxed">High-margin SKUs and low-margin loss-leaders get separated, so budget follows profit, not volume.</p>
          </div>
          <div class="text-center relative">
            <div class="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-heading font-extrabold mx-auto relative z-10 shadow-lg shadow-emerald-500/30">4</div>
            <h3 class="font-heading text-xl font-bold text-navy mt-6 mb-3">Report on POAS</h3>
            <p class="text-slate text-sm leading-relaxed">Vanity ROAS reporting gets replaced with a profit-first dashboard tied to your real P&L.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

```

- [ ] **Step 4: Expand the FAQ (both the `faqs` array and the JSON-LD schema)**

In `src/pages/roas-vs-profit.astro`, replace the `faqs` array (lines 45-50) with:

```javascript
const faqs = [
  { question: 'What is the difference between ROAS and profit?', answer: 'ROAS (return on ad spend) is revenue divided by ad spend. It ignores the cost of your products. Profit is what is left after both product cost and ad spend. A 4x ROAS sounds healthy, but if your gross margin is 25%, you need a 4x ROAS just to break even, so you make nothing.' },
  { question: 'What is break-even ROAS?', answer: 'Break-even ROAS is 1 divided by your gross margin. At a 25% margin it is 4x, at 40% it is 2.5x, at 50% it is 2x. Below that number, every extra pound of ad spend loses money. Above it, you are in profit.' },
  { question: 'What is POAS?', answer: 'POAS (profit on ad spend) is gross profit divided by ad spend, rather than revenue divided by ad spend. It tells you how much actual profit each pound of spend returns, which is the number that matters for the business.' },
  { question: 'Why do agencies report ROAS instead of profit?', answer: 'ROAS is easy to pull from the Google Ads dashboard and it usually looks impressive. Profit needs your margins and your P&L, which takes more work and is harder to flatter. We optimise to profit, not ROAS, because ROAS does not pay your bills.' },
  { question: 'Does POAS work for low-margin businesses?', answer: 'Yes, and it matters more there. Thin margins mean the gap between a break-even ROAS and a genuinely profitable one is small, so a POAS-first approach is what stops those campaigns quietly draining cash.' },
  { question: 'How long does it take to move from ROAS to POAS reporting?', answer: 'Most accounts can have SKU-level margin data mapped and a first margin-weighted bidding pass live within a few weeks, once we have accurate cost and margin data from you. A full rebuild timeline depends on catalogue size.' },
  { question: 'What data do you need from me to calculate POAS?', answer: 'At minimum, cost of goods sold or gross margin per product or category, plus any other true costs you want reflected, such as marketplace fees or return rates. The more granular the margin data, the more accurate the profit picture.' },
];
```

Replace the `FAQPage` `mainEntity` array in the `schema` object (lines 18-24) with the matching seven entries:

```javascript
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the difference between ROAS and profit?", "acceptedAnswer": { "@type": "Answer", "text": "ROAS (return on ad spend) is revenue divided by ad spend. It ignores the cost of your products. Profit is what is left after both product cost and ad spend. A 4x ROAS sounds healthy, but if your gross margin is 25%, you need a 4x ROAS just to break even, so you make nothing." } },
        { "@type": "Question", "name": "What is break-even ROAS?", "acceptedAnswer": { "@type": "Answer", "text": "Break-even ROAS is 1 divided by your gross margin. At a 25% margin it is 4x, at 40% it is 2.5x, at 50% it is 2x. Below that number, every extra pound of ad spend loses money. Above it, you are in profit." } },
        { "@type": "Question", "name": "What is POAS?", "acceptedAnswer": { "@type": "Answer", "text": "POAS (profit on ad spend) is gross profit divided by ad spend, rather than revenue divided by ad spend. It tells you how much actual profit each pound of spend returns, which is the number that matters for the business." } },
        { "@type": "Question", "name": "Why do agencies report ROAS instead of profit?", "acceptedAnswer": { "@type": "Answer", "text": "ROAS is easy to pull from the Google Ads dashboard and it usually looks impressive. Profit needs your margins and your P&L, which takes more work and is harder to flatter. We optimise to profit, not ROAS, because ROAS does not pay your bills." } },
        { "@type": "Question", "name": "Does POAS work for low-margin businesses?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, and it matters more there. Thin margins mean the gap between a break-even ROAS and a genuinely profitable one is small, so a POAS-first approach is what stops those campaigns quietly draining cash." } },
        { "@type": "Question", "name": "How long does it take to move from ROAS to POAS reporting?", "acceptedAnswer": { "@type": "Answer", "text": "Most accounts can have SKU-level margin data mapped and a first margin-weighted bidding pass live within a few weeks, once we have accurate cost and margin data from you. A full rebuild timeline depends on catalogue size." } },
        { "@type": "Question", "name": "What data do you need from me to calculate POAS?", "acceptedAnswer": { "@type": "Answer", "text": "At minimum, cost of goods sold or gross margin per product or category, plus any other true costs you want reflected, such as marketplace fees or return rates. The more granular the margin data, the more accurate the profit picture." } }
      ]
    },
```

- [ ] **Step 5: Build and verify**

Run: `npm run build 2>&1 | tail -5`
Expected: `62 page(s) built` (no new page in this task, count stays at Task 5's total), 0 errors.

Run: `grep -o "Signs your ROAS is lying to you" dist/roas-vs-profit/index.html`
Expected: one match.

Run: `grep -o "How We Get You From ROAS to POAS" dist/roas-vs-profit/index.html`
Expected: one match.

Run: `grep -o "What data do you need from me to calculate POAS?" dist/roas-vs-profit/index.html | wc -l`
Expected: `2` (appears once in the visible FAQ accordion, once in the JSON-LD schema block).

- [ ] **Step 6: Commit**

```bash
git add src/pages/roas-vs-profit.astro
git commit -m "Expand POAS page with symptoms, worked example, methodology, and FAQ"
```

---

### Task 7: Final verification and deploy

**Files:** None (verification + deploy only).

- [ ] **Step 1: Full clean build**

Run: `npm run build 2>&1 | tail -10`
Expected: `62 page(s) built`, 0 errors.

- [ ] **Step 2: Spot-check every new/changed page renders without console errors**

Run local preview: `npm run preview` (leave running), then use the `claude-in-chrome` or `playwright` MCP tools to visit and screenshot:
- `/` — confirm new hero headline visible, no console errors
- `/multi-channel-services` — confirm page loads, all channel cards clickable, no console errors
- `/case-studies/yo-yo-desk` — confirm page loads, no console errors
- `/roas-vs-profit` — confirm new sections render in order, FAQ accordion still expands/collapses, no console errors
- `/case-studies` — confirm Yo-Yo Desk card appears in the grid

Stop the preview server after checking.

- [ ] **Step 3: Push and deploy**

```bash
git push origin master
```

CF Pages auto-deploys from `master` — no manual build/upload step. Confirm the deploy by checking the CF Pages dashboard or waiting ~1-2 minutes and re-checking `https://visible-ads.com/multi-channel-services` returns 200.

- [ ] **Step 4: Update the repo brain**

Append a dated entry to `CLAUDE.md` (top of the file, matching the existing entry style) summarising: hero rewrite, new `/multi-channel-services` page, nav restructure, Yo-Yo Desk case study (flag as metric-only pending fuller data), POAS page expansion. Include "Build verified (62 pages)" per the repo's existing convention.

```bash
git add CLAUDE.md
git commit -m "Log messaging + multi-channel refresh in repo brain"
git push origin master
```
