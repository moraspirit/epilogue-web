

export default function Organizer() {
  const socialLinks = [
    {
      name: "MoraSpirit",
      url: "https://www.facebook.com/MoraSpirit?mibextid=wwXIfr&mibextid=wwXIfr",
      bgColor: "bg-[#1877F2]/10",
      hoverColor: "hover:bg-[#1877F2]/20",
      textColor: "text-[#1877F2] dark:text-[#60A5FA]",
      borderColor: "border-[#1877F2]/20",
      svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      name: "Mora Nade",
      url: "https://www.facebook.com/MoraNade?mibextid=wwXIfr&mibextid=wwXIfr",
      bgColor: "bg-[#1877F2]/10",
      hoverColor: "hover:bg-[#1877F2]/20",
      textColor: "text-[#1877F2] dark:text-[#60A5FA]",
      borderColor: "border-[#1877F2]/20",
      svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      name: "MoraSpirit 360",
      url: "https://www.facebook.com/MoraSpirit360?mibextid=wwXIfr&mibextid=wwXIfr",
      bgColor: "bg-[#1877F2]/10",
      hoverColor: "hover:bg-[#1877F2]/20",
      textColor: "text-[#1877F2] dark:text-[#60A5FA]",
      borderColor: "border-[#1877F2]/20",
      svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@moraspirit_official?_r=1&_t=ZS-970HXRYZ5q1",
      bgColor: "bg-black/10 dark:bg-white/10",
      hoverColor: "hover:bg-black/20 dark:hover:bg-white/20",
      textColor: "text-gray-900 dark:text-white",
      borderColor: "border-gray-900/10 dark:border-white/10",
      svgPath: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.37-.82-.6-1.5-1.4-1.97-2.3-.08 3.52 0 7.05-.06 10.56-.13 2.16-.99 4.32-2.71 5.62-1.74 1.35-4.11 1.77-6.26 1.33-2.31-.44-4.42-2.11-5.18-4.36-.85-2.43-.37-5.32 1.35-7.16 1.33-1.48 3.41-2.28 5.4-2.1v4.07c-1.12-.13-2.34.18-3.08 1.05-.72.82-.77 2.13-.24 3.09.58 1.09 1.87 1.74 3.09 1.57 1.34-.14 2.45-1.32 2.49-2.67.06-4.66.03-9.32.05-13.98z"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/moraspirit-initiative/",
      bgColor: "bg-[#0A66C2]/10",
      hoverColor: "hover:bg-[#0A66C2]/20",
      textColor: "text-[#0A66C2] dark:text-[#38BDF8]",
      borderColor: "border-[#0A66C2]/20",
      svgPath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-gutter reveal" id="organizer">
      <div className="max-w-container-max mx-auto glass-panel p-6 sm:p-8 md:p-12 rounded-3xl border border-outline-variant/30 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 dark:bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex-1 space-y-6 z-10">
          <h3 className="font-label-caps text-label-caps text-green-700 dark:text-primary-container tracking-widest">OFFICIAL ORGANIZER</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <img 
              src={`${import.meta.env.BASE_URL}Moraspirit 360 logo white_red.png`} 
              alt="MoraSpirit Logo" 
              className="h-10 sm:h-12 w-auto object-contain dark:block hidden" 
            />
            <img 
              src={`${import.meta.env.BASE_URL}Moraspirit 360 logo black_red.png`} 
              alt="MoraSpirit Logo" 
              className="h-10 sm:h-12 w-auto object-contain dark:hidden block" 
            />
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-gray-900 dark:text-on-surface">MoraSpirit 360</h2>
          </div>
          <p className="font-body-md text-sm sm:text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
            Founded on September 25, 2009, by undergraduates of the University of Moratuwa, MoraSpirit is the pioneering and premier university sports media portal in Sri Lanka. We empower university sports by fostering an unbiased sporting culture and bridging the gap between athletes and the community.
          </p>
          <p className="font-body-md text-sm sm:text-body-md text-gray-700 dark:text-secondary-fixed-dim leading-relaxed">
            From our flagship events to our dedicated initiatives, our passionate crew of volunteer journalists, photographers, and editors work tirelessly to celebrate the spirit of university athletes.
          </p>
          <div className="pt-4 space-y-4">
            <h4 className="font-label-caps text-xs text-gray-500 dark:text-gray-400 tracking-wider">Connect with our community</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 px-4 py-2.5 ${link.bgColor} ${link.hoverColor} ${link.textColor} rounded-xl font-label-caps text-xs font-bold transition-all duration-300 border ${link.borderColor} shadow-sm hover:scale-[1.03]`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={link.svgPath} />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 gap-4 z-10">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-outline-variant/20 shadow-lg hover:scale-105 transition-transform duration-500">
            <img src={`${import.meta.env.BASE_URL}gallery/image4.jpeg`} alt="MoraSpirit Coverage" className="w-full h-full object-cover object-center" />
          </div>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-outline-variant/20 shadow-lg hover:scale-105 transition-transform duration-500 mt-8">
            <img src={`${import.meta.env.BASE_URL}gallery/image5.jpeg`} alt="MoraSpirit Crew" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
