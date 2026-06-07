

export default function Lineup() {
  return (
    <section className="py-20 px-4 md:px-gutter reveal bg-surface-container-lowest" id="lineup">
      <div className="max-w-container-max mx-auto">
        <h2 className="font-display-lg text-4xl sm:text-6xl lg:text-display-lg mb-16 text-center text-gray-900/10 dark:text-on-surface/10 uppercase tracking-widest font-extrabold relative">
          HEADLINING
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-white opacity-100 text-lg sm:text-2xl lg:text-headline-md tracking-normal font-sans">HEADLINING</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-2xl glass-panel border-glow transition-all duration-500 shadow-2xl aspect-[4/3]">
            <img 
              alt="Daddy Band Portrait" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
              src={`${import.meta.env.BASE_URL}band/daddy_1.jpg`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0c0f0f] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 sm:p-8 w-full flex justify-between items-end gap-4">
              <h3 className="font-headline-lg text-2xl sm:text-4xl lg:text-headline-lg text-gray-900 dark:text-white leading-tight">DADDY</h3>
              <span className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps whitespace-nowrap">MAIN STAGE</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="glass-panel p-6 sm:p-8 rounded-xl">
              <h3 className="font-headline-md text-xl sm:text-headline-md mb-4 text-gray-900 dark:text-on-surface">ABOUT THE ARTIST</h3>
              <p className="font-body-lg text-sm sm:text-body-lg text-gray-700 dark:text-secondary-fixed-dim mb-6 leading-relaxed">
                Experience the sonic evolution. Daddy returns to the main stage with a highly anticipated 90-minute set, blending their iconic rock anthems with new, experimental frequencies. Known for their high-energy performances and intricate musicality, this is a set designed to transcend boundaries.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">ROCK</span>
                <span className="px-4 py-2 border border-outline-variant rounded font-label-caps text-label-caps text-gray-600 dark:text-secondary-fixed-dim hover:border-green-700 dark:hover:border-primary-container transition-colors cursor-pointer">ALTERNATIVE</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
