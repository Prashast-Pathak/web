/* ============================================
   AM Analytics — Navigation Controller
   ============================================ */

(function () {
  'use strict';

  function init() {
    const nav       = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileNav = document.querySelector('.nav__mobile');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    // ─── Scroll: add .scrolled class ───
    function handleScroll() {
      if (window.pageYOffset > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load

    // ─── Mobile Menu Toggle ───
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
          spans[0].style.transform = 'translateY(7px) rotate(45deg)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });

      // Close on link click
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileNav.classList.remove('open');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
