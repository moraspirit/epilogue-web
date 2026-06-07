

export default function Experience() {
  const items = [
    { icon: "music_note", title: "THE FESTIVAL", desc: "Epilogue'26 is the Ultimate Music Festival in the University of Moratuwa, bringing together over 3,000 undergraduates to experience an unforgettable celebration of music, memories, and pure excitement. Following the success of Epilogue'23, Epilogue returns bigger, bolder, and louder than ever before." },
    { icon: "celebration", title: "THE VIBE", desc: "A night filled with electrifying performances, neon aesthetics, and an unforgettable atmosphere that transcends boundaries." },
    { icon: "groups", title: "THE COMMUNITY", desc: "Organized by MoraSpirit 360, Epilogue'26 brings together the University of Moratuwa community under one sky to connect, celebrate, and create unforgettable memories." }
  ];

  const iconMap = {
    music_note: (
      <svg className="w-7 h-7 text-green-700 dark:text-primary-container" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    celebration: (
      <svg className="w-7 h-7 text-green-700 dark:text-primary-container" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c.13 0 .26 0 .39 0C12.39 7.5 16.5 11.6 21 11.6c0 .13 0 .26 0 .39-4.5 0-8.61 4.11-8.61 8.61 0 .13 0 .26 0 .39-.13 0-.26 0-.39 0C11.6 16.5 7.5 12.39 3 12.39c0-.13 0-.26 0-.39 4.5 0 8.61-4.11 8.61-8.61z" />
      </svg>
    ),
    groups: (
      <svg className="w-7 h-7 text-green-700 dark:text-primary-container" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  };

  return (
    <section className="py-20 px-4 md:px-gutter reveal" id="experience">
      <div className="max-w-container-max mx-auto">
        <h2 className="font-display-lg text-3xl sm:text-5xl lg:text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
          WHAT IS EPILOGUE
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-base sm:text-xl lg:text-headline-md tracking-normal font-sans">WHAT IS EPILOGUE</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.title} className="glass-panel p-6 sm:p-8 rounded-2xl border border-outline-variant/20 hover:border-green-700/40 dark:hover:border-primary-container/40 transition-all duration-300 group hover:translate-y-[-4px] shadow-md hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-green-700/10 dark:bg-primary-container/10 flex items-center justify-center mb-6 group-hover:bg-green-700/20 dark:group-hover:bg-primary-container/20 transition-all duration-300">
                {iconMap[item.icon]}
              </div>
              <h3 className="font-headline-md text-headline-md mb-3 text-gray-900 dark:text-on-surface">{item.title}</h3>
              <p className="font-body-md text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
