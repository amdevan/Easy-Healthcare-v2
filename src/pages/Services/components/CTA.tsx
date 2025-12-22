import React from 'react';
import Button from '@/components/ui/Button';

interface CTAProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

const CTA: React.FC<CTAProps> = ({ 
  title, 
  description,
  primaryButtonText = "Schedule Visit",
  primaryButtonUrl = "/video-consult",
  secondaryButtonText = "Contact Support",
  secondaryButtonUrl = "/contact"
}) => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white p-8 md:p-12 shadow-md">
        <h3 className="text-xl md:text-2xl font-extrabold text-center">{title}</h3>
        <p className="mt-3 text-sm md:text-base text-center max-w-2xl mx-auto opacity-90">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button to={primaryButtonUrl} size="md" variant="primary" className="bg-white text-brand-blue hover:bg-blue-50">
            {primaryButtonText}
          </Button>
          <Button to={secondaryButtonUrl} size="md" variant="outline" className="border-white text-white hover:bg-white/10">
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
