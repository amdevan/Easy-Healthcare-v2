import React from 'react';
import Hero from '@/pages/Telemedicine/components/Hero';
import Overview from '@/pages/Telemedicine/components/Overview';
import Features from '@/pages/Telemedicine/components/Features';
import Benefits from '@/pages/Telemedicine/components/Benefits';
import SpecializedPrograms from '@/pages/Telemedicine/components/SpecializedPrograms';
import TechPlatform from '@/pages/Telemedicine/components/TechPlatform';
import HowItWorks from '@/pages/Telemedicine/components/HowItWorks';
import Impact from '@/pages/Telemedicine/components/Impact';
import CTA from '@/pages/Telemedicine/components/CTA';

const Telemedicine: React.FC = () => {
  return (
    <main>
      <Hero />
      <Overview />
      <Features />
      <Benefits />
      <SpecializedPrograms />
      <TechPlatform />
      <HowItWorks />
      <Impact />
      <CTA />
    </main>
  );
};

export default Telemedicine;
