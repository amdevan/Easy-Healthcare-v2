import React from 'react';
import { MapPin, Users, Heart } from 'lucide-react';
import { getIcon } from '@/utils/iconMapper';

interface OverviewItem {
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

interface OverviewProps {
  title?: string;
  description?: string;
  items?: OverviewItem[];
}

const Overview: React.FC<OverviewProps> = ({ title, description, items }) => {
  const defaultItems = [
    {
      title: 'Certified Specialists',
      description: 'Direct remote access to a wide network of verified general physicians and specialized consultants ready to assist you.',
      icon: 'users',
      color: 'teal'
    },
    {
      title: 'Nationwide Access',
      description: 'Designed for accessibility across Nepal, ensuring that even the most remote regions have a lifeline to professional care.',
      icon: 'map-pin',
      color: 'blue'
    },
    {
      title: 'Continuity of Care',
      description: 'We prioritize your long-term health by reducing the burden of travel and ensuring consistent follow-ups for better outcomes.',
      icon: 'heart',
      color: 'red'
    }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const renderIcon = (iconName: string | undefined, color: string = 'teal') => {
      const Icon = getIcon(iconName);
      const IconComp = Icon || Users; // Fallback
      
      let colorClass = 'text-teal-600 bg-teal-100';
      if (color === 'blue') colorClass = 'text-blue-600 bg-blue-100';
      if (color === 'red') colorClass = 'text-red-600 bg-red-100';
      
      return (
        <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-6 ${colorClass}`}>
          <IconComp className="w-7 h-7" />
        </div>
      );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title || "Redefining Healthcare Accessibility"}
          </h2>
          <div className="text-lg text-gray-600 mb-12 leading-relaxed">
            {description ? (
               <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
               <p>At <span className="font-semibold text-teal-600">Easy Health Care</span>, we believe quality medical attention shouldn't be limited by geography. Our telemedicine platform bridges the gap between patients and certified doctors, designed specifically to serve the diverse terrain of Nepal. Whether you are in the heart of Kathmandu or a remote village in the Himalayas, we bring the clinic to you.</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {displayItems.map((item, idx) => (
            <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all text-center">
              {renderIcon(item.icon, item.color)}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
