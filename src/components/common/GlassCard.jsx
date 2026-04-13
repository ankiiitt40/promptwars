import React from 'react';

const GlassCard = ({ children, className = "", title }) => {
  return (
    <div className={`minimal-card ${className}`}>
      {title && (
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-6 ml-1">
          {title}
        </h3>
      )}
      <div className="content-root">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
