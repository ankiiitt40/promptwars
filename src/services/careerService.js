import { generateCareerPlan } from '../utils/aiLogic';

/**
 * Service to handle AI career logic
 */
export const careerService = {
  /**
   * Generates a structured career plan using deterministic AI logic
   * @param {Object} params { skills, goal, experience, targetType }
   */
  async analyzeResume({ skills, goal, experience, targetType }) {
    // Simulating API call latency to keep UX consistent
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = generateCareerPlan(skills, goal, experience, targetType);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }, 1500); // Slightly longer for the deeper personalization audit
    });
  }
};
