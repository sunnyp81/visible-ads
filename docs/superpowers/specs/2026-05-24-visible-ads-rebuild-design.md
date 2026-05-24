# Visible Ads Website Rebuild — Design Spec

**Date:** 2026-05-24
**Client:** BOH (Visible Ads) — referred by Kingpin's uncle Nico
**Budget:** $500 favour build (referral pipeline play)
**Stack:** Astro 5 + Tailwind 4 → Cloudflare Pages via GitHub (`sunnyp81/visible-ads`)
**Domain:** visible-ads.com (existing, migrating from Wix)

---

## 1. Goals

- Replace Wix site with a fast, modern, memorable design on the same white-background palette
- Fix the CTR problem: position 1 for "google ads agency" (258 impressions, 0 clicks) — meta titles/descriptions must sell
- Establish Google Ads as the central entity, followed by Bing Ads, then SEO
- Free Ads Audit as primary conversion action
- Human-first hero featuring Boh & Joe to build instant trust

## 2. Site Map (12 pages)

| Page | Slug | Priority | Notes |
|------|------|----------|-------|
| Homepage | `/` | P0 | Hero with Boh+Joe, full funnel page |
| Google Ads | `/google-ads` | P0 | Primary service, central entity |
| Bing Ads | `/bing-ads` | P1 | Secondary service |
| SEO | `/seo` | P1 | Tertiary (funnels leads to Sunny) |
| Paid Social | `/paid-social` | P1 | Meta/social ads |
| Amazon | `/amazon` | P1 | Marketplace management |
| eCRO | `/ecro` | P1 | Conversion rate optimisation |
| Blueprint | `/blueprint` | P1 | 4-phase methodology |
| Case Studies | `/case-studies` | P0 | Dedicated section, 3-4 migrated studies |
| About | `/about` | P1 | Team, certs, story |
| Free Ads Audit | `/free-ads-audit` | P0 | Lead gen form |
| Contact | `/contact` | P2 | Basic contact info |

### Blog
Not migrated. Only 2 posts had any impressions and both were case studies (now moving to `/case-studies`). All old `/post/*` URLs get 301 redirects to the case studies page or homepage.

### Redirects
All old Wix URLs mapped 1:1 where slugs change:
- `/google-ppc` → `/google-ads`
- `/post/cfw-*` → `/case-studies`
- `/post/skyrocketing-airsoft-*` → `/case-studies`
- `/post/*` → `/` (catch-all for dead posts)
- `/news/*` → `/` (blog categories)
- `/blog` → `/`
- `/ppc` → `/google-ads`

## 3. Design Direction

### Palette
White background base. Existing Visible Ads blue elevated:
- **Primary navy:** `#0A1628` (headings, nav, footer)
- **Electric blue:** `#2563EB` (CTAs, links, accents)
- **Light blue tint:** `#EFF6FF` (alternating section backgrounds)
- **Slate grey:** `#64748B` (body text)
- **White:** `#FFFFFF` (primary background)

Exact hex values to be refined against BOH's existing logo colours during build.

### Typography
- Headings: Inter or Plus Jakarta Sans (bold, tight tracking)
- Body: Inter (regular, 16-18px base)
- Large display text in hero (48-64px desktop)

### Design Flourishes ("snazz")
- Scroll-triggered fade-up animations on section entry (subtle, 300ms)
- Gradient border accents on service cards (blue→cyan)
- Glassmorphic stat cards for case study metrics
- Subtle dot-grid pattern overlay on hero and CTA sections
- Partner badge bar with gentle opacity pulse on scroll-in
- Hover micro-interactions on cards (slight lift + shadow deepening)
- Smooth page transitions

## 4. Homepage Layout (top to bottom)

### 4.1 Navigation
- Fixed top nav, white bg with slight blur on scroll
- Logo left, nav links centre, "Get Free Audit" CTA button right
- Links: Services (dropdown), Blueprint, Case Studies, About, Contact
- Mobile: hamburger menu, full-screen overlay

### 4.2 Hero Section
- **Left:** Bold headline ("Unlock Sales Growth with Google Ads That Convert"), subheadline (1 sentence on measurable ROI), "Get My Free Ads Audit" button (electric blue, large), secondary text link "See Our Results →"
- **Right:** Joint photo of Boh & Joe (`boh-and-joe.webp`), styled with a subtle blue gradient border or rounded frame, slight shadow
- Trust line below hero: "Google Partner | Microsoft Partner | Amazon Ads Partner | UK Search Awards Winner" — small logos inline

### 4.3 Pain Points Section
Light blue tint background. 4 cards in a row:
- "How do I sell more profitably?"
- "How do I increase market share?"
- "How do I beat my competition?"
- "Am I maximising the opportunity?"
Each card links to the relevant service page. Icons or subtle illustrations per card.

### 4.4 Services Grid
Headline: "Growth Services Built Around Google Ads"
6 cards in 2x3 grid (desktop), stacked mobile:
1. **Google Ads** (hero card, larger/featured, gradient border) → `/google-ads`
2. **Bing Ads** → `/bing-ads`
3. **SEO** → `/seo`
4. **Paid Social** → `/paid-social`
5. **Amazon** → `/amazon`
6. **eCRO** → `/ecro`
Google Ads card is visually prominent (larger, different treatment).

### 4.5 Blueprint Section
White background. Headline: "The Visible Ads Blueprint"
Animated 4-phase visual (CSS animation, not GIF):
1. Discover → 2. Strategise → 3. Execute → 4. Optimise
Brief paragraph explaining continuous improvement methodology. CTA: "Learn More →" to `/blueprint`.

### 4.6 Case Studies Highlights
Light blue tint. Headline: "Real Results for Real Businesses"
2-3 featured case studies in horizontal cards:
- Client logo/name
- Key metric in large text (e.g., "340% ROAS", "+£2.1M Revenue")
- One-line summary
- "Read Case Study →" link
CTA: "View All Case Studies →" to `/case-studies`

### 4.7 Testimonials
White background. Full-length quotes (not truncated):
- Rishy Singh (iWholesales)
- David Archer (Sephra)
- Laura Irvine (Fractional Marketing Director)
Carousel or stacked cards. Name, title, company, optional headshot.

### 4.8 Final CTA Section
Navy/dark background section (contrast break). Large headline: "Ready to Scale Your Google Ads?"
"Get My Free Audit" button. Phone number. Email.

### 4.9 Footer
Navy background, white text. Columns:
- Services list (all 6 linked)
- Company (About, Blueprint, Case Studies, Contact)
- Legal (Privacy, AI Policy)
- Contact info + social (LinkedIn)
© 2026 Visible Ads. All rights reserved.

## 5. Service Page Template

Each service page follows the same structure:
1. Hero with service-specific headline + relevant subtext
2. What we do (2-3 paragraphs, specific to service)
3. Our approach (3-4 steps with icons)
4. Relevant case study callout (1 featured)
5. FAQ section (3-5 questions, collapsible)
6. CTA: "Get Your Free [Service] Audit"

Google Ads page gets extra depth: more content, more metrics, position as the flagship.

## 6. Case Studies Page

Grid of all case studies. Each card:
- Client name + industry tag
- Hero metric
- Thumbnail/logo
- "Read More →"

Individual case study pages:
- Client overview
- Challenge
- Strategy (what Visible Ads did)
- Results (metrics in stat cards: ROAS, revenue, growth %)
- Client testimonial
- CTA: "Get Similar Results →"

## 7. Technical

### SEO
- All meta titles <60 chars, descriptions <155 chars, written to maximise CTR
- JSON-LD per page: Organization, WebSite, BreadcrumbList, Service (per service page), FAQPage (where applicable)
- Canonical URLs, clean slugs
- Auto-generated sitemap via Astro
- robots.txt allowing all crawlers
- `llms.txt` for AI search visibility

### Performance
- Static site (Astro SSG), no client-side JS frameworks
- Images: WebP/AVIF with proper srcset, lazy loading below fold
- CSS: Tailwind 4 (purged, minimal bundle)
- Target: 95+ Lighthouse on all pages

### Redirects
Handled via `_redirects` file for Cloudflare Pages. All old Wix URLs covered.

### Analytics
- Google Analytics 4 (BOH to provide measurement ID)
- Google Tag Manager (if BOH uses it)

## 8. Content Migration

### From current site
- All service page copy (rewritten/tightened where needed)
- Team bios and photos (Boh, Joe, Ben, Tom)
- Blueprint methodology content
- Testimonial quotes (full versions)
- Partner/certification badges
- AI Policy page content

### Case studies to migrate
1. CFW Amazon Google Ad Strategy (has impressions)
2. Airsoft/iWholesales (has impressions)
3. Luxury Architecture Lead Gen
4. Food & Beverage (Sephra)

### Not migrated
- 15 generic blog posts (near-zero traffic, no value)
- Blog category pages

## 9. Out of Scope
- CMS/admin panel (static site, BOH provides content changes via GitHub or asks Sunny)
- E-commerce/payments
- Live chat
- Custom animations beyond CSS (no JS animation libraries)
- Blog rebuild (can add later as a phase 2 if BOH wants)
