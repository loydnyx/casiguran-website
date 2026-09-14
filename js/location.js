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

/* HERO TRAIL VIDEO — SOUND TOGGLE */
const heroVideo   = document.getElementById("heroTrailVideo");
const soundToggle = document.getElementById("soundToggle");
if (heroVideo && soundToggle) {
  soundToggle.addEventListener("click", () => {
    heroVideo.muted = !heroVideo.muted;
    const isOn = !heroVideo.muted;
    soundToggle.classList.toggle("on", isOn);
    soundToggle.innerHTML = isOn
      ? '<i class="ph-duotone ph-speaker-high"></i>'
      : '<i class="ph-duotone ph-speaker-slash"></i>';
    soundToggle.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
}