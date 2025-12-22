import React from 'react';
import Icon from '@/components/ui/Icon';
import { getIcon } from '@/utils/iconMapper';

export interface ConcernItem {
  name: string;
  icon: string;
}

interface OnlineConsultationProps {
  title?: string;
  description?: string;
  items?: ConcernItem[];
}

const OnlineConsultation: React.FC<OnlineConsultationProps> = ({ title, description, items }) => {
  const defaultConcerns = [
    { name: 'Period doubts or Pregnancy', icon: 'pregnancy' },
    { name: 'Acne, pimple or skin issues', icon: 'acne' },
    { name: 'Performance issues in bed', icon: 'bed' },
    { name: 'Cold, cough or fever', icon: 'fever' },
    { name: 'Child not feeling well', icon: 'baby' },
    { name: 'Depression or anxiety', icon: 'depression' },
  ];

  const concerns = items && items.length > 0 ? items : defaultConcerns;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 id="online-consult-title" className="text-3xl font-extrabold text-brand-gray-900">
              {title || "Consult top doctors online for any health concern"}
            </h2>
            <p id="online-consult-subtitle" className="mt-2 text-brand-gray-500">
              {description || "Private online consultations with verified doctors in all specialities."}
            </p>
          </div>
          <a href="#" className="hidden sm:inline-block px-5 py-2.5 border border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Specialities
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {concerns.map((concern, index) => {
            const LucideIcon = getIcon(concern.icon);
            return (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-brand-blue transition-all duration-300 flex flex-col items-center justify-between">
                <div className="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                  {LucideIcon ? (
                    <LucideIcon className="w-10 h-10 text-brand-blue" />
                  ) : (
                    <Icon name={concern.icon} alt={concern.name} className="w-10 h-10" />
                  )}
                </div>
                <p className="font-semibold text-brand-gray-800 flex-grow">{concern.name}</p>
                <a href="#" className="mt-4 text-brand-blue font-bold text-sm hover:underline">
                  CONSULT NOW
                </a>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 sm:hidden">
           <a href="#" className="px-5 py-2.5 border border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Specialities
          </a>
        </div>
      </div>
    </section>
  );
};

export default OnlineConsultation;
