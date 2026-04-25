/* ============================================
   AM Analytics — Animations & Observers
   ============================================ */

(function () {
  'use strict';

  // ─── Scroll Reveal Observer ───
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // If it's the stats strip, trigger counters
        if (entry.target.classList.contains('stats-strip')) {
          startCounters(entry.target);
        }
        
        // If it's the why section, trigger chart bars
        if (entry.target.classList.contains('section-why')) {
          animateChart(entry.target);
        }
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal, .stats-strip, .section-why').forEach(el => {
    revealObserver.observe(el);
  });

  // ─── Counter Animation ───
  function startCounters(parent) {
    const counters = parent.querySelectorAll('.stat-num');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      counter.dataset.animated = "true";
      
      const target = parseFloat(counter.dataset.target);
      const suffix = counter.dataset.suffix;
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out expo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = (ease * target).toFixed(target % 1 === 0 ? 0 : 1);
        
        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    });
  }

  // ─── Chart Bar Animation ───
  function animateChart(parent) {
    const bars = parent.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.height = bar.style.getPropertyValue('--h');
      }, index * 60);
    });
  }

})();
