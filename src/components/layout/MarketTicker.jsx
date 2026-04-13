import React from 'react';

/**
 * MarketTicker - Live Professional Velocity Indicator
 * Provides a real-time 'Pulse' of the global job market using a performant marquee loop.
 */
const MarketTicker = () => {
  const marketInsights = [
    { label: "Frontend Roles", value: "Trending (+12%)", color: "text-indigo-500" },
    { label: "React Mastery", value: "High Demand", color: "text-blue-500" },
    { label: "AI Engineers", value: "Jobs up 30%", color: "text-emerald-500" },
    { label: "Remote Strategy", value: "FAANG Standard", color: "text-purple-500" },
    { label: "Next.js 14", value: "Top Skill Q3", color: "text-indigo-400" },
    { label: "Web3/Solana", value: "Emerging Markets", color: "text-amber-500" },
  ];

  // Double the list for seamless looping
  const duplicatedInsights = [...marketInsights, ...marketInsights];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1001] bg-[var(--card-bg)] backdrop-blur-3xl border-t border-[var(--border-color)] h-10 flex items-center overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedInsights.map((insight, i) => (
          <div key={i} className="flex items-center gap-3 px-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">
              {insight.label}
            </span>
            <div className={`h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${insight.color}`}>
              {insight.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MarketTicker);
