import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://visible-ads.optimisedwebsite.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
