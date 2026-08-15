/**
 * Typed accessors for the content collections.
 *
 * Every section goes through here rather than calling `getCollection` directly,
 * so the `<locale>/<key>` id convention and the sort order live in one place.
 * If the id shape ever changes, this file is the only thing that has to know.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { byLocale, type Locale } from '../i18n/utils';

type Ordered = { data: { order: number } };

function sortByOrder<T extends Ordered>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

/** The stable cross-locale identifier — `en/olivaw-slam` → `olivaw-slam`. */
export function entryKey(id: string): string {
  const parts = id.split('/');
  return parts.length > 1 ? parts.slice(1).join('/') : id;
}

export async function getServices(lang: Locale): Promise<CollectionEntry<'services'>[]> {
  return sortByOrder(byLocale(await getCollection('services'), lang));
}

export async function getTechnologies(lang: Locale): Promise<CollectionEntry<'technologies'>[]> {
  return sortByOrder(byLocale(await getCollection('technologies'), lang));
}

export async function getExperience(lang: Locale): Promise<CollectionEntry<'experience'>[]> {
  return sortByOrder(byLocale(await getCollection('experience'), lang));
}

export async function getAwards(lang: Locale): Promise<CollectionEntry<'awards'>[]> {
  return sortByOrder(byLocale(await getCollection('awards'), lang));
}

/**
 * All projects for a locale, featured tier first, then by `order`.
 *
 * Sorting here rather than at each call site means the homepage's "top six"
 * and the full index always agree on what "first" means.
 */
export async function getProjects(lang: Locale): Promise<CollectionEntry<'projects'>[]> {
  const entries = byLocale(await getCollection('projects'), lang);
  return [...entries].sort((a, b) => {
    if (a.data.tier !== b.data.tier) return a.data.tier === 'featured' ? -1 : 1;
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return b.data.year - a.data.year;
  });
}

export async function getFeaturedProjects(
  lang: Locale,
  limit = 6
): Promise<CollectionEntry<'projects'>[]> {
  const all = await getProjects(lang);
  return all.filter((p) => p.data.tier === 'featured').slice(0, limit);
}

/** Every tag actually used by a locale's projects, in schema order. */
export async function getUsedProjectTags(lang: Locale): Promise<string[]> {
  const projects = await getProjects(lang);
  const used = new Set(projects.flatMap((p) => p.data.tags));
  return [...used];
}

/**
 * Total number of distinct positions across every company — the "roles" stat in
 * the About section. Derived rather than hardcoded, so it cannot go stale the
 * next time a job is added.
 */
export async function countRoles(lang: Locale): Promise<number> {
  const companies = await getExperience(lang);
  return companies.reduce((total, company) => total + company.data.positions.length, 0);
}

/** Earliest start month across the whole work history, as a year. */
export async function careerStartYear(lang: Locale): Promise<number> {
  const companies = await getExperience(lang);
  const years = companies.flatMap((c) => c.data.positions.map((p) => Number(p.start.slice(0, 4))));
  return years.length > 0 ? Math.min(...years) : new Date().getFullYear();
}
