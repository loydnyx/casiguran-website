/* ═══════════════════════════════════════════════
   SPOTS.JS — spots.html only
   (loaded as type="module" because it uses Firebase)
═══════════════════════════════════════════════ */
import { db } from "./firebase-config.js";
import { ref, runTransaction, onValue }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

/* ── CARD REVEAL ON SCROLL ─────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll(".spot-card").forEach(el => revealObs.observe(el));

/* ── LIKES (localStorage = this browser's own likes | Firebase = shared count) ── */
const MINE_KEY = "casiguran_liked_by_me";
function getMine()   { try { return JSON.parse(localStorage.getItem(MINE_KEY) || "{}"); } catch { return {}; } }
function saveMine(o) { localStorage.setItem(MINE_KEY, JSON.stringify(o)); }
function isLiked(id) { return !!getMine()[id]; }

async function fbLikeDelta(id, delta) {
  await runTransaction(ref(db, "likes/" + id), current => Math.max(0, (current || 0) + delta));
}

function spawnHeart(x, y) {
  const h = document.createElement("span");
  h.className = "heart-particle"; h.innerHTML = '<i class="ph-fill ph-heart"></i>';
  h.style.left = (x - 12) + "px"; h.style.top = (y - 12) + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 900);
}

/* Build like buttons — badges start sa 0, Firebase onValue updates them live */
document.querySelectorAll(".spot-card[data-id]").forEach(card => {
  const id = card.getAttribute("data-id");

  const badge = document.createElement("span");
  badge.className     = "like-badge zero";
  badge.dataset.badge = id;
  badge.innerHTML      = '<i class="ph-duotone ph-heart"></i> 0';
  card.querySelector(".card-img").appendChild(badge);

  const btn = document.createElement("button");
  btn.className    = "like-btn" + (isLiked(id) ? " liked" : "");
  btn.dataset.like = id;
  btn.title        = "Add to Favorites";
  btn.innerHTML    = isLiked(id) ? '<i class="ph-fill ph-heart"></i>' : '<i class="ph-duotone ph-heart"></i>';
  card.querySelector(".card-img").appendChild(btn);

  btn.addEventListener("click", async function (e) {
    e.stopPropagation();
    const mine     = getMine();
    const nowLiked = !mine[id];
    if (nowLiked) mine[id] = true; else delete mine[id];
    saveMine(mine);

    btn.innerHTML = nowLiked ? '<i class="ph-fill ph-heart"></i>' : '<i class="ph-duotone ph-heart"></i>';
    btn.classList.toggle("liked", nowLiked);
    btn.classList.add("pop");
    btn.addEventListener("animationend", () => btn.classList.remove("pop"), { once: true });
    if (nowLiked) spawnHeart(e.clientX, e.clientY);

    await fbLikeDelta(id, nowLiked ? 1 : -1);
    syncModal(id);
  });

  onValue(ref(db, "likes/" + id), snap => {
    const count = Math.max(0, snap.val() || 0);
    badge.innerHTML = '<i class="ph-duotone ph-heart"></i> ' + count;
    badge.classList.toggle("zero", count === 0);
    const modalNum = document.getElementById("modalLikeNum");
    if (modalNum && window._currentModalId === id) modalNum.textContent = count;
  });
});

/* ── SEARCH + FILTER ───────────────────────── */
const searchInput = document.getElementById("spotSearch");
const searchClear = document.getElementById("searchClear");
const searchCount = document.getElementById("searchCount");
const noResults   = document.getElementById("noResults");
const noResultsQ  = document.getElementById("noResultsQuery");
const allCards    = document.querySelectorAll(".spot-card[data-id]");
const allBlocks   = document.querySelectorAll(".section-block");

let currentFilter = "all";

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle("visible", q.length > 0);
  let found = 0;

  allCards.forEach(card => {
    const title      = (card.getAttribute("data-title")      || "").toLowerCase();
    const desc       = (card.getAttribute("data-desc")       || "").toLowerCase();
    const activities = (card.getAttribute("data-activities") || "").toLowerCase();
    const category   = (card.getAttribute("data-category")   || "").toLowerCase();

    const matchSearch = !q || title.includes(q) || desc.includes(q) || activities.includes(q);
    const matchFilter = currentFilter === "all" || category.includes(currentFilter);
    const show = matchSearch && matchFilter;

    card.style.display = show ? "" : "none";
    if (show) found++;
  });

  allBlocks.forEach(block => {
    const hasVisible = [...block.querySelectorAll(".spot-card[data-id]")]
      .some(c => c.style.display !== "none");
    block.style.display = hasVisible ? "" : "none";
  });

  if (q || currentFilter !== "all") {
    searchCount.textContent = found + " spot" + (found !== 1 ? "s" : "") + " found";
    noResults.style.display = found === 0 ? "block" : "none";
    noResultsQ.textContent  = q || currentFilter;
  } else {
    searchCount.textContent = "";
    noResults.style.display = "none";
  }
}

searchInput.addEventListener("input", applyFilters);
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  applyFilters();
  searchInput.focus();
});

document.querySelectorAll(".filter-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    currentFilter = pill.dataset.filter;
    applyFilters();
  });
});

document.addEventListener("keydown", e => {
  if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && document.activeElement !== searchInput) {
    e.preventDefault(); searchInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

/* ── MODAL ─────────────────────────────────── */
const modal        = document.getElementById("spotModal");
const modalTitle   = document.getElementById("modalTitle");
const modalDescEl  = document.getElementById("modalDesc");
const modalActEl   = document.getElementById("modalActivities");
const videoEl      = document.getElementById("videoContainer");
const modalLikeBtn = document.getElementById("modalLikeBtn");
const modalLikeNum = document.getElementById("modalLikeNum");
window._currentModalId = null;
let currentModalId = null;

function syncModal(id) {
  if (currentModalId !== id) return;
  const liked = isLiked(id);
  const lang = (typeof window.i18nGetLang === "function") ? window.i18nGetLang() : "en";
  const dict = (window.translations && window.translations[lang]) ? window.translations[lang] : {};
  modalLikeBtn.querySelector(".heart-icon").innerHTML = liked
    ? '<i class="ph-fill ph-heart"></i>'
    : '<i class="ph-duotone ph-heart"></i>';
  modalLikeBtn.querySelector(".like-label").textContent = liked
    ? (dict.modal_favorited || "Favorited!")
    : (dict.modal_addfav || "Add to Favorites");
  modalLikeBtn.classList.toggle("liked", liked);
  const badgeEl = document.querySelector("[data-badge='" + id + "']");
  if (badgeEl && modalLikeNum) {
    const txt = badgeEl.textContent.replace(/[^0-9]/g, "");
    modalLikeNum.textContent = txt || "0";
  }
}

document.querySelectorAll(".spot-card[data-id]").forEach(card => {
  card.addEventListener("click", function (e) {
    if (e.target.classList.contains("like-btn")) return;
    const id         = card.getAttribute("data-id");
    const title      = card.getAttribute("data-title");
    const desc       = card.getAttribute("data-desc");
    const video      = card.getAttribute("data-video")      || "";
    const type       = card.getAttribute("data-type")       || "";
    const activities = card.getAttribute("data-activities") || "";

    currentModalId = id;
    window._currentModalId = id;
    modalTitle.textContent = title;
    modalDescEl.textContent = desc;

    modalActEl.innerHTML = "";
    activities.split("\n").forEach(item => {
      if (item.trim()) {
        const parts = item.split(" – ");
        const li    = document.createElement("li");
        li.innerHTML = parts.length > 1
          ? "<b>" + parts[0] + ":</b> " + parts[1]
          : item;
        modalActEl.appendChild(li);
      }
    });

    videoEl.innerHTML = "";
    if (type === "youtube") {
      videoEl.innerHTML = `<iframe width="100%" height="280" src="${video}" frameborder="0" allowfullscreen></iframe>`;
    } else if (type === "youtube-link") {
      videoEl.innerHTML = `<a href="${video}" target="_blank" rel="noopener" class="watch-btn youtube">▶ Watch on YouTube</a>`;
    } else if (type === "facebook") {
      videoEl.innerHTML = `<a href="${video}" target="_blank" rel="noopener" class="watch-btn facebook">▶ Watch on Facebook</a>`;
    }

    syncModal(id);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

modalLikeBtn.addEventListener("click", async function (e) {
  if (!currentModalId) return;
  const mine     = getMine();
  const nowLiked = !mine[currentModalId];
  if (nowLiked) mine[currentModalId] = true; else delete mine[currentModalId];
  saveMine(mine);
  syncModal(currentModalId);

  const cardBtn = document.querySelector(`.like-btn[data-like="${currentModalId}"]`);
  if (cardBtn) {
    cardBtn.innerHTML = nowLiked ? '<i class="ph-fill ph-heart"></i>' : '<i class="ph-duotone ph-heart"></i>';
    cardBtn.classList.toggle("liked", nowLiked);
    cardBtn.classList.add("pop");
    cardBtn.addEventListener("animationend", () => cardBtn.classList.remove("pop"), { once: true });
  }
  modalLikeBtn.classList.add("pop");
  modalLikeBtn.addEventListener("animationend", () => modalLikeBtn.classList.remove("pop"), { once: true });
  if (nowLiked) spawnHeart(e.clientX, e.clientY);

  await fbLikeDelta(currentModalId, nowLiked ? 1 : -1);
});

function closeModal() {
  modal.classList.remove("open");
  videoEl.innerHTML = "";
  currentModalId = null;
  window._currentModalId = null;
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });