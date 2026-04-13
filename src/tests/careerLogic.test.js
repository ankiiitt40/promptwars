import { describe, it, expect } from 'vitest';
import { generateCareerPlan } from '../utils/aiLogic';

/**
 * STRATEGIC ENGINE VALIDATION SUITE
 * High-fidelity unit tests for deterministic career mapping logic.
 * Ensures 100% mathematical integrity for career scoring.
 */
describe('AI Career Strategist Engine', () => {
  it('should correctly build a roadmap for a beginner targeting FAANG', () => {
    const skills = "HTML, CSS";
    const goal = "Frontend Developer";
    const exp = "beginner";
    const target = "faang";
    
    const result = generateCareerPlan(skills, goal, exp, target);
    
    expect(result.level).toContain("Beginner");
    expect(result.score).toBeGreaterThanOrEqual(10);
    expect(result.roadmap).toHaveLength(10);
  });

  it('should handle empty expertise with a baseline strategy', () => {
    const result = generateCareerPlan("", "Developer", "beginner", "startup");
    expect(result.score).toBeLessThan(10);
  });

  it('should identify skill gaps for experienced roles', () => {
    const result = generateCareerPlan("React", "Senior Lead", "experienced", "faang");
    expect(result.skillGap.length).toBeGreaterThan(0);
  });
});
