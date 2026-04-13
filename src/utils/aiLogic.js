/**
 * AI Career Logic System - Micro-Personalized Edition
 * Incorporates Experience Level and Target Company Type into a multidimensional scoring engine.
 */

const TARGET_ADVICE = {
  startup: {
    focus: "Practical Execution & Agility",
    skillBonus: ["CI/CD", "AWS/Vercel", "Rapid Prototyping"],
    resumeTip: "Highlight 'Zero-to-One' ownership and the ability to ship features fast."
  },
  product: {
    focus: "Code Quality & Scalability",
    skillBonus: ["Unit Testing", "Design Patterns", "Clean Architecture"],
    resumeTip: "Emphasize collaborative development and long-term codebase maintenance."
  },
  faang: {
    focus: "Algorithms & System Architecture",
    skillBonus: ["DSA", "Big O Analysis", "Distributed Systems"],
    resumeTip: "Focus on metrics, optimization, and solving problems at massive scale."
  }
};

const EXPERIENCE_LAYER = {
  beginner: {
    priority: "Foundational Literacy",
    roadmapFocus: "Mastery of basics and syntactical understanding.",
    projectType: "Functional proof-of-concepts."
  },
  intermediate: {
    priority: "Application & Integration",
    roadmapFocus: "Building real-world features and internship/job preparedness.",
    projectType: "Fullstack CRUD applications."
  },
  experienced: {
    priority: "Senior Leadership & Design",
    roadmapFocus: "System design, optimization, and interview preparation for high levels.",
    projectType: "Enterprise-scale distributed architectures."
  }
};

const DOMAIN_DATA = {
  frontend: {
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Next.js", "TypeScript"],
    projects: {
      beginner: [{ name: 'Responsive Portfolio', tech: 'HTML/CSS' }],
      intermediate: [{ name: 'Interactive SaaS Dashboard', tech: 'React/Query' }],
      experienced: [{ name: 'Micro-Frontend Architecture', tech: 'Next.js/ModuleFederation' }]
    }
  },
  backend: {
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "APIs", "Auth", "Docker"],
    projects: {
      beginner: [{ name: 'Static File Server', tech: 'Node.js' }],
      intermediate: [{ name: 'Authentication API', tech: 'Express/JWT' }],
      experienced: [{ name: 'Event-Driven Microservices', tech: 'K8s/Redis/Node' }]
    }
  }
};

/**
 * Generate a personalized career plan based on the multi-dimensional audit.
 */
export const generateCareerPlan = (rawSkills, rawGoal, experience = 'beginner', targetType = 'product') => {
  const goal = (rawGoal || '').toLowerCase();
  const userSkillsSet = new Set((rawSkills || '').split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 0));
  
  // 1. Identify Target Domains
  const activeDomains = [];
  if (goal.includes('frontend')) activeDomains.push('frontend');
  if (goal.includes('backend')) activeDomains.push('backend');
  if (activeDomains.length === 0) activeDomains.push('frontend');

  // 2. Aggregate Target Skills & Add Nuance
  const baseSkills = Array.from(new Set(activeDomains.flatMap(d => DOMAIN_DATA[d].skills)));
  const targetNuance = TARGET_ADVICE[targetType] || TARGET_ADVICE.product;
  const targetSkills = Array.from(new Set([...baseSkills, ...targetNuance.skillBonus]));

  // 3. Scoring & Level Logic
  const matchedSkills = targetSkills.filter(s => userSkillsSet.has(s.toLowerCase()));
  const rawScore = Math.round((matchedSkills.length / targetSkills.length) * 100) || 0;
  
  // Readiness is a merge of score and experience expectations
  let maturity = "Learner";
  if (rawScore > 75) maturity = "Candidate";
  if (rawScore > 90) maturity = "Expert";

  // 4. Build Dynamic Roadmap (10 Days)
  const expContext = EXPERIENCE_LAYER[experience] || EXPERIENCE_LAYER.beginner;
  const roadmap = [
    { day: 1, task: `[Audit] ${expContext.priority}: Establish dev environment for ${targetType} standards.` },
    { day: 3, task: `[Core] Focus on ${targetNuance.focus} within ${activeDomains[0]} context.` },
    { day: 5, task: `[Project] Begin ${expContext.projectType} focused on ${targetNuance.skillBonus[0]}.` },
    { day: 7, task: `[Optimization] Refactor for ${targetType === 'faang' ? 'Time Complexity' : 'UI/UX Polish'}.` },
    { day: 10, task: `[Validation] Final deployment and ${experience === 'experienced' ? 'System Design' : 'Interview'} prep.` }
  ];

  // 5. Build Dynamic Projects
  const suggestedProjects = activeDomains.map(d => {
    const p = DOMAIN_DATA[d].projects[experience][0];
    return {
      id: `p-${d}`,
      name: `${p.name} (${targetType.toUpperCase()} Spec)`,
      tech: p.tech,
      desc: `A ${p.name} specifically architected to demonstrate ${targetNuance.focus}.`
    };
  });

  return {
    score: Math.min(100, rawScore),
    level: `${experience.charAt(0).toUpperCase() + experience.slice(1)} ${maturity}`,
    skillGap: targetSkills.filter(s => !userSkillsSet.has(s.toLowerCase())).map(s => `Master ${s} (${targetType} Tier)`),
    recommendedSkills: targetSkills.filter(s => !userSkillsSet.has(s.toLowerCase())).slice(0, 4),
    roadmap: roadmap.map(r => ({ id: `r-${r.day}`, ...r })),
    projects: suggestedProjects,
    resumeTips: [
      { id: 't1', text: targetNuance.resumeTip },
      { id: 't2', text: `Prioritize ${expContext.roadmapFocus}` }
    ],
    insights: {
      placement: `Based on your ${experience} level, your mastery of the ${targetType} stack is at ${rawScore}%.`,
      curation: `Skills prioritized for ${targetType} focus: ${targetNuance.skillBonus.join(', ')}.`,
      pacing: `Roadmap tailored for ${expContext.priority} in a ${targetType} hiring environment.`
    }
  };
};
