/**
 * Opens and closes the mobile drawer.
 *
 * <dialog> already handles focus trapping, Escape and inert-ing the page, so
 * all that is left is showModal/close and dismissing the drawer when a link is
 * followed (the in-page anchor would otherwise scroll behind an open modal).
 */
const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');

if (dialog && openBtn) {
  openBtn.addEventListener('click', () => dialog.showModal());
  closeBtn?.addEventListener('click', () => dialog.close());

  // Click on the backdrop — the dialog element itself, outside its content box.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  for (const link of dialog.querySelectorAll<HTMLAnchorElement>('[data-menu-link]')) {
    link.addEventListener('click', () => dialog.close());
  }

  // Anything wider than the drawer breakpoint should never keep it open.
  const wide = window.matchMedia('(min-width: 992px)');
  wide.addEventListener('change', (event) => {
    if (event.matches && dialog.open) dialog.close();
  });
}
