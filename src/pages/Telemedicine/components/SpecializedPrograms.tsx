import React from 'react';
import { HeartPulse, Brain, Baby, Search } from 'lucide-react';
import { ServiceCardProps } from '@/pages/Telemedicine/types';
import { getIcon } from '@/utils/iconMapper';

interface SpecializedProgramsProps {
  title?: string;
  description?: string;
  items?: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

const ProgramCard: React.FC<ServiceCardProps & { iconName?: string }> = ({ title, description, icon, iconName }) => {
  const IconComp = getIcon(iconName);
  const FinalIcon = IconComp ? <IconComp /> : icon;

  return (
  <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-125 duration-500">
      {FinalIcon}
    </div>
    <div className="mb-6 text-teal-600 p-3 bg-teal-50 rounded-lg inline-block group-hover:bg-teal-600 group-hover:text-white transition-colors">
      {React.isValidElement(FinalIcon) 
        ? React.cloneElement(FinalIcon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })
        : FinalIcon
      }
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
    <a href="#cta" className="inline-block mt-6 text-teal-600 font-medium hover:text-teal-800 transition-colors">
      Learn more &rarr;
    </a>
  </div>
  );
};

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ title, description, items }) => {
  const defaultPrograms = [
    {
      title: 'Chronic Disease Management',
      description: 'Dedicated ongoing support for diabetes, hypertension, heart disease, and sickle cell anemia. We help you monitor vitals and adjust treatment plans regularly.',
      icon: <HeartPulse />,
      iconName: 'heart-pulse'
    },
    {
      title: 'Mental Health Services',
      description: 'A safe space for counseling, therapy, and psychiatry. Access professional mental health support for anxiety, depression, and stress management confidentially.',
      icon: <Brain />,
      iconName: 'brain'
    },
    {
      title: 'Maternal & Child Health',
      description: 'Comprehensive care including prenatal and postnatal consultations, pediatric follow-ups, growth monitoring, and vaccination reminders for your little ones.',
      icon: <Baby />,
      iconName: 'baby'
    },
    {
      title: 'Dermatology & Minor Ailments',
      description: 'Quick assessments for skin conditions, rashes, infections, and minor injuries. Get visual diagnoses and treatment plans without visiting a clinic.',
      icon: <Search />,
      iconName: 'search'
    },
  ];

  const displayPrograms = items && items.length > 0 
    ? items.map(item => ({ ...item, iconName: item.icon, icon: <HeartPulse /> })) // Fallback icon for prop mapping
    : defaultPrograms;

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title || "Specialized Telemedicine Programs"}
          </h2>
          <p className="text-lg text-gray-600">
            {description || "Tailored healthcare solutions designed to meet specific medical needs with expertise and care."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayPrograms.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializedPrograms;
