import React from 'react';

/**
 * AdvancedCard Component - Senior Frontend UI Kit
 * Implements modern 'Soft 3D' depth and interactive lift effects.
 */
const AdvancedCard = ({ children, title, variant = "default", className = "" }) => {
  const variants = {
    result: "border-l-4 border-l-primary",
    roadmap: "border-t-4 border-t-secondary",
    skill: "border-l-4 border-l-accent",
    default: "border border-slate-100"
  };

  return (
    <div className={`
      relative bg-[var(--card-bg)] p-8 rounded-[2rem] 
      shadow-xl shadow-slate-200/50 
      transition-all duration-200 ease-in-out 
      hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/10
      group cursor-default backdrop-blur-xl border border-[var(--border-color)]
      ${variants[variant] || variants.default}
      ${className}
    `}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 italic font-black text-primary text-[10px]">
            AI
          </div>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      
      {/* Subtle Bottom Glow on Hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
    </div>
  );
};

export default React.memo(AdvancedCard);
