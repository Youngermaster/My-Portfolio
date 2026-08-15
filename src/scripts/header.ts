/**
 * Header shadow + scroll-spy.
 *
 * Both use IntersectionObserver rather than a scroll listener, so neither runs
 * work on every frame while scrolling. Together they are the entire replacement
 * for the old site's react-scroll dependency.
 */

const header = document.querySelector<HTMLElement>('[data-header]');
const sentinel = document.querySelector<HTMLElement>('#header-sentinel');

/* --- shadow: on as soon as the page has scrolled past the sentinel --- */
if (header && sentinel) {
  new IntersectionObserver(
    ([entry]) => {
      if (entry) header.classList.toggle('is-stuck', !entry.isIntersecting);
    },
    { rootMargin: '0px' }
  ).observe(sentinel);
}

/* --- scroll-spy: highlight the nav link for the section in view --- */
const navLinks = new Map<string, HTMLAnchorElement[]>();
for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-section]')) {
  const id = link.dataset.section;
  if (!id) continue;
  navLinks.set(id, [...(navLinks.get(id) ?? []), link]);
}

const sections = [...navLinks.keys()]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => el !== null);

if (sections.length > 0) {
  // Track ratios for every section and pick the most visible one, so a short
  // section sandwiched between two tall ones still wins while it is on screen.
  const ratios = new Map<string, number>();

  const setActive = (activeId: string | null) => {
    for (const [id, links] of navLinks) {
      for (const link of links) link.classList.toggle('is-active', id === activeId);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }

      let best: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          best = id;
          bestRatio = ratio;
        }
      }

      setActive(best);
    },
    {
      // Ignore the strip beneath the sticky header when deciding what is "in view".
      rootMargin: '-96px 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  for (const section of sections) observer.observe(section);
}
