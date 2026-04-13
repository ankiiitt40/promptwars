import React, { useState, useEffect } from 'react';
import AdvancedCard from '../common/AdvancedCard';
import Modal from '../common/Modal';
import { useGoogleIntegration } from '../../hooks/useGoogleIntegration';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { formatPlanAsText, downloadTextFile } from '../../utils/exporter';

/**
 * CareerStrategizer Component - Staggered Reveal Edition
 * Implements a sequential 'AI Thinking' reveal to guide user focus.
 */
const CareerStrategizer = ({ plan }) => {
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Typewriter Hook: Simulates AI generation for long-form insights
  const useTypewriter = (text, speed = 5, startAfter = 0) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
      if (!text) return;
      
      const startTimer = setTimeout(() => {
        setStarted(true);
        let i = 0;
        const typingTimer = setInterval(() => {
          setDisplayedText(text.substring(0, i));
          i++;
          if (i > text.length) clearInterval(typingTimer);
        }, speed);
        return () => clearInterval(typingTimer);
      }, startAfter);

      return () => clearTimeout(startTimer);
    }, [text, speed, startAfter]);

    return displayedText;
  };

  const [visibleLevel, setVisibleLevel] = useState(0);
  const { playClick, playTick } = useSoundEffects();
  const { syncing, message, addToCalendar, saveToDrive, clearMessage } = useGoogleIntegration();

  const placementText = useTypewriter(plan?.insights?.placement, 10, 500);
  const curationText = useTypewriter(plan?.insights?.curation, 10, 800);
  const pacingText = useTypewriter(plan?.insights?.pacing, 10, 1100);

  // Sequential Reveal Logic: Cascades sections every 150ms
  useEffect(() => {
    if (plan) {
      // 1. Reset and start reveal cascade
      setVisibleLevel(0);
      const timer = setInterval(() => {
        setVisibleLevel(prev => {
          if (prev >= 6) {
            clearInterval(timer);
            return 6;
          }
          return prev + 1;
        });
      }, 150);

      // 2. Hydrate persistence
      const planId = `progress_${plan.level.replace(/\s+/g, '')}_${plan.score}`;
      const saved = localStorage.getItem(planId);
      if (saved) setCompletedTasks(JSON.parse(saved));
      
      // 3. High-score celebration
      if (plan.score > 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      return () => clearInterval(timer);
    }
  }, [plan]);

  const toggleTask = (taskId) => {
    playTick();
    const updated = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(updated);
    const planId = `progress_${plan.level.replace(/\s+/g, '')}_${plan.score}`;
    localStorage.setItem(planId, JSON.stringify(updated));
  };

  const handleDownload = () => downloadTextFile(formatPlanAsText(plan));
  const handlePrint = () => window.print();

  if (!plan) return null;

  const initialScore = plan.score;
  const tasksRemaining = plan.roadmap.length;
  const gainPerTask = (100 - initialScore) / tasksRemaining;
  const currentMastery = Math.min(100, Math.round(initialScore + (completedTasks.length * gainPerTask)));
  
  const STAGGER_STYLE = "transition-all duration-500 ease-out";
  const HIDDEN_STATE = "opacity-0 translate-y-6";
  const VISIBLE_STATE = "opacity-100 translate-y-0";

  return (
    <div className="relative space-y-12 font-body pb-20 select-none">
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[1000]">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`absolute top-0 left-${i*20} animate-confetti-fall delay-${i*100} text-3xl opacity-60`}>
              {['✨', '💎', '🚀', '🎯', '⚡'][i-1]}
            </div>
          ))}
        </div>
      )}

      {/* 🟢 STEP 1: Executive Dashboard */}
      <div className={`${STAGGER_STYLE} ${visibleLevel >= 0 ? VISIBLE_STATE : HIDDEN_STATE}`}>
        <AdvancedCard variant="result" className="relative overflow-hidden bg-white">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * currentMastery) / 100} className="text-primary transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-text-main tracking-tighter">{currentMastery}%</span>
                <span className="text-xs font-bold text-text-muted uppercase mt-1 tracking-widest">Mastery</span>
              </div>
            </div>
            <div className="flex-1 w-full space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <span className="text-xs font-bold uppercase text-primary tracking-widest block mb-2">Growth Tier: {plan.level}</span>
                  <h2 className="text-2xl font-bold text-text-main tracking-tight leading-none">Strategic Review</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { playClick(); handlePrint(); }} className="px-5 py-3 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest active:scale-95 shadow-xl shadow-indigo-500/20">📄 Export PDF</button>
                  <button onClick={() => { playClick(); setCalendarModalOpen(true); }} className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl font-black text-[9px] uppercase tracking-widest active:scale-95">🗓️ Sync</button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase text-text-muted tracking-widest">
                  <span>Strategy Execution</span>
                  <span className="text-primary">{Math.round((completedTasks.length / plan.roadmap.length) * 100)}% Actioned</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${(completedTasks.length / plan.roadmap.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </AdvancedCard>
      </div>

      {/* 🟢 STEP 2: Intelligence Audit Gauges */}
      <section className={`${STAGGER_STYLE} px-2 ${visibleLevel >= 1 ? VISIBLE_STATE : HIDDEN_STATE}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Skill Synergy", value: Math.round(initialScore + 5), color: "text-indigo-500", desc: "Clarity of existing expertise vs target" },
            { label: "Market Velocity", value: initialScore < 40 ? 88 : 94, color: "text-emerald-500", desc: "Hiring momentum for this trajectory" },
            { label: "Path Complexity", value: plan.roadmap.length * 10, color: "text-amber-500", desc: "Level of strategic effort required" },
          ].map((gauge, i) => (
            <div key={i} className="minimal-card flex items-center gap-6 p-6">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * gauge.value) / 100} className={`${gauge.color} transition-all duration-1000`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-text-main">
                  {gauge.value}%
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1 truncate">{gauge.label}</h4>
                <p className="text-[9px] font-bold text-text-muted/60 uppercase italic tracking-wider leading-tight">{gauge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟢 STEP 3: System Rationale */}
      <section className={`${STAGGER_STYLE} px-2 ${visibleLevel >= 2 ? VISIBLE_STATE : HIDDEN_STATE}`}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6 ml-1 opacity-60">System Rationale</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl shadow-soft">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Placement</h4>
            <p className="text-xs text-text-muted leading-relaxed font-semibold italic min-h-[4rem]">{placementText}</p>
          </div>
          <div className="p-6 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl shadow-soft">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">Skill Curation</h4>
            <p className="text-xs text-text-muted leading-relaxed font-semibold italic min-h-[4rem]">{curationText}</p>
          </div>
          <div className="p-6 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl shadow-soft">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">Strategic Pacing</h4>
            <p className="text-xs text-text-muted leading-relaxed font-semibold italic min-h-[4rem]">{pacingText}</p>
          </div>
        </div>
      </section>

      {/* 🔴 Reports Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* 🟢 STEP 4: Roadmap */}
        <div className={`md:col-span-2 ${STAGGER_STYLE} ${visibleLevel >= 3 ? VISIBLE_STATE : HIDDEN_STATE}`} id="roadmap">
          <AdvancedCard title="Execution Protocol" variant="roadmap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {plan.roadmap.map((step) => (
                <div key={step.id} onClick={() => toggleTask(step.id)} className={`flex gap-5 p-5 rounded-[2.5rem] border transition-all cursor-pointer group ${completedTasks.includes(step.id) ? 'bg-[var(--input-bg)] opacity-50 border-[var(--border-color)]' : 'bg-[var(--card-bg)] border-[var(--border-color)] hover:border-indigo-400 hover:shadow-2xl'}`}>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${completedTasks.includes(step.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-[var(--border-color)] bg-[var(--input-bg)]'}`}>
                    {completedTasks.includes(step.id) ? '✓' : ''}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted opacity-50">Day {step.day} Phase</h4>
                    <p className={`text-sm leading-relaxed font-bold ${completedTasks.includes(step.id) ? 'line-through opacity-40' : 'text-text-main'}`}>{step.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdvancedCard>
        </div>

        {/* 🟢 STEP 5: Skill Gap */}
        <div className={`${STAGGER_STYLE} ${visibleLevel >= 4 ? VISIBLE_STATE : HIDDEN_STATE}`}>
          <AdvancedCard title="Skill Gap Audit" variant="skill">
            <ul className="space-y-5">
              {plan.skillGap.map((gap, i) => (
                <li key={i} className="flex gap-4 text-sm font-bold text-text-muted items-start group">
                  <div className="w-6 h-6 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">{i+1}</div>
                  <span className="pt-0.5 group-hover:text-indigo-400 transition-colors">{gap}</span>
                </li>
              ))}
            </ul>
          </AdvancedCard>
        </div>

        {/* 🟢 STEP 6: Projects */}
        <div className={`${STAGGER_STYLE} ${visibleLevel >= 5 ? VISIBLE_STATE : HIDDEN_STATE}`}>
          <AdvancedCard title="Growth Suggestions" variant="skill">
            <ul className="space-y-5">
              {plan.recommendedSkills.map((skill, i) => (
                <li key={i} className="flex gap-4 text-sm font-bold text-text-muted items-start group">
                  <div className="w-6 h-6 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[10px] font-black group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0">✓</div>
                  <span className="pt-0.5 group-hover:text-purple-400 transition-colors">{skill}</span>
                </li>
              ))}
            </ul>
          </AdvancedCard>
        </div>

        {/* 🟢 STEP 7: Resume Tips */}
        <div className={`md:col-span-2 ${STAGGER_STYLE} ${visibleLevel >= 6 ? VISIBLE_STATE : HIDDEN_STATE}`}>
          <AdvancedCard title="Strategic Guidance">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plan.resumeTips.map((tip, i) => (
                  <div key={i} className="p-4 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 flex gap-4 items-start">
                    <span className="text-lg">💡</span>
                    <p className="text-xs font-bold text-text-muted leading-relaxed pt-1">{tip.text}</p>
                  </div>
                ))}
             </div>
          </AdvancedCard>
        </div>

        {/* 🟢 STEP 8: YouTube Masterclass Integration (Elite Google Service) */}
        <div className={`md:col-span-2 ${STAGGER_STYLE} ${visibleLevel >= 6 ? VISIBLE_STATE : HIDDEN_STATE}`}>
           <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff0000] mb-4 ml-1 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[#ff0000] animate-pulse"></span>
             Direct Learning Ecosystem
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             {plan.skillGap.slice(0, 3).map((skill, i) => (
               <a 
                key={i} 
                href={`https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skill)}+masterclass`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="minimal-card p-6 group hover:border-[#ff0000]/30 transition-all flex flex-col justify-between"
               >
                 <div>
                   <span className="text-2xl mb-4 block">🎥</span>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 opacity-60">Masterclass</h4>
                   <p className="text-sm font-bold text-text-main group-hover:text-[#ff0000] transition-colors">{skill}</p>
                 </div>
                 <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-text-muted">
                    Open YouTube
                    <span className="opacity-0 group-hover:opacity-100 transition-all">→</span>
                 </div>
               </a>
             ))}
           </div>
        </div>

      </div>

      <Modal isOpen={isCalendarModalOpen} onClose={() => setCalendarModalOpen(false)} title="Strategic Schedule">
        <p className="text-sm text-text-muted leading-relaxed mb-10">Download your 10-day intensive roadmap as a calendar schedule.</p>
        <button onClick={() => { playClick(); addToCalendar(plan.roadmap); setCalendarModalOpen(false); }} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-xl">Generate Schedule</button>
      </Modal>
    </div>
  );
};

export default React.memo(CareerStrategizer);
