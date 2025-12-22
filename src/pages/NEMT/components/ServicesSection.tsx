import React from 'react';
import { SERVICES } from '../constants';
import { getIcon } from '@/utils/iconMapper';
import { Ambulance } from 'lucide-react';

interface ServiceItem {
  id: number | string;
  title: string;
  description: string;
  idealFor: string;
  icon?: string | React.ElementType;
}

interface ServicesSectionProps {
  label?: string;
  title?: string;
  description?: string;
  services?: ServiceItem[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  label,
  title,
  description,
  services
}) => {
  const displayServices = services || SERVICES;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-bold tracking-wider uppercase text-sm bg-teal-50 px-3 py-1 rounded-full">{label || "Our Expertise"}</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            {title || "Comprehensive Medical Logistics"}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {description || "More than just a ride. We provide a continuum of care from your doorstep to the doctor's office and back."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            // Handle both dynamic icon strings and static component icons
            let Icon: React.ElementType = Ambulance;
            
            if (typeof service.icon === 'string') {
               const DynamicIcon = getIcon(service.icon);
               if (DynamicIcon) Icon = DynamicIcon;
            } else if (service.icon) {
               // Fallback for static content which has component as icon
               Icon = service.icon as React.ElementType;
            }

            return (
              <div key={service.id} className="group bg-slate-50 rounded-2xl p-8 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-slate-100 hover:border-teal-100">
                <div className="h-14 w-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 mb-5 leading-relaxed">{service.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Best For</span>
                  <span className="text-sm font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded">{service.idealFor}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-500">Not sure what you need? <a href="#booking" onClick={(e) => { e.preventDefault(); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-teal-600 font-semibold hover:underline">Use our booking wizard</a> or chat with us.</p>
        </div>
      </div>
    </section>
  );
};


export default ServicesSection;