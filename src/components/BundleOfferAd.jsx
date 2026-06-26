import React, { useState, useEffect } from 'react';

export default function BundleOfferAd({ onReserve }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Target is June 29th, 2026, 11:59:59 PM SL Time
    const target = new Date('2026-06-29T23:59:59+05:30').getTime();

    const checkTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <section className="w-full relative z-50 py-16 bg-[#0c0f0f] overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-[#121414]/80 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-3xl shadow-2xl">
          
          {/* Ad Image / Flyer */}
          <div className="w-full max-w-sm md:max-w-md shrink-0 transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src={`${import.meta.env.BASE_URL}bundle_offer.webp`} 
              alt="Bundle Offer Deal" 
              loading="lazy"
              fetchPriority="low"
              className="w-full h-auto rounded-xl shadow-[0_10px_30px_rgba(34,255,68,0.2)] object-contain"
            />
          </div>

          {/* Ad Content & Timer */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            
            <div className="mb-6">
              <h2 className="font-sans text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                Epic <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Bundle Deal</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
                Grab 5 tickets for a massive discount! Bring your squad and experience the musical brilliance of Epilogue '26 together.
              </p>
            </div>

            <div className="w-full space-y-6">
              <div className="inline-block bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider animate-pulse">
                Offer is Live Now!
              </div>
              
              <div className="w-full bg-[#0c0f0f]/80 border border-green-500/20 p-5 rounded-2xl mb-4">
                <h3 className="font-label-caps text-xs text-green-500 tracking-widest uppercase mb-4 font-bold">
                  Offer Ends In...
                </h3>
                <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
                  {[
                    { value: timeLeft.days, label: 'DAYS' },
                    { value: timeLeft.hours, label: 'HRS' },
                    { value: timeLeft.minutes, label: 'MINS' },
                    { value: timeLeft.seconds, label: 'SECS' },
                  ].map((item, idx) => (
                    <React.Fragment key={item.label}>
                      {idx > 0 && <div className="text-green-700 text-2xl md:text-3xl self-start mt-1 animate-pulse">:</div>}
                      <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-mono text-white font-bold">{pad(item.value)}</span>
                        <span className="font-label-caps text-[9px] text-gray-500 mt-2 tracking-widest font-bold">{item.label}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <button 
                  onClick={onReserve}
                  className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(34,255,68,0.3)] hover:shadow-[0_0_30px_rgba(34,255,68,0.5)] transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
                >
                  <span>Reserve Bundle Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <p className="text-[10px] text-gray-500 mt-3 font-mono tracking-wide uppercase">Offer valid until 29th, 11:59 PM</p>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
