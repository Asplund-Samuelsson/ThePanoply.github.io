function initScrollFadeSections() {
  const elements = document.querySelectorAll('.fade-in-section');

  const hasHash = window.location.hash;

  function update(skipAnimation = false) {
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();

      const start = windowHeight;
      const end = windowHeight * 0.55;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      if (skipAnimation) {
        progress = rect.top < windowHeight ? 1 : 0;
      }

      el.style.opacity = progress;
      el.style.transform = `translateY(${25 * (1 - progress)}vh)`;
    });
  }

  function onScroll() {
    update(false);
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', () => update(false));

  // Initial run
  update(!!hasHash);

  // After first frame, allow animation again
  requestAnimationFrame(() => {
    setTimeout(() => update(false), 100);
  });

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}

document.addEventListener('DOMContentLoaded', initScrollFadeSections);