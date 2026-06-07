

export default function Lineup() {
  return (
    <section className="py-20 px-4 md:px-gutter reveal bg-surface-container-lowest" id="lineup">
      <div className="max-w-container-max mx-auto">
        <h2 className="font-display-lg text-4xl sm:text-6xl lg:text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
          HEADLINING
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-lg sm:text-2xl lg:text-headline-md tracking-normal font-sans">HEADLINING</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-2xl glass-panel border-glow transition-all duration-500 shadow-2xl aspect-[4/3]">
            <img 
              alt="Daddy Band Portrait" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
              src={`${import.meta.env.BASE_URL}band/daddy_1.jpg`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0c0f0f] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 sm:p-8 w-full flex justify-between items-end gap-4">
              <h3 className="font-headline-lg text-2xl sm:text-4xl lg:text-headline-lg text-gray-900 dark:text-white leading-tight">DADDY</h3>
              <span className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps whitespace-nowrap">MAIN STAGE</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="glass-panel p-6 sm:p-8 rounded-xl">
              <h3 className="font-headline-md text-xl sm:text-headline-md mb-4 text-gray-900 dark:text-on-surface">ABOUT THE BAND</h3>
              <p className="font-body-lg text-sm sm:text-body-lg text-gray-700 dark:text-secondary-fixed-dim mb-6 leading-relaxed">
                Daddy is known for blending powerful pop-rock anthems with a constantly evolving sound. Their music is driven by passion, intensity, and a desire to push beyond what's expected. After setting the stage ablaze at Epilogue'23 with a performance that had the crowd on its feet, Daddy returns to the big stage, bringing the same passion, energy, and musical excellence once again. Get ready to witness the energy of Daddy as they take the stage at Epilogue '26, delivering a performance that will ignite the crowd and leave an unforgettable mark on the night.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">ICONIC</span>
                <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">LEGENDARY</span>
              </div>
            </div>

          </div>
        </div>

        {/* ──── SUPPORTING LINEUP / MYSTERY ACTS SECTION ──── */}
        <div className="mt-24 border-t border-outline-variant/10 pt-16">
          <h3 className="font-display-lg text-2xl sm:text-4xl lg:text-headline-md mb-6 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            ARTIST LINEUP
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-lg sm:text-2xl lg:text-headline-md tracking-normal font-sans">ARTIST LINEUP</span>
          </h3>
          
          <p className="font-body-lg text-sm sm:text-body-lg text-gray-600 dark:text-secondary-fixed-dim text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            From chart-topping hits to breathtaking live shows, these artists have left a lasting mark on Sri Lankan music. Their presence on stage has earned them a special place in the hearts of audiences across the country.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Artist 1 Card */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-green-500/20 hover:border-green-400/60 dark:border-primary-container/10 dark:hover:border-primary-container/40 shadow-xl hover:shadow-[0_12px_40px_rgba(34,255,68,0.15)] transition-all duration-500 hover:translate-y-[-6px] flex flex-col bg-[#121414]/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 dark:bg-primary-container/5 rounded-full blur-2xl group-hover:bg-green-500/10 dark:group-hover:bg-primary-container/10 transition-colors pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-label-caps tracking-widest px-3 py-1 rounded-full font-bold bg-green-500/10 text-green-700 dark:text-primary-container border border-green-500/20">
                  ARTIST NO. 1 CLUES
                </span>
                <span className="material-symbols-outlined text-green-700 dark:text-primary-container text-2xl animate-pulse">help</span>
              </div>
              
              <h4 className="font-headline-md text-xl sm:text-2xl mb-6 text-gray-900 dark:text-white uppercase tracking-wider font-extrabold">
                WHO ARE THEY?
              </h4>
              
              <ul className="space-y-4 flex-grow">
                {[
                  "They have achieved over 50 number-one hit singles and six platinum-selling albums since beginning their journey in 1998.",
                  "They are the only Sri Lankan hip-hop act to have collaborated with legendary Indian vocalists, including a voice from Bollywood's golden era and a Grammy-associated artist.",
                  "They have performed at more than 1,500 concerts in Sri Lanka and around the world."
                ].map((clue, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
                    <span className="text-green-700 dark:text-primary-container mt-1.5 font-bold">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artist 2 Card */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/20 hover:border-cyan-400/60 dark:border-cyan-500/10 dark:hover:border-cyan-400/40 shadow-xl hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] transition-all duration-500 hover:translate-y-[-6px] flex flex-col bg-[#121414]/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-label-caps tracking-widest px-3 py-1 rounded-full font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  ARTIST NO. 2 CLUES
                </span>
                <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-2xl animate-pulse">help</span>
              </div>
              
              <h4 className="font-headline-md text-xl sm:text-2xl mb-6 text-gray-900 dark:text-white uppercase tracking-wider font-extrabold">
                WHO IS SHE?
              </h4>
              
              <ul className="space-y-4 flex-grow">
                {[
                  "She is the youngest musician ever to receive an A-Grade accreditation from the Sri Lanka Broadcasting Corporation.",
                  "A light lyric soprano, she possesses an impressive four-octave vocal range, including a whistle register.",
                  "She had the honour of performing alongside one of Sri Lanka's most celebrated and respected vocalists on a memorable musical collaboration."
                ].map((clue, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
                    <span className="text-cyan-600 dark:text-cyan-400 mt-1.5 font-bold">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
