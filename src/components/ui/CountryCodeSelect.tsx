import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, Country } from '../../constants/countries';

interface CountryCodeSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  className?: string;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected country based on the value (dial_code)
  // We try to match exactly, if multiple match, we take the first one.
  // Ideally, we might want to store country code, but the existing app uses dial_code string.
  const selectedCountry = useMemo(() => 
    COUNTRIES.find(c => c.dial_code === value) || COUNTRIES.find(c => c.dial_code === '+977'), // Default to Nepal if not found
    [value]
  );

  const filteredCountries = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.dial_code.includes(lowerQuery) ||
      c.code.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-full px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all min-w-[100px]"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{selectedCountry?.flag}</span>
          <span className="text-gray-700 font-medium">{selectedCountry?.dial_code}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-[300px] mt-1 bg-white border border-gray-200 rounded-lg shadow-xl animate-fadeIn">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search country or code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto py-1 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={`${country.code}-${country.dial_code}`}
                  type="button"
                  onClick={() => {
                    onChange(country.dial_code);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                    selectedCountry?.code === country.code ? 'bg-blue-50 text-brand-blue' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-medium truncate max-w-[140px]">{country.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{country.dial_code}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
