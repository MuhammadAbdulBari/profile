import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Web Development',
    description: 'Responsive, high-performance web applications built with React.js, Node.js, Laravel, and modern JavaScript frameworks.',
  },
  {
    number: '02',
    name: 'Mobile Development',
    description: 'Cross-platform mobile applications with clean code, secure payments, and real-time tracking developed using Flutter.',
  },
  {
    number: '03',
    name: 'Backend Engineering',
    description: 'Scalable backend systems, database solutions, and RESTful APIs using Node.js, ASP.NET Core, Laravel, SQL, and MongoDB.',
  },
  {
    number: '04',
    name: 'UI/UX Integration',
    description: 'Designing and coding clean, modern, and user-centric interfaces with priority on layout, typography, and experience.',
  },
  {
    number: '05',
    name: 'E-Commerce Solutions',
    description: 'Custom digital storefronts and Shopify structures integrated with customized features to power secure global sales.',
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Title animation
      gsap.fromTo('.skills-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-heading',
            start: 'top 70%', // triggers when top of element reaches 70% height (30% in viewport)
            once: true
          }
        }
      );

      // 2. Staggered fade in and slide up for card items
      gsap.fromTo('.skill-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.skills-list',
            start: 'top 70%',
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <div className="w-full flex justify-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="skills-heading text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)', opacity: 0 }}
          >
            Services
          </h2>
        </div>

        {/* Services List */}
        <div className="skills-list flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className="skill-card flex flex-row items-center gap-6 sm:gap-10 md:gap-14 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 w-full text-left"
              style={{ opacity: 0 }}
            >
              {/* Massive Number on the Left */}
              <div
                className="font-black text-[#0C0C0C] leading-none select-none min-w-[70px] sm:min-w-[120px] md:min-w-[170px]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              {/* Name & Description on the Right */}
              <div className="flex flex-col gap-2 md:gap-3 flex-grow">
                <h3
                  className="font-medium text-[#0C0C0C] uppercase leading-snug"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light text-[#0C0C0C] opacity-60 leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
