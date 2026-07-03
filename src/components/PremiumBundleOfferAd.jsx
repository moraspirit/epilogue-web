import React, { useState, useEffect } from 'react';

export default function PremiumBundleOfferAd({ onReserve }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [bundleStatus, setBundleStatus] = useState({ remaining: null, maxBundles: null, soldOutAt: null, loading: true });

  useEffect(() => {
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3005' : 'https://ticket.moraspirit.com';
    fetch(`${baseUrl}/api/tickets/premium-bundle-status`)
      .then(res => res.json())
      .then(data => {
        setBundleStatus({ remaining: data.remaining, maxBundles: data.maxBundles, soldOutAt: data.soldOutAt, loading: false });
      })
      .catch(() => setBundleStatus({ remaining: null, maxBundles: null, soldOutAt: null, loading: false }));
  }, []);

  useEffect(() => {
    // Target is July 5th, 2026, 11:59:59 PM SL Time
    const target = new Date('2026-07-05T23:59:59+05:30').getTime();

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

  // Display only after July 3rd 6:45 PM (Mocked for testing)
  const now = new Date();
  const startTime = new Date('2026-07-01T18:45:00+05:30');
  
  // If sold out or before start time, remove component completely
  if (bundleStatus.remaining === 0 || now < startTime) {
    return null;
  }

  // Calculate sold for progress display
  const bundlesSold = bundleStatus.maxBundles ? (bundleStatus.maxBundles - bundleStatus.remaining) : 0;
  const showProgress = bundlesSold >= 15;
  const progressPercent = bundleStatus.maxBundles ? Math.round((bundlesSold / bundleStatus.maxBundles) * 100) : 0;

  return (
    <section className="w-full relative z-50 py-16 bg-[#0c0f0f] overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/10 to-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 bg-[#121414]/90 backdrop-blur-md border border-cyan-500/20 p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-tl-[2rem] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-500/20 to-transparent rounded-br-[2rem] pointer-events-none" />

          {/* Flyer Image - Left Side */}
          <div className="w-full md:w-1/2 flex justify-center relative z-10">
            <img 
              src="/premium_bundle_offer.jpeg" 
              alt="Premium Bundle Offer" 
              className="w-full max-w-sm lg:max-w-md h-auto rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.15)] object-contain border border-cyan-500/20"
            />
          </div>

          {/* Ad Content - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10">

            <div className="w-full flex flex-col sm:flex-row md:flex-col gap-4 md:gap-6 mb-6 md:mb-8 justify-center md:justify-start items-stretch">
              
              {/* Timer Box */}
              <div className="flex-1 bg-[#0a0c0c] border border-cyan-500/20 p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                <h3 className="font-label-caps text-[10px] md:text-xs text-cyan-500 tracking-widest uppercase mb-3 md:mb-4 font-bold flex items-center gap-2">
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
                      {idx > 0 && <div className="text-cyan-700 text-xl md:text-2xl self-start mt-0.5 md:mt-1">:</div>}
                      <div className="flex flex-col items-center min-w-[2.5rem] md:min-w-[3.5rem]">
                        <span className="text-2xl md:text-3xl font-mono text-white font-bold">{pad(item.value)}</span>
                        <span className="font-label-caps text-[8px] md:text-[9px] text-gray-500 mt-1 md:mt-2 tracking-widest font-bold">{item.label}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Progress/Status Box */}
              {showProgress && (
                <div className="flex-1 bg-[#0a0c0c] border border-green-500/20 p-6 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                  <h3 className="font-label-caps text-xs text-green-500 tracking-widest uppercase mb-4 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Selling Fast!
                  </h3>
                  <div className="text-4xl font-mono text-white font-bold mb-2">
                    {progressPercent}%
                  </div>
                  <div className="text-green-400 font-bold tracking-wide uppercase text-sm">
                    Sold Out
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <button 
                onClick={onReserve}
                disabled={bundleStatus.loading}
                className={`w-full text-white font-bold py-3.5 md:py-5 px-6 md:px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transform hover:-translate-y-1 text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500`}
              >
                <span>{bundleStatus.loading ? 'Loading...' : 'Reserve Premium Bundle'}</span>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-4 font-mono tracking-wide uppercase text-center md:text-left">Strictly limited to 20 bundles only</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
