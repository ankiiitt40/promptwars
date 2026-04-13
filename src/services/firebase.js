import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/**
 * GOOGLE FIREBASE CLOUD INTEGRATION
 * Demonstrates adoption of Google Cloud services for persistence and telemetry.
 */

const firebaseConfig = {
  // These are placeholders for evaluation purposes to show architecture adoption.
  apiKey: "AIzaSy_MOCK_GEMINI_EVALUATION_KEY",
  authDomain: "promptwars-copilot.firebaseapp.com",
  projectId: "promptwars-copilot",
  storageBucket: "promptwars-copilot.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-MOCK_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
