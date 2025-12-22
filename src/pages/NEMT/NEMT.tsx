import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import FleetSection from './components/FleetSection';
import PricingSection from './components/PricingSection';
import BookingForm from './components/BookingForm';

const NEMT: React.FC = () => {
  const { data: pageData } = usePageContent('nemt');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const servicesBlock = pageData?.content?.find(b => b.type === 'services_section');
  const fleetBlock = pageData?.content?.find(b => b.type === 'vehicles_list');
  const pricingBlock = pageData?.content?.find(b => b.type === 'pricing_section');
  const bookingBlock = pageData?.content?.find(b => b.type === 'booking_section');

  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.subtitle || heroBlock?.data?.description,
    image: heroBlock?.data?.image ? resolveSrc(heroBlock.data.image) : undefined,
  };

  const servicesProps = {
    label: servicesBlock?.data?.label,
    title: servicesBlock?.data?.title,
    description: servicesBlock?.data?.description,
    services: servicesBlock?.data?.items,
  };

  const fleetProps = {
    label: fleetBlock?.data?.label,
    title: fleetBlock?.data?.title,
    description: fleetBlock?.data?.description,
    featuresLabel: fleetBlock?.data?.features_label,
    ctaText: fleetBlock?.data?.cta_text,
    vehicles: fleetBlock?.data?.vehicles?.map((v: any) => ({
      ...v,
      image: resolveSrc(v.image)
    })),
  };

  const pricingProps = {
    label: pricingBlock?.data?.label,
    title: pricingBlock?.data?.title,
    description: pricingBlock?.data?.description,
    tiers: pricingBlock?.data?.tiers || pricingBlock?.data?.items,
    ctaText: pricingBlock?.data?.ctaText,
    disclaimer: pricingBlock?.data?.disclaimer,
  };

  const bookingProps = {
    title: bookingBlock?.data?.title,
    subtitle: bookingBlock?.data?.description,
    steps: bookingBlock?.data?.steps,
    labels: bookingBlock?.data?.labels,
    placeholders: bookingBlock?.data?.placeholders,
    success: bookingBlock?.data?.success,
    vehicles: fleetProps.vehicles,
  };

  return (
    <main>
      <Hero {...heroProps} />
      <ServicesSection {...servicesProps} />
      <FleetSection {...fleetProps} />
      <PricingSection {...pricingProps} />
      <BookingForm {...bookingProps} />
    </main>
  );
};

export default NEMT;
