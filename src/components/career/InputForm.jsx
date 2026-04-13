import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const ROLE_SUGGESTIONS = [
  "Frontend Developer", "Backend Developer", "Fullstack Engineer", 
  "Senior Frontend Architect", "Digital Product Designer", 
  "DevOps Engineer", "Cloud Solutions Architect", "Machine Learning Engineer",
  "Data Scientist", "Product Manager", "UI/UX Designer", "Cybersecurity Analyst"
];

const SKILL_SUGGESTIONS = [
  "React", "Node.js", "TypeScript", "JavaScript", "Tailwind CSS", 
  "MongoDB", "SQL", "Python", "Docker", "AWS", "Figma", "Redux",
  "Next.js", "Express", "PostgreSQL", "Firebase", "Git", "GraphQL"
];

/**
 * InputForm Component - Refined Compact Edition
 * Optimized suggestion UI with higher legibility and balanced 3D aesthetics.
 */
const InputForm = ({ onSubmit, isLoading }) => {
  const { playClick } = useSoundEffects();
  const [formData, setFormData] = useState({ 
    skills: [], 
    goal: '', 
    experience: 'beginner', 
    targetType: 'product' 
  });
  const [skillInput, setSkillInput] = useState('');
  const [touched, setTouched] = useState({ skills: false, goal: false });
  const [suggestionState, setSuggestionState] = useState({ type: null, value: '' });
  
  const skillRef = useRef(null);
  const goalRef = useRef(null);

  const filteredRoles = useMemo(() => {
    if (suggestionState.type !== 'goal' || !formData.goal.trim()) return [];
    const current = formData.goal.toLowerCase();
    return ROLE_SUGGESTIONS.filter(role => 
      role.toLowerCase().includes(current) && 
      role.toLowerCase() !== current
    ).slice(0, 4);
  }, [formData.goal, suggestionState.type]);

  const filteredSkills = useMemo(() => {
    if (suggestionState.type !== 'skills' || !skillInput.trim()) return [];
    const current = skillInput.toLowerCase();
    return SKILL_SUGGESTIONS.filter(skill => 
      skill.toLowerCase().includes(current) && 
      !formData.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    ).slice(0, 4);
  }, [skillInput, formData.skills, suggestionState.type]);

  const isInvalid = formData.skills.length === 0 || !formData.goal.trim();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!skillRef.current?.contains(e.target) && !goalRef.current?.contains(e.target)) {
        setSuggestionState({ type: null, value: '' });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkillInput('');
      setSuggestionState({ type: null, value: '' });
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInvalid) onSubmit(formData);
  };

  return (
    <div className="relative group p-1 transition-all">
      <form onSubmit={handleSubmit} className="minimal-card p-10 space-y-10">
        <header className="space-y-2">
          <h2 className="text-3xl font-bold text-text-main tracking-tight leading-none">
            Strategic <span className="text-primary italic">Audit.</span>
          </h2>
          <p className="text-xs uppercase font-bold tracking-widest text-text-muted opacity-40">AI Skill Analysis</p>
        </header>

        <div className="space-y-8">
          {/* Skill Tag Area */}
          <div className="space-y-4 relative" ref={skillRef}>
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Current Expertise</label>
              <span className="text-[10px] font-semibold text-text-muted/40 uppercase italic tracking-wider">Comma separated</span>
            </div>
            <div className={`
              aesthetic-input min-h-[120px] p-3 flex flex-wrap gap-2 items-start transition-all cursor-text
              ${suggestionState.type === 'skills' ? 'ring-4 ring-indigo-500/10' : 'focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/20'}
            `} onClick={() => skillRef.current.querySelector('input').focus()}>
              {formData.skills.map((skill, i) => (
                <div key={i} className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white/70">×</button>
                </div>
              ))}
              <input
                type="text"
                className="bg-transparent border-none outline-none flex-grow min-w-[100px] text-sm text-text-main font-bold p-1 placeholder:text-text-muted/40"
                placeholder={formData.skills.length === 0 ? "e.g. React" : ""}
                value={skillInput}
                onChange={(e) => { setSkillInput(e.target.value); setSuggestionState({ type: 'skills', value: e.target.value }); }}
                onFocus={() => setSuggestionState({ type: 'skills', value: skillInput })}
              />
            </div>

            {/* Compact Suggestions: Skills */}
            {suggestionState.type === 'skills' && filteredSkills.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-full z-[300] bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[1.5rem] p-2 shadow-2xl animate-fade-in-up">
                <div className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2 px-3 opacity-40">Relevant Expertise</div>
                {filteredSkills.map((skill, i) => (
                  <button key={i} type="button" onClick={() => addSkill(skill)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-text-main hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-between group mb-1 last:mb-0">
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] opacity-30">✨</span>
                      {skill}
                    </span>
                    <span className="text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 uppercase tracking-widest">+ Add</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goal Input */}
          <div className="space-y-3 relative" ref={goalRef}>
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Target Ambition</label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Architect"
              className="aesthetic-input px-6 py-4"
              value={formData.goal}
              onChange={(e) => { setFormData({ ...formData, goal: e.target.value }); setSuggestionState({ type: 'goal', value: e.target.value }); }}
              onFocus={() => setSuggestionState({ type: 'goal', value: formData.goal })}
            />
            {/* Compact Suggestions: Goals */}
            {suggestionState.type === 'goal' && filteredRoles.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-full z-[300] bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[1.5rem] p-2 shadow-2xl animate-fade-in-up">
                <div className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2 px-3 opacity-40">Career Trajectories</div>
                {filteredRoles.map((role, i) => (
                  <button key={i} type="button" onClick={() => setFormData({ ...formData, goal: role })} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-text-main hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-between group mb-1 last:mb-0">
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] opacity-30">🎯</span>
                      {role}
                    </span>
                    <span className="text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 uppercase tracking-widest">Select</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 pt-2">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Seniority Level</label>
              <select className="aesthetic-input appearance-none bg-[var(--card-bg)] font-bold text-sm cursor-pointer border border-[var(--border-color)]" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="experienced">Experienced</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Target Market segment</label>
              <select className="aesthetic-input appearance-none bg-[var(--card-bg)] font-bold text-sm cursor-pointer border border-[var(--border-color)]" value={formData.targetType} onChange={(e) => setFormData({ ...formData, targetType: e.target.value })}>
                <option value="startup">Startup Growth</option>
                <option value="product">Product-Based Corp</option>
                <option value="faang">FAANG / Big Tech</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => playClick()}
          disabled={isLoading || isInvalid}
          className={`btn-aesthetic bg-primary w-full py-5 text-sm font-black tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 active:scale-90 transition-all duration-200 ${isLoading || isInvalid ? 'opacity-30 grayscale pointer-events-none' : ''}`}
        >
          {isLoading ? 'Architecting...' : 'Architect My Future'}
        </button>
      </form>
    </div>
  );
};

export default React.memo(InputForm);
