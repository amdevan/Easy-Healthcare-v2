import React from 'react';
import { VEHICLES } from '../constants';
import { Check } from 'lucide-react';

const FleetSection: React.FC = () => {
  return (
    <section id="fleet" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-slate-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full">Our Fleet</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Safety on Wheels
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto">
            Each vehicle is medically equipped, sanitized before every trip, and driven by BLS-certified professionals.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-[1.02] border border-slate-100">
              <div className="relative h-56 bg-slate-200">
                <img 
                    className="h-full w-full object-cover" 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wide">
                    Verified
                </div>
              </div>
              
              <div className="flex-1 p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{vehicle.name}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{vehicle.description}</p>
                
                <div className="flex-1">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Features</h4>
                    <ul className="space-y-3 mb-8">
                        {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 rounded-full p-0.5">
                                <Check className="h-3.5 w-3.5 text-green-600" />
                            </div>
                            <p className="ml-3 text-sm text-slate-700 font-medium">{feature}</p>
                        </li>
                        ))}
                    </ul>
                </div>

                <a 
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block w-full text-center py-3 px-4 border border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-600 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    Select this Vehicle
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;