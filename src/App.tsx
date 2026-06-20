import React from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
// import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans relative overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Experience Section */}
      {/* <ExperienceSection /> */}

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Projects Section */}
      <ProjectsSection />

      {/* 7. Contact Section */}
      <ContactSection />
      
      {/* 8. Footer (Elegant clean footer showing M.AB's copyright) */}
      <footer className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-10 px-6 text-center text-sm uppercase tracking-widest text-[#D7E2EA]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Muhammad Abdul Bari. All Rights Reserved.</span>
          <span className="text-xs font-light">Web &amp; App Developer</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
