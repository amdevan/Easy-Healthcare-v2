import React from 'react';
import { Phone } from 'lucide-react';

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  supportText?: string;
}

const CTA: React.FC<CTAProps> = ({ title, description, buttonText, supportText }) => {
  return (
    <section id="cta" className="py-24 bg-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {title || "Your Health, Your Priority."}
        </h2>
        <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
          {description || "Don't wait for symptoms to worsen. Connect with a specialist today and take control of your well-being."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 bg-white text-teal-700 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all w-full sm:w-auto">
            {buttonText || "Start Your Online Consultation Today"}
          </button>

          <div className="flex items-center gap-3 text-white font-medium bg-teal-700/50 px-6 py-4 rounded-full border border-teal-500 w-full sm:w-auto justify-center">
            <Phone className="w-5 h-5" />
            <span>{supportText || "Support: +977-1-4XXXXXX"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
