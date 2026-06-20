import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for smooth page-load sequence
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Navbar slides down
      tl.fromTo('.hero-nav',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 2. Main title slides up
      tl.fromTo('.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // 3. Portrait image fades in and scales slightly
      tl.fromTo('.hero-portrait',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0 },
        '-=0.6'
      );

      // 4. Bottom details slide up
      tl.fromTo(['.hero-info', '.hero-cta'],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];
  const getTargetId = (item: string) =>
    item === 'About' ? 'about' :
      item === 'Experience' ? 'experience' :
        item === 'Skills' ? 'services' :
          item === 'Projects' ? 'projects' : 'contact';

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C]"
    >
      {/* 1. Navbar */}
      <nav className="hero-nav w-full z-20 px-6 md:px-10 pt-6 md:pt-8" style={{ opacity: 0 }}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* Desktop nav links */}
          <div className="hidden md:flex w-full justify-between items-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleScroll(getTargetId(item))}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 focus:outline-none"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 ml-auto z-30 focus:outline-none"
          >
            <span
              className={`block w-6 h-[2px] bg-[#D7E2EA] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#D7E2EA] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#D7E2EA] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-20 bg-[#0C0C0C] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleScroll(getTargetId(item))}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-2xl hover:opacity-70 transition-opacity duration-200 focus:outline-none"
          >
            {item}
          </button>
        ))}
      </div>

      {/* 2. Hero Heading */}
      <div className="hero-title w-full flex justify-center mt-6 sm:mt-4 md:-mt-5 z-20 px-4" style={{ opacity: 0 }}>
        <div className="overflow-hidden w-full max-w-7xl">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-center whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            i’m bari
          </h1>
        </div>
      </div>

      {/* 3. Hero Portrait (magnetic) */}
      <div
        className="hero-portrait absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        style={{ opacity: 0 }}
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full h-full flex justify-center items-center"
        >
          <img
            src="https://i.postimg.cc/cCw820vt/Adobe-Express-file.png"
            alt="M.AB Portrait"
            className="w-full object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            draggable="false"
          />
        </Magnet>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full z-20 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 max-w-7xl mx-auto flex justify-between items-end gap-4 mt-auto">
        {/* Left Info */}
        <div className="hero-info max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ opacity: 0 }}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a web &amp; app developer crafting digital excellence with timeless elegance
          </p>
        </div>

        {/* Right CTA */}
        <div className="hero-cta" style={{ opacity: 0 }}>
          <ContactButton onClick={() => handleScroll('contact')} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
