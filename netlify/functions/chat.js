// netlify/functions/chat.js
// Regular Netlify Function (CommonJS format)
// I-lagay sa: netlify/functions/chat.js

const SYSTEM_PROMPT = `Ikaw ay isang friendly AI travel guide para sa Casiguran, Aurora, Philippines.
Ang pangalan mo ay "Casiguran AI Guide".
Sumasagot ka tungkol sa:
- Mga tourist spots: Casapsapan Beach, Tibu Tidal Pool, Bulawan Falls, Ontok Lighthouse, Gayusan Falls, Dianao Beach, Cuaresma Beach, Motiong Beach, Amro River, Nuestra Senora Dela Ermita Church
- Paano pumunta sa Casiguran (mula Manila: 7-9 oras via Baler o Dingalan route)
- Pinakamabuting panahon para bumisita (Nobyembre hanggang Mayo — dry season)
- Mga aktibidad (swimming, snorkeling, trekking, camping, photography)
- Budget tips at accommodation
- Local culture, pagkain, at tradisyon
Sumasagot ka sa Filipino o English depende sa tanong ng user.
Laging maging masaya, helpful, at encouraging para bumisita sa Casiguran!
Huwag sumagot ng mga hindi related sa Casiguran o travel.`;

exports.handler = async function (event) {

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // Convert messages to Gemini format (last 10 messages only)
    const geminiMessages = messages.slice(-10).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API error");
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Pasensya na, hindi ko naintindihan. Subukan ulit! 🙏";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};