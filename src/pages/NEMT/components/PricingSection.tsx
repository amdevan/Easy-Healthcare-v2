import React from 'react';
import { PRICING } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold tracking-wider uppercase text-sm bg-teal-50 px-3 py-1 rounded-full">Fair Pricing</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Transparent & Affordable
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto">
            No hidden fees. Indicative rates for Kathmandu Valley. Long-distance and corporate packages available upon request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((tier, index) => {
            const isFeatured = index === 1; // Highlight Wheelchair van as popular
            return (
                <div key={index} className={`relative flex flex-col p-6 rounded-3xl transition-all duration-300 ${isFeatured ? 'bg-white border-2 border-teal-500 shadow-xl scale-105 z-10' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}>
                    {isFeatured && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            Most Popular
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tier.service}</h3>
                    <div className="mb-4">
                        <span className="text-2xl font-bold text-teal-600">{tier.price}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 flex-grow">{tier.details}</p>
                    
                    <ul className="space-y-3 mb-6 text-sm text-slate-600">
                        <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                            <span>Professional Driver</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                            <span>Door-to-Door Service</span>
                        </li>
                        {isFeatured && (
                            <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                                <span>Attendant Included</span>
                            </li>
                        )}
                    </ul>

                    <a 
                      href="#booking" 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-colors ${isFeatured ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                    >
                        Book Now
                    </a>
                </div>
            );
          })}
        </div>
        <div className="mt-10 text-center text-xs text-slate-400">
            * Prices are subject to change based on specific medical requirements, waiting time, and distance beyond 10km ring road radius.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;