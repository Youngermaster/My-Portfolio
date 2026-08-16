/**
 * The navigation model, derived once and shared by the desktop nav, the mobile
 * drawer and the footer.
 *
 * The old site kept three separate hand-maintained menus, which is how it ended
 * up with a mobile link pointing at an anchor (`portfolio`) that no section had.
 * Here every link is generated from `SECTION_IDS`, so a nav entry cannot name a
 * section that does not exist.
 */
import { SECTION_IDS, type SectionId, SOCIALS } from '../consts';
import { homePath, styleguidePath } from './routes';
import type { Locale, UIKey } from './ui';

export interface NavLink {
  /** Anchor or absolute path. */
  href: string;
  labelKey: UIKey;
  /** Section anchors take part in scroll-spy; external links do not. */
  sectionId?: SectionId;
  external?: boolean;
}

/** Sections that get a nav entry. `home` is the logo, `services` etc. follow. */
const NAV_SECTIONS: SectionId[] = [
  'about',
  'services',
  'technologies',
  'awards',
  'projects',
  'experience',
  'contact',
];

const sectionLabel: Record<SectionId, UIKey> = {
  home: 'nav.home',
  about: 'nav.about',
  services: 'nav.services',
  technologies: 'nav.technologies',
  awards: 'nav.awards',
  projects: 'nav.projects',
  experience: 'nav.experience',
  contact: 'nav.contact',
};

/**
 * Homepage nav. On the homepage these are in-page anchors; on any other page
 * they must be absolute so they still resolve.
 */
export function mainNav(lang: Locale, onHomepage: boolean): NavLink[] {
  // On the homepage these are bare anchors so they never trigger a navigation.
  // Anywhere else they must be absolute, or `#about` would look for a section
  // on the current page instead of sending the visitor home.
  const base = onHomepage ? '' : homePath(lang);
  const links: NavLink[] = NAV_SECTIONS.map((id) => ({
    href: `${base}#${id}`,
    labelKey: sectionLabel[id],
    sectionId: onHomepage ? id : undefined,
  }));

  const blog = SOCIALS.find((s) => s.id === 'blog');
  if (blog) {
    links.push({ href: blog.url, labelKey: 'nav.blog', external: true });
  }

  return links;
}

/** Footer gets the same sections plus the styleguide. */
export function footerNav(lang: Locale): NavLink[] {
  return [...mainNav(lang, false), { href: styleguidePath(lang), labelKey: 'nav.styleguide' }];
}

export { SECTION_IDS };
