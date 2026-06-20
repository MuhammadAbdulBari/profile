import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiveProjectButton } from './LiveProjectButton';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  category: string;
  name: string;
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

const PROJECTS_DATA: Project[] = [
  {
    number: '01',
    category: 'Client / Flutter & ASP.NET',
    name: 'Orrento App',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'
    }
  },
  {
    number: '02',
    category: 'Personal / Shopify & AR',
    name: 'Ondule Store',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'
    }
  },
  {
    number: '03',
    category: 'Client / ASP.NET MVC',
    name: 'Eventure',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
    }
  },
  {
    number: '04',
    category: 'Client / PHP & MySQL',
    name: 'Courier Management System',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'
    }
  },
  {
    number: '05',
    category: 'Personal / ASP .Net & My SQL',
    name: 'DecorVista - Furniture Website',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'
    }
  },
  {
    number: '06',
    category: 'Personal / Flutter & Dart',
    name: 'SecureMob - Mobile Security App',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
    }
  },
  {
    number: '07',
    category: 'Client / React & Node JS',
    name: 'LeadMiner - Lead Fetcher',
    images: {
      col1_1: 'https://i.postimg.cc/d185mPJn/screencapture-localhost-3000-2026-06-20-02-05-49.png',
      col1_2: 'https://i.postimg.cc/8PFrqdrx/nigg.png',
      col2: 'https://i.postimg.cc/d185mPJn/screencapture-localhost-3000-2026-06-20-02-05-49.png'
    }
  },
  {
    number: '08',
    category: 'React JS & PHP',
    name: 'Hospital POS System',
    images: {
      col1_1: 'https://i.postimg.cc/C5xxH0jR/Chat-GPT-Image-Jun-20-2026-01-59-35-AM.png',
      col1_2: 'https://i.postimg.cc/NjqwQY5f/Chat-GPT-Image-Jun-20-2026-02-02-26-AM.png',
      col2: 'https://i.postimg.cc/NjqwQY5f/Chat-GPT-Image-Jun-20-2026-02-02-26-AM.png'
    }
  }
];

interface CardProps {
  project: Project;
  index: number;
  totalCards: number;
  stickyTop: number;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards, stickyTop }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate target scale: e.g. Card 0: 0.94, Card 1: 0.97, Card 2: 1.0
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Track scroll position of the card's height container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smoothly transform scale from 1.0 down to targetScale as we scroll past this container
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="project-card-container h-[85vh] w-full flex flex-col justify-start relative mb-[5vh]"
      style={{ opacity: 0 }} // Start invisible for GSAP stagger
    >
      <motion.div
        style={{
          scale,
          top: stickyTop,
          willChange: 'transform',
        }}
        className="sticky w-full bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.9)]"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 pb-4 md:pb-6 border-b border-[#D7E2EA]/10">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Project Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {project.number}
            </span>

            {/* Category and Project Name */}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="self-end sm:self-auto">
            <LiveProjectButton />
          </div>
        </div>

        {/* Bottom Row - Columns */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 w-full flex-grow overflow-hidden">
          {/* Left stack (40% width on large screens) */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <img
              src={project.images.col1_1}
              alt={`${project.name} image 1`}
              loading="lazy"
              className="object-fill w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images.col1_2}
              alt={`${project.name} image 2`}
              loading="lazy"
              className="object-fill w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          {/* Right image (60% width on large screens) */}
          <div className="md:col-span-6 flex w-full">
            <img
              src={project.images.col2}
              alt={`${project.name} showcase`}
              loading="lazy"
              className="object-fill w-full h-full min-h-[200px] md:min-h-0 rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading slide up on viewport trigger
      gsap.fromTo('.projects-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-heading',
            start: 'top 70%', // 30% in viewport
            once: true
          }
        }
      );

      // 2. Project cards slide up with stagger
      gsap.fromTo('.project-card-container',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.project-cards-list',
            start: 'top 70%', // triggers when the top of the cards list reaches 70% height (30% in view)
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const baseTop = isMobile ? 96 : 128; // matching top-24 (96px) and top-32 (128px)

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 -mt-10 sm:-mt-12 md:-mt-14 z-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="w-full flex justify-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="projects-heading hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)', opacity: 0 }}
          >
            Project
          </h2>
        </div>

        {/* Project Cards Stacking Container */}
        <div className="project-cards-list flex flex-col w-full relative">
          {PROJECTS_DATA.map((project, index) => {
            const stickyTop = baseTop + index * 28;
            return (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
                totalCards={PROJECTS_DATA.length}
                stickyTop={stickyTop}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
