import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';
import Hero from './components/Hero';
import Features from './components/Features';
import ValueProp from './components/ValueProp';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

const Membership: React.FC = () => {
  const { data: pageData } = usePageContent('membership');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const featuresBlock = pageData?.content?.find(b => b.type === 'features_section');
  const valuePropBlock = pageData?.content?.find(b => b.type === 'value_prop_section');
  const pricingBlock = pageData?.content?.find(b => b.type === 'pricing_section');

  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.description,
    image: heroBlock?.data?.image ? resolveSrc(heroBlock.data.image) : undefined,
  };

  const featuresProps = {
    title: featuresBlock?.data?.title,
    subtitle: featuresBlock?.data?.subtitle,
    description: featuresBlock?.data?.description,
    items: featuresBlock?.data?.items,
  };

  const valuePropProps = {
    title: valuePropBlock?.data?.title,
    subtitle: valuePropBlock?.data?.subtitle,
    items: valuePropBlock?.data?.items,
  };

  const pricingProps = {
    title: pricingBlock?.data?.title,
    subtitle: pricingBlock?.data?.subtitle,
    description: pricingBlock?.data?.description,
    plans: pricingBlock?.data?.plans,
    customPackageTitle: pricingBlock?.data?.customPackageTitle,
    customPackageDescription: pricingBlock?.data?.customPackageDescription,
    customPackageButtonText: pricingBlock?.data?.customPackageButtonText,
  };

  return (
    <main className="bg-white">
      <Hero {...heroProps} />
      <ValueProp {...valuePropProps} />
      <Features {...featuresProps} />
      <Testimonials />
      <Pricing {...pricingProps} />
      <FAQ />
    </main>
  );
};

export default Membership;