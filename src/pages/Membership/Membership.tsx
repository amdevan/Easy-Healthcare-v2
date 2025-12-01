import React from 'react';
import Hero from '../../../vendor/amdevan-package/membership/github/components/Hero';
import Features from '../../../vendor/amdevan-package/membership/github/components/Features';
import ValueProp from '../../../vendor/amdevan-package/membership/github/components/ValueProp';
import Pricing from '../../../vendor/amdevan-package/membership/github/components/Pricing';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9/mo',
    features: [
      'Telehealth access',
      'Discounted lab tests',
      'Priority support',
    ],
    cta: '/contact',
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '$29/mo',
    features: [
      'Everything in Basic',
      'Quarterly health check',
      'Care coordinator',
    ],
    cta: '/video-consult',
  },
  {
    id: 'family',
    name: 'Family',
    price: '$59/mo',
    features: [
      'Covers up to 4 members',
      'Annual wellness package',
      'Pharmacy savings',
    ],
    cta: '/contact',
  },
];

const Membership: React.FC = () => {
  return (
    <main className="bg-white">
      <Hero />
      <Features />
      <ValueProp />
      <Pricing />
    </main>
  );
};

export default Membership;