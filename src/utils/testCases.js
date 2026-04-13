import { generateCareerPlan } from './aiLogic';

/**
 * AI Career Logic - QA Validation Suite
 * A zero-dependency testing environment for core strategic logic.
 */

const testScenarios = [
  {
    name: "Scenario 0: Empty Input (Safety Guard)",
    input: { skills: "", goal: "", exp: "beginner", target: "product" },
    expected: { minScore: 0, levelContains: "Beginner" }
  },
  {
    name: "Scenario 1: Pure Beginner (Zero Skills)",
    input: { skills: "None", goal: "Frontend Developer", exp: "beginner", target: "product" },
    expected: { minScore: 0, maxScore: 10, levelContains: "Beginner" }
  },
  {
    name: "Scenario 2: Intermediate Multi-Goal Path",
    input: { 
      skills: "HTML, CSS, JavaScript, React", 
      goal: "Fullstack Engineer", 
      exp: "intermediate", 
      target: "startup" 
    },
    expected: { minScore: 30, levelContains: "Intermediate" }
  },
  {
    name: "Scenario 3: Experienced FAANG Targeting",
    input: { 
      skills: "Node.js, Express, MongoDB, Docker, React, TypeScript, Java", 
      goal: "Senior Backend Lead", 
      exp: "experienced", 
      target: "faang" 
    },
    expected: { minScore: 60, levelContains: "Experienced" }
  }
];

/**
 * Execute all test scenarios and log results to the console.
 */
export const runStrategicTests = () => {
  console.group("%c AI CAREER COPILOT - QA AUDIT ", "background: #6366f1; color: white; font-weight: bold; padding: 4px; border-radius: 4px;");
  
  let passed = 0;
  testScenarios.forEach((scenario, index) => {
    const { skills, goal, exp, target } = scenario.input;
    const result = generateCareerPlan(skills, goal, exp, target);
    
    // Validation Logic
    const scoreValid = result.score >= (scenario.expected.minScore || 0);
    const levelValid = result.level.includes(scenario.expected.levelContains);
    
    const isSuccess = scoreValid && levelValid;
    if (isSuccess) passed++;

    console.log(
      `[${isSuccess ? 'PASS' : 'FAIL'}] ${scenario.name}\n` +
      `   - Score: ${result.score}% (Min Expected: ${scenario.expected.minScore}%)\n` +
      `   - Level: ${result.level} (Expected Match: ${scenario.expected.levelContains})\n` +
      `   - Summary: ${result.insights.placement}`
    );
  });

  console.log(`%c SUMMARY: ${passed}/${testScenarios.length} Tests Passed `, "color: #8b5cf6; font-weight: bold;");
  console.groupEnd();
};

// Auto-run if executed in a script-friendly environment (optional)
// runStrategicTests();
