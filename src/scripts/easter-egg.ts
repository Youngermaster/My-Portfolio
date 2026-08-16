/**
 * The two ways into /believe.
 *
 * Both are aimed at developers — the people this portfolio is for — and neither
 * leaves a mark on the page for anyone else: no visible link, no layout, no
 * effect on the accessibility tree.
 *
 *  1. The Konami code.
 *  2. A hint printed to the browser console.
 *
 * The path is passed in from the page so the Spanish build sends you to
 * /es/creo rather than /believe.
 */
const root = document.documentElement;
const target = root.dataset.eggPath;

if (target) {
  /* --- 1. Konami code -------------------------------------------------- */
  const SEQUENCE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  let progress = 0;

  document.addEventListener('keydown', (event) => {
    // Ignore anything typed into a field — the sequence should never fire
    // while someone is filling in a form.
    const el = event.target;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;

    const expected = SEQUENCE[progress];
    if (expected === undefined) return;

    // Compare case-insensitively so Caps Lock does not break the last two keys.
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    if (key === expected) {
      progress += 1;
      if (progress === SEQUENCE.length) {
        progress = 0;
        window.location.href = target;
      }
    } else {
      // A wrong key restarts — but if it matches the first key, count it as
      // the start of a fresh attempt rather than throwing it away.
      progress = key === SEQUENCE[0] ? 1 : 0;
    }
  });

  /* --- 2. Console hint -------------------------------------------------- */
  const origin = window.location.origin;
  console.log(
    `%c↑ ↑ ↓ ↓ ← → ← → B A%c\n\nOr just go to %c${origin}${target}%c\n`,
    'font-size:15px;font-weight:700;color:#F0403E',
    'font-size:12px;color:#687693',
    'font-size:12px;color:#000;text-decoration:underline',
    'font-size:12px;color:#687693'
  );
}

// Marks this file as a module so its top-level names are scoped to it.
// Without it TypeScript treats every script as sharing one global scope, and
// two files declaring `const root` collide.
export {};
