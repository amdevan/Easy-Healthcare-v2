import React from 'react';
import Editable from '@/components/ui/Editable';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-brand-cyan-light/40 to-white">
      <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <Editable
            tag="h1"
            id="hero-title"
            className="text-4xl md:text-6xl font-extrabold text-brand-gray-900 leading-tight"
          >
            Your Trusted Partner for <span className="text-brand-blue">Easy Healthcare</span>
          </Editable>
          <Editable
            tag="p"
            id="hero-subtitle"
            className="mt-6 text-lg text-brand-gray-500 max-w-xl mx-auto lg:mx-0"
          >
            Connecting you with top doctors, online consultations, and trusted clinics for all your health needs.
          </Editable>
          <div className="mt-8 space-y-4 max-w-md mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
              </div>
              <input 
                type="text" 
                placeholder="Select your city (e.g., Kathmandu)"
                aria-label="Select your city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input 
                type="text" 
                placeholder="Search doctors, clinics, hospitals etc."
                aria-label="Search healthcare providers and services"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button to="/find-doctors" variant="primary" size="lg">Find Doctors</Button>
              <Button to="/video-consult" variant="outline" size="lg">Video Consult</Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Slider
            slides={[
              { src: 'https://images.unsplash.com/photo-1758691463384-771db2f192b3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Health care' },
              { src: 'https://plus.unsplash.com/premium_photo-1663013549676-1eba5ea1d16e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGhlYWx0aCUyMGNhcmV8ZW58MHx8MHx8fDA%3D', alt: 'Medical tools and accessories' },
              { src: 'https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Work desk with accessories' },
            ]}
            autoPlay
            intervalMs={4500}
            className="w-[600px] h-[400px]"
          />
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
