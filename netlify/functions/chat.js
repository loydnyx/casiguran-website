export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();

    /* I-convert ang messages format para sa Gemini */
    const geminiMessages = messages.slice(-10).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      /* FIXED: "gemini-2.0-flash" was shut down by Google on June 1, 2026 —
         that's the main reason the AI Guide stopped replying. Using the
         current stable model instead. */
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

/* FIXED: this used to be
     export const config = { path: "/.netlify/functions/chat.js" };
   which OVERRIDES the function's URL to end in ".js" — but every page
   calls fetch("/.netlify/functions/chat") WITHOUT ".js", so every
   request 404'd and the chat widget always fell back to the error
   message. Netlify already serves this function at
   /.netlify/functions/chat by default (from the filename), so no
   custom "config" is needed at all — removing it fixes the mismatch. */
