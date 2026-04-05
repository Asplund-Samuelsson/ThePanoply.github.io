function initScrollFadeSections() {
  const elements = document.querySelectorAll('.fade-in-section');

  function update() {
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();

      // When element enters bottom of viewport → start fade
      const start = windowHeight;
      // When element reaches middle of viewport → fully visible
      const end = windowHeight * 0.5;

      const progress = (start - rect.top) / (start - end);

      // Clamp between 0 and 1
      const clamped = Math.max(0, Math.min(1, progress));

      el.style.opacity = clamped;
      el.style.transform = `translateY(${25 * (1 - clamped)}vh)`;
    });
  }

  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);

  update(); // run once on load

  // Optional cleanup
  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}

document.addEventListener('DOMContentLoaded', initScrollFadeSections);