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
  const [ruleTab, setRuleTab] = useState('fb');

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
                Most Popular AI Flyer & Video  Challenge
              </h2>
              <p className="text-xs text-green-500 font-mono tracking-widest uppercase mt-1">
                EPILOGUE '26 COMPETITION
              </p>
            </div>

            {/* Rules & Regulations Interactive Tabs */}
            <div className="mx-auto max-w-2xl mt-4 px-2 sm:px-4 py-4 bg-[#1e2020]/60 rounded-2xl border border-outline-variant/20 text-left">
              <h3 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-green-400 mb-3 text-center">
                Rules & Regulations
              </h3>
              
              {/* Tab Selector Buttons */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-4 border-b border-white/5 pb-3">
                {[
                  { id: 'fb', label: 'Facebook' },
                  { id: 'ig', label: 'Instagram' },
                  { id: 'submission', label: 'Submission' },
                  { id: 'general', label: 'General Rules' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setRuleTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      ruleTab === tab.id
                        ? 'bg-green-700 text-white dark:bg-primary-container dark:text-on-primary-fixed shadow-md'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[140px] px-2">
                {ruleTab === 'fb' && (
                  <div className="animate-fade-in">
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wide">Facebook Voting</h4>
                    <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm text-gray-300">
                      <li>Voters must follow our official Facebook page.</li>
                      <li>Only reactions and shares will be considered for voting.</li>
                      <li>Each reaction = <strong className="text-green-400">1 point</strong> | Each share = <strong className="text-green-400">2 points</strong>.</li>
                      <li>Only interactions on the original post will be counted.</li>
                      <li>Interactions from fake, bot, or suspicious accounts will be disqualified.</li>
                      <li>Reactions and shares received after the voting deadline will not be considered.</li>
                    </ul>
                  </div>
                )}

                {ruleTab === 'ig' && (
                  <div className="animate-fade-in">
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wide">Instagram Voting</h4>
                    <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm text-gray-300">
                      <li>Voters must follow our official Instagram page.</li>
                      <li>Only reactions will be considered for voting.</li>
                      <li>Each reaction = <strong className="text-green-400">1 point</strong>.</li>
                      <li>Only reactions on the original post will be counted.</li>
                      <li>Interactions from fake, bot, or suspicious accounts will be disqualified.</li>
                      <li>Reactions received after the voting deadline will not be considered.</li>
                    </ul>
                    <p className="text-[11px] italic text-gray-400 mt-2.5 pt-2 border-t border-white/5">
                      The final score will be calculated by combining the eligible votes received on both Facebook and Instagram.
                    </p>
                  </div>
                )}

                {ruleTab === 'submission' && (
                  <div className="animate-fade-in">
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wide">General Submission Guidelines</h4>
                    <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm text-gray-300">
                      <li>All submissions must be created using AI design tools.</li>
                      <li>MoraSpirit official logos must not be used in any submission.</li>
                      <li>When using artists' images, ensure their faces remain clear, recognizable, and not distorted.</li>
                      <li>Graphic submissions may be in any aspect ratio (square, portrait, landscape, etc.).</li>
                      <li>Video submissions must not exceed <strong className="text-green-400">1 minute</strong> in duration.</li>
                    </ul>
                  </div>
                )}

                {ruleTab === 'general' && (
                  <div className="animate-fade-in">
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wide">General Rules</h4>
                    <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm text-gray-300">
                      <li>Participants and voters are expected to engage fairly. Any attempt to manipulate the voting process may result in disqualification.</li>
                      <li>Votes obtained through bots, purchased engagements, engagement groups, or any other artificial means will not be considered.</li>
                      <li>The organizing committee reserves the right to verify the authenticity of all interactions and determine their validity.</li>
                      <li>In the event of any dispute, the decision of the organizing committee shall be final.</li>
                    </ul>
                  </div>
                )}
              </div>
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
                    src="https://script.google.com/macros/s/AKfycbxg1_kMNQz5CYUIyeyXinjTssEI7W_NldnqrTUbtY-1s2HRiC_VnVgfjqUa9II8xQeX/exec"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="Flyer Submission Form"
                    onLoad={() => setIframeLoading(false)}
                    sandbox="allow-scripts allow-top-navigation allow-forms allow-same-origin allow-popups"
                  />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
