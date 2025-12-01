import React from 'react';
import Hero from '@/components/about/Hero';
import CoreValues from '@/components/about/CoreValues';
import OurStory from '@/components/about/OurStory';
import Ecosystem from '@/components/about/Ecosystem';
import Impact from '@/components/about/Impact';
import FutureDirection from '@/components/about/FutureDirection';
import CTA from '@/components/about/CTA';

const AboutPage: React.FC = () => {
  return (
    <main>
      <Hero />
      <CoreValues />
      <OurStory />
      <Ecosystem />
      <Impact />
      <FutureDirection />
      <CTA />
    </main>
  );
};

export default AboutPage;