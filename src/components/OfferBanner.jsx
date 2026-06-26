import React, { useState, useEffect } from 'react';

export default function OfferBanner({ onReserve }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Target is June 29th, 2026, 11:59:59 PM SL Time
    const target = new Date('2026-06-29T23:59:59+05:30').getTime();

    const checkTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setIsVisible(false);
        return true;
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        return false;
      }
    };

    if (!checkTime()) {
      const interval = setInterval(() => {
        if (checkTime()) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!isVisible) return null;

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="fixed bottom-0 md:bottom-auto md:top-0 left-0 w-full z-[100] bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white flex items-center justify-center px-4 py-2 text-xs md:text-sm shadow-[0_-5px_20px_rgba(34,255,68,0.2)] md:shadow-[0_5px_20px_rgba(34,255,68,0.2)] border-t md:border-t-0 md:border-b border-green-500/50 h-[60px] md:h-[40px]">
      <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full max-w-container-max mx-auto justify-center">
        
        <div className="flex items-center gap-2">
          <span className="hidden md:inline font-bold tracking-wider uppercase text-green-300">🔥 Epic Bundle Deal</span>
          <span className="font-semibold uppercase tracking-wider text-[10px] md:text-sm">Offer Ends In:</span>
          
          <div className="flex gap-1 font-mono text-[11px] md:text-sm font-bold bg-black/40 px-2 py-0.5 rounded border border-green-500/30">
            <span>{pad(timeLeft.days)}d</span>
            <span className="opacity-50">:</span>
            <span>{pad(timeLeft.hours)}h</span>
            <span className="opacity-50">:</span>
            <span>{pad(timeLeft.minutes)}m</span>
            <span className="opacity-50">:</span>
            <span>{pad(timeLeft.seconds)}s</span>
          </div>
        </div>

        <button 
          onClick={onReserve}
          className="bg-green-500 hover:bg-green-400 text-black px-4 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_10px_rgba(34,255,68,0.3)]"
        >
          Grab Now
        </button>

      </div>
    </div>
  );
}
