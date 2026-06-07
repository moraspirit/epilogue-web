import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import lottie from 'lottie-web';

/* ─── Flying Music Notes Component (Pure CSS 3D Effect) ─── */
function FlyingNotes() {
  // Create 24 notes with random properties
  const [notes] = useState(() => {
    const symbols = ['𝄞', '♪', '♫', '♬', '♩', '𝄢', '𝄡'];
    const colors = ['#22ff44', '#00ffcc', '#ffffff', '#a7f3d0', '#e0f2fe'];
    const glows = ['rgba(34,255,68,0.4)', 'rgba(0,255,204,0.4)', 'rgba(255,255,255,0.3)', 'rgba(167,243,208,0.3)', 'rgba(224,242,254,0.3)'];
    
    return Array.from({ length: 24 }).map((_, i) => {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const colorIdx = Math.floor(Math.random() * colors.length);
      const angle = Math.random() * Math.PI * 2;
      const distance = 35 + Math.random() * 45; // percentage distance of flight path
      const tx = `${Math.cos(angle) * distance}vw`;
      const ty = `${Math.sin(angle) * distance}vh`;
      const tr = `${Math.floor(Math.random() * 720) - 360}deg`;
      const duration = `${3 + Math.random() * 3}s`;
      const delay = `${Math.random() * -6}s`; // negative delay to start immediately
      const size = `${1.2 + Math.random() * 1.8}rem`;
      
      return {
        id: i,
        char: sym,
        style: {
          '--tx': tx,
          '--ty': ty,
          '--tr': tr,
          '--duration': duration,
          '--delay': delay,
          '--color': colors[colorIdx],
          '--glow': glows[colorIdx],
          fontSize: size,
        }
      };
    });
  });

  return (
    <div className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none">
      {notes.map(note => (
        <span
          key={note.id}
          className="flying-note"
          style={note.style}
        >
          {note.char}
        </span>
      ))}
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [splitLoader, setSplitLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [showToast, setShowToast] = useState(false);

  const handleBuyTicketsClick = useCallback(() => {
    setShowToast(true);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const lottieContainer1 = useRef(null);
  const lottieContainer2 = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  // MoraSpirit Gallery images (representing the club)
  const galleryImages = [
    { src: '/gallery/moraspirit_slug.jpg', alt: 'Road to SLUG Championship Coverage', title: 'ROAD TO SLUG', category: 'EVENT COVERAGE' },
    { src: '/gallery/moraspirit_victory_celebration.png', alt: 'Inter-University Championship Victory Celebration', title: 'CHAMPIONS CELEBRATION', category: 'VICTORY' },
    { src: '/gallery/moraspirit_rowing.jpg', alt: 'Inter-University Rowing Championship on the Waters', title: 'THRILL ON WATERS', category: 'ROWING' },
    { src: '/gallery/moraspirit_ceremony.jpg', alt: 'Opening Ceremony of Sports Championships', title: 'GRAND OPENING', category: 'CEREMONY' },
    { src: '/gallery/moraspirit_paralympics.png', alt: 'Paralympic Athletics & Overcoming Challenges', title: 'BEYOND LIMITS', category: 'ATHLETICS' },
    { src: '/gallery/moraspirit_olympic.png', alt: 'Milestones of Sri Lankan Sports and Olympics', title: 'OLYMPIC MILESTONES', category: 'SPORTS HISTORY' },
  ];

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sliderRef = useRef(null);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [bandImageLoaded, setBandImageLoaded] = useState(false);


  // Autonomous sliding for the MoraSpirit club gallery
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const autoScroll = () => {
      if (isSliderPaused) return;
      const card = slider.firstChild;
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const step = cardWidth + 24; // card width + gap-6 (24px)

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const intervalId = setInterval(autoScroll, 3500); // slide every 3.5s
    return () => clearInterval(intervalId);
  }, [isSliderPaused]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Force dark mode always
  useEffect(() => {
    document.documentElement.classList.add('dark');
    setIsDarkMode(true);
  }, []);

  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const bandRef = useRef(null);
  const ambientGlowRef = useRef(null);

  // Simulated loading progress
  useEffect(() => {
    let progressInterval;
    let currentProgress = 0;
    
    progressInterval = setInterval(() => {
      const increment = Math.max(2, Math.floor((100 - currentProgress) * 0.18));
      currentProgress = Math.min(100, currentProgress + increment);
      setLoadProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        const timer1 = setTimeout(() => {
          setSplitLoader(true);
          const timer2 = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = 'auto';
          }, 600);
          return () => clearTimeout(timer2);
        }, 200);
        return () => clearTimeout(timer1);
      }
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  // Lottie Animation Loading
  useEffect(() => {
    let anim1;
    let anim2;
    if (loading) {
      anim1 = lottie.loadAnimation({
        container: lottieContainer1.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/56a034a2-116d-11ee-ade5-efd77f21c859.json',
      });

      anim2 = lottie.loadAnimation({
        container: lottieContainer2.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/e3be30c2-1150-11ee-9de2-dfa41e0fb27e.json',
      });
    }
    return () => {
      if (anim1) anim1.destroy();
      if (anim2) anim2.destroy();
    };
  }, [loading]);

  // Intersection Observer for .reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, [loading]);

  // Interactive Cursor Glow & 3D Parallax Effect
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    const band = bandRef.current;
    const ambientGlow = ambientGlowRef.current;
    
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
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

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
  }, [loading]);

  // Countdown Timer (with seconds)
  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 45);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;
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

  // Nav scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden w-full relative min-h-screen">
      {/* ──── IMMERSIVE 3D LOADER ──── */}
      {loading && (
        <div id="advanced-loader" className={splitLoader ? 'split' : ''}>
          <div id="loader-top"></div>
          <div id="loader-bottom"></div>
          
          {/* Fullscreen Lottie Background Overlay */}
          <div className="lottie-backdrop-container">
            <div ref={lottieContainer1} className="lottie-visualizer-bg"></div>
            <div ref={lottieContainer2} className="lottie-notes-bg"></div>
          </div>

          {/* Immersive CSS-based 3D Flying Musical Notes Loader */}
          <FlyingNotes />

          {/* Centered Glass panel with radial indicator */}
          <div className="loader-content">
            <div className="loader-glass">
              {/* Musical Wave Equalizer Loader */}
              <div className="loader-music-wave">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              
              {/* HTML/CSS 3D dancing letters */}
              <div className="flex gap-1.5 justify-center mb-6 mt-2">
                {"EPILOGUE '26".split("").map((char, idx) => (
                  <span
                    key={idx}
                    className="text-3xl font-extrabold text-white font-sans select-none"
                    style={{
                      display: 'inline-block',
                      animation: 'bounce-3d 1.5s ease-in-out infinite alternate',
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              
              <p className="font-label-caps text-[11px] text-green-400 tracking-widest animate-pulse uppercase">
                Untangled Frequencies Coming...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ambient Background Blobs */}
      <div className="ambient-blob top-0 left-[-20%]"></div>
      <div className="ambient-blob bottom-0 right-[-20%]"></div>

      {/* ──── TOP NAVIGATION ──── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-surface-container-lowest/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md tracking-tighter text-gray-900 dark:text-primary-fixed cursor-pointer floating-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            EPILOGUE '26
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#lineup">Lineup</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#gallery">Gallery</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#experience">Experience</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#organizer">About Us</a>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={handleBuyTicketsClick}
              className="bg-green-700 dark:bg-primary-container text-white dark:text-on-primary-fixed px-6 py-2 rounded font-label-caps text-label-caps hover:shadow-[0_0_20px_rgba(34,255,68,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg> BUY TICKETS
            </button>
          </div>
        </div>
      </nav>

      {/* ──── CINEMATIC HERO ──── */}
      <section ref={heroRef} className="hero-bg relative min-h-screen flex items-center pt-24 overflow-hidden z-10" id="hero-section">
        <div ref={cursorRef} id="cursor-glow"></div>
        
        {/* Background 3D Parallax Band Image */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex items-end justify-center lg:justify-end select-none">
          {/* Ambient Glowing Blob behind the band */}
          <div 
            ref={ambientGlowRef}
            className="absolute right-0 lg:right-[8%] bottom-0 w-[450px] h-[450px] bg-gradient-to-tr from-green-500/15 to-cyan-500/15 rounded-full blur-[100px] transition-transform duration-300 ease-out"
          />
          
          {/* Wrapper for smooth image loading and entry transition */}
          <div className={`transition-all duration-[1200ms] ease-out ${
            bandImageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            {/* Cutout Image of Band Members with 3D Parallax */}
            <img
              ref={bandRef}
              src="/band/daddy_cutout.png"
              alt="Daddy Band Members"
              onLoad={() => setBandImageLoaded(true)}
              className="relative max-h-[80vh] md:max-h-[85vh] object-contain w-auto right-0 lg:right-[2%] bottom-[-5%] transition-transform duration-300 ease-out drop-shadow-[0_20px_50px_rgba(34,255,68,0.15)] filter saturate-[1.1]"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            />
          </div>

        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="font-label-caps text-label-caps text-green-700 dark:text-green-400 mb-4 tracking-widest uppercase">The Ultimate Frequency</p>
            <h1 className="font-display-lg text-display-lg text-gray-900 dark:text-white mb-4 neon-glow leading-none floating-brand">EPILOGUE '26</h1>
            <p className="font-body-lg text-body-lg text-gray-600 dark:text-secondary-fixed-dim mb-8 max-w-xl">
              A night where music transcends boundaries. One stage. Unlimited frequencies.
            </p>

            {/* Visual Countdown Box (Left-aligned) */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-primary-container/30 shadow-2xl relative w-full max-w-[420px] transition-all duration-300 hover:border-green-700/50 dark:hover:border-primary-container/50 mb-8 self-center lg:self-start">
              <h3 className="font-label-caps text-xs text-green-700 dark:text-primary-container tracking-widest uppercase mb-4 text-center lg:text-left font-bold">
                FREQUENCY LOCKING IN...
              </h3>
              <div className="flex gap-3 md:gap-4 justify-center lg:justify-start">
                {[
                  { value: days, label: 'DAYS' },
                  { value: hours, label: 'HRS' },
                  { value: minutes, label: 'MINS' },
                  { value: seconds, label: 'SECS' },
                ].map((item, idx) => (
                  <React.Fragment key={item.label}>
                    {idx > 0 && <div className="text-green-700 dark:text-primary-container font-headline-lg text-headline-lg self-start mt-1 animate-pulse">:</div>}
                    <div className="flex flex-col items-center">
                      <span className="font-headline-lg text-headline-lg font-mono countdown-digit text-gray-900 dark:text-white">{item.value}</span>
                      <span className="font-label-caps text-[9px] text-secondary-container dark:text-secondary-fixed-dim mt-2 tracking-widest font-bold">{item.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Event Info Bar */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mt-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
                <span className="font-body-md text-body-md">Coming Soon 2026</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span className="font-body-md text-body-md">Venue TBA</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-secondary-fixed-dim">
                <svg className="w-5 h-5 text-green-700 dark:text-primary-container fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                <span className="font-body-md text-body-md">6:00 PM Onwards</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Empty to allow the band members' background image to show fully without overlap */}
          <div className="lg:col-span-5 pointer-events-none"></div>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="py-20 px-gutter reveal bg-surface-container-lowest" id="lineup">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            HEADLINING
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 font-headline-md tracking-normal">HEADLINING</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group overflow-hidden rounded-2xl glass-panel border-glow transition-all duration-500 shadow-2xl">
              <img alt="Daddy Band Portrait" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" src="/band/daddy_1.jpg"/>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0c0f0f] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <h3 className="font-headline-lg text-headline-lg text-gray-900 dark:text-white">DADDY</h3>
                <span className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps">MAIN STAGE</span>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-md text-headline-md mb-4 text-gray-900 dark:text-on-surface">ABOUT THE ARTIST</h3>
                <p className="font-body-lg text-body-lg text-gray-700 dark:text-secondary-fixed-dim mb-6 leading-relaxed">
                  Experience the sonic evolution. Daddy returns to the main stage with a highly anticipated 90-minute set, blending their iconic rock anthems with new, experimental frequencies. Known for their high-energy performances and intricate musicality, this is a set designed to transcend boundaries.
                </p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">ROCK</span>
                  <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">ALTERNATIVE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded-xl border-l-2 border-green-700 dark:border-primary-container group hover:bg-green-700/5 dark:hover:bg-primary-container/5 transition-colors">
                  <h4 className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim mb-2 group-hover:text-green-700 dark:group-hover:text-primary-container transition-colors">SET TIME</h4>
                  <p className="font-headline-md text-headline-md font-mono text-gray-900 dark:text-on-surface">22:00</p>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-2 border-green-700 dark:border-primary-container group hover:bg-green-700/5 dark:hover:bg-primary-container/5 transition-colors">
                  <h4 className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim mb-2 group-hover:text-green-700 dark:group-hover:text-primary-container transition-colors">DURATION</h4>
                  <p className="font-headline-md text-headline-md font-mono text-gray-900 dark:text-on-surface">90M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Gallery Section */}
      <section className="py-20 px-gutter reveal bg-surface-container-lowest" id="gallery">
        <div className="max-w-container-max mx-auto relative px-4">
          <h2 className="font-display-lg text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            THE GALLERY
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 font-headline-md tracking-normal">THE GALLERY</span>
          </h2>
          
          {/* Horizontal Slider Wrapper */}
          <div className="relative w-full">
            {/* Scrollable Container */}
            <div 
              ref={sliderRef}
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
              onTouchStart={() => setIsSliderPaused(true)}
              onTouchEnd={() => setIsSliderPaused(false)}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory scroll-smooth pb-6 hide-scrollbar cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE/Edge */
              }}
            >
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => openLightbox(idx)}
                  className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] snap-start relative cursor-pointer overflow-hidden rounded-xl glass-panel border border-outline-variant/20 hover:border-green-700/50 dark:hover:border-primary-container/50 transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.8] hover:saturate-[1.2]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="font-label-caps text-[9px] text-green-400 tracking-wider font-bold mb-1">{img.category}</p>
                    <h4 className="font-headline-sm text-sm text-white font-bold leading-tight">{img.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-gutter reveal" id="experience">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            WHAT IS EPILOGUE
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 font-headline-md tracking-normal">WHAT IS EPILOGUE</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "music_note", title: "THE FESTIVAL", desc: "Epilogue '26 is the ultimate inter-university music festival in Sri Lanka, bringing together over 15,000 undergraduates to celebrate rhythm and youth." },
              { icon: "celebration", title: "THE VIBE", desc: "A night filled with electrifying performances, neon aesthetics, and an unforgettable atmosphere that transcends boundaries." },
              { icon: "groups", title: "THE COMMUNITY", desc: "Organized by MoraSpirit, it unites students from all universities under one sky to connect, celebrate, and create memories." }
            ].map(item => (
              <div key={item.title} className="glass-panel p-8 rounded-2xl border border-outline-variant/20 hover:border-green-700/40 dark:hover:border-primary-container/40 transition-all duration-300 group hover:translate-y-[-4px] shadow-md hover:shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-green-700/10 dark:bg-primary-container/10 flex items-center justify-center mb-6 group-hover:bg-green-700/20 dark:group-hover:bg-primary-container/20 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl text-green-700 dark:text-primary-container">{item.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-3 text-gray-900 dark:text-on-surface">{item.title}</h3>
                <p className="font-body-md text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizer / About Us Section */}
      <section className="py-20 px-gutter reveal" id="organizer">
        <div className="max-w-container-max mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-outline-variant/30 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 dark:bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex-1 space-y-6 z-10">
            <h3 className="font-label-caps text-label-caps text-green-700 dark:text-primary-container tracking-widest">OFFICIAL ORGANIZER</h3>
            <h2 className="font-headline-lg text-headline-lg text-gray-900 dark:text-on-surface">MoraSpirit</h2>
            <p className="font-body-md text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
              Founded on September 25, 2009, by undergraduates of the University of Moratuwa, MoraSpirit is the pioneering and premier university sports media portal in Sri Lanka. We empower university sports by fostering an unbiased sporting culture and bridging the gap between athletes and the community.
            </p>
            <p className="font-body-md text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
              From our flagship events to our dedicated initiatives, our passionate crew of volunteer journalists, photographers, and editors work tirelessly to celebrate the spirit of university athletes.
            </p>
            <div className="pt-4 space-y-4">
              <h4 className="font-label-caps text-xs text-gray-500 dark:text-gray-400 tracking-wider">Connect with our community</h4>
              <div className="flex flex-wrap gap-3">
                {/* MoraSpirit Facebook */}
                <a 
                  href="https://www.facebook.com/MoraSpirit?mibextid=wwXIfr&mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#60A5FA] rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border border-[#1877F2]/20 shadow-sm hover:scale-[1.03]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  MoraSpirit
                </a>
                
                {/* Mora Nade Facebook */}
                <a 
                  href="https://www.facebook.com/MoraNade?mibextid=wwXIfr&mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#60A5FA] rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border border-[#1877F2]/20 shadow-sm hover:scale-[1.03]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Mora Nade
                </a>

                {/* Moraspirit 360 Facebook */}
                <a 
                  href="https://www.facebook.com/MoraSpirit360?mibextid=wwXIfr&mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#60A5FA] rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border border-[#1877F2]/20 shadow-sm hover:scale-[1.03]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  MoraSpirit 360
                </a>

                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@moraspirit_official?_r=1&_t=ZS-970HXRYZ5q1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border border-gray-900/10 dark:border-white/10 shadow-sm hover:scale-[1.03]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.37-.82-.6-1.5-1.4-1.97-2.3-.08 3.52 0 7.05-.06 10.56-.13 2.16-.99 4.32-2.71 5.62-1.74 1.35-4.11 1.77-6.26 1.33-2.31-.44-4.42-2.11-5.18-4.36-.85-2.43-.37-5.32 1.35-7.16 1.33-1.48 3.41-2.28 5.4-2.1v4.07c-1.12-.13-2.34.18-3.08 1.05-.72.82-.77 2.13-.24 3.09.58 1.09 1.87 1.74 3.09 1.57 1.34-.14 2.45-1.32 2.49-2.67.06-4.66.03-9.32.05-13.98z"/>
                  </svg>
                  TikTok
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/moraspirit-initiative/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#38BDF8] rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border border-[#0A66C2]/20 shadow-sm hover:scale-[1.03]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4 z-10">
            <img src="/gallery/moraspirit_event_actual.png" alt="MoraSpirit Coverage" className="rounded-2xl w-full h-48 md:h-64 object-cover object-left shadow-lg hover:scale-105 transition-transform duration-500 border border-outline-variant/20" />
            <img src="/gallery/moraspirit_event_actual.png" alt="MoraSpirit Crew" className="rounded-2xl w-full h-48 md:h-64 object-cover object-right shadow-lg hover:scale-105 transition-transform duration-500 mt-8 border border-outline-variant/20" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 bg-gray-50 dark:bg-surface-container-lowest border-t border-outline-variant/20 transition-colors duration-500 reveal">
        <div className="flex flex-col items-center gap-6 px-gutter text-center max-w-container-max mx-auto">
          <div className="font-headline-lg text-headline-lg text-gray-900 dark:text-primary-fixed mb-4">
            EPILOGUE '26
          </div>
          <div className="flex gap-4 mb-8 text-gray-600 dark:text-secondary-fixed-dim">
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors flex items-center gap-2" href="mailto:info@epilogue26.com">
              <span className="material-symbols-outlined text-sm">mail</span> info@epilogue26.com
            </a>
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors flex items-center gap-2" href="https://moraspirit.com" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">language</span> moraspirit.com
            </a>
          </div>
          <div className="flex gap-6 mb-8 justify-center text-gray-600 dark:text-secondary-fixed-dim">
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.facebook.com/MoraSpirit?mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" title="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.tiktok.com/@moraspirit_official?_r=1&_t=ZS-970HXRYZ5q1" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.37-.82-.6-1.5-1.4-1.97-2.3-.08 3.52 0 7.05-.06 10.56-.13 2.16-.99 4.32-2.71 5.62-1.74 1.35-4.11 1.77-6.26 1.33-2.31-.44-4.42-2.11-5.18-4.36-.85-2.43-.37-5.32 1.35-7.16 1.33-1.48 3.41-2.28 5.4-2.1v4.07c-1.12-.13-2.34.18-3.08 1.05-.72.82-.77 2.13-.24 3.09.58 1.09 1.87 1.74 3.09 1.57 1.34-.14 2.45-1.32 2.49-2.67.06-4.66.03-9.32.05-13.98z"/>
              </svg>
            </a>
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.linkedin.com/company/moraspirit-initiative/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          <div className="flex gap-6 mb-8">
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Privacy</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Terms</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Safety</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Contact</a>
          </div>
          <p className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim text-xs">
            © 2026 EPILOGUE FESTIVAL. ALL RIGHTS RESERVED. HEADLINING: DADDY.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-green-400 transition-colors"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-6 text-white hover:text-green-400 transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full hidden md:block"
            onClick={prevImage}
          >
            <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center scale-up-anim"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[lightboxIndex].src} 
              alt={galleryImages[lightboxIndex].alt} 
              className="max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="text-center mt-4 text-white">
              <p className="font-label-caps text-xs text-green-400 font-bold tracking-widest mb-1">
                {galleryImages[lightboxIndex].category}
              </p>
              <h3 className="font-headline-sm text-lg font-bold">
                {galleryImages[lightboxIndex].title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {galleryImages[lightboxIndex].alt}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-6 text-white hover:text-green-400 transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full hidden md:block"
            onClick={nextImage}
          >
            <span className="material-symbols-outlined text-3xl">arrow_forward_ios</span>
          </button>
        </div>
      )}

      {/* Modern Glassmorphic Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[200000] animate-fade-in-up">
          <div className="glass-panel px-6 py-4 rounded-2xl border border-green-500/30 shadow-2xl flex items-center gap-3 bg-black/80 backdrop-blur-xl">
            <span className="material-symbols-outlined text-green-400 animate-pulse">schedule</span>
            <span className="font-label-caps text-xs text-white tracking-wider font-bold">Tickets Coming Soon!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
