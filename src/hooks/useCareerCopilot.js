import { useState, useCallback } from 'react';
import { careerService } from '../services/careerService';

/**
 * Custom hook to manage career copilot logic
 * Now supports external state hydration and explicit result returns.
 */
export const useCareerCopilot = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const analyzeResume = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await careerService.analyzeResume(params);
      setAnalysis(result);
      return result; // Explicit return for external persistence logic
    } catch (err) {
      setError("Failed to analyze career data. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    analysis,
    setAnalysis,
    error,
    analyzeResume
  };
};
