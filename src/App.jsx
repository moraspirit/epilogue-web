import { useState, useEffect, useCallback } from 'react';
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
import BundleOfferAd from './components/BundleOfferAd';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [splitLoader, setSplitLoader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [ticketFormOpen, setTicketFormOpen] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  // MoraSpirit Gallery images (representing the club)
  const galleryImages = [
    { src: `${import.meta.env.BASE_URL}gallery/image1.jpeg`, alt: 'Epilogue Gallery 1' },
    { src: `${import.meta.env.BASE_URL}gallery/image2.jpeg`, alt: 'Epilogue Gallery 2' },
    { src: `${import.meta.env.BASE_URL}gallery/image3.jpeg`, alt: 'Epilogue Gallery 3' },
    { src: `${import.meta.env.BASE_URL}gallery/image4.jpeg`, alt: 'Epilogue Gallery 4' },
    { src: `${import.meta.env.BASE_URL}gallery/image5.jpeg`, alt: 'Epilogue Gallery 5' },
  ];



  // Prevent background scroll when loading, mobile drawer, or lightbox is open
  useEffect(() => {
    if ((loading && !splitLoader) || isMobileMenuOpen || lightboxOpen || showAdModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [loading, splitLoader, isMobileMenuOpen, lightboxOpen, showAdModal]);

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
            setShowAdModal(true);
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
      />

      {/* ──── CINEMATIC HERO ──── */}
      <Hero />

      {/* ──── PARALLAX OVERLAY CONTENT ──── */}
      <div className="-mt-[100vh] relative z-10 flex flex-col w-full">
        {/* ──── BUNDLE OFFER AD ──── */}
        <BundleOfferAd onReserve={() => setTicketFormOpen(true)} />

        {/* ──── LINEUP SECTION ──── */}
        <Lineup />
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

      {/* ──── BUNDLE OFFER MODAL ──── */}
      {showAdModal && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowAdModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <button 
              onClick={() => setShowAdModal(false)}
              className="absolute top-4 right-4 z-50 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              aria-label="Close ad"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <BundleOfferAd 
              onReserve={() => {
                setShowAdModal(false);
                setTicketFormOpen(true);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
