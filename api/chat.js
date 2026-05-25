export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  try {
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
- Brukeren vil ha billige eller smarte middager i Norge
- Foreslå alltid butikker: Kiwi, Rema 1000, Coop Extra
- Gi konkrete handlelister
- Hvis billig: velg Rema 1000 eller Kiwi
- Hvis litt dyrere/kvalitet: Coop Extra
- Hold svar kort og praktisk
- Hvis mulig, foreslå 1 butikk + 3–6 varer
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

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
