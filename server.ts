import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // AI Money Coach Endpoint
  app.post("/api/ai-coach", async (req, res) => {
    try {
      const { message, mentor, tone, userData } = req.body;

      const systemInstruction = `
You are the AI Money Coach in the "Money Boss AI" mobile application.
You speak directly to the user about their real personal financial data.

Current Mentor Context:
- Mentor Name: ${mentor?.name || "Father"}
- Mentor Personality: ${mentor?.personality || "Serious, intimidating, disciplined"}
- Tone Mode: ${tone === "mentor" ? "Roleplay strongly as this mentor character using their voice and signature catchphrases" : "Neutral, encouraging professional financial advisor tone"}
- Mentor Signature Quote: "${mentor?.quote || "Discipline beats impulse."}"

User's Live Financial State:
- Base Currency: ${userData?.currency || "INR"}
- Total Balance: ${userData?.currency || "₹"}${userData?.balance?.toLocaleString() || "47,820"}
- Pocket Money Remaining: ${userData?.currency || "₹"}${userData?.pmLeft?.toLocaleString() || "3,200"} out of ${userData?.currency || "₹"}${userData?.pmTotal?.toLocaleString() || "5,900"}
- Active Savings Goal: ${userData?.goalTitle || "Save ₹10,000"} (${userData?.goalProgress || 68}% completed)
- Kinetic Points (KP): ${userData?.kp || 2450} KP
- Multiplier: ${userData?.multiplier || 2.4}x
- Active Streak: ${userData?.streak || 7} Days No-Overspend

Instructions for response:
1. Ground your advice directly in the provided user financial stats.
2. Keep responses concise (2-4 sentences max), punchy, and mobile-friendly.
3. If tone mode is "mentor", embrace the character's personality (e.g. Mother guilt-trips; Sister teases; Father preaches discipline; Brother encourages).
4. Provide actionable advice for staying on budget or hitting savings goals.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: tone === "mentor" ? 0.8 : 0.4,
        },
      });

      const replyText = response.text || "Keep your eyes on your financial goals. Every rupee counts!";

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("AI Coach API Error:", error);
      res.status(500).json({
        reply: "My financial radar encountered a small glitch. Stay focused on your budget while I reconnect!",
        error: error.message,
      });
    }
  });

  // Vite Middleware in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Money Boss AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
