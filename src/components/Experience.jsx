import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Experience() {
  const items = [
    { 
      icon: <MusicNoteIcon className="!w-7 !h-7 text-green-700 dark:text-primary-container" />, 
      title: "THE FESTIVAL", 
      desc: "Epilogue'26 is the Ultimate Music Festival in the University of Moratuwa, bringing together over 3,000 undergraduates to experience an unforgettable celebration of music, memories, and pure excitement. Following the success of Epilogue'23, Epilogue returns bigger, bolder, and louder than ever before." 
    },
    { 
      icon: <CelebrationIcon className="!w-7 !h-7 text-green-700 dark:text-primary-container" />, 
      title: "THE VIBE", 
      desc: "A night filled with electrifying performances, neon aesthetics, and an unforgettable atmosphere that transcends boundaries." 
    },
    { 
      icon: <GroupsIcon className="!w-7 !h-7 text-green-700 dark:text-primary-container" />, 
      title: "THE COMMUNITY", 
      desc: "Organized by MoraSpirit 360, Epilogue'26 brings together the University of Moratuwa community under one sky to connect, celebrate, and create unforgettable memories." 
    }
  ];

  return (
    <div id="experience" className="bg-[#0c0f0f]">
      <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-gutter overflow-hidden w-full max-w-container-max mx-auto border-t border-outline-variant/10">
        <h2 
          className="reveal font-display-lg text-3xl sm:text-5xl lg:text-display-lg mb-12 sm:mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative"
        >
          WHAT IS EPILOGUE
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-base sm:text-xl lg:text-headline-md tracking-normal font-sans">WHAT IS EPILOGUE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {items.map((item, index) => (
            <div 
              key={item.title} 
              className="reveal glass-panel p-6 sm:p-8 rounded-2xl border border-outline-variant/20 hover:border-green-700/40 dark:hover:border-primary-container/40 transition-all duration-300 group shadow-md hover:shadow-xl bg-[#121414]/80 backdrop-blur-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-green-700/10 dark:bg-primary-container/10 flex items-center justify-center mb-6 group-hover:bg-green-700/20 dark:group-hover:bg-primary-container/20 transition-all duration-300 transform group-hover:rotate-12">
                {item.icon}
              </div>
              <h3 className="font-headline-md text-headline-md mb-3 text-white">{item.title}</h3>
              <p className="font-body-md text-body-md text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
