/**
 * Content collections.
 *
 * One invariant runs through all of them: **every entry id has the shape
 * `<locale>/<key>`**, and the `key` field is identical across locales. That is
 * what makes `byLocale()` trivial and what lets the language switcher land on
 * the equivalent page rather than the homepage.
 *
 * The field is named `key`, not `slug`, because `glob()` treats frontmatter
 * `slug` as an id override — which would collapse `en/mobile.md` and
 * `es/mobile.md` onto the same entry.
 *
 * Two shapes of loader, chosen by whether the entry has prose:
 *   - Markdown via `glob()` for projects / awards / services — they have real
 *     bodies, and projects get their own detail pages.
 *   - YAML via `file()` for experience / technologies — pure structured data.
 *     One file per collection holds both locales, so 20 technologies means one
 *     file to edit rather than 40 near-empty stubs.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

/* ------------------------------------------------------------------------- *
 * Shared vocabulary
 * ------------------------------------------------------------------------- */

/** Tags a project can be filtered by. Kept small on purpose — a filter with
 *  fifteen options is a worse filter. */
export const PROJECT_TAGS = [
  'robotics',
  'security',
  'mobile',
  'web',
  'iot',
  'gaming',
  'ai',
  'devops',
  'misc',
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

const linkKind = z.enum(['repo', 'site', 'appstore', 'playstore', 'demo', 'video', 'profile']);

const link = z.object({
  label: z.string(),
  url: z.url(),
  kind: linkKind,
});

/** `YYYY-MM`. Month precision: a job that started "Dec 2025" has no meaningful
 *  day, and a Date would drag timezone bugs into a purely editorial field. */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a YYYY-MM string, e.g. 2025-12');

/**
 * Turns a `{ en: [...], es: [...] }` YAML document into flat entries whose ids
 * are `<locale>/<key>` — the same shape `glob()` produces from per-locale
 * directories, so both loader styles feed the same helpers downstream.
 */
function bilingualYaml(text: string): Record<string, unknown>[] {
  let doc: Record<string, Record<string, unknown>[]>;
  try {
    doc = parseYaml(text) as Record<string, Record<string, unknown>[]>;
  } catch (error) {
    // The loader would otherwise swallow this as "Error reading data from
    // <file>", which says nothing useful. Unquoted values containing ": " are
    // the usual cause, and the line number is the whole diagnosis.
    throw new Error(
      `Invalid YAML. Values containing ": " must be quoted.\n${(error as Error).message}`
    );
  }

  return Object.entries(doc).flatMap(([lang, items]) =>
    (items ?? []).map((item) => ({ ...item, id: `${lang}/${item.key as string}` }))
  );
}

/* ------------------------------------------------------------------------- *
 * Collections
 * ------------------------------------------------------------------------- */

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      title: z.string(),
      /** One line for the card; the markdown body is the long version. */
      blurb: z.string(),
      panel: image().optional(),
      order: z.number(),
    }),
});

const technologies = defineCollection({
  loader: file('src/content/technologies.yaml', { parser: bilingualYaml }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      name: z.string(),
      description: z.string(),
      panel: image().optional(),
      category: z.enum(['language', 'framework', 'data', 'infra', 'tooling', 'hardware', 'design']),
      order: z.number(),
    }),
});

/**
 * A company, holding one or more positions.
 *
 * The nesting is not decoration: Publicis Global Delivery, Design Systems Inno
 * and Geta Club Play each cover several roles, and flattening them would lose
 * the fact that they were promotions inside one organisation.
 */
const position = z.object({
  title: z.string(),
  employmentType: z
    .enum(['full-time', 'part-time', 'contract', 'self-employed', 'freelance'])
    .optional(),
  start: yearMonth,
  /** `null` means "to the present day". */
  end: yearMonth.nullable(),
  location: z.string().optional(),
  workplace: z.enum(['on-site', 'hybrid', 'remote']).optional(),
  highlights: z.array(z.string()).min(1),
  skills: z.array(z.string()).default([]),
});

const experience = defineCollection({
  loader: file('src/content/experience.yaml', { parser: bilingualYaml }),
  schema: z.object({
    key: z.string(),
    company: z.string(),
    companyUrl: z.url().optional(),
    location: z.string().optional(),
    /** Overall span for the company header; positions carry their own dates. */
    start: yearMonth,
    end: yearMonth.nullable(),
    /** Ascending; 1 is the most recent role. */
    order: z.number(),
    positions: z.array(position).min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      title: z.string(),
      tagline: z.string(),
      /** Card copy. The markdown body is the detail page. */
      summary: z.string(),
      year: z.number().int().min(2015).max(2100),
      /** `featured` surfaces on the homepage; `archive` only on /projects. */
      tier: z.enum(['featured', 'archive']).default('archive'),
      org: z.enum(['olivaw', 'grisu', 'publicis', 'personal', 'academic']).optional(),
      tags: z.array(z.enum(PROJECT_TAGS)).min(1),
      tech: z.array(z.string()).default([]),
      panel: image().optional(),
      /** Placeholder tint used when `panel` is absent. */
      tint: z.enum(['yellow', 'blue', 'red', 'sky', 'cream', 'panel']).default('panel'),
      links: z.array(link).default([]),
      /** Ascending within a tier. */
      order: z.number().default(100),
      status: z.enum(['live', 'wip', 'archived']).default('live'),
    }),
});

const awards = defineCollection({
  loader: glob({ base: './src/content/awards', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      title: z.string(),
      issuer: z.string(),
      /** `YYYY-MM`, same reasoning as the experience dates. */
      date: yearMonth,
      summary: z.string(),
      panel: image().optional(),
      tint: z.enum(['yellow', 'blue', 'red', 'sky', 'cream', 'panel']).default('panel'),
      links: z.array(link).default([]),
      order: z.number(),
    }),
});

export const collections = { services, technologies, experience, projects, awards };
