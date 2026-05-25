export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Du er SmartMiddag AI.

Regler:
- Gi billige eller smarte middager i Norge
- Velg butikk:
  - Billig → Rema 1000 eller Kiwi
  - Litt dyrere → Coop Extra
- Svar MÅ inneholde:
  1. anbefalt butikk
  2. handleliste (3–6 varer)
  3. enkel forklaring
- Hvis mulig, legg til: "trykk GPS for å navigere til butikken"
          `
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "Ingen svar";

  res.status(200).json({ reply });
}
