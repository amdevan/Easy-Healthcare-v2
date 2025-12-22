import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue bg-blue-50 px-3 py-1 rounded-full">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L6.5 20l2-7L3 9h7l2-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          WORLD CLASS CARE
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-gray-900">{title}</h1>
        <p className="mt-3 text-brand-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
