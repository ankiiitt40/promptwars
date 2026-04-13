import React from 'react';

/**
 * SkeletonReport - Premium Architectural Blueprint
 * Perfectly synchronized with CareerStrategizer to eliminate layout shifts 
 * and provide a liquid, theme-aware 'SaaS Elite' loading experience.
 */
const SkeletonReport = () => {
  const SKELETON_BG = "bg-gray-200/60 dark:bg-gray-800/40";
  const SKELETON_ACCENT = "bg-gray-300/80 dark:bg-gray-700/60";
  
  return (
    <div className="space-y-12 animate-pulse px-2 overflow-hidden select-none">
      
      {/* 🚀 1. Executive Dashboard Skeleton */}
      <div className="relative overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[3rem] p-10 flex flex-col lg:flex-row items-center gap-10 shadow-sm backdrop-blur-xl">
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
        <div className={`w-32 h-32 ${SKELETON_BG} rounded-full shrink-0 border-4 border-[var(--border-color)]`} />
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-3">
            <div className={`h-3 w-32 ${SKELETON_ACCENT} rounded-full opacity-40`} />
            <div className={`h-12 w-[80%] ${SKELETON_ACCENT} rounded-2xl`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className={`h-2 w-20 ${SKELETON_BG} rounded-full`} />
              <div className={`h-2 w-12 ${SKELETON_BG} rounded-full`} />
            </div>
            <div className={`h-4 w-full ${SKELETON_BG} rounded-full overflow-hidden`} />
          </div>
        </div>
      </div>

      {/* 🔮 2. Intelligence Audit Gauges Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="relative overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[2rem] flex items-center gap-6 p-6 backdrop-blur-xl shadow-sm">
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <div className={`w-16 h-16 ${SKELETON_BG} rounded-full shrink-0`} />
            <div className="flex-1 space-y-3">
              <div className={`h-3 w-1/2 ${SKELETON_ACCENT} rounded-full opacity-30`} />
              <div className={`h-2.5 w-full ${SKELETON_BG} rounded-full`} />
            </div>
          </div>
        ))}
      </div>

      {/* 🏛️ 3. System Rationale Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="relative overflow-hidden p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[2.5rem] space-y-5 backdrop-blur-xl shadow-sm">
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <div className={`h-4 w-1/3 ${SKELETON_ACCENT} rounded-full opacity-30`} />
            <div className="space-y-2.5">
              <div className={`h-3 w-full ${SKELETON_BG} rounded-full`} />
              <div className={`h-3 w-full ${SKELETON_BG} rounded-full`} />
              <div className={`h-3 w-2/3 ${SKELETON_BG} rounded-full`} />
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 Reports Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* 🗺️ 4. Execution Protocol Placeholder */}
        <div className="relative overflow-hidden md:col-span-2 p-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[2.5rem] space-y-10 backdrop-blur-xl shadow-sm">
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          <div className={`h-4 w-40 ${SKELETON_ACCENT} rounded-full opacity-30`} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flex gap-5 p-6 border border-[var(--border-color)] rounded-[2rem] ${SKELETON_BG} opacity-30`}>
                 <div className={`w-12 h-12 ${SKELETON_ACCENT} rounded-full shrink-0`} />
                 <div className="flex-1 space-y-3">
                   <div className={`h-4 w-1/3 ${SKELETON_ACCENT} rounded-full`} />
                   <div className={`h-3 w-full ${SKELETON_BG} rounded-full`} />
                   <div className={`h-3 w-2/3 ${SKELETON_BG} rounded-full`} />
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🛠️ 5. Tactical Audits & Tips Skeleton */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="relative overflow-hidden p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[2.5rem] space-y-6 backdrop-blur-xl shadow-sm">
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <div className={`h-4 w-1/3 ${SKELETON_ACCENT} rounded-full opacity-30`} />
            <div className="space-y-3">
              <div className={`h-3 w-full ${SKELETON_BG} rounded-full`} />
              <div className={`h-3 w-full ${SKELETON_BG} rounded-full`} />
              <div className={`h-3 w-2/3 ${SKELETON_BG} rounded-full`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonReport;
