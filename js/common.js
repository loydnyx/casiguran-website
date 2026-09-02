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

  chatBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    chatBtn.classList.toggle("open", isOpen);
    chatWindow.classList.toggle("open", isOpen);
    if (isOpen && !greeted) {
      greeted = true;
      setTimeout(() => addBotMsg("Mabuhay! 👋 I'm your AI guide for **Casiguran, Aurora** — Aurora's Hidden Gem.\n\nAsk me anything about tourist spots, how to get here, best time to visit, activities, and more!"), 420);
    }
    if (isOpen) setTimeout(() => chatInput.focus(), 360);
  });

  suggestEl.querySelectorAll(".suggestion-btn").forEach(btn => {
    btn.addEventListener("click", () => sendMsg(btn.textContent.trim().replace(/^[\S]+\s/, "")));
  });

  chatSend.addEventListener("click", () => sendMsg());
  chatInput.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } });

  function sendMsg(text) {
    const q = (text || chatInput.value).trim();
    if (!q || isLoading) return;
    chatInput.value = "";
    suggestEl.style.display = "none";
    addUserMsg(q);
    askAI(q);
  }

  function addUserMsg(text) {
    const d = document.createElement("div");
    d.className = "msg user";
    d.innerHTML = `<div class="msg-icon">👤</div><div class="msg-bubble">${esc(text)}</div>`;
    messagesEl.appendChild(d); scrollDown();
  }

  function addBotMsg(text) {
    const d = document.createElement("div");
    d.className = "msg bot";
    d.innerHTML = `<div class="msg-icon">🌊</div><div class="msg-bubble">${fmt(text)}</div>`;
    messagesEl.appendChild(d); scrollDown();
  }

  function showTyping() {
    const d = document.createElement("div");
    d.className = "msg bot"; d.id = "typing";
    d.innerHTML = `<div class="msg-icon">🌊</div><div class="msg-bubble typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
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
      /* NOTE: calls the Netlify Function at /.netlify/functions/chat
         (see netlify/functions/chat.js — the custom "path" override
         that broke this endpoint has been removed there). */
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      removeTyping();
      if (data.error) throw new Error(data.error);
      history.push({ role: "assistant", content: data.reply });
      addBotMsg(data.reply);
    } catch {
      removeTyping();
      addBotMsg("Oops! May problema sa koneksyon. Pakisubukan ulit. 🙏");
    }
    isLoading = false; chatSend.disabled = false; chatInput.focus();
  }
})();
