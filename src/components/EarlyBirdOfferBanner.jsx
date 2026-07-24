import React from 'react';

export default function EarlyBirdOfferBanner({ onReserve }) {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 border-b border-emerald-500/30 py-1.5 px-3 text-center shadow-md">
      <div className="max-w-container-max mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-sans text-white">
        <span className="flex items-center gap-1 font-bold text-emerald-400 uppercase tracking-wider text-[11px] sm:text-xs">
          <span className="animate-pulse">🔥</span> EARLY BIRD BUNDLE:
        </span>
        <span className="text-gray-200 text-[11px] sm:text-xs">
          5 Tickets for <strong className="text-green-400 font-mono">Rs. 6,500.00</strong>
        </span>
        <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
          SAVE RS. 500
        </span>
        <button
          onClick={onReserve}
          className="bg-green-500 hover:bg-green-400 text-black font-black text-[10px] sm:text-xs uppercase px-2.5 py-0.5 rounded transition-all shadow-[0_0_8px_rgba(34,197,94,0.4)] hover:scale-105"
        >
          RESERVE BUNDLE
        </button>
      </div>
    </div>
  );
}
