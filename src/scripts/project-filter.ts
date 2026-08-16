/**
 * Tag filter for the projects index.
 *
 * The filter is a set of radio inputs, so it works before this script runs and
 * keeps full keyboard semantics for free. All this adds is toggling `hidden`
 * on the cards and showing an empty-state message. No framework, no state
 * container, no hydration.
 */
const root = document.querySelector<HTMLElement>('[data-project-filter]');

if (root) {
  const cards = [...document.querySelectorAll<HTMLElement>('[data-project]')];
  const counter = document.querySelector<HTMLElement>('[data-project-count]');
  const empty = document.querySelector<HTMLElement>('[data-project-empty]');

  const apply = (tag: string) => {
    let visible = 0;

    for (const card of cards) {
      const tags = (card.dataset.tags ?? '').split(' ');
      const show = tag === 'all' || tags.includes(tag);
      // The <li> wrapper carries the grid placement, so hide that, not the card.
      const item = card.closest('li') ?? card;
      item.toggleAttribute('hidden', !show);
      if (show) visible += 1;
    }

    if (counter) counter.textContent = String(visible);
    empty?.toggleAttribute('hidden', visible > 0);
  };

  root.addEventListener('change', (event) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.name === 'project-tag') {
      apply(input.value);
    }
  });
}

// Marks this file as a module so its top-level names are scoped to it.
// Without it TypeScript treats every script as sharing one global scope, and
// two files declaring `const root` collide.
export {};
