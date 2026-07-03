import React, { useState, useEffect } from 'react';

export default function PremiumOfferBanner({ onReserve }) {
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

  // Display only after July 1st 6:45 PM (Mocked)
  const now = new Date();
  const startTime = new Date('2026-07-01T18:45:00+05:30');
  
  if (bundleStatus.remaining === 0 || now < startTime) {
    return null;
  }

  return (
    <div id="premium-offer-banner" className="fixed md:top-0 bottom-0 left-0 w-full z-[100] bg-green-100 border-t md:border-t-0 md:border-b border-green-300 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:shadow-[0_2px_10px_rgba(0,0,0,0.05)] pointer-events-auto h-12 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4 flex flex-row items-center justify-between md:justify-center gap-1 md:gap-6">
        
        {/* Left Side: Text */}
        <div className="flex flex-row items-center gap-1 md:gap-3 truncate">
          <div className="flex items-center gap-1 bg-green-800/10 px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-xs font-bold text-green-900 uppercase shrink-0 whitespace-nowrap">
            Premium Bundle Offer 🔥
          </div>
          <div className="text-green-950 text-[10px] md:text-sm font-semibold truncate whitespace-nowrap hidden md:block">
            <span className="font-normal">Get 5 Tickets for Rs. 7500</span>
            <span className="text-green-700 font-bold ml-1">(Save Rs. 500)</span>
          </div>
        </div>

        {/* Right Side: Timer & Button */}
        <div className="flex flex-row items-center gap-1.5 md:gap-4 shrink-0">
          <div className="flex flex-row gap-0.5 md:gap-1.5 bg-green-900/5 px-1.5 md:px-3 py-0.5 md:py-1 rounded border border-green-900/10 items-center">
            {[
              { value: timeLeft.days, label: 'D' },
              { value: timeLeft.hours, label: 'H' },
              { value: timeLeft.minutes, label: 'M' },
              { value: timeLeft.seconds, label: 'S' },
            ].map((item, idx) => (
              <div key={item.label} className="flex items-center gap-0.5 pt-[1px]">
                <span className="text-[11px] md:text-sm font-mono font-bold text-green-950 leading-none">{pad(item.value)}</span>
                <span className="text-[8px] md:text-[10px] font-bold text-green-700 leading-none">{item.label}</span>
                {idx < 3 && <span className="text-green-800/40 ml-0.5 md:ml-1 leading-none pb-[1px]">:</span>}
              </div>
            ))}
          </div>

          <button
            onClick={onReserve}
            disabled={bundleStatus.loading}
            className="whitespace-nowrap px-2 md:px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold text-[9px] md:text-xs uppercase tracking-wide rounded transition-transform transform hover:scale-105 shadow-sm"
          >
            Reserve
          </button>
        </div>

      </div>
    </div>
  );
}
