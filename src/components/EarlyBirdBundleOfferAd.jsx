import React from 'react';

export default function EarlyBirdBundleOfferAd({ onReserve }) {
  return (
    <section className="w-full relative z-30 py-16 bg-[#0a0c0c] overflow-hidden border-t border-b border-green-500/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-[#121515]/90 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
          
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-black text-xs font-black tracking-widest uppercase px-6 py-1.5 rounded-bl-2xl shadow-lg">
            LIMITED TIME OFFER
          </div>

          {/* Left Column: Official Flyer Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative z-10">
            <img
              src={`${import.meta.env.BASE_URL}early_bird_premium_bundle.jpeg`}
              alt="Early Bird Premium Bundle Offer"
              className="w-full max-w-sm lg:max-w-md h-auto rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.25)] object-contain border border-emerald-500/30 transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Right Column: Information & Action */}
          <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
              EPILOGUE '26 SPECIAL OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
              Bring Your Squad & Save Big
            </h2>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              Experience Sri Lanka's ultimate musical episode together. Get 5 tickets for just <strong className="text-green-400">Rs. 6,500.00</strong> (only Rs. 1,300 per ticket!).
            </p>

            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-gray-300 text-left">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Includes 5 full access concert tickets</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Only Rs. 1,300 per ticket (Rs. 500 total instant savings)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Single checkout reservation with 1 buyer index number</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onReserve}
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:to-emerald-500 text-white font-black text-base sm:text-lg uppercase py-4 px-8 rounded-2xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <span>RESERVE EARLY BIRD BUNDLE</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
