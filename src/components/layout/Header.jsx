import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-24 flex items-center justify-between px-10 z-[200] backdrop-blur-xl border-b border-slate-200/40 bg-white/30 selection:bg-primary/20">
      <div className="flex items-center gap-4 group cursor-pointer transition-transform hover:scale-[1.02]">
        <div className="relative w-14 h-14 overflow-hidden rounded-2xl shadow-xl shadow-indigo-500/10 border border-white/50 bg-white/20 p-1.5 backdrop-blur-sm">
          <img 
            src="/src/assets/logo.png" 
            alt="AI Career Copilot Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-text-main tracking-tighter leading-none mb-1">
            AI Career <span className="text-primary italic">Copilot</span>
          </h1>
          <p className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] opacity-60">Strategic Path Analysis</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="hover:text-primary transition-colors">Dashboard</a>
        <a href="#" className="hover:text-primary transition-colors">Career Path</a>
        <a href="#" className="hover:text-primary transition-colors">Skill Gap</a>
      </nav>

      <button className="px-6 py-2.5 bg-primary hover:bg-opacity-80 rounded-full font-semibold transition-all">
        Pro Account
      </button>
    </header>
  );
};

export default Header;
