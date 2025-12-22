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
import { usePageContent } from '@/hooks/usePageContent';

const Telemedicine: React.FC = () => {
  const { data: pageData } = usePageContent('telemedicine');
  
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const overviewBlock = pageData?.content?.find(b => b.type === 'overview_section');
  const featuresBlock = pageData?.content?.find(b => b.type === 'features_section');
  const benefitsBlock = pageData?.content?.find(b => b.type === 'benefits_section');
  const programsBlock = pageData?.content?.find(b => b.type === 'programs_section');
  const techBlock = pageData?.content?.find(b => b.type === 'tech_platform');
  const howItWorksBlock = pageData?.content?.find(b => b.type === 'how_it_works');
  const impactBlock = pageData?.content?.find(b => b.type === 'impact_section');
  const ctaBlock = pageData?.content?.find(b => b.type === 'cta_section');

  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.subtitle || heroBlock?.data?.description,
    image: heroBlock?.data?.image
  };

  const overviewProps = {
    title: overviewBlock?.data?.title,
    description: overviewBlock?.data?.description,
    items: overviewBlock?.data?.items
  };

  const featuresProps = {
    title: featuresBlock?.data?.title,
    subtitle: featuresBlock?.data?.subtitle,
    items: featuresBlock?.data?.items
  };

  const benefitsProps = {
    title: benefitsBlock?.data?.title,
    description: benefitsBlock?.data?.description,
    image: benefitsBlock?.data?.image,
    imageCaption: benefitsBlock?.data?.imageCaption,
    items: benefitsBlock?.data?.items
  };

  const programsProps = {
    title: programsBlock?.data?.title,
    description: programsBlock?.data?.description,
    items: programsBlock?.data?.items
  };

  const techProps = {
    title: techBlock?.data?.title,
    description: techBlock?.data?.description,
    image: techBlock?.data?.image,
    items: techBlock?.data?.items
  };

  const howItWorksProps = {
    title: howItWorksBlock?.data?.title,
    subtitle: howItWorksBlock?.data?.subtitle,
    steps: howItWorksBlock?.data?.steps
  };

  const impactProps = {
    title: impactBlock?.data?.title,
    items: impactBlock?.data?.items
  };

  const ctaProps = {
    title: ctaBlock?.data?.title,
    description: ctaBlock?.data?.description,
    buttonText: ctaBlock?.data?.buttonText,
    supportText: ctaBlock?.data?.supportText
  };

  return (
    <main>
      <Hero {...heroProps} />
      <Overview {...overviewProps} />
      <Features {...featuresProps} />
      <Benefits {...benefitsProps} />
      <SpecializedPrograms {...programsProps} />
      <TechPlatform {...techProps} />
      <HowItWorks {...howItWorksProps} />
      <Impact {...impactProps} />
      <CTA {...ctaProps} />
    </main>
  );
};

export default Telemedicine;
