import { useCallback, useRef, useEffect } from 'react';

/**
 * useSoundEffects Hook - High Fidelity Audio Synthesis
 * Uses Web Audio API to generate zero-latency haptic sounds without external files.
 */
export const useSoundEffects = () => {
  const audioCtx = useRef(null);

  useEffect(() => {
    // Lazy initialize AudioContext on user interaction
    const initCtx = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };
    window.addEventListener('mousedown', initCtx, { once: true });
  }, []);

  /**
   * playClick - Synthesizes a subtle, mechanical click sound.
   */
  const playClick = useCallback(() => {
    if (!audioCtx.current) return;
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.current.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  /**
   * playTick - Synthesizes a soft, clean "pop" for checklists.
   */
  const playTick = useCallback(() => {
    if (!audioCtx.current) return;
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.current.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.03, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.05);
  }, []);

  return { playClick, playTick };
};
