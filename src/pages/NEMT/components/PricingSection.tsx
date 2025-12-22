import React, { useState } from 'react';
import { PRICING } from '../constants';
import { PricingTier } from '../types';
import { CheckCircle2 } from 'lucide-react';
 
interface PricingSectionProps {
  label?: string;
  title?: string;
  description?: string;
  tiers?: PricingTier[];
  ctaText?: string;
  disclaimer?: string;
}
 
const PricingSection: React.FC<PricingSectionProps> = ({
  label,
  title,
  description,
  tiers,
  ctaText,
  disclaimer
}) => {
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');
  const displayTiers = tiers || PRICING;

  const hasNpr = displayTiers.some(t => t.priceNpr !== undefined && t.priceNpr !== null);
  // Check for USD price. Since price can be string or number, we check if it exists.
  // Assuming if it's a number it's USD price. If string, it might be legacy or USD text.
  // For safety, if price exists (not null/undefined), we assume USD is available unless it's strictly NPR only (which isn't structured here).
  const hasUsd = displayTiers.some(t => t.price !== undefined && t.price !== null);

  // Effect to ensure correct currency is selected if one is missing
  React.useEffect(() => {
    if (!hasUsd && hasNpr) {
        setCurrency('NPR');
    } else if (hasUsd && !hasNpr) {
        setCurrency('USD');
    }
  }, [hasUsd, hasNpr]);

  const showCurrencyToggle = hasUsd && hasNpr;
 
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold tracking-wider uppercase text-sm bg-teal-50 px-3 py-1 rounded-full">{label || 'Fair Pricing'}</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            {title || 'Transparent & Affordable'}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto">
            {description || 'No hidden fees. Indicative rates for Kathmandu Valley. Long-distance and corporate packages available upon request.'}
          </p>
        </div>

        {showCurrencyToggle && (
          <div className="flex justify-center mb-16">
            <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  currency === 'USD' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('NPR')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  currency === 'NPR' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                NPR (Rs)
              </button>
            </div>
          </div>
        )}
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTiers.map((tier, index) => {
            const isFeatured = index === 1;
            const features = tier.features || [
                "Professional Driver",
                "Door-to-Door Service",
                isFeatured ? "Attendant Included" : null
            ].filter(Boolean) as string[];

            let displayPrice: string | number = tier.price;
            
            if (typeof tier.price === 'number') {
                const val = currency === 'USD' ? tier.price : (tier.priceNpr || tier.price);
                const symbol = currency === 'USD' ? '$' : 'Rs. ';
                displayPrice = `${symbol}${val.toLocaleString()}`;
            } else if (currency === 'USD' && typeof tier.price === 'string' && tier.price.includes('NPR')) {
                // If we have a string price with NPR but user wants USD, we can't auto-convert.
                // Just show the string but maybe dim it or leave it as is.
                // displayPrice remains tier.price
            }

            return (
              <div
                key={index}
                className={`relative flex flex-col p-6 rounded-3xl transition-all duration-300 ${isFeatured ? 'bg-white border-2 border-teal-500 shadow-xl scale-105 z-10' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
              >
                {isFeatured && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900 mb-2">{tier.service}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-teal-600">{displayPrice}</span>
                </div>
                <p className="text-sm text-slate-500 mb-6 flex-grow">{tier.details}</p>
 
                <ul className="space-y-3 mb-6 text-sm text-slate-600">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                  ))}
                </ul>
 
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-colors ${isFeatured ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  {ctaText || 'Book Now'}
                </a>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center text-xs text-slate-400">
          {disclaimer || '* Prices are subject to change based on specific medical requirements, waiting time, and distance beyond 10km ring road radius.'}
        </div>
      </div>
    </section>
  );
};

 
export default PricingSection;
