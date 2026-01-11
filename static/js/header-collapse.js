/**
 * Hide the header when scrolling down, show it when scrolling up.
 * Uses hysteresis to avoid flicker.
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  
  // Thresholds
  const HIDE_THRESHOLD = 100; // Start hiding after scrolling down this much
  const SCROLL_DELTA = 10;    // Minimum scroll amount to trigger show/hide

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    // At the very top - always show
    if (currentScrollY <= 50) {
      header.classList.remove('header--hidden');
      if (header.dataset.isHome === 'true') {
        header.classList.remove('header--compact');
      }
    }
    // Scrolling down past threshold - hide
    else if (scrollDelta > SCROLL_DELTA && currentScrollY > HIDE_THRESHOLD) {
      header.classList.add('header--hidden');
      header.classList.add('header--compact');
    }
    // Scrolling up - show (compact mode)
    else if (scrollDelta < -SCROLL_DELTA) {
      header.classList.remove('header--hidden');
      if (currentScrollY > 100) {
        header.classList.add('header--compact');
      }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeader();
});

/**
 * Mobile hamburger menu toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    const closeMenu = () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close when clicking overlay background
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMenu();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Mobile theme toggle
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark');
        localStorage.setItem('pref-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      });
    }
  }
});