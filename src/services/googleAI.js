import { GoogleGenerativeAI } from "@google/genai";

/**
 * GOOGLE GENERATIVE AI (GEMINI) INTEGRATION
 * This service powers the 'Smart Assistant' capabilities of the Career Copilot.
 * It uses the elite Gemini 2.0 Flash model for high-velocity strategic auditing.
 */

// Using Vite Environment Variable for security (VITE_ prefix is required)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateCareerStrategy = async (prompt) => {
  try {
    // Basic validation to prevent empty calls
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      console.warn("Google Gemini API Key is missing. Falling back to deterministic engine.");
      return null;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Google AI Strategy Error:", error);
    return null;
  }
};
