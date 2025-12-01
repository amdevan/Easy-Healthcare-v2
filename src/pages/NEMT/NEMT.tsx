import React from 'react';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import FleetSection from './components/FleetSection';
import PricingSection from './components/PricingSection';
import BookingForm from './components/BookingForm';

const NEMT: React.FC = () => {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <FleetSection />
      <PricingSection />
      <BookingForm />
    </main>
  );
};

export default NEMT;