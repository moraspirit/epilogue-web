

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-gray-50 dark:bg-surface-container-lowest border-t border-outline-variant/20 transition-colors duration-500 reveal">
      <div className="flex flex-col items-center gap-6 px-4 md:px-gutter text-center max-w-container-max mx-auto">
        <img 
          src={`${import.meta.env.BASE_URL}epilogue-logo.png`} 
          alt="Epilogue '26 Logo" 
          className="h-14 w-auto object-contain mb-2" 
        />
        <div className="flex flex-col items-center gap-2 mb-4">
          <img 
            src={`${import.meta.env.BASE_URL}Moraspirit 360 logo white_red.png`} 
            alt="MoraSpirit Logo" 
            className="h-8 w-auto object-contain dark:block hidden" 
          />
          <img 
            src={`${import.meta.env.BASE_URL}Moraspirit 360 logo black_red.png`} 
            alt="MoraSpirit Logo" 
            className="h-8 w-auto object-contain dark:hidden block" 
          />
          <span className="text-[10px] tracking-widest text-gray-500 uppercase font-label-caps mt-1">Organized By MoraSpirit</span>
        </div>
        <div className="flex gap-4 mb-8 text-gray-600 dark:text-secondary-fixed-dim">
          <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors flex items-center gap-2" href="mailto:info@moraspirit.com">
            <span className="material-symbols-outlined text-sm">mail</span> info@moraspirit.com
          </a>
          <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors flex items-center gap-2" href="https://moraspirit.com" target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined text-sm">language</span> moraspirit.com
          </a>
        </div>
        <div className="flex gap-6 mb-8 justify-center text-gray-600 dark:text-secondary-fixed-dim">
          <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.facebook.com/MoraSpirit?mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" title="Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.tiktok.com/@moraspirit_official?_r=1&_t=ZS-970HXRYZ5q1" target="_blank" rel="noopener noreferrer" title="TikTok">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.37-.82-.6-1.5-1.4-1.97-2.3-.08 3.52 0 7.05-.06 10.56-.13 2.16-.99 4.32-2.71 5.62-1.74 1.35-4.11 1.77-6.26 1.33-2.31-.44-4.42-2.11-5.18-4.36-.85-2.43-.37-5.32 1.35-7.16 1.33-1.48 3.41-2.28 5.4-2.1v4.07c-1.12-.13-2.34.18-3.08 1.05-.72.82-.77 2.13-.24 3.09.58 1.09 1.87 1.74 3.09 1.57 1.34-.14 2.45-1.32 2.49-2.67.06-4.66.03-9.32.05-13.98z"/>
            </svg>
          </a>
          <a className="hover:text-green-700 dark:hover:text-primary-container transition-colors" href="https://www.linkedin.com/company/moraspirit-initiative/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        <p className="font-label-caps text-label-caps text-secondary-container dark:text-secondary-fixed-dim text-xs">
          © EPILOGUE'26 . ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
