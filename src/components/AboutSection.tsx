import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Profile image on the left slides in from left and up
      gsap.fromTo('.about-left',
        { opacity: 0, x: -60, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%', // triggers when top of about-grid reaches 70% of viewport height (30% in view)
            once: true
          }
        }
      );

      // 2. Content on the right slides in from right and up
      gsap.fromTo('.about-right',
        { opacity: 0, x: 60, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%',
            once: true
          }
        }
      );

      // 3. Floating background 3D elements fade in from sides
      gsap.fromTo('.about-asset-left',
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      gsap.fromTo('.about-asset-right',
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Absolute Decorative 3D Images */}
      {/* 1. Top-Left Moon Icon */}
      <div className="about-asset-left absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px]" style={{ opacity: 0 }}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D Asset"
          className="w-full object-contain pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          draggable="false"
        />
      </div>

      {/* 2. Bottom-Left 3D Object */}
      <div className="about-asset-left absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 w-[100px] sm:w-[140px] md:w-[180px]" style={{ opacity: 0 }}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Abstract 3D Object"
          className="w-full object-contain pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          draggable="false"
        />
      </div>

      {/* 3. Top-Right Lego Icon */}
      <div className="about-asset-right absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px]" style={{ opacity: 0 }}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D Asset"
          className="w-full object-contain pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          draggable="false"
        />
      </div>

      {/* 4. Bottom-Right 3D Group */}
      <div className="about-asset-right absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 w-[130px] sm:w-[170px] md:w-[220px]" style={{ opacity: 0 }}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Group 3D Assets"
          className="w-full object-contain pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          draggable="false"
        />
      </div>

      {/* Grid Container */}
      <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center justify-center max-w-5xl z-20 w-full mt-10 sm:mt-16 md:mt-20">
        
        {/* Left Side: Profile Image */}
        <div className="about-left lg:col-span-5 flex justify-center w-full" style={{ opacity: 0 }}>
          <Magnet
            padding={100}
            strength={3.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full max-w-[280px] sm:max-w-[340px]"
          >
            <div className="relative rounded-[40px] overflow-hidden border-2 border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.02] p-3 shadow-2xl group hover:border-[#B600A8]/50 transition-colors duration-300">
              <img
                src="https://i.postimg.cc/cCw820vt/Adobe-Express-file.png"
                alt="Muhammad Abdul Bari Avatar"
                className="w-full object-contain rounded-[32px] select-none pointer-events-none filter grayscale group-hover:grayscale-0 transition-all duration-500"
                draggable="false"
              />
            </div>
          </Magnet>
        </div>

        {/* Right Side: Text & CTA */}
        <div className="about-right lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full" style={{ opacity: 0 }}>
          {/* Heading */}
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 90px)' }}
          >
            About me
          </h2>

          {/* Description Paragraph */}
          <p
            className="text-[#D7E2EA]/80 font-light leading-relaxed max-w-[580px] mb-10 sm:mb-12"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)' }}
          >
            I am Muhammad Abdul Bari, also known as Bari, a software engineering student and developer based in Karachi, Pakistan, focused on crafting digital excellence. As an INTP, I enjoy solving complex problems and building innovative systems that create real impact. Let's collaborate!
          </p>

          {/* Contact Button */}
          <div className="flex justify-center lg:justify-start">
            <ContactButton onClick={() => handleScroll('contact')} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
