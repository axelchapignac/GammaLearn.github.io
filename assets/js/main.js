(function () {
  var nav = document.querySelector(".top-nav");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px"
  });

  revealItems.forEach(function (item, index) {
    if (!item.style.getPropertyValue("--reveal-delay")) {
      item.style.setProperty("--reveal-delay", Math.min(index % 4, 3) * 70 + "ms");
    }
    observer.observe(item);
  });
})();
