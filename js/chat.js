document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("Vous", message);
  input.value = "";

  addMessage("MangoAI", "⏳ Réflexion en cours...");

  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    document.querySelector("#chat-box p:last-child").remove(); // retire "réflexion..."
    addMessage("MangoAI", data.reply);
  } catch (err) {
    document.querySelector("#chat-box p:last-child").remove();
    addMessage("MangoAI", "❌ Erreur de connexion à l'IA.");
  }
});

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}