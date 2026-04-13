import { GoogleGenAI } from "@google/genai";

/**
 * GOOGLE GENERATIVE AI (GEMINI) INTEGRATION
 * This service powers the 'Smart Assistant' capabilities of the Career Copilot.
 * It uses the unified GoogleGenAI SDK for elite strategic auditing.
 */

// Using Vite Environment Variable for security (VITE_ prefix is required)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
const client = new GoogleGenAI({ apiKey: API_KEY });

export const generateCareerStrategy = async (prompt) => {
  try {
    // Basic validation to prevent empty calls
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      console.warn("Google Gemini API Key is missing. Falling back to deterministic engine.");
      return null;
    }

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    return response.text;
  } catch (error) {
    console.error("Google AI Strategy Error:", error);
    return null;
  }
};
