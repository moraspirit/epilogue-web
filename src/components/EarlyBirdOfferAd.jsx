import React, { useState, useEffect } from 'react';

export default function EarlyBirdOfferAd({ onReserve }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date('2026-07-13T23:59:59+05:30').getTime();

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

  // Auto-hide after deadline
  const now = new Date();
  const deadline = new Date('2026-07-13T23:59:59+05:30');
  if (now > deadline) return null;

  return (
    <section className="w-full relative z-50 py-16 bg-[#0c0f0f] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-green-500/10 to-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 bg-[#121414]/90 backdrop-blur-md border border-green-500/20 p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-tl-[2rem] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-br-[2rem] pointer-events-none" />

          {/* Flyer Image - Left Side */}
          <div className="w-full md:w-1/2 flex justify-center relative z-10">
            <img 
              src="/early_bird_offer.jpeg" 
              alt="Early Bird Offer - Last Chance" 
              className="w-full max-w-sm lg:max-w-md h-auto rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.15)] object-contain border border-green-500/20"
            />
          </div>

          {/* Ad Content - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10">

            {/* Heading */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
                ⏰ Last Chance
              </span>
              <h2 className="font-headline-md text-2xl md:text-3xl text-white tracking-wide uppercase mb-2">
                Early Bird <span className="text-green-400">Ends Soon</span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                No more extensions. No second chances.<br className="hidden md:block" />
                <span className="text-green-300 font-semibold">Once it's over, it's over.</span>
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="w-full grid grid-cols-3 gap-2 md:gap-3 mb-6">
              {[
                { type: 'Standard', price: '1,200', note: 'Undergrads' },
                { type: 'Premium', price: '1,600', note: 'Undergrads' },
                { type: 'Alumni', price: '2,300', note: 'All' },
              ].map((tier) => (
                <div key={tier.type} className="bg-[#0a0c0c] border border-green-500/10 p-3 md:p-4 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{tier.type}</span>
                  <span className="text-lg md:text-xl font-mono text-white font-bold">Rs. {tier.price}</span>
                  <span className="text-[8px] md:text-[9px] text-gray-600 mt-0.5">{tier.note}</span>
                </div>
              ))}
            </div>

            {/* Timer Box */}
            <div className="w-full bg-[#0a0c0c] border border-green-500/20 p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center shadow-inner mb-6">
              <h3 className="font-label-caps text-[10px] md:text-xs text-green-500 tracking-widest uppercase mb-3 md:mb-4 font-bold flex items-center gap-2">
                Offer Ends In
              </h3>
              <div className="flex gap-2 md:gap-4 justify-center">
                {[
                  { value: timeLeft.days, label: 'DAYS' },
                  { value: timeLeft.hours, label: 'HRS' },
                  { value: timeLeft.minutes, label: 'MINS' },
                  { value: timeLeft.seconds, label: 'SECS' },
                ].map((item, idx) => (
                  <React.Fragment key={item.label}>
                    {idx > 0 && <div className="text-green-700 text-xl md:text-2xl self-start mt-0.5 md:mt-1">:</div>}
                    <div className="flex flex-col items-center min-w-[2.5rem] md:min-w-[3.5rem]">
                      <span className="text-2xl md:text-3xl font-mono text-white font-bold">{pad(item.value)}</span>
                      <span className="font-label-caps text-[8px] md:text-[9px] text-gray-500 mt-1 md:mt-2 tracking-widest font-bold">{item.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full">
              <button 
                onClick={onReserve}
                className="w-full text-white font-bold py-3.5 md:py-5 px-6 md:px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_35px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                <span>Reserve Your Tickets Now</span>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-4 font-mono tracking-wide uppercase text-center md:text-left">Early bird pricing ends July 13th, 11:59 PM</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
