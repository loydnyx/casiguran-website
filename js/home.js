/* ═══════════════════════════════════════════════
   HOME.JS — index.html only
   (loaded as type="module" because it uses Firebase)
═══════════════════════════════════════════════ */
import { db } from "./firebase-config.js";
import { ref, runTransaction, onValue, set }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

/* ── HERO SLIDER ───────────────────────────── */
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("slideDots");
const sliderFill = document.getElementById("sliderFill");
const INTERVAL = 5500;
let current = 0, sliderTimer, fillTimer, fillPct = 0;

const slideData = [
  { eyebrow: "Aurora Province, Philippines", title: "Explore <em>Casiguran,</em><br>Aurora", sub: "The Hidden Paradise of Aurora Province — pristine beaches, hidden waterfalls, and a community that welcomes you like family." },
  { eyebrow: "Pacific Coastline", title: "Dive Into <em>Crystal</em><br>Clear Waters", sub: "Casiguran's tidal pools and beaches offer snorkeling, swimming, and sunset views that will take your breath away." },
  { eyebrow: "Nature & Adventure", title: "Discover <em>Hidden</em><br>Waterfalls", sub: "Trek through ancient forests to find cascading falls and natural pools that few have ever witnessed." },
  { eyebrow: "Heritage & Culture", title: "Explore <em>400 Years</em><br>of History", sub: "From colonial-era churches to centuries-old fishing traditions, Casiguran's rich heritage runs as deep as the Pacific." },
];

slides.forEach((_, i) => {
  const d = document.createElement("button");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.setAttribute("aria-label", "Slide " + (i + 1));
  d.setAttribute("role", "tab");
  d.addEventListener("click", () => goTo(i));
  dotsContainer.appendChild(d);
});

function goTo(n) {
  slides[current].classList.remove("active");
  dotsContainer.children[current].classList.remove("active");
  current = (n + slides.length) % slides.length;
  slides[current].classList.add("active");
  dotsContainer.children[current].classList.add("active");
  updateHeroText(slideData[current]);
  resetFill();
}

function updateHeroText(data) {
  const wrap = document.getElementById("heroContent");
  wrap.style.opacity = "0"; wrap.style.transform = "translateY(10px)";
  wrap.style.transition = "opacity .35s, transform .35s";
  setTimeout(() => {
    document.getElementById("heroEyebrow").textContent = data.eyebrow;
    document.getElementById("heroTitle").innerHTML = data.title;
    document.getElementById("heroSub").textContent = data.sub;
    wrap.style.opacity = "1"; wrap.style.transform = "translateY(0)";
  }, 320);
}

function resetFill() {
  clearInterval(fillTimer); fillPct = 0; sliderFill.style.width = "0%";
  fillTimer = setInterval(() => {
    fillPct += 100 / (INTERVAL / 100);
    if (fillPct >= 100) fillPct = 100;
    sliderFill.style.width = fillPct + "%";
  }, 100);
}

function autoPlay() { sliderTimer = setTimeout(() => { goTo(current + 1); autoPlay(); }, INTERVAL); }
slides[0].classList.add("active");
autoPlay(); resetFill();

document.getElementById("slidePrev").addEventListener("click", () => { clearTimeout(sliderTimer); goTo(current - 1); autoPlay(); });
document.getElementById("slideNext").addEventListener("click", () => { clearTimeout(sliderTimer); goTo(current + 1); autoPlay(); });

let touchStartX = 0;
document.getElementById("hero").addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
document.getElementById("hero").addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { clearTimeout(sliderTimer); goTo(current + (dx < 0 ? 1 : -1)); autoPlay(); }
}, { passive: true });

/* ── WEATHER ───────────────────────────────── */
async function loadWeather() {
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.28&longitude=122.12&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh");
    const data = await res.json();
    const c = data.current, code = c.weather_code;
    const icons = { 0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 51: "🌦️", 61: "🌧️", 80: "🌦️", 95: "⛈️" };
    const descs = { 0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 51: "Drizzle", 61: "Rainy", 80: "Showers", 95: "Thunderstorm" };
    const icon = icons[code] || icons[Math.floor(code / 10) * 10] || "🌡️";
    const desc = descs[code] || descs[Math.floor(code / 10) * 10] || "See forecast";
    document.getElementById("wTemp").textContent = Math.round(c.temperature_2m) + "°C " + icon;
    document.getElementById("wDesc").textContent = desc;
    document.getElementById("wHumidity").textContent = "💧 " + c.relative_humidity_2m + "%";
    document.getElementById("wWind").textContent = "💨 " + Math.round(c.wind_speed_10m) + " km/h";
  } catch (e) {
    document.getElementById("wDesc").textContent = "Weather unavailable";
  }
}
loadWeather();

/* ── READ MORE ─────────────────────────────── */
window.toggleReadMore = function () {
  const mc   = document.getElementById("moreContent");
  const btn  = document.getElementById("readMoreBtn");
  const open = mc.classList.toggle("open");
  document.getElementById("readMoreLabel").textContent = open ? "Read Less" : "Read More";
  document.getElementById("btnArrow").textContent      = open ? "↑" : "↓";
  btn.classList.toggle("open", open);
};

/* ── HIGHLIGHT REVEAL ──────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), parseInt(e.target.dataset.delay || 0));
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll(".highlight-card").forEach(el => revealObs.observe(el));

/* ── LIGHTBOX (gallery teaser) ─────────────── */
const lightbox  = document.getElementById("lightbox");
const lbImg     = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");

document.querySelectorAll(".gm-item").forEach(item => {
  item.addEventListener("click", () => {
    lbImg.src = item.dataset.src;
    lbCaption.textContent = item.dataset.caption || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
document.getElementById("lbClose").addEventListener("click", closeLB);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLB(); });
function closeLB() { lightbox.classList.remove("open"); document.body.style.overflow = ""; }
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLB(); });

/* ── REAL-TIME VISITOR COUNTER (Firebase) ──── */
const now      = new Date();
const todayKey = now.toISOString().slice(0, 10).replace(/-/g, "_");
const monthKey = now.getFullYear() + "_" + String(now.getMonth() + 1).padStart(2, "0");
const visitKey = "vc_session_" + todayKey;

if (!sessionStorage.getItem(visitKey)) {
  sessionStorage.setItem(visitKey, "1");
  runTransaction(ref(db, "visitors/total"), n => (n || 0) + 1);
  runTransaction(ref(db, "visitors/months/" + monthKey), n => (n || 0) + 1);
}

const sessionId = Math.random().toString(36).slice(2);
const onlineRef = ref(db, "visitors/online/" + sessionId);
set(onlineRef, { t: Date.now() });

onValue(ref(db, "visitors/online"), snap => {
  if (!snap.exists()) {
    document.getElementById("vcOnline").textContent = "1";
    return;
  }
  const cutoff = Date.now() - 45000;
  let active = 0;
  snap.forEach(child => {
    const val = child.val();
    if (val && val.t && val.t > cutoff) active++;
  });
  document.getElementById("vcOnline").textContent = Math.max(1, active).toLocaleString();
});

setInterval(() => set(onlineRef, { t: Date.now() }), 20000);
window.addEventListener("beforeunload", () => set(onlineRef, null));

onValue(ref(db, "visitors/total"), snap => {
  document.getElementById("vcTotal").textContent = (snap.val() || 1).toLocaleString();
});
onValue(ref(db, "visitors/months/" + monthKey), snap => {
  document.getElementById("vcMonth").textContent = (snap.val() || 1).toLocaleString();
});
