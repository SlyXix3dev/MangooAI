v// server.js

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erreur OpenAI :", error.message);
    res.status(500).json({ error: "Erreur serveur ou clé API invalide." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ MangoAI backend en ligne sur http://localhost:${PORT}`);
});
