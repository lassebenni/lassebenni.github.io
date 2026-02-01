// Scroll depth tracking for umami analytics
(function() {
  'use strict';

  let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  let ticking = false;

  function trackScrollDepth() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    [25, 50, 75, 100].forEach(function(mark) {
      if (scrollPercent >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        if (typeof umami !== 'undefined') {
          umami.track('scroll-' + mark);
        }
      }
    });
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  });
})();
