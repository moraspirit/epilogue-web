import React, { useState, useEffect, useRef } from 'react';
import { Scene } from 'react-kino';

export default function Hero() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [bandImageLoaded, setBandImageLoaded] = useState(false);

  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const bandRef = useRef(null);
  const ambientGlowRef = useRef(null);

  // Countdown Timer (with seconds)
  useEffect(() => {
    const countdownTarget = new Date('2026-07-28T18:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget - now;
      
      if (distance <= 0) {
        clearInterval(interval);
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        return;
      }
      
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      setDays(d.toString().padStart(2, '0'));
      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
      setSeconds(s.toString().padStart(2, '0'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interactive Cursor Glow & 3D Parallax Effect
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    const band = bandRef.current;
    const ambientGlow = ambientGlowRef.current;

    // Robust image cached check: if the cutout image is cached and loaded, ensure trigger
    if (band && band.complete) {
      setBandImageLoaded(true);
    }
    
    if (hero && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const handleMouseMove = (e) => {
        const rect = hero.getBoundingClientRect();
        
        // Cursor glow
        if (cursor) {
          cursor.style.opacity = '1';
          cursor.style.left = `${e.clientX - rect.left}px`;
          cursor.style.top = `${e.clientY - rect.top}px`;
        }

        // 3D Parallax calculations
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (band) {
          band.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translate3d(${x * 25}px, ${-y * 25}px, 30px)`;
        }
        if (ambientGlow) {
          ambientGlow.style.transform = `translate3d(${-x * 35}px, ${-y * 35}px, -20px) scale(1.05)`;
        }
      };

      const handleMouseLeave = () => {
        if (cursor) cursor.style.opacity = '0';
        if (band) {
          band.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0px, 0px, 0px)`;
        }
        if (ambientGlow) {
          ambientGlow.style.transform = `translate3d(0px, 0px, 0px) scale(1)`;
        }
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <Scene duration="200vh" pin={true}>
      {(progress) => {
        // We only use the first half of progress for the fade animation (0 -> 0.5)
        // because the second half (0.5 -> 1.0) is when Lineup slides over us.
        const animProgress = Math.min(1, progress * 2);

        // Background video scales down heavily and blurs
        const videoScale = 1 - animProgress * 0.4; // 1 to 0.6
        const videoOpacity = Math.max(0, 0.4 - animProgress * 0.4);
        const videoBlur = animProgress * 20;

        // Band cutout pushes out 3D, shifts to center, gets larger
        const bandY = -animProgress * 250;
        const bandX = -animProgress * 400; // Moves left towards the center
        const bandScale = 1 + animProgress * 0.5; // Scale up to feel like zooming past
        const bandOpacity = Math.max(0, 1 - animProgress * 1.2);
        
        // Text Content stays mostly pinned but fades out
        const contentY = -animProgress * 300;
        const contentScale = 1 - animProgress * 0.1;
        const contentOpacity = Math.max(0, 1 - animProgress * 1.5);

        // Mobile Band Image stays visually pinned, scales up and fades out
        const mobileBandScale = 1 + animProgress * 0.8;
        const mobileBandY = -animProgress * 150;
        const mobileBandOpacity = Math.max(0, 1 - animProgress * 1.2);

        return (
          <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0c0f0f] w-full z-0" id="hero-section">
            <div ref={cursorRef} id="cursor-glow"></div>
            
            {/* Background Video Player */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
              style={{
                transform: `scale(${videoScale})`,
                opacity: videoOpacity,
                filter: `blur(${videoBlur}px)`,
                willChange: 'transform, opacity, filter'
              }}
            >
              <source src={`${import.meta.env.BASE_URL}background_video_desktop.mp4`} type="video/mp4" />
            </video>

            {/* Dark Overlay to increase contrast for content readability */}
            <div className="absolute inset-0 bg-[#0c0f0f]/40 z-0 pointer-events-none"></div>
            
            {/* Background 3D Parallax Band Image (Desktop Only) */}
            <div className="hidden lg:flex absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none items-end justify-end select-none">
              {/* Ambient Glowing Blob behind the band */}
              <div 
                ref={ambientGlowRef}
                className="absolute right-0 lg:right-[8%] bottom-0 w-[450px] h-[450px] bg-gradient-to-tr from-green-500/15 to-cyan-500/15 rounded-full blur-[100px] transition-transform duration-300 ease-out"
              />
              
              {/* Entry Transition Wrapper */}
              <div 
                className={`absolute inset-0 w-full h-full flex items-end justify-end band-image-wrapper ${
                  bandImageLoaded ? 'opacity-100 translate-y-0 scale-100 transition-all duration-[1200ms] ease-out' : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                {/* Parallax Wrapper */}
                <div
                  style={{
                    transform: `translate(${bandX}px, ${bandY}px) scale(${bandScale})`,
                    opacity: bandOpacity,
                    willChange: 'transform, opacity'
                  }}
                  className="relative w-full h-full flex items-end justify-end pointer-events-none"
                >
                  {/* Cutout Image of Band Members with 3D Parallax */}
                  <img
                    ref={bandRef}
                    src={`${import.meta.env.BASE_URL}band/bns_cutout.webp`}
                    alt="Daddy Band Members"
                    onLoad={() => setBandImageLoaded(true)}
                    className="relative max-h-[80vh] md:max-h-[85vh] object-contain w-auto right-0 lg:right-[2%] bottom-[-5%] transition-transform duration-300 ease-out drop-shadow-[0_20px_50px_rgba(34,255,68,0.15)] filter saturate-[1.1]"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hero Content Grid */}
            <div className="relative z-10 w-full max-w-container-max mx-auto px-4 md:px-gutter py-12 hero-content-wrapper">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

                  {/* Top Text Block */}
                  <div 
                    className="w-full flex flex-col items-center lg:items-start"
                    style={{
                      transform: `translateY(${contentY}px) scale(${contentScale})`,
                      opacity: contentOpacity,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}epilogue-logo.png`} 
                      alt="EPILOGUE '26" 
                      className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain mb-4 floating-brand filter drop-shadow-[0_0_20px_rgba(34,255,68,0.2)]" 
                    />
                    <p className="font-body-lg text-sm sm:text-body-lg text-gray-600 dark:text-secondary-fixed-dim mb-8 max-w-xl">
                      A night where music transcends boundaries. One stage. Unlimited frequencies.
                    </p>

                    {/* Visual Countdown Box (Left-aligned) */}
                    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-primary-container/30 shadow-2xl relative w-full max-w-[420px] transition-all duration-300 hover:border-green-700/50 dark:hover:border-primary-container/50 mb-8 self-center lg:self-start">
                      <h3 className="font-label-caps text-xs text-green-700 dark:text-primary-container tracking-widest uppercase mb-4 text-center lg:text-left font-bold">
                        FREQUENCY LOCKING IN...
                      </h3>
                      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                        {[
                          { value: days, label: 'DAYS' },
                          { value: hours, label: 'HRS' },
                          { value: minutes, label: 'MINS' },
                          { value: seconds, label: 'SECS' },
                        ].map((item, idx) => (
                          <React.Fragment key={item.label}>
                            {idx > 0 && <div className="text-green-700 dark:text-primary-container text-2xl md:text-headline-lg self-start mt-1 animate-pulse">:</div>}
                            <div className="flex flex-col items-center">
                              <span className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg font-mono countdown-digit text-gray-900 dark:text-white">{item.value}</span>
                              <span className="font-label-caps text-[9px] text-secondary-container dark:text-secondary-fixed-dim mt-2 tracking-widest font-bold">{item.label}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* In-flow Band Cutout Image for Mobile/Tablet */}
                  <div 
                    className="lg:hidden w-full flex justify-center mb-8 mt-2"
                    style={{
                      transform: `translateY(${mobileBandY}px) scale(${mobileBandScale})`,
                      opacity: mobileBandOpacity,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="relative max-w-[320px] sm:max-w-[380px] w-full">
                      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-[60px]" />
                      <img
                        src={`${import.meta.env.BASE_URL}band/bns_cutout.webp`}
                        alt="Daddy Band Members"
                        className="relative max-h-[30vh] sm:max-h-[35vh] object-contain mx-auto drop-shadow-[0_15px_30px_rgba(34,255,68,0.2)] filter saturate-[1.1]"
                        style={{
                          maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom Text Block: Event Info Bar */}
                  <div 
                    className="w-full"
                    style={{
                      transform: `translateY(${contentY}px) scale(${contentScale})`,
                      opacity: contentOpacity,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 mt-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                        <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
                        <span className="font-body-md text-sm sm:text-body-md">July 28, 2026</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                        <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span className="font-body-md text-sm sm:text-body-md">Venue : Lagaan</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                        <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        <span className="font-body-md text-sm sm:text-body-md">6:00 PM Onwards</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column: Empty on desktop, hidden on mobile */}
                <div className="hidden lg:block lg:col-span-5 pointer-events-none"></div>
              </div>
            </div>
          </section>
        );
      }}
    </Scene>
  );
}
