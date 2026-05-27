import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const urls = [
  'https://www.visible-ads.com/post/visible-ads-delivered-exceptional-business-growth-for-sephra-europe',
  'https://www.visible-ads.com/post/case-study-food-and-beverage',
  'https://www.visible-ads.com/post/case-study-luxury-architecture-leadgen',
  'https://www.visible-ads.com/post/chatgpt-ads',
  'https://www.visible-ads.com/post/ads-in-the-age-of-ai-summaries-navigating-the-new-frontier-with-chatgpt-gemini-beyond',
  'https://www.visible-ads.com/post/meta-ads-vs-google-ads-for-e-commerce-which-reigns-supreme',
  'https://www.visible-ads.com/post/beyond-the-basics-why-a-strategic-amazon-presence-is-non-negotiable-for-modern-brands',
  'https://www.visible-ads.com/post/the-indispensable-duo-how-google-ads-and-cro-work-in-harmony-for-conversion-rate-excellence',
  'https://www.visible-ads.com/post/google-ads-a-strategic-approach-for-business-growth',
  'https://www.visible-ads.com/post/skyrocketing-airsoft-sales-how-visible-ads-supercharged-iwholesales-online-presence',
];

const outDir = 'C:\\Users\\sunny\\repos\\visible-ads\\blog-imports';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const url of urls) {
  const slug = url.split('/post/')[1];
  console.log(`Fetching: ${slug}`);

  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for Wix to render blog content
    await page.waitForTimeout(8000);

    // Extract JSON-LD for metadata
    const jsonLd = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent);
          if (data['@type'] === 'BlogPosting') return data;
        } catch {}
      }
      return null;
    });

    // Extract the blog post content from the rendered page
    const content = await page.evaluate(() => {
      // Wix blog posts typically render in a rich-content-viewer or similar container
      const selectors = [
        '[data-hook="post-description__container"]',
        '[data-hook="post-rich-content"]',
        '.post-content__container',
        '.blog-post-page-font',
        'article',
        '[class*="rich-content"]',
        '[class*="post-content"]',
        '[data-testid="post-content"]',
      ];

      let container = null;
      for (const sel of selectors) {
        container = document.querySelector(sel);
        if (container) break;
      }

      if (!container) {
        // Fallback: get all text from main content area
        const main = document.querySelector('main') || document.body;
        return { text: main.innerText, selector: 'fallback-main' };
      }

      return { text: container.innerText, selector: container.tagName + '.' + container.className?.substring(0,50) };
    });

    const title = jsonLd?.headline || 'Unknown Title';
    const author = jsonLd?.author?.name || 'Unknown';
    const datePublished = jsonLd?.datePublished ? jsonLd.datePublished.split('T')[0] : 'Unknown';
    const dateModified = jsonLd?.dateModified ? jsonLd.dateModified.split('T')[0] : datePublished;

    // Clean up the body text - remove navigation/footer noise
    let body = content.text || '';

    // Try to isolate just the post body by removing common header/footer patterns
    const lines = body.split('\n');
    let startIdx = 0;
    let endIdx = lines.length;

    // Find where the article content starts (after the title usually)
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === title.trim() || lines[i].includes(title.substring(0, 40))) {
        startIdx = i + 1;
        break;
      }
    }

    // Find where footer/nav starts
    for (let i = lines.length - 1; i > startIdx; i--) {
      const line = lines[i].trim().toLowerCase();
      if (line.includes('recent posts') || line.includes('related posts') ||
          line.includes('newsletter') || line.includes('the latest tips') ||
          line.includes('subscribe') || line === 'contact us' ||
          line.includes('visible ads') && line.includes('©')) {
        endIdx = i;
        break;
      }
    }

    const cleanBody = lines.slice(startIdx, endIdx).join('\n').trim();

    const md = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
author: "${author}"
date: "${datePublished}"
dateModified: "${dateModified}"
---

# ${title}

${cleanBody || body}
`;

    const outPath = join(outDir, `${slug}.md`);
    writeFileSync(outPath, md, 'utf8');
    console.log(`  Saved: ${outPath} (${cleanBody.length || body.length} chars body)`);

  } catch (err) {
    console.error(`  ERROR on ${slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('Done.');
