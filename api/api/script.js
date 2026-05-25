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

  output.innerText = data.reply;
}
