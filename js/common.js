/* ═══════════════════════════════════════════════
   COMMON.JS — shared behaviour for every page
   (announcement bar, navbar, hamburger, toast,
   back-to-top, scroll progress, AI chat widget)
═══════════════════════════════════════════════ */

/* ── ANNOUNCEMENT ──────────────────────────── */
if (localStorage.getItem("announce_closed")) {
  document.getElementById("announce-bar").style.display = "none";
}
document.getElementById("announce-close").addEventListener("click", () => {
  document.getElementById("announce-bar").style.display = "none";
  localStorage.setItem("announce_closed", "1");
});

/* ── NAVBAR SCROLL SHADOW + PROGRESS BAR ───── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  const backTop = document.getElementById("backTop");
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 400);
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById("progress-bar").style.width = pct + "%";
}, { passive: true });

/* ── HAMBURGER ─────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});
mobileNav.querySelectorAll("a:not(.active)").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* ── BACK TO TOP ───────────────────────────── */
const backTopBtn = document.getElementById("backTop");
if (backTopBtn) backTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ── TOAST ON ACTIVE NAV LINK ──────────────── */
document.querySelectorAll("nav a.active").forEach(activeLink => {
  activeLink.addEventListener("click", e => {
    e.preventDefault();
    const toast = document.getElementById("site-toast");
    toast.classList.add("show");
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  });
});

/* ── AI CHAT WIDGET ────────────────────────── */
(function () {
  const chatBtn    = document.getElementById("ai-chat-btn");
  const chatWindow = document.getElementById("ai-chat-window");
  const chatInput  = document.getElementById("chat-input");
  const chatSend   = document.getElementById("chat-send");
  const messagesEl = document.getElementById("chat-messages");
  const suggestEl  = document.getElementById("suggestions");
  if (!chatBtn) return;

  let isOpen = false, isLoading = false, greeted = false;
  let history = [];
  let lastSendTime = 0;
  const SEND_COOLDOWN_MS = 2000; // 2 segundo bawat message, pumipigil sa mabilis na spam-clicking

  chatBtn.addEventListener("click", () => {
    if (chatBtn.dataset.wasDragged === "1") {
      chatBtn.dataset.wasDragged = "0";
      return;
    }
    isOpen = !isOpen;
    chatBtn.classList.toggle("open", isOpen);
    if (isOpen) positionChatWindowNearButton();
    chatWindow.classList.toggle("open", isOpen);
    if (isOpen && !greeted) {
      greeted = true;
      setTimeout(() => addBotMsg("Mabuhay! I'm your AI guide for **Casiguran, Aurora** — Aurora's Hidden Gem.\n\nAsk me anything about tourist spots, how to get here, best time to visit, activities, and more!"), 420);
    }
    if (isOpen) setTimeout(() => chatInput.focus(), 360);
  });

  function positionChatWindowNearButton() {
    const btnRect = chatBtn.getBoundingClientRect();
    const winW = chatWindow.offsetWidth || 360;
    const winH = chatWindow.offsetHeight || 500;
    const gap = 14;
    const margin = 10;

    let left = btnRect.left;
    let top = btnRect.top - winH - gap;

    if (top < margin) {
      top = btnRect.bottom + gap;
    }

    left = Math.max(margin, Math.min(window.innerWidth - winW - margin, left));
    top = Math.max(margin, Math.min(window.innerHeight - winH - margin, top));

    chatWindow.style.left = left + "px";
    chatWindow.style.top = top + "px";
    chatWindow.style.bottom = "auto";
  }

  (function makeDraggable(el) {
    const DRAG_THRESHOLD = 6;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;
    let dragging = false, moved = false;

    el.addEventListener("pointerdown", (e) => {
      dragging = true; moved = false;
      const rect = el.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      startLeft = rect.left; startTop = rect.top;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        moved = true;
        el.classList.add("dragging");
        el.style.right = "auto";
        el.style.bottom = "auto";
      }
      if (!moved) return;

      const btnW = el.offsetWidth, btnH = el.offsetHeight;
      let newLeft = startLeft + dx;
      let newTop = startTop + dy;
    
      newLeft = Math.max(4, Math.min(window.innerWidth - btnW - 4, newLeft));
      newTop = Math.max(4, Math.min(window.innerHeight - btnH - 4, newTop));
      el.style.left = newLeft + "px";
      el.style.top = newTop + "px";
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (moved) {
        el.classList.remove("dragging");
        el.dataset.wasDragged = "1";
      }
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  })(chatBtn);

  suggestEl.querySelectorAll(".suggestion-btn").forEach(btn => {
    btn.addEventListener("click", () => sendMsg(btn.textContent.trim()));
  });

  chatSend.addEventListener("click", () => sendMsg());
  chatInput.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } });

  function sendMsg(text) {
    const q = (text || chatInput.value).trim();
    if (!q || isLoading) return;

    const now = Date.now();
    if (now - lastSendTime < SEND_COOLDOWN_MS) {
      return;
    }
    lastSendTime = now;

    chatInput.value = "";
    suggestEl.style.display = "none";
    addUserMsg(q);
    askAI(q);
  }

  function addUserMsg(text) {
    const d = document.createElement("div");
    d.className = "msg user";
    d.innerHTML = `<div class="msg-icon"><i class="ph-duotone ph-user"></i></div><div class="msg-bubble">${esc(text)}</div>`;
    messagesEl.appendChild(d); scrollDown();
  }

  function addBotMsg(text) {
    const d = document.createElement("div");
    d.className = "msg bot";
    d.innerHTML = `<div class="msg-icon"><i class="ph-duotone ph-waves"></i></div><div class="msg-bubble">${fmt(text)}</div>`;
    messagesEl.appendChild(d); scrollDown();
  }

  function showTyping() {
    const d = document.createElement("div");
    d.className = "msg bot"; d.id = "typing";
    d.innerHTML = `<div class="msg-icon"><i class="ph-duotone ph-waves"></i></div><div class="msg-bubble typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    messagesEl.appendChild(d); scrollDown();
  }

  function removeTyping() { const t = document.getElementById("typing"); if (t) t.remove(); }
  function scrollDown() { messagesEl.scrollTop = messagesEl.scrollHeight; }
  function fmt(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>"); }
  function esc(t) { return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  async function askAI(question) {
    isLoading = true; chatSend.disabled = true;
    history.push({ role: "user", content: question });
    showTyping();
    try {
    
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      removeTyping();
      if (data.error) {
        if (res.status === 429 && data.reply) {
          addBotMsg(data.reply);
        } else {
          throw new Error(data.error);
        }
      } else {
        history.push({ role: "assistant", content: data.reply });
        addBotMsg(data.reply);
      }
    } catch {
      removeTyping();
      addBotMsg("Oops! May problema sa koneksyon. Pakisubukan ulit.");
    }
    isLoading = false; chatSend.disabled = false; chatInput.focus();
  }
})();

const isLocalDev = ["localhost", "127.0.0.1"].includes(window.location.hostname);

if ("serviceWorker" in navigator && !isLocalDev) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .catch(err => console.warn("Service worker registration failed:", err));
  });
} else if (isLocalDev && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });
}

(function () {
  const alreadyInstalled =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  if (alreadyInstalled) return;
  if (localStorage.getItem("pwa_install_dismissed")) return;

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById("pwa-install-banner")) return;

    const isDesktop = window.matchMedia("(min-width: 681px)").matches;
    const banner = document.createElement("div");
    banner.id = "pwa-install-banner";
    banner.className = isDesktop ? "pwa-desktop" : "pwa-mobile";

    if (isDesktop) {
      banner.innerHTML = `
        <span class="pwa-install-text-desktop">
          <i class="ph-duotone ph-device-mobile"></i>
          <a href="#" id="pwaInstallTrigger" class="pwa-install-link">Install</a> Discover Casiguran
        </span>
        <button class="pwa-install-close" id="pwaInstallClose" aria-label="Isara"><i class="ph-duotone ph-x"></i></button>
      `;
    } else {
      banner.innerHTML = `
        <div class="pwa-mobile-icon"><i class="ph-duotone ph-bell"></i></div>
        <div class="pwa-mobile-body">
          <p class="pwa-mobile-title">Install Discover Casiguran</p>
          <p class="pwa-mobile-sub">I-add sa home screen para sa mabilisang access.</p>
        </div>
        <button class="pwa-install-btn" id="pwaInstallTrigger">Install</button>
        <button class="pwa-install-close" id="pwaInstallClose" aria-label="Isara"><i class="ph-duotone ph-x"></i></button>
      `;
    }

    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("show"));

    document.getElementById("pwaInstallTrigger").addEventListener("click", async (e) => {
      if (isDesktop) e.preventDefault();
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      hideInstallBanner();
    });

    document.getElementById("pwaInstallClose").addEventListener("click", () => {
      localStorage.setItem("pwa_install_dismissed", "1");
      hideInstallBanner();
    });
  }

  function hideInstallBanner() {
    const banner = document.getElementById("pwa-install-banner");
    if (!banner) return;
    banner.classList.remove("show");
    setTimeout(() => banner.remove(), 400);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const banner = document.getElementById("pwa-install-banner");
      if (!banner || !deferredPrompt) return;
      const shouldBeDesktop = window.matchMedia("(min-width: 681px)").matches;
      const isCurrentlyDesktop = banner.classList.contains("pwa-desktop");
      if (shouldBeDesktop !== isCurrentlyDesktop) {
        banner.remove();
        showInstallBanner();
      }
    }, 250);
  });
})();