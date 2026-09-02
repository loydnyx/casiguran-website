/* ═══════════════════════════════════════════════
   GALLERY.JS — gallery.html only
═══════════════════════════════════════════════ */

/* STAGGERED ANIMATION */
document.querySelectorAll(".gallery-item").forEach((item, i) => {
  item.style.animationDelay = (i * 0.065) + "s";
});

/* FILTER */
const filterBtns = document.querySelectorAll(".filter-btn");
const allItems   = document.querySelectorAll(".gallery-item");
const photoCount = document.getElementById("photoCount");
const emptyState = document.getElementById("emptyState");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    let visible = 0;
    allItems.forEach((item) => {
      const show = filter === "all" || item.dataset.cat === filter;
      item.style.display = show ? "" : "none";
      if (show) {
        item.style.animation = "none";
        requestAnimationFrame(() => { item.style.animation = ""; item.style.animationDelay = (visible * 0.065) + "s"; });
        visible++;
      }
    });
    photoCount.textContent = visible + " photo" + (visible !== 1 ? "s" : "");
    emptyState.style.display = visible === 0 ? "block" : "none";
  });
});

/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lbImg    = document.getElementById("lbImg");
const lbTitle  = document.getElementById("lbTitle");
const lbCap    = document.getElementById("lbCaption");
const lbCnt    = document.getElementById("lbCounter");
let curIdx = 0, visItems = [];

function getVisible() { return [...allItems].filter(i => i.style.display !== "none"); }

function openLB(idx) {
  visItems = getVisible(); curIdx = idx; updateLB();
  lightbox.classList.add("open"); document.body.style.overflow = "hidden";
}
function updateLB() {
  const item = visItems[curIdx];
  const img  = item.querySelector("img");
  lbImg.src  = img.src; lbImg.alt = img.alt;
  lbTitle.textContent = item.dataset.title || "";
  lbCap.textContent   = item.dataset.caption || "";
  lbCnt.textContent   = (curIdx + 1) + " / " + visItems.length;
}
function closeLB() { lightbox.classList.remove("open"); document.body.style.overflow = ""; }

allItems.forEach(item => {
  item.addEventListener("click", () => { visItems = getVisible(); openLB(visItems.indexOf(item)); });
});

document.getElementById("lbClose").addEventListener("click", closeLB);
document.getElementById("lbPrev").addEventListener("click", e => { e.stopPropagation(); curIdx = (curIdx - 1 + visItems.length) % visItems.length; updateLB(); });
document.getElementById("lbNext").addEventListener("click", e => { e.stopPropagation(); curIdx = (curIdx + 1) % visItems.length; updateLB(); });
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLB(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft")  { curIdx = (curIdx - 1 + visItems.length) % visItems.length; updateLB(); }
  if (e.key === "ArrowRight") { curIdx = (curIdx + 1) % visItems.length; updateLB(); }
});

/* Touch swipe on lightbox */
let touchX = 0;
lightbox.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", e => {
  const dx = touchX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) { curIdx = (curIdx + (dx > 0 ? 1 : -1) + visItems.length) % visItems.length; updateLB(); }
}, { passive: true });
