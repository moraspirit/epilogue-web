import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Lineup from './components/Lineup';
import Gallery from './components/Gallery';
import Experience from './components/Experience';
import Organizer from './components/Organizer';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import TicketForm from './components/TicketForm';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [splitLoader, setSplitLoader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [ticketFormOpen, setTicketFormOpen] = useState(false);
  // MoraSpirit Gallery images (representing the club)
  const galleryImages = [
    { src: `${import.meta.env.BASE_URL}gallery/image1.jpeg`, alt: 'Epilogue Gallery 1' },
    { src: `${import.meta.env.BASE_URL}gallery/image2.jpeg`, alt: 'Epilogue Gallery 2' },
    { src: `${import.meta.env.BASE_URL}gallery/image3.jpeg`, alt: 'Epilogue Gallery 3' },
    { src: `${import.meta.env.BASE_URL}gallery/image4.jpeg`, alt: 'Epilogue Gallery 4' },
    { src: `${import.meta.env.BASE_URL}gallery/image5.jpeg`, alt: 'Epilogue Gallery 5' },
  ];



  const [showMobileBanner, setShowMobileBanner] = useState(true);

  // Prevent background scroll when loading, mobile drawer, or lightbox is open
  useEffect(() => {
    if ((loading && !splitLoader) || isMobileMenuOpen || lightboxOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [loading, splitLoader, isMobileMenuOpen, lightboxOpen]);

  // Force dark mode always
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Simulated loading progress
  useEffect(() => {
    let progressInterval;
    let timer1;
    let timer2;
    let currentProgress = 0;
    
    progressInterval = setInterval(() => {
      const increment = Math.max(2, Math.floor((100 - currentProgress) * 0.18));
      currentProgress = Math.min(100, currentProgress + increment);
      setLoadProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        timer1 = setTimeout(() => {
          setSplitLoader(true);
          timer2 = setTimeout(() => {
            setLoading(false);
          }, 600);
        }, 200);
      }
    }, 80);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, []);

  // Intersection Observer for .reveal sections
  useEffect(() => {
    if (loading) return;
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

  // Lightbox controllers
  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleFlyerSubmission = useCallback(() => {
    window.open('https://go.moraspirit.com/flyers-challange', '_blank');
  }, []);

  return (
    <div className="overflow-x-clip w-full relative min-h-screen">
      {/* ──── IMMERSIVE LOADER ──── */}
      <Loader 
        loading={loading} 
        splitLoader={splitLoader} 
        loadProgress={loadProgress} 
      />

      {/* Ambient Background Blobs */}
      <div className="ambient-blob top-0 left-[-20%]"></div>
      <div className="ambient-blob bottom-0 right-[-20%]"></div>

      {/* ──── TOP NAVIGATION ──── */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        onBuyTickets={() => setTicketFormOpen(true)}
        onFlyerSubmission={handleFlyerSubmission}
      />

      {/* ──── CINEMATIC HERO ──── */}
      <Hero />

      {/* ──── PARALLAX OVERLAY CONTENT ──── */}
      <div className="-mt-[100vh] relative z-10 flex flex-col w-full">
        {/* ──── LINEUP SECTION ──── */}
        <Lineup 
          onBuyTickets={() => setTicketFormOpen(true)}
          onFlyerSubmission={handleFlyerSubmission}
        />
      </div>

      {/* ──── GALLERY SECTION ──── */}
      <Gallery 
        galleryImages={galleryImages} 
        openLightbox={openLightbox} 
      />

      {/* ──── EXPERIENCE SECTION ──── */}
      <Experience />

      {/* ──── ORGANIZER SECTION ──── */}
      <Organizer />

      {/* ──── FOOTER ──── */}
      <Footer />

      {/* ──── LIGHTBOX MODAL ──── */}
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={closeLightbox} 
        images={galleryImages} 
        index={lightboxIndex} 
        setIndex={setLightboxIndex} 
      />

      {/* ──── TICKET FORM MODAL ──── */}
      <TicketForm 
        isOpen={ticketFormOpen} 
        onClose={() => setTicketFormOpen(false)} 
      />
      {/* Mobile Sticky Flyer Challenge Banner */}
      {showMobileBanner && (
        <div className="sm:hidden fixed bottom-0 left-0 w-full z-[80] p-3.5 bg-[#0a0c0c]/95 backdrop-blur-md border-t border-green-500/20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex items-center gap-2.5 min-w-0 flex-1" onClick={handleFlyerSubmission}>
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
              <span className="text-lg">🏆</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-white text-xs font-bold truncate">AI Flyer Challenge</h4>
              <p className="text-[10px] text-gray-400 truncate">Submit & win exciting prizes!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleFlyerSubmission}
              className="px-3.5 py-1.5 bg-green-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse"
            >
              Join
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileBanner(false);
              }}
              className="p-1 text-gray-400 hover:text-white"
              aria-label="Dismiss banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
