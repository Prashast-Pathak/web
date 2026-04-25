/* ============================================
   AM Analytics — Scroll & Interaction Animations
   ============================================ */

(function () {
  'use strict';

  // ─── Scroll Reveal ───────────────────────
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ─── Counter Animation ────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // ─── Chart Bar Animation ──────────────────
  function initChartBars() {
    const bars = document.querySelectorAll('.chart-bar');
    if (!bars.length) return;

    const heights = [35, 65, 45, 80, 55, 90, 70, 60, 85, 50];

    bars.forEach((bar, i) => {
      bar.style.height = '0%';
      bar.style.transition = `height 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bars.forEach((bar, i) => {
            bar.style.height = heights[i % heights.length] + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const chartWrapper = document.querySelector('.chart-preview');
    if (chartWrapper) observer.observe(chartWrapper);
  }

  // ─── Scroll Hint Click ────────────────────
  function initScrollHint() {
    const hint = document.querySelector('.hero-scroll');
    if (!hint) return;
    hint.addEventListener('click', () => {
      const next = document.querySelector('.stats-strip') ||
                   document.querySelector('section');
      if (next) {
        next.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ─── Search Form Handler ──────────────────
  function initSearch() {
    const form = document.querySelector('.hero-search');
    const input = form ? form.querySelector('input') : null;
    const btn   = form ? form.querySelector('.hero-search__btn') : null;

    if (!form || !input || !btn) return;

    btn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) {
        // Placeholder: animate button feedback
        btn.textContent = 'Connecting…';
        btn.style.opacity = '0.7';
        setTimeout(() => {
          btn.textContent = 'Explore Platform →';
          btn.style.opacity = '';
          input.value = '';
        }, 2000);
      } else {
        input.focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btn.click();
    });
  }

  // ─── Cursor Glow (desktop) ────────────────
  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(240,160,32,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0;
    `;
    document.body.appendChild(glow);

    let cx = 0, cy = 0;
    let tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    (function animateGlow() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(animateGlow);
    })();
  }

  // ─── Boot ────────────────────────────────
  function init() {
    initReveal();
    initCounters();
    initChartBars();
    initScrollHint();
    initSearch();
    initCursorGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
