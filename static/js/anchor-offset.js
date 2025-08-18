// Ensure anchored heading is visible below the sticky header by applying an offset
// Works for: direct hash loads, hash changes, and in-page anchor clicks.
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.header');

  const getOffset = () => {
    // Use current header height; clamp to a reasonable range and add small margin
    const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
    const margin = 12;
    return Math.max(60, Math.min(120, h + margin));
  };

  const scrollToHash = (hash) => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    const el = document.getElementById(id);
    if (!el) return;

    const y = window.pageYOffset + el.getBoundingClientRect().top - getOffset();
    window.scrollTo({ top: y, behavior: 'auto' });
  };

  // Adjust after the browser's default jump on initial load
  if (location.hash) {
    setTimeout(() => scrollToHash(location.hash), 10);
  }

  // Adjust on hashchange
  window.addEventListener('hashchange', () => {
    setTimeout(() => scrollToHash(location.hash), 10);
  }, { passive: true });

  // Intercept in-page anchor clicks to apply offset immediately
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute('href');
    // Ignore empty "#" and non-id anchors
    if (!href || href === '#') return;

    const id = decodeURIComponent(href.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    // Update URL hash without extra jump, then scroll with offset
    history.pushState(null, '', '#' + id);
    scrollToHash('#' + id);
  });
});