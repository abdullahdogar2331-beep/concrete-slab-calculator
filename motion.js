/* Small, accessible scroll-reveal effects for SlabCalc. */
(() => {
  const targets = document.querySelectorAll(
    ".section-heading, .calculator-card, .results-card, .step-card, .formula-card, .example-card, .project-card, .faq-item, .faq-card"
  );

  if (!targets.length || !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  targets.forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.transitionDelay = (index % 4) * 65 + "ms";
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  targets.forEach(element => observer.observe(element));
})();
