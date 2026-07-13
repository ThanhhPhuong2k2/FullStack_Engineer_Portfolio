import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { getBioData } from "./constants";
import { Language } from "./types";

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API: Gemini Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body as { message: string; lang: Language };

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is missing.");
      return res.status(500).json({
        error: lang === "vi" 
          ? "API Key cho Gemini chưa được cấu hình." 
          : "Gemini API Key is not configured."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const bioData = getBioData(lang || "vi");
    const systemInstruction = `You are an AI assistant for Thanh Phương's portfolio. 
Your goal is to answer questions about Phuong's skills, experience, and projects professionally in ${lang === "en" ? "English" : "Vietnamese"}.
Use the following bio data: ${bioData}. 
Respond in ${lang === "en" ? "English" : "Vietnamese"}.
Keep your answers concise, engaging, and professional. If you don't know something specific about him, invite the user to contact him directly via the email listed on the site.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || (lang === "en" ? "I'm sorry, I couldn't process that request." : "Xin lỗi, tôi không thể xử lý yêu cầu này.");
    res.json({ reply });
  } catch (error) {
    console.error("Gemini server error:", error);
    res.status(500).json({
      error: req.body?.lang === "en"
        ? "The AI assistant is currently offline. Please try again later!"
        : "Trợ lý AI hiện đang ngoại tuyến. Vui lòng thử lại sau!"
    });
  }
});

async function startServer() {
  // Vite middleware for development
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
