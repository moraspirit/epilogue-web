import React from 'react';

export default function Lineup({ onBuyTickets, onFlyerSubmission }) {
  return (
    <div className="bg-surface-container-lowest" id="lineup">
      {/* ──── SCENE 1: HEADLINING ──── */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-gutter overflow-hidden w-full max-w-container-max mx-auto">
        <h2 
          className="reveal font-display-lg text-4xl sm:text-6xl lg:text-display-lg mb-12 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative"
        >
          HEADLINING
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-lg sm:text-2xl lg:text-headline-md tracking-normal font-sans">HEADLINING</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Band Card */}
          <div 
            className="reveal relative group overflow-hidden rounded-2xl glass-panel border-glow shadow-2xl aspect-[16/10] lg:aspect-[4/3] w-full"
          >
            <img 
              alt="Daddy Band Portrait" 
              className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700" 
              src={`${import.meta.env.BASE_URL}band/daddy_1.jpg`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full flex justify-between items-end gap-4">
              <h3 className="font-headline-lg text-3xl sm:text-5xl lg:text-headline-lg text-white leading-tight drop-shadow-md">DADDY</h3>
              <span className="bg-primary-container text-on-primary-fixed px-4 py-1.5 rounded-full font-label-caps text-xs sm:text-sm whitespace-nowrap shadow-lg">MAIN STAGE</span>
            </div>
          </div>

          {/* About Band Info */}
          <div className="reveal flex flex-col gap-8">
            <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-outline-variant/10 shadow-2xl bg-[#121414]/40 backdrop-blur-md">
              <h3 className="font-headline-md text-2xl sm:text-3xl mb-6 text-white tracking-wide">ABOUT THE BAND</h3>
              <p className="font-body-lg text-base sm:text-lg text-gray-300 dark:text-secondary-fixed-dim mb-8 leading-relaxed">
                Daddy is known for blending powerful pop-rock anthems with a constantly evolving sound. Their music is driven by passion, intensity, and a desire to push beyond what's expected. After setting the stage ablaze at Epilogue'23 with a performance that had the crowd on its feet, Daddy returns to the big stage, bringing the same passion, energy, and musical excellence once again. Get ready to witness the energy of Daddy as they take the stage at Epilogue '26, delivering a performance that will ignite the crowd and leave an unforgettable mark on the night.
              </p>
              <div className="flex gap-4">
                <span className="px-5 py-2.5 border border-outline-variant/30 rounded-lg font-label-caps text-xs sm:text-sm text-gray-400 hover:text-white hover:border-green-500 transition-all duration-300 cursor-pointer bg-white/5">ICONIC</span>
                <span className="px-5 py-2.5 border border-outline-variant/30 rounded-lg font-label-caps text-xs sm:text-sm text-gray-400 hover:text-white hover:border-green-500 transition-all duration-300 cursor-pointer bg-white/5">LEGENDARY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── SCENE 2: ARTIST LINEUP ──── */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-gutter overflow-hidden w-full max-w-container-max mx-auto border-t border-outline-variant/10">
        <div className="reveal mb-12 sm:mb-16">
          <h3 className="font-display-lg text-3xl sm:text-5xl lg:text-headline-md mb-6 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            ARTIST LINEUP
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-xl sm:text-3xl lg:text-display-sm tracking-normal font-sans">ARTIST LINEUP</span>
          </h3>
          <p className="font-body-lg text-base sm:text-lg text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            From chart-topping hits to breathtaking live shows, these artists have left a lasting mark on Sri Lankan music. Their presence on stage has earned them a special place in the hearts of audiences across the country.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full mb-12">
          {/* Artist 1 Card */}
          <div 
            className="reveal glass-panel p-8 sm:p-10 rounded-3xl border border-green-500/20 shadow-[0_8px_32px_rgba(34,255,68,0.05)] flex flex-col bg-[#121414]/60 relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <span className="text-[11px] font-label-caps tracking-widest px-4 py-1.5 rounded-full font-bold bg-green-500/10 text-green-400 border border-green-500/30">
                ARTIST NO. 1 CLUES
              </span>
              <span className="material-symbols-outlined text-green-400 text-3xl animate-pulse">help</span>
            </div>
            
            <h4 className="font-headline-md text-2xl sm:text-3xl mb-8 text-white uppercase tracking-wider font-extrabold relative z-10">
              WHO ARE THEY?
            </h4>
            
            <ul className="space-y-5 flex-grow relative z-10">
              {[
                "They have achieved over 50 number-one hit singles and six platinum-selling albums since beginning their journey in 1998.",
                "They are the only Sri Lankan hip-hop act to have collaborated with legendary Indian vocalists, including a voice from Bollywood's golden era and a Grammy-associated artist.",
                "They have performed at more than 1,500 concerts in Sri Lanka and around the world."
              ].map((clue, index) => (
                <li key={index} className="flex items-start gap-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <span className="text-green-400 mt-1 text-lg font-bold">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Artist 2 Card */}
          <div 
            className="reveal glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/20 shadow-[0_8px_32px_rgba(6,182,212,0.05)] flex flex-col bg-[#121414]/60 relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <span className="text-[11px] font-label-caps tracking-widest px-4 py-1.5 rounded-full font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ARTIST NO. 2 CLUES
              </span>
              <span className="material-symbols-outlined text-cyan-400 text-3xl animate-pulse">help</span>
            </div>
            
            <h4 className="font-headline-md text-2xl sm:text-3xl mb-8 text-white uppercase tracking-wider font-extrabold relative z-10">
              WHO IS SHE?
            </h4>
            
            <ul className="space-y-5 flex-grow relative z-10">
              {[
                "She is the youngest musician ever to receive an A-Grade accreditation from the Sri Lanka Broadcasting Corporation.",
                "A light lyric soprano, she possesses an impressive four-octave vocal range, including a whistle register.",
                "She had the honour of performing alongside one of Sri Lanka's most celebrated and respected vocalists on a memorable musical collaboration."
              ].map((clue, index) => (
                <li key={index} className="flex items-start gap-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <span className="text-cyan-400 mt-1 text-lg font-bold">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="reveal flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg mx-auto pb-16">
          {/* Hiding Flyer Submission button for now */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFlyerSubmission();
            }}
            className="w-full sm:w-auto border border-green-700 dark:border-primary-container text-green-700 dark:text-primary-container px-8 py-3.5 rounded font-sans text-sm font-bold tracking-wide hover:bg-green-700/10 dark:hover:bg-primary-container/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>FLYER CHALLENGE</span>
          </button>
         
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onBuyTickets();
            }}
            className="w-full sm:w-auto bg-green-700 dark:bg-primary-container text-white dark:text-on-primary-fixed px-8 py-3.5 rounded font-sans text-sm font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,255,68,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            <span>BUY TICKETS</span>
          </button>
        </div>
      </section>
    </div>
  );
}
