async function sendMessage() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerText = "Tenker... 🤖";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();

  let text = data.reply;

  // Finn butikk i svaret
  let mapsButton = "";

  if (text.toLowerCase().includes("rema")) {
    mapsButton = `<br><button onclick="openMaps('rema')">📍 Naviger til Rema 1000</button>`;
  }

  if (text.toLowerCase().includes("kiwi")) {
    mapsButton = `<br><button onclick="openMaps('kiwi')">📍 Naviger til Kiwi</button>`;
  }

  if (text.toLowerCase().includes("coop")) {
    mapsButton = `<br><button onclick="openMaps('coop')">📍 Naviger til Coop Extra</button>`;
  }

  output.innerHTML = text + mapsButton;
}
