/* ═══════════════════════════════════════════════
   CONTACT.JS — contact.html only
═══════════════════════════════════════════════ */

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

const form       = document.getElementById("inquiryForm");
const submitBtn  = document.getElementById("formSubmitBtn");
const submitLbl  = document.getElementById("submitLabel");
const statusEl   = document.getElementById("formStatus");

function encodeFormData(formEl) {
  const data = new FormData(formEl);
  return new URLSearchParams(data).toString();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  /* Basic client-side check before mag-submit */
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitLbl.textContent = "Sending…";
  statusEl.textContent = "";
  statusEl.className = "form-status";

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(form),
    });

    if (!res.ok) throw new Error("Submission failed");

    statusEl.textContent = "✓ Salamat! Natanggap na namin ang inquiry mo — sasagutin ka namin sa lalong madaling panahon.";
    statusEl.classList.add("success");
    form.reset();
  } catch (err) {
    statusEl.textContent = "⚠️ May problema sa pagpapadala. Pakisubukan ulit, o mag-email direkta sa info@discovercasiguran.ph";
    statusEl.classList.add("error");
  }

  submitBtn.disabled = false;
  submitLbl.textContent = "Send Message";
});