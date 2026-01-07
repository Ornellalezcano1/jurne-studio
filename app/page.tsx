"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, 
  X, 
  Layers, 
  Zap,
  ArrowRight,
  LucideIcon,
  Database,
  Workflow,
  Command,
  Activity,
  ShieldCheck,
  ZapOff,
  ExternalLink
} from 'lucide-react';

type Language = 'es' | 'en';
type ProjectType = 'all' | 'web' | 'dashboard' | 'integration';

interface NavLink {
  id: string;
  name: { es: string; en: string };
  href: string;
}

interface Service {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  icon: LucideIcon;
  tags: { es: string[]; en: string[] };
}

interface Project {
  id: string;
  title: string;
  type: ProjectType;
  category: { es: string; en: string };
  year: string;
  imageColor: string;
}

const JurneLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative group ${className}`}>
    <motion.div 
      whileHover={{ rotate: 90 }}
      className="w-full h-full bg-[#C3FF00] rounded-sm flex items-center justify-center transition-transform duration-500"
    >
      <span className="text-black font-black text-xl italic leading-none">J</span>
    </motion.div>
    <div className="absolute inset-0 border border-[#C3FF00] rounded-sm animate-pulse opacity-30 pointer-events-none" />
  </div>
);

const Loader: React.FC = () => (
  <motion.div 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center"
  >
    <div className="relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-[1px] bg-[#C3FF00]"
      />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute top-4 left-0 w-full flex justify-between text-[8px] font-black uppercase tracking-[0.5em] text-[#C3FF00]"
      >
        <span>Jurne Studio</span>
        <span>2026</span>
      </motion.div>
    </div>
  </motion.div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<ProjectType>('all');
  
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const springConfig = isMobile 
    ? { damping: 40, stiffness: 80, mass: 1 } 
    : { damping: 30, stiffness: 100, mass: 0.5 };
  
  const rawY1 = useTransform(scrollY, [0, 1000], isMobile ? [0, 0] : [0, 200]);
  const rawY2 = useTransform(scrollY, [0, 1000], isMobile ? [0, 0] : [0, -150]);
  const rawOpacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const rawScaleHero = useTransform(scrollY, [0, 400], [1, 0.95]);

  const y1 = useSpring(rawY1, springConfig);
  const y2 = useSpring(rawY2, springConfig);
  const opacityHero = useSpring(rawOpacityHero, springConfig);
  const scaleHero = useSpring(rawScaleHero, springConfig);

  useEffect(() => {
    // 1. Detección de dispositivo
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // 2. Configuración de Scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 3. Vincular el Favicon al archivo de la carpeta public
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/logo.svg'; // Aquí apunta a public/logo.svg

    // 4. Event Listeners
    const timer = setTimeout(() => setLoading(false), 1500);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => checkMobile();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: NavLink[] = [
    { id: 'philosophy', name: { es: 'Visión', en: 'Vision' }, href: '#philosophy' },
    { id: 'services', name: { es: 'Capacidades', en: 'Capabilities' }, href: '#services' },
    { id: 'work', name: { es: 'Proyectos', en: 'Projects' }, href: '#work' },
    { id: 'contact', name: { es: 'Contacto', en: 'Contact' }, href: '#contact' },
  ];

  const content = {
    hero: {
      tag: { es: "Protocolo v2.6 // Alto Rendimiento", en: "Protocol v2.6 // High Performance" },
      title1: { es: "ARQUITECTURA", en: "ENGINEERING" },
      title2: { es: "DIGITAL", en: "DIGITAL" },
      title3: { es: "SIN LÍMITES", en: "ARTIFACTS" },
      desc: { 
        es: "Integramos datos, diseño y funcionalidad en un sistema estratégico único diseñado para dominar tu sector.",
        en: "We integrate data, design, and functionality into a unique strategic system designed to dominate your sector."
      },
      cta: { es: "Iniciar Sistema", en: "Launch System" }
    },
    intro: {
      label: { es: "VISIÓN", en: "VISION" },
      title: { es: "La tecnología es un sistema vivo.", en: "Technology is a living system." },
      desc: {
        es: "Creamos sistemas que no se pueden replicar, diseñados desde cero para tomar decisiones en milisegundos.",
        en: "We create systems that cannot be replicated, designed from scratch to make decisions in milliseconds."
      }
    },
    work: {
      label: { es: "ARCHIVO", en: "ARCHIVE" },
      title: { es: "PROYECTOS SELECCIONADOS", en: "SELECTED PROJECTS" },
      filters: [
        { id: 'all', name: { es: 'Todos', en: 'All' } },
        { id: 'web', name: { es: 'Diseño Web', en: 'Web Design' } },
        { id: 'dashboard', name: { es: 'Dashboards', en: 'Dashboards' } },
        { id: 'integration', name: { es: 'Integraciones', en: 'Integrations' } },
      ]
    },
    philosophy: {
      quote: {
        es: "Transformamos la complejidad técnica en una ventaja competitiva de alto rendimiento.",
        en: "We transform technical complexity into a high-performance competitive advantage."
      }
    }
  };

  const services: Service[] = [
    {
      id: "01",
      title: { es: 'Ecosistemas Estratégicos', en: 'Strategic Ecosystems' },
      description: { 
        es: 'Webs que actúan como el núcleo de tu operación comercial. Zero plantillas.',
        en: 'Websites that act as the core of your business operation. Zero templates.'
      },
      icon: Layers,
      tags: { es: ["Performance", "SEO+", "Custom-Code"], en: ["Performance", "SEO+", "Custom-Code"] }
    },
    {
      id: "02",
      title: { es: 'Inteligencia Aplicada', en: 'Applied Intelligence' },
      description: { 
        es: 'Dashboards que transforman el ruido de datos en ventajas competitivas reales.',
        en: 'Dashboards that transform data noise into real competitive advantages.'
      },
      icon: Database,
      tags: { es: ["DataViz", "Analytics", "UX"], en: ["DataViz", "Analytics", "UX"] }
    },
    {
      id: "03",
      title: { es: 'Arquitectura de Flujo', en: 'Flow Architecture' },
      description: { 
        es: 'Integraciones profundas que eliminan la fricción operativa de tu equipo.',
        en: 'Deep integrations that eliminate operational friction from your team.'
      },
      icon: Workflow,
      tags: { es: ["Automation", "API", "Scalable"], en: ["Automation", "API", "Scalable"] }
    },
  ];

  const projects: Project[] = [
    { id: "01", title: "AETHER DATA", type: 'integration', category: { es: "Core Systems", en: "Core Systems" }, year: "2025", imageColor: "bg-zinc-900" },
    { id: "02", title: "ORION PLATFORM", type: 'web', category: { es: "E-Commerce OS", en: "E-Commerce OS" }, year: "2024", imageColor: "bg-[#111]" },
    { id: "03", title: "SYNAPSE AI", type: 'dashboard', category: { es: "Visualización de Datos", en: "DataViz" }, year: "2024", imageColor: "bg-zinc-950" },
    { id: "04", title: "VECTOR ARCHIVE", type: 'integration', category: { es: "Infraestructura Digital", en: "Digital Infra" }, year: "2023", imageColor: "bg-neutral-900" },
    { id: "05", title: "NEBULA DASH", type: 'dashboard', category: { es: "BI Systems", en: "BI Systems" }, year: "2023", imageColor: "bg-stone-900" },
    { id: "06", title: "TITAN OS", type: 'web', category: { es: "Brand System", en: "Brand System" }, year: "2022", imageColor: "bg-zinc-800" },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeFilter);

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  return (
    <div className="min-h-screen bg-[#020202] text-[#F5F5F5] font-sans selection:bg-[#C3FF00] selection:text-black overflow-x-hidden cursor-none">
      
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-[#C3FF00] rounded-full pointer-events-none z-[9999] mix-blend-difference items-center justify-center hidden md:flex"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-[#C3FF00] rounded-full" />
      </motion.div>

      <motion.div style={{ y: y1 }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {!isMobile && <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#C3FF00]/5 blur-[120px] rounded-full" />}
      </motion.div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 ${
        scrolled || isMobile ? 'bg-[#020202]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}>
            <JurneLogo className="w-8 h-8 md:w-9 md:h-9" />
            <span className="text-lg font-black tracking-wider uppercase hidden sm:block">Jurne</span>
          </div>

          <div className="flex items-center gap-3 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.id} href={link.href} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-[#C3FF00] transition-colors relative group">
                  {link.name[lang]}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C3FF00] transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
            
            <button onClick={toggleLang} className="text-[#C3FF00] font-black text-[10px] px-3 py-1 border border-[#C3FF00]/30 rounded hover:bg-[#C3FF00] hover:text-black transition-all">
              {lang.toUpperCase()}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-[#C3FF00] hover:text-black transition-all group">
              <div className="w-5 h-[2px] bg-current" />
              <div className="w-3 h-[2px] bg-current self-end mr-3" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[100] bg-[#C3FF00] text-black flex flex-col items-center justify-center p-6">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a key={link.id} href={link.href} className="text-5xl font-black tracking-tighter uppercase" onClick={() => setIsMenuOpen(false)}>{link.name[lang]}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 150 }} className="fixed inset-0 z-[150] bg-[#020202] overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 z-50 bg-[#020202]/90 backdrop-blur-xl border-b border-white/5 p-6 flex justify-between items-center">
              <JurneLogo className="w-8 h-8" />
              <button onClick={() => setIsArchiveOpen(false)} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center"><X size={18} /></button>
            </div>
            <div className="max-w-7xl mx-auto p-6 py-12">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-12 break-words">INDEXED_WORKS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.05 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-[#C3FF00]/40 transition-all">
                    <div className="flex justify-between mb-8">
                       <span className="text-[10px] font-mono opacity-20">[{project.id}]</span>
                       <ExternalLink size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-[#C3FF00]" />
                    </div>
                    <h3 className="text-xl font-black mb-2 uppercase">{project.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase text-white/30">
                       <span>{project.category[lang]}</span>
                       <span>{project.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main ref={containerRef}>
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24">
          <motion.div style={{ opacity: opacityHero, scale: scaleHero, y: y2 }} className="max-w-[95vw] md:max-w-7xl mx-auto z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="space-y-6 md:space-y-8">
              <div className="inline-block px-4 py-1.5 border border-[#C3FF00]/40 rounded-full bg-[#C3FF00]/5 text-[#C3FF00] text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em]">{content.hero.tag[lang]}</div>
              <h1 className="text-[11.5vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
                {content.hero.title1[lang]} <br />
                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>{content.hero.title2[lang]}</span> <br />
                <span className="text-[#C3FF00]">{content.hero.title3[lang]}</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 md:mt-12">
                <p className="max-w-xs md:max-w-md text-white/40 text-xs md:text-base font-medium leading-relaxed">{content.hero.desc[lang]}</p>
                <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-white text-black rounded-full font-black text-sm md:text-lg flex items-center gap-3 group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  {content.hero.cta[lang]}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C3FF00]" />
            <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll</span>
          </div>
        </section>

        <section id="philosophy" className="py-20 md:py-32 px-6 md:px-12 bg-white text-black rounded-[2.5rem] md:rounded-[6rem] relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-black/20" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-black/40">{content.intro.label[lang]}</span>
              </div>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight">{content.intro.title[lang]}</h2>
              <p className="text-base md:text-lg font-medium opacity-60">{content.intro.desc[lang]}</p>
              <div className="grid grid-cols-2 gap-8">
                {[{ val: "001.", label: "Proprietary Architecture" }, { val: "99%", label: "Accuracy" }].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black italic">{stat.val}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              style={{ y: y2 }}
              className="relative flex justify-center lg:justify-end mt-24 lg:mt-0"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="w-64 h-64 md:w-[450px] md:h-[450px] border-2 border-dashed border-black/5 rounded-full flex items-center justify-center"
              >
                <div className="w-4/5 h-4/5 border border-black/5 rounded-full flex items-center justify-center relative">
                   <Activity className="text-[#C3FF00] w-16 h-16 md:w-32 md:h-32" />
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-20 h-20 md:w-32 md:h-32 bg-black rounded-2xl md:rounded-3xl flex items-center justify-center rotate-12 shadow-2xl"
              >
                <Zap className="text-[#C3FF00] w-10 h-10 md:w-12 md:h-12" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="py-24 md:py-40 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto mb-16 relative z-10">
            <span className="text-[#C3FF00] text-xs font-black uppercase tracking-[0.5em]">System Matrix</span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-4xl sm:text-5xl md:text-9xl font-black tracking-tighter mt-4 break-words">
              {lang === 'es' ? 'CAPACIDADES' : 'CAPABILITIES'}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden relative z-10">
            {services.map((service, idx) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: isMobile ? 0 : idx * 0.15, duration: 0.6 }} viewport={{ once: false, amount: 0.1 }} className="group p-10 md:p-16 min-h-[400px] flex flex-col justify-between hover:bg-[#C3FF00] transition-all duration-500 cursor-pointer" onClick={() => scrollToTop()}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono opacity-30 group-hover:text-black uppercase">ID://{service.id}</span>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-[#C3FF00] transition-all">
                    <service.icon size={24} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black group-hover:text-black transition-colors uppercase">{service.title[lang]}</h3>
                  <p className="text-white/40 text-sm group-hover:text-black/70 transition-colors">{service.description[lang]}</p>
                </div>
                <div className="pt-8">
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase text-[#C3FF00] group-hover:text-black transition-colors">
                      {lang === 'es' ? 'Consultar' : 'Consult'} <ArrowRight size={14} />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="work" className="py-24 md:py-40 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>
                <span className="text-[#C3FF00] text-xs font-black uppercase tracking-[0.5em]">{content.work.label[lang]}</span>
                <h2 className="text-4xl sm:text-5xl md:text-9xl font-black tracking-tighter mt-4 break-words">{content.work.title[lang]}</h2>
              </motion.div>
              
              <div className={`flex ${isMobile ? 'flex-row overflow-x-auto pb-4 gap-2' : 'flex-col gap-2 items-end'}`}>
                {content.work.filters.map((filter) => (
                  <button 
                    key={filter.id} 
                    onClick={() => setActiveFilter(filter.id as ProjectType)} 
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase border transition-all ${isMobile ? 'whitespace-nowrap' : 'text-right w-full md:w-auto'} ${
                      activeFilter === filter.id 
                        ? 'bg-[#C3FF00] text-black border-[#C3FF00]' 
                        : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {filter.name[lang]}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: isMobile ? 0 : (idx % 2) * 0.1 }} className="group cursor-pointer">
                  <div className={`relative aspect-video ${project.imageColor} rounded-3xl overflow-hidden border border-white/5 group-hover:border-[#C3FF00]/30 transition-all mb-6`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10"><Command size={60} /></div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                       <h3 className="text-xl font-black group-hover:text-[#C3FF00] transition-colors">{project.title}</h3>
                       <span className="text-[9px] font-bold uppercase opacity-30">{project.category[lang]}</span>
                    </div>
                    <span className="font-mono text-[10px] opacity-20">{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsArchiveOpen(true)} 
                className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] border-b border-[#C3FF00] pb-2 text-[#C3FF00]"
              >
                {lang === 'es' ? "Explorar Archivo Completo" : "Explore Full Archive"}
              </motion.button>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-60 px-6 md:px-12 text-center">
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} className="text-2xl md:text-6xl font-black italic tracking-tighter leading-tight mb-20 max-w-4xl mx-auto">
            &quot;{content.philosophy.quote[lang]}&quot;
          </motion.h2>
          <div className="flex justify-center gap-8 md:gap-16">
            {[Command, Database, ShieldCheck, ZapOff].map((Icon, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: i * 0.1 }} className="w-10 h-10 md:w-12 md:h-12 border border-[#C3FF00]/20 rounded-full flex items-center justify-center text-[#C3FF00]">
                <Icon size={18} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="pb-24 md:pb-40 px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="relative p-12 md:p-32 bg-[#C3FF00] rounded-[3rem] md:rounded-[6rem] overflow-hidden text-black group cursor-pointer">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center md:text-left">
                <span className="text-[9px] font-black uppercase opacity-50 mb-6 block tracking-[0.4em]">Protocol 01</span>
                <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8">LET&apos;S <br /> BUILD.</h2>
                <p className="text-sm md:text-xl font-bold opacity-60 leading-tight">Aceptando socios para el próximo ciclo. Activamos activos digitales.</p>
              </div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 md:w-40 md:h-40 bg-black rounded-full flex items-center justify-center text-[#C3FF00] group-hover:scale-110 transition-transform shadow-2xl">
                <ArrowUpRight size={48} />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 md:py-24 px-6 md:px-12 border-t border-white/5 relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8 md:space-y-10">
            <div className="flex justify-center md:justify-start items-center gap-5 cursor-pointer" onClick={scrollToTop}>
              <JurneLogo className="w-8 h-8" />
              <span className="text-2xl font-black tracking-tighter uppercase">JURNE STUDIO</span>
            </div>
            <p className="text-white/20 text-sm md:text-base font-medium max-w-sm mx-auto md:mx-0 leading-relaxed">
              {lang === 'es' ? 'Arquitectura digital para aquellos que exigen la excelencia absoluta.' : 'Digital architecture for those who demand absolute excellence.'}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Status</h4>
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#C3FF00] rounded-full animate-pulse shadow-[0_0_10px_#C3FF00]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C3FF00]">Fully Operational</span>
              </div>
              <div className="space-y-1">
                 <p className="text-xs font-bold text-white/40 hover:text-white transition-colors cursor-pointer">hello@jurne.studio</p>
                 <p className="text-xs font-bold text-white/40">Córdoba // Argentina</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Network</h4>
            <div className="flex flex-col items-center md:items-start gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              <a href="#" className="hover:text-[#C3FF00] transition-all">Instagram</a>
              <a href="#" className="hover:text-[#C3FF00] transition-all">LinkedIn</a>
              <a href="#" className="hover:text-[#C3FF00] transition-all">Dribbble</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-black uppercase tracking-[0.6em] text-white/10 gap-6">
          <span>Jurne Studio // 2026 // Distributed Globally</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .stroke-text { -webkit-text-fill-color: transparent; }
        @media (max-width: 768px) { .cursor-none { cursor: auto !important; } }
        ::selection { background: #C3FF00; color: black; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { background: #C3FF00; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
      `}</style>
    </div>
  );
};

export default App;