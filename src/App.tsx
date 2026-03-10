import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  Globe, 
  Info, 
  PieChart, 
  Newspaper, 
  Rocket, 
  Send,
  Droplets,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { TOKEN_ADDRESS, FRANK_IMAGE, translations } from './constants';
import { Language } from './types';

const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = React.useState(false);
  // Use a high-quality placeholder that looks like a crypto profile if the main one fails
  const fallbackSrc = `https://picsum.photos/seed/${TOKEN_ADDRESS}/400/400`;

  return (
    <img 
      src={error ? fallbackSrc : src} 
      alt={alt} 
      className={className}
      onError={(e) => {
        console.error(`Failed to load image: ${src}`);
        setError(true);
      }}
      referrerPolicy="no-referrer"
    />
  );
};

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const content = translations[lang];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TOKEN_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'info', 'tokenomics', 'whitepaper'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00FF00] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 bg-[#00FF00] rounded-full flex items-center justify-center overflow-hidden">
              <ImageWithFallback src={FRANK_IMAGE} alt="Frank Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl tracking-tighter italic">FRANK COIN</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('info')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#00FF00] transition-colors ${activeSection === 'info' ? 'text-[#00FF00]' : ''}`}>
              {content.nav.info}
            </button>
            <button onClick={() => scrollToSection('tokenomics')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#00FF00] transition-colors ${activeSection === 'tokenomics' ? 'text-[#00FF00]' : ''}`}>
              {content.nav.tokenomics}
            </button>
            <button onClick={() => scrollToSection('whitepaper')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#00FF00] transition-colors ${activeSection === 'whitepaper' ? 'text-[#00FF00]' : ''}`}>
              {content.nav.whitepaper}
            </button>
            
            <div className="h-4 w-[1px] bg-white/20 mx-2" />
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#00FF00] hover:text-[#00FF00] transition-all text-xs font-bold uppercase tracking-tighter"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'EN' : 'PT'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <button onClick={() => scrollToSection('info')} className="text-3xl font-black italic uppercase tracking-tighter">
                {content.nav.info}
              </button>
              <button onClick={() => scrollToSection('tokenomics')} className="text-3xl font-black italic uppercase tracking-tighter">
                {content.nav.tokenomics}
              </button>
              <button onClick={() => scrollToSection('whitepaper')} className="text-3xl font-black italic uppercase tracking-tighter">
                {content.nav.whitepaper}
              </button>
              <button 
                onClick={toggleLang}
                className="flex items-center justify-center gap-2 text-xl font-bold uppercase"
              >
                <Globe className="w-6 h-6" />
                {lang === 'en' ? 'English / Português' : 'Português / English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF00]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center px-6"
          >
            <h1 className="text-[15vw] md:text-[12vw] font-black italic leading-[0.8] tracking-tighter uppercase mb-6">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-medium">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href={content.hero.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-12 py-5 bg-[#00FF00] text-black font-black uppercase italic text-xl rounded-full hover:scale-105 transition-transform overflow-hidden block"
              >
                <span className="relative z-10">{content.hero.cta}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              
              <div className="flex gap-4">
                <a 
                  href="https://x.com/i/status/2031186648755527876" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <XLogo className="w-6 h-6" />
                </a>
                <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                  <Send className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Token Address Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 w-full max-w-4xl px-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">
                  {content.tokenAddress.label}
                </span>
                <span className="font-mono text-sm md:text-base break-all md:break-normal text-[#00FF00]">
                  {TOKEN_ADDRESS}
                </span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-bold text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-[#00FF00]" /> : <Copy className="w-4 h-4" />}
                {copied ? content.tokenAddress.copied : content.tokenAddress.copy}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Info Section */}
        <section id="info" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-row-2 gap-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="text-[#00FF00] w-8 h-8" />
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                    {content.info.title}
                  </h2>
                </div>
                <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
                  {content.info.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-[#00FF00]/20 rounded-full animate-pulse blur-3xl" />
                  <div className="w-full h-full rounded-full border-4 border-[#00FF00]/50 relative z-10 overflow-hidden">
                    <ImageWithFallback 
                      src={FRANK_IMAGE} 
                      alt="Frank" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-16 justify-center">
              <PieChart className="text-[#00FF00] w-8 h-8" />
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                {content.tokenomics.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: content.tokenomics.supply, icon: <Rocket /> },
                { label: content.tokenomics.tax, icon: <PieChart /> },
                { label: content.tokenomics.liquidity, icon: <Droplets /> },
                { label: content.tokenomics.burn, icon: <Rocket /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-black border border-white/10 rounded-3xl flex flex-col items-center text-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#00FF00]/10 rounded-2xl flex items-center justify-center text-[#00FF00]">
                    {item.icon}
                  </div>
                  <p className="font-bold text-lg leading-tight">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="whitepaper" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Newspaper className="text-[#00FF00] w-8 h-8" />
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                {content.whitepaper.title}
              </h2>
            </div>
            
            <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-[#00FF00]/30">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/render/image/public/base44-prod/public/69a055d1cf29cbd04b52904c/c2dd5b468_a2a6dc10-4d34-46f4-bf93-5ade79286b84.jpeg?width=1200&height=630&resize=contain"
                    alt="News Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#00FF00] text-black text-[10px] font-black uppercase px-2 py-1 rounded">
                    Cripto Jornal
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4 text-[#00FF00]">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Featured Article</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-6 leading-tight">
                    De OvoCoin a Baleia Bicuda: O Frank tentou de tudo
                  </h3>
                  
                  <p className="text-lg text-white/60 font-medium mb-8 leading-relaxed">
                    {content.whitepaper.content}
                  </p>
                  
                  <a 
                    href={content.whitepaper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#00FF00] font-bold hover:underline group/link"
                  >
                    Read Full Article 
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00FF00] rounded-full flex items-center justify-center overflow-hidden">
              <ImageWithFallback src={FRANK_IMAGE} alt="Frank Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-xl tracking-tighter italic">FRANK COIN</span>
          </div>
          
          <p className="text-white/40 text-sm font-medium">
            © 2024 Frank Coin. The most honest coin.
          </p>
          
          <div className="flex gap-6">
            <a 
              href="https://x.com/i/status/2031186648755527876" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00FF00] transition-colors"
            >
              <XLogo className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-[#00FF00] transition-colors"><Send className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
