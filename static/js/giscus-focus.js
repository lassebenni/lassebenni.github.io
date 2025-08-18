// Ensure returning from GitHub/Giscus login focuses the comments block
(function () {
  function hasGiscusIndicator() {
    try {
      if (/[?&]giscus=/.test(window.location.search)) return true;
      if (window.location.hash && /giscus/.test(window.location.hash)) return true;
      if (document.referrer && /(github\.com|giscus\.app)/.test(document.referrer)) return true;
    } catch (_) {}
    return false;
  }

  function getHeaderOffset() {
    var header = document.querySelector('header#header, header.header, .site-header, header[role="banner"]');
    if (!header) return 0;
    var cs = window.getComputedStyle(header);
    var fixed = cs.position === 'fixed' || cs.position === 'sticky';
    return fixed ? header.offsetHeight + 8 : 8; // add small padding
  }

  function scrollToComments() {
    var container = document.getElementById('comments') || document.querySelector('.comments');
    if (!container) return;
    var top = container.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function waitAndScroll() {
    if (!hasGiscusIndicator()) return;
    var tries = 0;
    var maxTries = 50; // ~5s
    var timer = setInterval(function () {
      tries++;
      var frame = document.querySelector('iframe.giscus-frame, iframe[src*="giscus.app"]');
      var container = document.getElementById('comments') || document.querySelector('.comments');
      if (frame || container || tries >= maxTries) {
        clearInterval(timer);
        // Remove the giscus param from the URL to avoid re-triggering on future navigations
        try {
          var url = new URL(window.location.href);
          if (url.searchParams.has('giscus')) {
            url.searchParams.delete('giscus');
            window.history.replaceState(null, '', url.toString());
          }
        } catch (_) {}
        scrollToComments();
      }
    }, 100);
    // Fallback in case the iframe is blocked/slow
    setTimeout(scrollToComments, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitAndScroll);
  } else {
    waitAndScroll();
  }
})();