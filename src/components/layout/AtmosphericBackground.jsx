import React, { useEffect, useRef } from 'react';

/**
 * AtmosphericBackground - High Fidelity Parallax Engine
 * Uses CSS Variables and low-latency mouse tracking for deep spatial parallax.
 */
const AtmosphericBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse positions (-0.5 to 0.5)
      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;
      
      // Set CSS variables on the container
      containerRef.current.style.setProperty('--move-x', moveX);
      containerRef.current.style.setProperty('--move-y', moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ '--move-x': 0, '--move-y': 0 }}
    >
      {/* Dynamic Gradient Orbs - Elite Edition */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
        style={{ transform: 'translate(calc(var(--move-x) * 40px), calc(var(--move-y) * 40px))' }}
      />
      
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[140px] transition-transform duration-1000 delay-75 ease-out"
        style={{ transform: 'translate(calc(var(--move-x) * -60px), calc(var(--move-y) * -60px))' }}
      />
      
      <div 
        className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-blue-400/10 dark:bg-blue-500/15 rounded-full blur-[100px] transition-transform duration-1000 delay-150 ease-out"
        style={{ transform: 'translate(calc(var(--move-x) * 20px), calc(var(--move-y) * -30px))' }}
      />

      <div 
        className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full blur-[150px] transition-transform duration-1000 delay-300 ease-out"
        style={{ transform: 'translate(calc(var(--move-x) * -30px), calc(var(--move-y) * 60px))' }}
      />
    </div>
  );
};

export default React.memo(AtmosphericBackground);
