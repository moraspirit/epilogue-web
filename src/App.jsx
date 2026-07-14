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



  const [flyerFormOpen, setFlyerFormOpen] = useState(false);

  // Prevent background scroll when loading, mobile drawer, lightbox, or flyer modal is open
  useEffect(() => {
    if ((loading && !splitLoader) || isMobileMenuOpen || lightboxOpen || flyerFormOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [loading, splitLoader, isMobileMenuOpen, lightboxOpen, flyerFormOpen]);

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

  const [iframeLoading, setIframeLoading] = useState(true);

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
        onFlyerSubmission={() => {
          setIframeLoading(true);
          setFlyerFormOpen(true);
        }}
      />

      {/* ──── CINEMATIC HERO ──── */}
      <Hero />

      {/* ──── PARALLAX OVERLAY CONTENT ──── */}
      <div className="-mt-[100vh] relative z-10 flex flex-col w-full">
        {/* ──── LINEUP SECTION ──── */}
        <Lineup 
          onBuyTickets={() => setTicketFormOpen(true)}
          onFlyerSubmission={() => {
            setIframeLoading(true);
            setFlyerFormOpen(true);
          }}
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

      {/* ──── FLYER SUBMISSION MODAL ──── */}
      {flyerFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in" onClick={() => setFlyerFormOpen(false)}>
          <div 
            className="relative w-full max-w-4xl glass-panel p-2 sm:p-4 rounded-3xl border border-primary-container/30 shadow-2xl scale-up-anim max-h-[95vh] overflow-y-auto hide-scrollbar bg-[#121414]/95 text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setFlyerFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-[101]"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            {/* Title / Header */}
            <div className="text-center pt-6 pb-2">
              <h2 className="font-sans text-xl sm:text-2xl font-black tracking-tight text-white dark:text-primary-fixed uppercase">
                FLYER SUBMISSION
              </h2>
              <p className="text-xs text-green-500 font-mono tracking-widest uppercase mt-1">
                EPILOGUE '26 COMPETITION
              </p>
            </div>

            {/* Iframe content */}
            <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden rounded-2xl border border-outline-variant/10 mt-4 bg-black/20">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121414]/90 z-50">
                  <div className="w-12 h-12 border-4 border-green-700/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-xs text-green-400 font-mono tracking-widest animate-pulse uppercase">
                    Loading Form...
                  </p>
                </div>
              )}
              <iframe
                src="https://script.google.com/macros/s/AKfycbwUIvk0pGB6404q5fuXJuULQ0MeODRUAdaAE0XGw1i2Oc7jTji8lOT_XwHdWSxBdBmZ/exec"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Flyer Submission Form"
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
