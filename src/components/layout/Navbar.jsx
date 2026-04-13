import React from 'react';
import logo from '../../assets/logo.png';
import { useSoundEffects } from '../../hooks/useSoundEffects';

/**
 * Navbar Component - Functional 3D Edition
 * Features actionable navigation links, theme toggling, and tactile haptics.
 */
const Navbar = () => {
  const { playClick } = useSoundEffects();
  const [isDark, setIsDark] = React.useState(() => document.body.getAttribute('data-theme') === 'dark');

  const toggleTheme = () => {
    playClick();
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.setAttribute('data-theme', newDark ? 'dark' : 'light');
    localStorage.setItem('career_copilot_theme', newDark ? 'dark' : 'light');
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('career_copilot_theme') || 'light';
    document.body.setAttribute('data-theme', saved);
    setIsDark(saved === 'dark');
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    playClick();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accommodate the fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[1000] animate-fade-in-down pointer-events-none">
      <div className="bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[2.5rem] px-6 md:px-10 py-4 flex items-center justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] pointer-events-auto">
        
        {/* Brand Link - Functional Scroll to Top */}
        <a 
          href="#top" 
          onClick={scrollToTop}
          className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-200 hover:scale-105 active:scale-90"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-soft border border-slate-100 flex items-center justify-center p-1.5 md:p-2 group-hover:shadow-xl transition-all">
            <img 
              src={logo} 
              alt="AI Career Copilot Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-xl font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
                AI Career Copilot
              </span>
            </h1>
            <p className="hidden md:block text-xs uppercase font-bold tracking-widest text-[var(--text-muted)] mt-1 opacity-60">Strategic Path Engine</p>
          </div>
        </a>

        {/* Desktop Navigation - Smooth Scroll Interface */}
        <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
          <a href="#audit" onClick={(e) => handleNavClick(e, 'audit-console')} className="hover:text-primary transition-all relative group/link active:opacity-60">
            Audit Console
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover/link:w-full" />
          </a>
          <a href="#dashboard" onClick={(e) => handleNavClick(e, 'mastery-dashboard')} className="hover:text-primary transition-all relative group/link active:opacity-60">
            Mastery Analytics
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover/link:w-full" />
          </a>
          <a href="#roadmap" onClick={(e) => handleNavClick(e, 'roadmap')} className="hover:text-primary transition-all relative group/link active:opacity-60">
            Roadmap
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover/link:w-full" />
          </a>
        </div>

        {/* Global Action Button - Active Depth */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-slate-100/10 border border-[var(--border-color)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-lg"
            title="Toggle Theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>

          <div className="h-4 w-[1px] bg-[var(--border-color)] hidden md:block" />
          
          <button onClick={() => { playClick(); scrollToTop(); }} className="px-4 md:px-6 py-2 md:py-3 bg-text-main text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-200 hover:bg-primary hover:scale-105 active:scale-90 shadow-lg shadow-black/5 whitespace-nowrap">
            Launch Pro
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
