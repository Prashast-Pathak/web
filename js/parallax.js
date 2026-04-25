/* ============================================
   AM Analytics — Parallax Engine
   ============================================ */

(function () {
  'use strict';

  const pin       = document.querySelector('.hero-pin');
  const scene     = document.querySelector('.hero');
  const lSky      = document.querySelector('.layer-sky');
  const lForest   = document.querySelector('.layer-forest');
  const lMtns     = document.querySelector('.layer-mountains');
  const content   = document.querySelector('.hero-content');
  const scrollCue = document.querySelector('.hero-scroll');
  const progress  = document.querySelector('.hero-progress');

  if (!pin || !scene) return;

  // Mouse State
  let targetX = 0, targetY = 0;
  let mouseX = 0, mouseY = 0;
  const LERP = 0.055;

  // Update Mouse Targets
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    targetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
  }, { passive: true });

  function tick() {
    // 1. Calculate Scroll Progress (0 to 1)
    const sy = window.scrollY;
    const rect = pin.getBoundingClientRect();
    const pinTop = rect.top + sy;
    const pinHeight = pin.offsetHeight;
    const vh = window.innerHeight;
    
    let prog = (sy - pinTop) / (pinHeight - vh);
    prog = Math.max(0, Math.min(1, prog));

    // 2. Lerp Mouse
    mouseX += (targetX - mouseX) * LERP;
    mouseY += (targetY - mouseY) * LERP;

    // 3. Transform Layers
    // sky: translateX(mouseX*9px) translateY(-prog*vh*0.07 + mouseY*5px)
    if (lSky) {
      lSky.style.transform = `translate3d(${mouseX * 9}px, ${-prog * vh * 0.07 + mouseY * 5}px, 0)`;
    }

    // forest: translateX(mouseX*20px) translateY(-prog*vh*0.40 + mouseY*11px)
    if (lForest) {
      lForest.style.transform = `translate3d(${mouseX * 20}px, ${-prog * vh * 0.40 + mouseY * 11}px, 0)`;
    }

    // mountains: translateX(mouseX*30px) translateY(-prog*vh*0.68 + mouseY*17px) scale(1 + prog*0.25)
    if (lMtns) {
      const mScale = 1 + prog * 0.25;
      lMtns.style.transform = `translate3d(${mouseX * 30}px, ${-prog * vh * 0.68 + mouseY * 17}px, 0) scale(${mScale})`;
    }

    // 4. Hero Content: translateY(-prog*vh*0.28) opacity(1 - prog*3.2)
    if (content) {
      const contentY = -prog * vh * 0.28;
      const contentOpa = 1 - (prog * 3.2);
      content.style.transform = `translate3d(0, ${contentY}px, 0)`;
      content.style.opacity = Math.max(0, contentOpa);
    }

    // 5. Mouse Tilt (Near top only)
    if (prog < 0.06) {
      scene.style.transform = `perspective(1200px) rotateY(${mouseX * 2}deg) rotateX(${mouseY * -1.5}deg)`;
    } else {
      scene.style.transform = 'none';
    }

    // 6. Progress Bar & Scroll Cue
    if (progress) progress.style.width = (prog * 100) + '%';
    if (scrollCue) {
      scrollCue.style.opacity = Math.max(0, 1 - (prog * 10));
    }

    requestAnimationFrame(tick);
  }

  // Start Loop
  requestAnimationFrame(tick);

})();
