// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://folioweb.vercel.app',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),

  integrations: [
    sitemap({
      // Páginas que no deben aparecer en el buscador.
      filter: (page) => !page.includes('/gracias'),
    }),
  ],

  image: {
    // Genera AVIF y WebP además del formato original.
    formats: ['avif', 'webp'],
  },

  build: {
    // CSS dentro del <head>, sin hojas de estilo bloqueantes.
    inlineStylesheets: 'auto',
  },

  compressHTML: true,
});
