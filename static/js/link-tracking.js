// Link and video click tracking for umami analytics
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Track external link clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's a YouTube link or embed
      if (href.includes('youtube.com') || href.includes('youtu.be')) {
        if (typeof umami !== 'undefined') {
          umami.track('youtube-click', { url: href });
        }
        return;
      }

      // Check if it's an external link (not same domain)
      try {
        const url = new URL(href, window.location.origin);
        if (url.hostname !== window.location.hostname) {
          if (typeof umami !== 'undefined') {
            umami.track('external-link', { url: href, domain: url.hostname });
          }
        }
      } catch (e) {
        // Invalid URL, ignore
      }
    });

    // Track YouTube iframe interactions (play attempts via click on iframe container)
    document.querySelectorAll('iframe[src*="youtube"], iframe[src*="youtu.be"]').forEach(function(iframe) {
      const wrapper = iframe.parentElement;
      if (wrapper) {
        wrapper.addEventListener('click', function() {
          if (typeof umami !== 'undefined') {
            umami.track('youtube-embed-click', { src: iframe.src });
          }
        }, { once: true });
      }
    });
  });
})();
