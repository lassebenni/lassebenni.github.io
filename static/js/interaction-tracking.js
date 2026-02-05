// Advanced interaction tracking for Umami (Clicks & Hovers)
(function() {
  'use strict';

  if (typeof umami === 'undefined') return;

  // --- Configuration ---
  const HOVER_DELAY_MS = 2000; // Increased to 2s to capture true "studying" intent
  // OPTIMIZATION: Only track hovers on "rich" content, not generic text.
  // We track: Images, Code blocks, Quotes/Callouts, and Interactive Accordions.
  const HOVER_SELECTORS = 'img, pre, blockquote, .callout, details';

  // --- Click Tracking ---
  document.addEventListener('click', function(e) {
    const el = e.target;
    const link = el.closest('a');
    
    // OPTIMIZATION: Avoid double-counting events handled by link-tracking.js
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        // 1. YouTube links are already tracked
        if (href.includes('youtube.com') || href.includes('youtu.be')) return;
        
        // 2. External links are already tracked
        try {
          const url = new URL(href, window.location.origin);
          if (url.hostname !== window.location.hostname) return;
        } catch (err) {
          // invalid url, let it pass through to be safe or ignore
        }
      }
    }

    const details = {
      tag: el.tagName.toLowerCase(),
      id: el.id || undefined,
      class: el.className ? (typeof el.className === 'string' ? el.className : '') : undefined,
      x: e.clientX, // Viewport coordinates
      y: e.clientY,
      page_x: e.pageX, // Document coordinates
      page_y: e.pageY,
      text: (el.innerText || el.alt || '').slice(0, 30).trim(), // Context
      path: window.location.pathname
    };

    umami.track('interaction-click', details);
  }, true);

  // --- Hover (Dwell) Tracking ---
  let hoverTimer = null;
  let currentHoverTarget = null;

  document.addEventListener('mouseover', function(e) {
    const el = e.target.closest(HOVER_SELECTORS);
    
    // If we moved to a new interesting element
    if (el && el !== currentHoverTarget) {
      // Clear previous timer
      if (hoverTimer) clearTimeout(hoverTimer);
      
      currentHoverTarget = el;
      
      // Start new timer
      hoverTimer = setTimeout(() => {
        // Double check we are still hovering
        if (currentHoverTarget === el) {
          const details = {
            tag: el.tagName.toLowerCase(),
            id: el.id || undefined,
            class: el.className ? (typeof el.className === 'string' ? el.className : '') : undefined,
            text: (el.innerText || el.alt || '').slice(0, 30).trim(),
            path: window.location.pathname
          };
          umami.track('interaction-hover', details);
        }
      }, HOVER_DELAY_MS);
    }
  }, true);

  document.addEventListener('mouseout', function(e) {
    // If leaving the current target
    if (currentHoverTarget && (e.target === currentHoverTarget || e.target.contains(currentHoverTarget))) {
      const related = e.relatedTarget;
      if (!related || !related.closest(HOVER_SELECTORS)) {
         if (hoverTimer) clearTimeout(hoverTimer);
         currentHoverTarget = null;
      }
    }
  }, true);

})();
