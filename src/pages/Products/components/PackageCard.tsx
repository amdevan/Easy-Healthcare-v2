import React from 'react';
import { HealthPackage } from '../types';
import { Check, Star } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PackageCardProps {
  pkg: HealthPackage;
  onSelect: (pkg: HealthPackage) => void;
  currency?: 'USD' | 'NPR';
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, currency = 'USD' }) => {
  const price = currency === 'USD' ? (pkg.priceUsd || 0) : pkg.price;
  const symbol = currency === 'USD' ? '$' : 'Rs. ';

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm border ${pkg.is_popular ? 'border-brand-blue ring-1 ring-brand-blue' : 'border-gray-200'} p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300`}>
      {pkg.is_popular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Star size={12} fill="currentColor" /> POPULAR
        </div>
      )}
      
      <div className="mb-4">
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded uppercase tracking-wider mb-2">
          {pkg.category || 'General'}
        </span>
        <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">{symbol}{price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm">/ person</span>
        </div>
      </div>

      <div className="flex-grow mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Included:</h4>
        <ul className="space-y-2">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => onSelect(pkg)}
        variant={pkg.is_popular ? 'primary' : 'outline'}
        className="w-full justify-center"
      >
        Select Package
      </Button>
    </div>
  );
};

export default PackageCard;
