import { useState } from 'react';

/* ─── Flying Music Notes Component (Pure CSS 3D Effect) ─── */
function FlyingNotes() {
  const [notes] = useState(() => {
    const symbols = ['𝄞', '♪', '♫', '♬', '♩', '𝄢', '𝄡'];
    const colors = ['#22ff44', '#00ffcc', '#ffffff', '#a7f3d0', '#e0f2fe'];
    const glows = ['rgba(34,255,68,0.4)', 'rgba(0,255,204,0.4)', 'rgba(255,255,255,0.3)', 'rgba(167,243,208,0.3)', 'rgba(224,242,254,0.3)'];
    
    return Array.from({ length: 24 }).map((_, i) => {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const colorIdx = Math.floor(Math.random() * colors.length);
      const angle = Math.random() * Math.PI * 2;
      const distance = 35 + Math.random() * 45;
      const tx = `${Math.cos(angle) * distance}vw`;
      const ty = `${Math.sin(angle) * distance}vh`;
      const tr = `${Math.floor(Math.random() * 720) - 360}deg`;
      const duration = `${3 + Math.random() * 3}s`;
      const delay = `${Math.random() * -6}s`;
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

/* ─── Loader Component ─── */
export default function Loader({ loading, splitLoader, loadProgress }) {
  
  if (!loading) return null;

  return (
    <div id="advanced-loader" className={splitLoader ? 'split' : ''}>
      <div id="loader-top"></div>
      <div id="loader-bottom"></div>
      
      

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
                className="text-2xl sm:text-3xl font-extrabold text-white font-sans select-none"
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
          <p className="text-white/60 text-[10px] font-mono mt-3 tracking-widest">
            {loadProgress}%
          </p>
        </div>
      </div>
    </div>
  );
}
