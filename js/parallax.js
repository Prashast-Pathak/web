/* ============================================
   AM Analytics — Parallax Engine
   ============================================ */

(function () {
  'use strict';

  const LAYERS = [
    { selector: '.layer-sky',       speedY: 0.08, speedX: 0.02 },
    { selector: '.layer-forest',    speedY: 0.22, speedX: 0.06 },
    { selector: '.layer-mountains', speedY: 0.42, speedX: 0.10 },
  ];

  let ticking = false;
  let scrollY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  const LERP = 0.06; // smoothing factor

  const elements = [];

  function init() {
    LAYERS.forEach(layer => {
      const el = document.querySelector(layer.selector);
      if (el) {
        elements.push({ el, ...layer });
      }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    requestAnimationFrame(loop);
  }

  function onScroll() {
    scrollY = window.pageYOffset;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function onMouseMove(e) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetMouseX = (e.clientX - cx) / cx; // -1 to 1
    targetMouseY = (e.clientY - cy) / cy; // -1 to 1
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function loop() {
    mouseX = lerp(mouseX, targetMouseX, LERP);
    mouseY = lerp(mouseY, targetMouseY, LERP);
    update();
    requestAnimationFrame(loop);
  }

  function update() {
    elements.forEach(({ el, speedY, speedX }) => {
      const translateY = scrollY * speedY;
      const translateX = mouseX * speedX * 30;
      const tiltY      = mouseY * speedY * 10;

      el.style.transform =
        `translate3d(${translateX}px, ${-translateY + tiltY}px, 0)`;
    });
    ticking = false;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
