import React, { useRef } from 'react';
import Editable from '@/components/ui/Editable';
import Icon from '@/components/ui/Icon';
import { getIcon } from '@/utils/iconMapper';
import { resolveStorageUrl } from '@/controllers/api';

interface SpecialistCardProps {
    icon: string;
    icon_path?: string;
    icon_url?: string;
    name: string;
    description: string;
}

interface InClinicConsultationProps {
  items?: SpecialistCardProps[];
  title?: string;
  subtitle?: string;
}

const InClinicConsultation: React.FC<InClinicConsultationProps> = ({ items, title, subtitle }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const defaultSpecialists: SpecialistCardProps[] = [
    {
        icon: 'dentist',
        name: 'Dentist',
        description: 'Teething troubles? Schedule a dental checkup and maintain your oral health.'
    },
    {
        icon: 'gynecology',
        name: 'Gynecologist/ Obstetrician',
        description: "Explore services for women's health, pregnancy, and infertility treatments with expert care."
    },
    {
        icon: 'nutrition',
        name: 'Dietitian/Nutritionist',
        description: 'Get guidance on eating right, effective weight management, and personalized sports nutrition.'
    },
    {
        icon: 'physiotherapy',
        name: 'Physiotherapist',
        description: 'Pulled a muscle or need rehabilitation? Get it treated by a trained physiotherapist.'
    },
    {
        icon: 'neurology',
        name: 'Neurologist',
        description: 'Specializing in disorders of the nervous system. Expert care for complex conditions.'
    },
  ];

  const specialists = items && items.length > 0 ? items : defaultSpecialists;

  const SpecialistCard: React.FC<SpecialistCardProps> = ({ icon, icon_path, icon_url, name, description }) => {
      const LucideIcon = getIcon(icon);
      return (
      <div className="flex-shrink-0 w-64 bg-white p-6 rounded-xl border border-gray-200 flex flex-col text-center items-center">
          <div className="bg-orange-100 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              {icon_url || icon_path ? (
                <img src={icon_url || resolveStorageUrl(icon_path)} alt={name} className="w-10 h-10 object-contain" loading="lazy" />
              ) : LucideIcon ? (
                <LucideIcon className="w-10 h-10 text-brand-blue" />
              ) : (
                <Icon name={icon} alt={name} className="w-10 h-10" />
              )}
          </div>
          <Editable tag="h3" id={`specialist-name-${name.replace(/\s+/g, '-')}`} className="font-bold text-lg text-brand-gray-900">{name}</Editable>
          <Editable tag="p" id={`specialist-desc-${name.replace(/\s+/g, '-')}`} className="mt-2 text-sm text-brand-gray-500 flex-grow">{description}</Editable>
      </div>
      );
  };

  const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-10">
                    <Editable tag="h2" id="in-clinic-title" className="text-3xl font-extrabold text-brand-gray-900">{title || "Book an appointment for an in-clinic consultation"}</Editable>
                    <Editable tag="p" id="in-clinic-subtitle" className="mt-2 text-brand-gray-500">{subtitle || "Find experienced doctors across all specialties."}</Editable>
                </div>
                <div className="relative">
                    <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                        {specialists.map((specialist, index) => (
                            <SpecialistCard key={index} {...specialist} />
                        ))}
                    </div>
                    <button onClick={() => scroll('left')} className="absolute top-1/2 -translate-y-1/2 -left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50">
                        &lt;
                    </button>
                    <button onClick={() => scroll('right')} className="absolute top-1/2 -translate-y-1/2 -right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                        &gt;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InClinicConsultation;
