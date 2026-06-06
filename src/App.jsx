import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [splitLoader, setSplitLoader] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  // Sync theme with system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (e) => {
      const isDarkMode = e.matches;
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply initially
    applyTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  // Advanced Loader Simulation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setLoadProgress(100);
        
        setTimeout(() => {
          setSplitLoader(true);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = 'auto';
          }, 1000);
        }, 600);
      } else {
        setLoadProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for .reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [loading]); // Re-run when loading finishes and DOM elements are rendered properly

  // Interactive Cursor Glow
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    
    if (hero && cursor && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const handleMouseMove = (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        cursor.style.opacity = '1';
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      };
      
      const handleMouseLeave = () => {
        cursor.style.opacity = '0';
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Countdown Timer
  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 45); // 45 days from now
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;
      
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setDays(d.toString().padStart(2, '0'));
      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && (
        <div id="advanced-loader" className={splitLoader ? 'split' : ''}>
          <div id="loader-top"></div>
          <div id="loader-bottom"></div>
          <div className="loader-content">
            <div className="soundwave-visualizer">
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
              <div className="soundwave-bar"></div>
            </div>
            <div className="loading-text-container">
              <p className="font-label-caps text-label-caps text-green-700 dark:text-primary-container tracking-widest animate-pulse">Decrypting Epilogue '26...</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${loadProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ambient Background Blobs */}
      <div className="ambient-blob top-0 left-[-20%]"></div>
      <div className="ambient-blob bottom-0 right-[-20%]"></div>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md tracking-tighter text-gray-900 dark:text-primary-fixed cursor-pointer floating-brand">
            EPILOGUE '26
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#lineup">Lineup</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#tickets">Tickets</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#gallery">Gallery</a>
            <a className="font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#experience">Experience</a>
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-primary-container text-on-primary-fixed px-6 py-2 rounded font-label-caps text-label-caps hover:shadow-[0_0_15px_rgba(34,255,68,0.3)] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">local_activity</span> BUY TICKETS
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden" id="hero-section" style={{ backgroundImage: "linear-gradient(to bottom, rgba(12, 15, 15, 0.4), rgba(12, 15, 15, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDg5RVf7xiJnNIEIYa99jAgfMOqS7QaD3_tba_T9X7o4rPtNBpC2X6Ct1EJBNSQJb56-jFBRQF4y5xoQBd5qPDGBqMm21-974G4dw3SI5bgnhkdr0dKRdhDqq2xi134fSQRceybJJK9aGeoBgDfHxdECm5V5WgW3P5MfR1T2_P-fxVAf5pb4Ei3hlG6YuihmbX528lqua9cCmTlpylnQHy_ZvvWKROF3vvJh9aoFPTtP9CAvMMCTmGY15Ur9UkP1kRl7NWZ7gpmBDo')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div ref={cursorRef} id="cursor-glow"></div>
        <div className="relative z-10 text-center px-gutter max-w-container-max mx-auto flex flex-col items-center reveal">
          <p className="font-label-caps text-label-caps text-green-400 mb-4 tracking-widest uppercase">The Ultimate Frequency</p>
          <h1 className="font-display-lg text-display-lg text-white mb-8 neon-glow leading-none floating-brand">EPILOGUE '26</h1>
          {/* Countdown */}
          <div className="flex gap-6 mt-12 glass-panel p-8 rounded-xl border border-outline-variant/30">
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg font-mono">{days}</span>
              <span className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim mt-2">DAYS</span>
            </div>
            <div className="text-primary-container font-headline-lg text-headline-lg">:</div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg font-mono">{hours}</span>
              <span className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim mt-2">HOURS</span>
            </div>
            <div className="text-primary-container font-headline-lg text-headline-lg">:</div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg font-mono">{minutes}</span>
              <span className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim mt-2">MINS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Pulse Section */}
      <section className="py-section-padding-desktop px-gutter relative reveal" id="tickets">
        <div className="max-w-4xl mx-auto glass-panel p-12 rounded-2xl border border-primary-container/20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="font-headline-md text-headline-md mb-2">TICKET PULSE</h2>
            <p className="font-body-md text-body-md text-secondary-container dark:text-secondary-fixed-dim mb-6">General Admission Phase 1</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <span className="font-label-caps text-label-caps">TIER 1</span>
                <span className="font-body-md font-mono text-green-700 dark:text-primary-container">2000 REMAINING</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <span className="font-label-caps text-label-caps">TIER 2</span>
                <span className="font-body-md font-mono text-secondary-container dark:text-secondary-fixed-dim">1500 REMAINING</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <span className="font-label-caps text-label-caps">BALCONY</span>
                <span className="font-body-md font-mono text-secondary-container dark:text-secondary-fixed-dim">1000 REMAINING</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="radial-progress">
              <div className="radial-content">
                <span className="font-headline-lg text-headline-lg text-green-700 dark:text-primary-container font-mono block leading-none">85%</span>
                <span className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim">SOLD OUT</span>
              </div>
            </div>
            <p className="font-label-caps text-label-caps text-green-700 dark:text-primary-container animate-pulse mt-6">ONLY 15% REMAINING OF 15,000</p>
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="py-section-padding-desktop px-gutter reveal" id="lineup">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            HEADLINING
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 font-headline-md tracking-normal">HEADLINING</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group overflow-hidden rounded-2xl glass-panel border-glow transition-all duration-500 shadow-2xl">
              <img alt="Daddy Band Portrait" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVUnAhuq79ICi8Jn4oNQYCq_kGskta-6DEQPoFCzbJ6y-vQti4JfeNkFqL2nz-hfQe3gA3ejuKsvbqTN_7xvaRVCUU2fIvaEQLWJhlKPsoeL36njcboiUoHyZFHnpg6dqzMILsx8OqrewJisNIwNGH4QXCTCdFEV3OsCRpRqeOw4vzJ_F499dGms2k2TvNqzniPFgzULOUcKwu3wAzfcPULYnEKEjyO-ZM4Q-ejmRbDe_t4gELVhzAnWPVHH_ia2vBZSKEbYJ12As"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <h3 className="font-headline-lg text-headline-lg text-white">DADDY</h3>
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
      <section className="py-section-padding-desktop px-gutter reveal" id="gallery">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
            THE EXPERIENCE
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 font-headline-md tracking-normal">THE EXPERIENCE</span>
          </h2>
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {/* Masonry Item 1 */}
            <div className="break-inside-avoid relative group rounded-xl overflow-hidden glass-panel">
              <img alt="Concert Crowd" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbnafG6QeEo-mzPiueYWxVKdADCuX0tegLImx1WI1RW0cnk7knFeBqEz9zTKgkmdFdDSOwDB7CwCwPhu6gIWwNsOOE2mt_1bYnUIVUh4dqHYTUBYrJAKvm-0WKuR8p4S80HEfK_2R_C9i8KiXlqDWXwzlwhwM7XaJgQ7WB5WM7HXlRK-eSa85tgFp3MwQqw6Pirm9Uz-03j0M8t2gdZGatJEvkx3H9naWSvr1suE0yeKr4f6T_zWn8V-HS8vmKDiEEsqLMjnQwDXM"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-label-caps text-label-caps text-primary-container">ATMOSPHERE</p>
              </div>
            </div>
            {/* Masonry Item 2 */}
            <div className="break-inside-avoid relative group rounded-xl overflow-hidden glass-panel">
              <img alt="Abstract Soundwaves" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJjAdENUuljdL8Bf3pb6-hnrpLSV6gOUTRXPGi_1-jUCgBWXMA10rN4PW_Cn7G_tztDKbky8GqGek5DBk4wYqjGLzb4pF8eyjOGgPibA1gfcpJ4tyHx3kpkg1QFMchIUgJE_qMasDI7X1zjmUvdIjSDiFnrdF_RUj13HZ430xVeWIbzc1M_e67DZO-UR8-VYB_jF6CdONQsDN5zmKT_F5DK23VQue6y5AWJxLKnxC9RA3CKE6Zxm1LIw0dx7-LxxbYZzEPwKKH_vA"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-label-caps text-label-caps text-primary-container">VISUALS</p>
              </div>
            </div>
            {/* Text Block */}
            <div className="break-inside-avoid glass-panel p-8 rounded-xl border-t border-green-700/30 dark:border-primary-container/30 reveal">
              <h3 className="font-headline-md text-headline-md mb-4 text-gray-900 dark:text-on-surface">IMMERSIVE DOMAIN</h3>
              <p className="font-body-md text-body-md text-gray-700 dark:text-secondary-fixed-dim">
                Step into a carefully curated environment where sound, light, and architecture converge. Epilogue '26 isn't just a concert; it's a sensory override designed for the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-section-padding-desktop bg-gray-50 dark:bg-surface-container-lowest border-t border-outline-variant/20 transition-colors duration-500 reveal">
        <div className="flex flex-col items-center gap-base px-gutter text-center max-w-container-max mx-auto">
          <div className="font-headline-lg text-headline-lg text-gray-900 dark:text-primary-fixed mb-4">
            EPILOGUE '26
          </div>
          <div className="flex gap-4 mb-8 text-gray-600 dark:text-secondary-fixed-dim">
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#"><span className="material-symbols-outlined">mail</span> info@epilogue26.com</a>
            <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#"><span className="material-symbols-outlined">link</span> @epiloguefest</a>
          </div>
          <div className="flex gap-6 mb-8">
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Privacy</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Terms</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Safety</a>
            <a className="font-body-md text-body-md text-gray-600 dark:text-secondary-fixed-dim hover:text-green-700 dark:hover:text-primary-fixed-dim transition-colors cursor-pointer" href="#">Contact</a>
          </div>
          <p className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim">
            © 2026 EPILOGUE FESTIVAL. ALL RIGHTS RESERVED. HEADLINING: DADDY.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
