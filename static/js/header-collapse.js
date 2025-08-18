/**
 * Collapse the header into a compact single row when scrolled down,
 * and expand it again only when the user is near the very top.
 * Uses hysteresis thresholds to avoid flicker while scrolling up.
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.header');
  if (!header) return;

  // Hysteresis thresholds (px)
  const COLLAPSE_AT = 140; // add compact state when scrolled beyond this
  const EXPAND_AT = 40;    // remove compact state only when above this

  const onScroll = () => {
    const y = window.scrollY;

    // Collapse beyond threshold
    if (y >= COLLAPSE_AT) {
      header.classList.add('header--compact');
    }

    // Expand again only when near the top
    if (y <= EXPAND_AT) {
      header.classList.remove('header--compact');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});