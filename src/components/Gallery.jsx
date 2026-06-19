import { useState, useEffect, useRef, useCallback } from 'react';
import { Scene } from 'react-kino';

export default function Gallery({ galleryImages, openLightbox }) {
  const sliderRef = useRef(null);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple the items to create a seamless infinite scroll track
  const extendedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  // Tracks which card is closest to the horizontal center of the slider track
  // and snaps scroll position at boundaries for seamless infinite looping
  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollCenter = slider.scrollLeft + slider.clientWidth / 2;
    const cards = slider.children;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      // Skip navigation arrow buttons
      if (card.tagName === 'BUTTON') continue;
      
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - scrollCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);

    // Infinite loop snapping boundaries
    const card = slider.querySelector('.flex-shrink-0');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const step = cardWidth + 24; // card width + gap (24px)
    const baseLength = galleryImages.length;

    // If scroll position goes too far to the right (into the 3rd set), wrap back to the 2nd set
    if (slider.scrollLeft >= step * (baseLength * 2)) {
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft -= step * baseLength;
      void slider.offsetHeight; // Force reflow
      slider.style.scrollBehavior = '';
    }
    // If scroll position goes too far to the left (into the 1st set), wrap forward to the 2nd set
    else if (slider.scrollLeft <= step * (baseLength - 1)) {
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft += step * baseLength;
      void slider.offsetHeight; // Force reflow
      slider.style.scrollBehavior = '';
    }
  }, [galleryImages.length]);

  // Center scroll position on mount and update on resize
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector('.flex-shrink-0');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const step = cardWidth + 24;

    // Start scrolled to the center of the 2nd (middle) set of cards
    slider.style.scrollBehavior = 'auto';
    slider.scrollLeft = (step * galleryImages.length) - (slider.clientWidth - cardWidth) / 2;
    void slider.offsetHeight;
    slider.style.scrollBehavior = '';

    // Small delay to let rendering complete before initial focus calculation
    const timer = setTimeout(handleScroll, 100);

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [galleryImages.length, handleScroll]);

  // Autonomous sliding for the MoraSpirit club gallery
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const autoScroll = () => {
      if (isSliderPaused) return;
      const card = slider.querySelector('.flex-shrink-0');
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const step = cardWidth + 24; // card width + gap (24px)

      // Smoothly scroll right - handleScroll will automatically wrap it back if boundaries are met
      slider.scrollBy({ left: step, behavior: 'smooth' });
    };

    const intervalId = setInterval(autoScroll, 3500); // slide every 3.5s
    return () => clearInterval(intervalId);
  }, [isSliderPaused]);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector('.flex-shrink-0');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const step = cardWidth + 24;
    slider.scrollBy({ left: -step, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector('.flex-shrink-0');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const step = cardWidth + 24;
    slider.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <div className="bg-surface-container-lowest" id="gallery">
      <Scene duration="200vh" pin={true}>
        {(progress) => {
          // Title slides in from left
          const titleX = progress < 0.15 ? -200 + (progress / 0.15) * 200 : progress > 0.85 ? -(progress - 0.85) * 1500 : 0;
          const titleOpacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) * 6.6) : 1;
          
          // Slider slides in from right
          const sliderX = progress < 0.15 ? 200 - (progress / 0.15) * 200 : progress > 0.85 ? (progress - 0.85) * 1500 : 0;
          const sliderOpacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) * 6.6) : 1;

          return (
            <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-gutter overflow-hidden w-full max-w-[100vw] mx-auto border-t border-outline-variant/10">
              <div className="max-w-container-max mx-auto relative px-4 w-full">
                <h2 
                  className="font-display-lg text-4xl sm:text-6xl lg:text-display-lg mb-8 sm:mb-12 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative"
                  style={{
                    opacity: titleOpacity,
                    transform: `translateX(${titleX}px)`,
                    willChange: 'transform, opacity'
                  }}
                >
                  THE GALLERY
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-lg sm:text-2xl lg:text-headline-md tracking-normal font-sans">THE GALLERY</span>
                </h2>
                
                {/* Horizontal Slider Wrapper */}
                <div 
                  className="relative w-full group/slider"
                  style={{
                    opacity: sliderOpacity,
                    transform: `translateX(${sliderX}px)`,
                    willChange: 'transform, opacity'
                  }}
                >
                  {/* Navigation Arrows (Desktop Only) */}
                  <button 
                    onClick={scrollLeft}
                    className="absolute left-[-12px] md:left-[-24px] top-1/2 transform -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-green-700 dark:hover:bg-primary-container text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hidden md:flex border border-white/10"
                    aria-label="Previous slide"
                  >
                    <span className="material-symbols-outlined !text-base">arrow_back_ios_new</span>
                  </button>
                  
                  <button 
                    onClick={scrollRight}
                    className="absolute right-[-12px] md:right-[-24px] top-1/2 transform -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-green-700 dark:hover:bg-primary-container text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hidden md:flex border border-white/10"
                    aria-label="Next slide"
                  >
                    <span className="material-symbols-outlined !text-base">arrow_forward_ios</span>
                  </button>

                  {/* Scrollable Container */}
                  <div 
                    ref={sliderRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsSliderPaused(true)}
                    onMouseLeave={() => setIsSliderPaused(false)}
                    onTouchStart={() => setIsSliderPaused(true)}
                    onTouchEnd={() => setIsSliderPaused(false)}
                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-10 sm:pb-12 md:pb-14 lg:pb-16 pt-10 sm:pt-12 md:pt-14 lg:pt-16 hide-scrollbar cursor-grab active:cursor-grabbing"
                    style={{
                      scrollbarWidth: 'none', /* Firefox */
                      msOverflowStyle: 'none', /* IE/Edge */
                    }}
                  >
                    {extendedImages.map((img, idx) => {
                      const baseIndex = idx % galleryImages.length;
                      const isActive = idx === activeIndex;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => openLightbox(baseIndex)}
                          className={`flex-shrink-0 w-[72vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] snap-center relative cursor-pointer overflow-hidden rounded-2xl glass-panel border ${
                            isActive 
                              ? 'border-green-400 dark:border-primary-container shadow-[0_0_30px_rgba(34,255,68,0.35)] sm:shadow-[0_0_50px_rgba(34,255,68,0.45),_0_20px_40px_rgba(34,255,68,0.25)] scale-[1.1] sm:scale-[1.15] md:scale-[1.2] lg:scale-[1.25] -translate-y-3 sm:-translate-y-5 md:-translate-y-6 lg:-translate-y-8 z-10 opacity-100 transition-all duration-500' 
                              : 'border-outline-variant/10 scale-[0.9] translate-y-0 z-0 opacity-35 shadow-sm'
                          }`}
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden bg-black/25">
                            <img 
                              src={img.src} 
                              alt={img.alt} 
                              className={`w-full h-full object-cover hover:scale-110 saturate-[0.8] hover:saturate-[1.2] ${
                                isActive ? 'brightness-125 contrast-110 saturate-[1.15] transition-all duration-700' : 'brightness-50 saturate-[0.6]'
                              }`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Scene>
    </div>
  );
}
