/* ═══════════════════════════════════════════════
   CHAT.JS — Netlify Function, AI chat backend (Gemini API)
   May idinagdag na simpleng IP-based rate limiting para
   maiwasan ang pang-aabuso/spam na puwedeng magpataas ng
   Gemini API cost.
═══════════════════════════════════════════════ */

/* The current rate limiting uses an in-memory Map, 
which resets whenever the serverless function starts a new instance. 
This provides basic protection against spam and abuse at the current scale, 
but it is not sufficient against persistent or determined attackers.
For stronger and persistent rate limiting in the future, the existing 
Firebase Realtime Database project can be used as the shared storage instead 
of the in-memory Map. */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minuto
const RATE_LIMIT_MAX_REQUESTS = 10;          // max 10 messages bawat IP kada window
const rateLimitMap = new Map();

function getClientIp(req) {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  /* Simple cleanup para hindi lumaki nang sobra ang Map
     kung maraming unique IPs (para sa hobby-scale na site) */
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap) {
      if (now - val.start > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
    }
  }

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) return true;
  return false;
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        reply: "Sobrang dami ng messages sa maikling oras. Paki-antay muna ng ilang minuto bago mag-ulit. 🙏",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages } = await req.json();

    /* convert messages format for Gemini */
    const geminiMessages = messages.slice(-10).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `Ikaw ay isang friendly AI travel guide para sa Casiguran, Aurora, Philippines.
Ang pangalan mo ay "Casiguran AI Guide".
Sumasagot ka tungkol sa:
- Mga tourist spots: Casapsapan Beach, Tibu Tidal Pool, Bulawan Falls, Ontok Lighthouse, Gayusan Falls, Dianao Beach, Cuaresma Beach, Motiong Beach, Amro River, Nuestra Señora Dela Ermita Church
- Paano pumunta sa Casiguran (mula Manila: 7-9 oras via Baler o Dingalan route)
- Pinakamabuting panahon para bumisita (Nobyembre hanggang Mayo — dry season)
- Mga aktibidad (swimming, snorkeling, trekking, camping, photography)
- Budget tips at accommodation
- Local culture, pagkain, at tradisyon
Sumasagot ka sa Filipino o English depende sa tanong ng user.
Laging maging masaya, helpful, at encouraging para bumisita sa Casiguran!
Huwag sumagot ng mga hindi related sa Casiguran o travel.`
            }]
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API error");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "Pasensya na, hindi ko naintindihan. Subukan ulit! 🙏";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};