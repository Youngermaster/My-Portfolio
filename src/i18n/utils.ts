/**
 * Helpers shared by every localized component.
 */
import { ui, DEFAULT_LOCALE, LOCALES, type Locale, type UIKey } from './ui';

export { DEFAULT_LOCALE, LOCALES };
export type { Locale, UIKey };

/**
 * Translator bound to a locale.
 *
 * `UIKey` is exhaustive, so `t('nav.abut')` fails to compile rather than
 * rendering an empty string.
 */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key];
  };
}

/** Read the locale out of a URL. Falls back to the default for unprefixed paths. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return LOCALES.includes(maybeLocale as Locale) ? (maybeLocale as Locale) : DEFAULT_LOCALE;
}

/** The other locale — with exactly two languages, "the other one" is unambiguous. */
export function otherLocale(lang: Locale): Locale {
  return lang === 'en' ? 'es' : 'en';
}

/** BCP 47 tags, used for `hreflang`, `og:locale` and the sitemap. */
export const localeTag: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-CO',
};

/** `og:locale` wants underscores, not hyphens. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_CO',
};

/**
 * Content-collection entry ids are `<locale>/<key>`. This helper and
 * `entryKey()` in src/lib/content.ts are the only places that is encoded.
 */
export function localeOfEntry(id: string): Locale {
  const [maybeLocale] = id.split('/');
  return LOCALES.includes(maybeLocale as Locale) ? (maybeLocale as Locale) : DEFAULT_LOCALE;
}

/** Filter any collection down to one language. */
export function byLocale<T extends { id: string }>(entries: T[], lang: Locale): T[] {
  return entries.filter((entry) => localeOfEntry(entry.id) === lang);
}

/**
 * Format a `YYYY-MM` string as a localized month + year.
 *
 * Dates in the content are deliberately month-precision strings rather than
 * Date objects: a job that started "Dec 2025" has no meaningful day, and
 * parsing `new Date('2025-12')` as UTC midnight would render as November in
 * timezones behind UTC.
 */
export function formatMonth(value: string, lang: Locale): string {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return value;
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(localeTag[lang], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "Dec 2025 — Present" */
export function formatRange(
  start: string,
  end: string | null,
  lang: Locale,
  presentLabel: string
): string {
  return `${formatMonth(start, lang)} — ${end ? formatMonth(end, lang) : presentLabel}`;
}

/**
 * Inclusive month span, rendered the way LinkedIn does it ("1 yr 9 mos").
 * `end` of null means "to today".
 */
export function formatDuration(start: string, end: string | null, lang: Locale): string {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  if (!sy || !sm || !ey || !em) return '';

  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const yearUnit = lang === 'es' ? (years === 1 ? 'año' : 'años') : years === 1 ? 'yr' : 'yrs';
  const monthUnit = lang === 'es' ? (rest === 1 ? 'mes' : 'meses') : rest === 1 ? 'mo' : 'mos';

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${yearUnit}`);
  if (rest > 0) parts.push(`${rest} ${monthUnit}`);
  return parts.join(' ');
}
