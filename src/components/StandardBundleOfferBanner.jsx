import React, { useState, useEffect } from 'react';

export default function StandardBundleOfferBanner({ onReserve }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [offerEnded, setOfferEnded] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-07-26T23:59:59').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setOfferEnded(true);
        setTimeLeft('ENDED');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const dStr = days > 0 ? `${days}d ` : '';
        setTimeLeft(`${dStr}${hours}h ${minutes}m`);
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 border-b border-emerald-500/30 py-1.5 px-3 text-center shadow-md">
      <div className="max-w-container-max mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-sans text-white">
        <span className="flex items-center gap-1 font-bold text-emerald-400 uppercase tracking-wider text-[11px] sm:text-xs">
          <span className="animate-pulse">🔥</span> {offerEnded ? 'OFFER EXPIRED' : `ENDS IN: ${timeLeft}`}
        </span>
        <span className="hidden sm:inline-block text-gray-200 text-[11px] sm:text-xs">
          GENERAL BUNDLE: 5 Tickets for <strong className="text-green-400 font-mono">Rs. 6,500.00</strong>
        </span>
        <span className="hidden md:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
          SAVE RS. 500
        </span>
        <button
          onClick={onReserve}
          disabled={offerEnded}
          className={`${offerEnded ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 text-black hover:scale-105 shadow-[0_0_8px_rgba(34,197,94,0.4)]'} font-black text-[10px] sm:text-xs uppercase px-2.5 py-0.5 rounded transition-all`}
        >
          {offerEnded ? 'ENDED' : 'RESERVE BUNDLE'}
        </button>
      </div>
    </div>
  );
}
