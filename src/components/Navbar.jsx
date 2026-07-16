import { useState, useEffect } from 'react';

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen, onBuyTickets, onFlyerSubmission }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ──── TOP NAVIGATION ──── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-surface-container-lowest/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center px-4 md:px-gutter py-4 max-w-container-max mx-auto">
          <div className="cursor-pointer flex items-center" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}>
            <img 
              src={`${import.meta.env.BASE_URL}Moraspirit 360 logo white_red.png`} 
              alt="MoraSpirit Logo" 
              className="h-8 sm:h-10 w-auto object-contain dark:block hidden" 
            />
            <img 
              src={`${import.meta.env.BASE_URL}Moraspirit 360 logo black_red.png`} 
              alt="MoraSpirit Logo" 
              className="h-8 sm:h-10 w-auto object-contain dark:hidden block" 
            />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-sans text-sm md:text-base font-semibold tracking-wide text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#lineup">Headlining</a>
            <a className="font-sans text-sm md:text-base font-semibold tracking-wide text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#gallery">Gallery</a>
            <a className="font-sans text-sm md:text-base font-semibold tracking-wide text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#experience">Experience</a>
            <a className="font-sans text-sm md:text-base font-semibold tracking-wide text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-primary-container transition-colors" href="#organizer">About Us</a>
          </div>
          <div className="flex gap-3 items-center">
              {/* Hiding Flyer Submission button for now */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onFlyerSubmission();
                }}
                className="hidden lg:flex border border-green-700 dark:border-primary-container text-green-700 dark:text-primary-container px-4 py-2 rounded font-sans text-xs sm:text-sm font-bold tracking-wide hover:bg-green-700/10 dark:hover:bg-primary-container/10 transition-all duration-300 items-center gap-1.5"
              >
                <span>FLYER CHALLENGE</span>
              </button>
             

            <button 
              onClick={(e) => {
                e.preventDefault();
                onBuyTickets();
              }}
              className="bg-green-700 dark:bg-primary-container text-white dark:text-on-primary-fixed w-[110px] sm:w-[165px] h-[32px] sm:h-[42px] rounded font-sans text-[10px] sm:text-sm font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,255,68,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2"
            >
              <svg className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              <span>BUY TICKETS</span>
            </button>

            <a
              href="https://www.ticketsministry.com/concerts/epilogue26/6a58ae6f4e923"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white hover:bg-gray-50 border border-gray-100 w-[110px] sm:w-[165px] h-[32px] sm:h-[42px] rounded flex items-center justify-center gap-1 sm:gap-2 group transition-all duration-300 shadow-sm animate-breathe text-[10px] sm:text-sm font-bold font-sans text-gray-700"
            >
              <img 
                src={`${import.meta.env.BASE_URL}koko-clean.png`} 
                alt="Koko" 
                className="h-2.5 sm:h-4 w-auto object-contain z-10" 
              />
              <span className="font-sans text-[10px] sm:text-sm font-bold tracking-wide text-gray-700">PAY LATER</span>
            </a>
            
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-gray-100/10 dark:bg-white/5 border border-gray-200/10 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100/20 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-md md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto transition-opacity duration-300' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed right-0 top-0 bottom-0 w-[280px] bg-white/95 dark:bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl p-6 flex flex-col pt-8 gap-6 border-l border-gray-200/50 dark:border-white/10 ${isMobileMenuOpen ? 'translate-x-0 transition-transform duration-300 ease-out' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          {/* Drawer Title & Close Button */}
          <div className="flex justify-between items-center mb-2 border-b border-gray-200/30 dark:border-white/5 pb-4">
            <span className="font-headline-md text-lg text-gray-900 dark:text-primary-fixed">MENU</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-gray-100/10 dark:bg-white/5 border border-gray-200/10 dark:border-white/10 text-gray-900 dark:text-white"
              aria-label="Close Menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          <a 
            className="font-sans text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-green-700 dark:hover:text-primary-container transition-colors py-3 border-b border-gray-200/30 dark:border-white/5" 
            href="#lineup"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lineup
          </a>
          <a 
            className="font-sans text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-green-700 dark:hover:text-primary-container transition-colors py-3 border-b border-gray-200/30 dark:border-white/5" 
            href="#gallery"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </a>
          <a 
            className="font-sans text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-green-700 dark:hover:text-primary-container transition-colors py-3 border-b border-gray-200/30 dark:border-white/5" 
            href="#experience"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Experience
          </a>
          <a 
            className="font-sans text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-green-700 dark:hover:text-primary-container transition-colors py-3 border-b border-gray-200/30 dark:border-white/5" 
            href="#organizer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </a>

          {/* Mobile Drawer Banner instead of button */}
          <div 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onFlyerSubmission();
            }}
            className="w-full mt-4 bg-gradient-to-br from-green-950 via-[#161a1a] to-emerald-950 border border-green-500/30 p-4 rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.1)] cursor-pointer hover:border-green-500/50 transition-all duration-300 relative overflow-hidden group animate-breathe"
          >
            <span className="bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold text-green-400 tracking-wider uppercase mb-1">
              🏆 AI Flyer Challenge
            </span>
            <h4 className="text-white text-xs font-bold text-center">
              Submit & Win Exciting Prizes!
            </h4>
            <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-green-400">
              Join Now
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </span>
          </div>
         

          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBuyTickets();
            }}
            className="w-full mt-4 bg-green-700 dark:bg-primary-container text-white dark:text-on-primary-fixed py-3 rounded-xl font-sans text-sm font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,255,68,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border-none"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            <span>BUY TICKETS</span>
          </button>

          <a 
            href="https://www.ticketsministry.com/concerts/epilogue26/6a58ae6f4e923"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="relative w-full mt-2 bg-white hover:bg-gray-50 border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm animate-breathe group text-sm font-bold font-sans text-gray-700"
          >
            <img 
              src={`${import.meta.env.BASE_URL}koko-clean.png`} 
              alt="Koko Logo" 
              className="h-4 w-auto object-contain z-10" 
            />
            <span className="font-sans text-[11px] font-black tracking-wider uppercase text-gray-700">PAY LATER</span>
          </a>
        </div>
      </div>
    </>
  );
}
