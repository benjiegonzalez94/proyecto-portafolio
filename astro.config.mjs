// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Configuración de Astro.
 *
 * IMPORTANTE — antes de publicar en internet:
 *   1. Cambia `site` por tu dominio real (con https:// y sin barra final).
 *      Se usa para el sitemap, las URLs canónicas y las etiquetas Open Graph.
 *   2. Si despliegas en GitHub Pages bajo una subcarpeta (usuario.github.io/repo),
 *      añade también `base: '/nombre-del-repo'`.
 *   3. Actualiza el mismo dominio en src/data/site.ts (campo `url`).
 *
 * Documentación: https://docs.astro.build/es/reference/configuration-reference/
 */
export default defineConfig({
  site: 'https://proyecto-portafolio-steel.vercel.app',

  // Salida 100% estática: se puede alojar gratis en Netlify, Vercel,
  // Cloudflare Pages o GitHub Pages sin necesidad de servidor Node.
  output: 'static',

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
