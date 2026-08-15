// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // "/" is English, "/es/" is Spanish.
      prefixDefaultLocale: false,
    },
  },

  // Self-hosted, subset and preloaded at build time. `latin-ext` covers the
  // accented characters in the Spanish copy (Medellín, Ingenierías, ...).
  fonts: [
    {
      // Free, OFL, geometric — stands in for the commercially licensed
      // Futura PT the old site self-hosted. Aliased to --font-heading in
      // src/styles/global.css, so swapping it back is a one-line change.
      name: 'Jost',
      cssVariable: '--font-jost',
      provider: fontProviders.google(),
      weights: [500, 600, 900],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Josefin Sans',
      cssVariable: '--font-josefin',
      provider: fontProviders.google(),
      weights: [300, 400, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  image: {
    // The comic panels are line art on flat colour: they stay crisp far below
    // their 1024px source and shrink enormously as AVIF/WebP.
    responsiveStyles: true,
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-CO' },
      },
      /*
       * The integration pairs locales by matching path suffixes, so it links
       * `/` ↔ `/es/` but cannot pair `/projects/x` with `/es/proyectos/x` —
       * the segments are translated. Every page also emits its own
       * `<link rel="alternate" hreflang>` from src/components/seo/BaseHead.astro,
       * which is the signal search engines act on, so the pairing gap in the
       * sitemap costs nothing.
       */
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
