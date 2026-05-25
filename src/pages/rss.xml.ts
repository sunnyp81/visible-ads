import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const posts = [
    { title: 'Google Ads vs Bing Ads: Which Is Right for Your Business?', slug: 'google-ads-vs-bing-ads', date: '2024-11-15' },
    { title: 'What Is eCRO? A Complete Guide to eCommerce Conversion Rate Optimisation', slug: 'what-is-ecro', date: '2024-11-10' },
    { title: 'How Much Do Amazon Ads Cost in the UK?', slug: 'amazon-ads-cost-uk', date: '2024-11-05' },
    { title: 'PPC vs SEO: Which Should You Invest In?', slug: 'ppc-vs-seo', date: '2024-10-28' },
    { title: 'How Much Does Google Ads Cost in the UK in 2025?', slug: 'how-much-google-ads-cost-uk', date: '2024-10-20' },
  ];

  const items = posts.map(p => `
    <item>
      <title>${p.title}</title>
      <link>https://visible-ads.optimisedwebsite.com/blog/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${p.title}</description>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Visible Ads Blog</title>
    <link>https://visible-ads.optimisedwebsite.com/blog</link>
    <description>PPC, SEO, and digital advertising insights from Visible Ads</description>
    <language>en-gb</language>
    <atom:link href="https://visible-ads.optimisedwebsite.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
