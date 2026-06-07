import { useState, useEffect } from 'react';

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen, onBuyTicketsClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [ticketTimeLeft, setTicketTimeLeft] = useState('');

  // Ticket release separate countdown timer (July 1, 2026 at 12:00:00 PM)
  useEffect(() => {
    const target = new Date('2026-06-10T19:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTicketTimeLeft('NOW ON SALE');
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTicketTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <button 
              onClick={onBuyTicketsClick}
              className="bg-green-700 dark:bg-primary-container text-white dark:text-on-primary-fixed px-3 sm:px-5 py-1.5 sm:py-2 rounded font-sans text-xs sm:text-sm font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,255,68,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
            >
              <svg className="hidden sm:block w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              <span className="flex flex-col items-start sm:items-center sm:flex-row sm:gap-2 text-left">
                <span className="leading-none sm:leading-normal">BUY TICKETS</span>
                <span className="text-[8.5px] sm:text-[10px] text-white/90 dark:text-on-primary-fixed/90 bg-black/20 dark:bg-black/10 px-1 py-0.5 rounded font-mono font-normal mt-0.5 sm:mt-0 leading-none">
                  {ticketTimeLeft}
                </span>
              </span>
            </button>
            
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
      <div className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-md transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed right-0 top-0 bottom-0 w-[280px] bg-white/95 dark:bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl p-6 flex flex-col pt-8 gap-6 border-l border-gray-200/50 dark:border-white/10 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
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
        </div>
      </div>
    </>
  );
}
