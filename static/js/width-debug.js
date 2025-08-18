// Temporary debug logging for width calculations across posts
(function () {
  function logWidths() {
    try {
      var mainEl = document.querySelector('.main');
      var postContainer = document.getElementById('post-container');
      var postMain = document.getElementById('post-main');
      var toc = document.getElementById('toc-sidebar');
      var csMain = mainEl ? getComputedStyle(mainEl) : null;
      var vars = window.getComputedStyle(document.body);
      var data = {
        path: location.pathname,
        viewport: { innerWidth: window.innerWidth, clientWidth: document.documentElement.clientWidth },
        cssVars: {
          gap: vars.getPropertyValue('--gap').trim(),
          mainWidthVar: vars.getPropertyValue('--main-width').trim(),
          headerHeight: vars.getPropertyValue('--header-height').trim()
        },
        main: csMain ? { maxWidth: csMain.maxWidth, width: csMain.width, padding: csMain.padding } : null,
        postContainer: postContainer ? { offsetWidth: postContainer.offsetWidth, styleMaxWidth: getComputedStyle(postContainer).maxWidth } : null,
        postMain: postMain ? { offsetWidth: postMain.offsetWidth, styleMaxWidth: getComputedStyle(postMain).maxWidth, marginRight: getComputedStyle(postMain).marginRight } : null,
        toc: toc ? { offsetWidth: toc.offsetWidth, display: getComputedStyle(toc).display } : null
      };
      console.log('[WIDTH-DEBUG]', data);
    } catch (e) {
      console.warn('WIDTH-DEBUG error', e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logWidths);
  } else {
    logWidths();
  }
  window.addEventListener('resize', function () {
    // re-log on resize but throttle with timeout
    clearTimeout(window.__wd_to);
    window.__wd_to = setTimeout(logWidths, 200);
  });
})();