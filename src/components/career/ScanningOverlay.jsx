import React, { useState, useEffect } from 'react';

/**
 * ScanningOverlay - Cinematic AI Auditing Interface
 * Provides a high-fidelity 'Laser Scanning' experience to bridge the generation gap.
 */
const ScanningOverlay = ({ isVisible }) => {
  const [stage, setStage] = useState(0);
  const stages = [
    "Scanning Global Job Market...",
    "Analyzing Skill Patterns...",
    "Matching Career Paths...",
    "Generating Smart Roadmap...",
  ];

  useEffect(() => {
    if (!isVisible) {
      setStage(0);
      return;
    }
    
    const timer = setInterval(() => {
      setStage(prev => (prev + 1) % stages.length);
    }, 1200);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center pointer-events-auto overflow-hidden animate-fade-in">
      {/* 🌑 Deep Atmospheric Backdrop - Breathing Edition */}
      <div className="absolute inset-0 animate-bg-breathing duration-[4000ms]" />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />
      
      {/* 📡 Grid Interaction Layer - High-Density 'Strategic Particles' */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #6366f1 0.8px, transparent 0.8px)', backgroundSize: '30px 30px' }} />

      {/* ⚡ The Laser Scanner - Ultra-Hifi Edition */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_25px_rgba(99,102,241,1)] animate-laser z-20 blur-[1px]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-40 animate-laser z-25" />

      {/* 🏛️ Cinematic Content Central - Minimalist Edition */}
      <div className="relative z-30 flex flex-col items-center text-center space-y-12">
        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.6rem] text-primary/40 animate-pulse-soft">System Engine: Strategic Audit</p>
          <div className="h-10 flex items-center justify-center">
            <p className="text-2xl md:text-4xl font-black text-white tracking-tighter animate-text-premium transition-all duration-700">
              {stages[stage]}
            </p>
          </div>
        </div>

        {/* Binary Stream Footer (Visual Flavor) */}
        <div className="absolute bottom-[-100px] opacity-10 text-[8px] font-mono text-primary flex gap-4 overflow-hidden mask-fade-out">
          {Array.from({ length: 40 }).map((_, i) => (
             <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
               {Math.random() > 0.5 ? '1' : '0'}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScanningOverlay);
