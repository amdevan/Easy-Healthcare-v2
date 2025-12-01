import React, { useEffect } from 'react';
import { HealthPackage } from '../types';
import { X, Check, Plus, Star, Calendar, CreditCard } from 'lucide-react';

interface PackageModalProps {
  pkg: HealthPackage | null;
  onClose: () => void;
}

const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose }) => {
  useEffect(() => {
    if (pkg) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [pkg]);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Left Panel - Visual & Summary */}
        <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
           <div className="mb-8">
             <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
               Selected Package
             </span>
             <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{pkg.title}</h2>
             <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Most recommended for:</span>
             </div>
             <p className="text-slate-900 mt-1 font-medium">{pkg.target}</p>
           </div>

           <div className="mt-auto space-y-4">
             <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-500 mb-1">Estimated Price</div>
                <div className="text-3xl font-bold text-slate-900">{pkg.priceEstimate}</div>
             </div>
             <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
               <Calendar className="w-4 h-4" /> Book Now
             </button>
           </div>
        </div>

        {/* Right Panel - Details */}
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-white">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-slate-400 hover:text-slate-900" />
          </button>

          <div className="space-y-10">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Purpose</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {pkg.purpose}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                   <Check className="w-3 h-3 text-teal-600" />
                </div>
                What's Included
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {(pkg.optional || pkg.addOn) && (
              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                {pkg.optional && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-500" /> Optional Add-Ons
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pkg.optional.map((item, idx) => (
                        <span key={idx} className="text-sm text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {pkg.addOn && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" /> Highlights
                    </h3>
                    <div className="text-sm text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-100 leading-relaxed">
                      {pkg.addOn}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;