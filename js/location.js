/* ═══════════════════════════════════════════════
   LOCATION.JS — location.html only
═══════════════════════════════════════════════ */

/* PILL SCROLL */
document.querySelector('a.stat-pill[href="#map-card"]').addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("map-card").scrollIntoView({ behavior: "smooth", block: "start" });
});

/* MAP TABS */
document.querySelectorAll(".map-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".map-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".map-frame").forEach(f => f.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("map-" + tab.dataset.map).classList.add("active");
  });
});

/* FADE IN */
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 80);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll(".fade-in").forEach(el => fadeObs.observe(el));
