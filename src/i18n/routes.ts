/**
 * Localized URL segments.
 *
 * A page is identified by a stable internal key (`projects`), and each locale
 * maps that key to the segment that appears in its URL (`projects` / `proyectos`).
 * Everything else — nav links, the language switcher, hreflang alternates —
 * is derived from this map, so a route can never be localized in one place and
 * forgotten in another.
 */
import type { Locale } from './ui';

export const ROUTE_KEYS = ['home', 'projects', 'styleguide'] as const;
export type RouteKey = (typeof ROUTE_KEYS)[number];

/** Segment for each route key, per locale. An empty string means the site root. */
const segments: Record<RouteKey, Record<Locale, string>> = {
  home: { en: '', es: '' },
  projects: { en: 'projects', es: 'proyectos' },
  styleguide: { en: 'styleguide', es: 'guia-de-estilo' },
};

export function routeSegment(key: RouteKey, lang: Locale): string {
  return segments[key][lang];
}

/**
 * Build a path for a route in a given locale.
 *
 * `es` is prefixed, `en` is not (astro.config sets prefixDefaultLocale: false).
 * Trailing slashes are always present, matching the directory-style URLs Astro
 * emits and the form @astrojs/sitemap writes — so canonical, hreflang and the
 * sitemap all agree on one spelling of every URL.
 */
export function localizedPath(key: RouteKey, lang: Locale, subPath?: string): string {
  const parts = [lang === 'en' ? '' : lang, routeSegment(key, lang), subPath ?? ''].filter(Boolean);
  return parts.length === 0 ? '/' : `/${parts.join('/')}/`;
}

/** Locale-aware homepage link. */
export function homePath(lang: Locale): string {
  return localizedPath('home', lang);
}

/** `/projects` or `/es/proyectos`. */
export function projectsPath(lang: Locale): string {
  return localizedPath('projects', lang);
}

/** `/projects/olivaw-slam` or `/es/proyectos/olivaw-slam`. */
export function projectPath(lang: Locale, slug: string): string {
  return localizedPath('projects', lang, slug);
}

/** `/styleguide` or `/es/guia-de-estilo`. */
export function styleguidePath(lang: Locale): string {
  return localizedPath('styleguide', lang);
}

/**
 * Given the current route key (and optional slug), produce the equivalent path
 * in every locale. This is what lets the language switcher stay on the same
 * page instead of dumping the visitor back on the homepage — and what feeds
 * the hreflang alternates.
 */
export function alternatesFor(key: RouteKey, subPath?: string): Record<Locale, string> {
  return {
    en: localizedPath(key, 'en', subPath),
    es: localizedPath(key, 'es', subPath),
  };
}
