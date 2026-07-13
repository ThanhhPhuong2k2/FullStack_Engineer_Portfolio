import { Language } from "../types";

export const getGeminiResponse = async (userMessage: string, lang: Language): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        lang,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to fetch response");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'vi' 
      ? "Trợ lý AI hiện đang ngoại tuyến. Vui lòng thử lại sau hoặc liên hệ trực tiếp với Phương!" 
      : "The AI assistant is currently offline. Please try again later or contact Phuong directly!";
  }
};
