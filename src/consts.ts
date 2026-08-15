/**
 * Single source of truth for anything that is site-wide, language-independent
 * and not worth putting in a content collection.
 */

export const SITE_URL = 'https://jmyounghoyos.com';

export const AUTHOR = {
  name: 'Juan Manuel Young Hoyos',
  shortName: 'Juan Manuel',
  handle: 'Youngermaster',
  /** Public contact address. Change here and the whole site follows. */
  email: 'juanmanuel12.13.jmyh81@gmail.com',
  location: 'Medellín, Colombia',
  jobTitle: 'Technical Lead',
  company: 'Okorum Technologies',
  alumniOf: 'Universidad EAFIT',
  /**
   * First professional software role (QA at Geta Club Play, Feb 2021). The
   * "years of experience" figure counts from here rather than from the earliest
   * entry in the work history — that one is a decade of private tutoring, which
   * would inflate the number into something misleading.
   */
  careerStartYear: 2021,
} as const;

/** Whole years since `careerStartYear`, recomputed at build time. */
export function yearsOfExperience(): number {
  return Math.max(1, new Date().getFullYear() - AUTHOR.careerStartYear);
}

export type SocialId =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'x'
  | 'youtube'
  | 'gitlab'
  | 'stackoverflow'
  | 'hackthebox'
  | 'blog';

export interface Social {
  id: SocialId;
  /** Display label; not translated — these are proper nouns. */
  label: string;
  url: string;
  /** Shown in the hero / footer rails. The rest live on the contact section. */
  primary: boolean;
}

export const SOCIALS: readonly Social[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/Youngermaster', primary: true },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-manuel-young-hoyos/',
    primary: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/jmyounghoyos/',
    primary: true,
  },
  { id: 'blog', label: 'Blog', url: 'https://blog.jmyounghoyos.com/', primary: true },
  { id: 'x', label: 'X', url: 'https://twitter.com/jmyounghoyos', primary: false },
  { id: 'gitlab', label: 'GitLab', url: 'https://gitlab.com/Youngermaster', primary: false },
  {
    id: 'hackthebox',
    label: 'Hack The Box',
    url: 'https://app.hackthebox.com/profile/643960',
    primary: false,
  },
  {
    id: 'stackoverflow',
    label: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/9752901/youngermaster',
    primary: false,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UCyuYHymUH4Adj2YytTdtD4g',
    primary: false,
  },
] as const;

/** Organisations referenced from more than one place. */
export const ORGS = {
  okorum: 'https://okorum.com',
  grisu: 'https://grisu.co',
  olivaw: 'https://github.com/Project-Olivaw',
} as const;

/**
 * Homepage section anchors. The old site had three sections sharing
 * `id="blog"` and a mobile link pointing at a non-existent `portfolio`
 * anchor — these ids are the fix, and nav is generated from this list.
 */
export const SECTION_IDS = [
  'home',
  'about',
  'services',
  'experience',
  'technologies',
  'projects',
  'awards',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
