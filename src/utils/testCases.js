import { generateCareerPlan } from './aiLogic';

/**
 * AI Career Logic - QA Validation Suite
 * A zero-dependency testing environment for core strategic logic.
 */

const testScenarios = [
  {
    name: "Scenario 0: Degenerate/Empty Input (System Stability)",
    input: { skills: "", goal: "", exp: "beginner", target: "product" },
    expected: { minScore: 0, levelContains: "Beginner" }
  },
  {
    name: "Scenario 1: Extreme Skill-Gap (Failure Recovery)",
    input: { skills: "Cooking, Gardening", goal: "Blockchain Architect", exp: "beginner", target: "faang" },
    expected: { minScore: 0, levelContains: "Beginner" }
  },
  {
    name: "Scenario 2: Over-qualified Transition",
    input: { skills: "C++, Rust, Assembly, Kernel Dev, Linux", goal: "Social Media Intern", exp: "experienced", target: "startup" },
    expected: { minScore: 80, levelContains: "Experienced" }
  },
  {
    name: "Scenario 3: Intermediate Synergy Audit",
    input: { 
      skills: "HTML, CSS, JavaScript, React", 
      goal: "Frontend Developer", 
      exp: "intermediate", 
      target: "startup" 
    },
    expected: { minScore: 40, levelContains: "Intermediate" }
  },
  {
    name: "Scenario 4: High-stakes FAANG Strategy",
    input: { 
      skills: "System Design, Microservices, Kubernetes, Node.js, AWS, Java", 
      goal: "Senior Engineering Lead", 
      exp: "experienced", 
      target: "faang" 
    },
    expected: { minScore: 70, levelContains: "Experienced" }
  }
];

/**
 * Execute all test scenarios and log results to the console.
 */
export const runStrategicTests = () => {
  console.group("%c AI CAREER COPILOT - STRATEGIC QA AUDIT ", "background: #1e1b4b; color: #818cf8; font-weight: bold; padding: 4px 8px; border-radius: 4px; border: 1px solid #4338ca;");
  
  let passed = 0;
  testScenarios.forEach((scenario) => {
    try {
      const { skills, goal, exp, target } = scenario.input;
      const result = generateCareerPlan(skills, goal, exp, target);
      
      const scoreValid = result.score >= (scenario.expected.minScore || 0);
      const levelValid = result.level.includes(scenario.expected.levelContains);
      
      const isSuccess = scoreValid && levelValid;
      if (isSuccess) passed++;

      console.log(
        `%c [${isSuccess ? 'PASS' : 'FAIL'}] %c ${scenario.name}`,
        `color: ${isSuccess ? '#10b981' : '#f43f5e'}; font-weight: bold;`,
        "color: #94a3b8; font-weight: normal;",
        `\n   - Score: ${result.score}% (Expected >= ${scenario.expected.minScore}%)\n` +
        `   - State: ${result.level}`
      );
    } catch (err) {
      console.error(`[CRITICAL FAIL] ${scenario.name}: System Crash - ${err.message}`);
    }
  });

  console.log(`%c SUMMARY: ${passed}/${testScenarios.length} Tests Passed `, "color: #8b5cf6; font-weight: bold;");
  console.groupEnd();
};

// Auto-run if executed in a script-friendly environment (optional)
// runStrategicTests();
