import React from 'react';
import { Smartphone, Monitor, Database, CreditCard } from 'lucide-react';
import { resolveSrc } from '@/utils/url';
import { getIcon } from '@/utils/iconMapper';

interface TechItem {
  title: string;
  description: string;
  icon?: string;
}

interface TechPlatformProps {
  title?: string;
  description?: string;
  image?: string;
  items?: TechItem[];
}

const TechPlatform: React.FC<TechPlatformProps> = ({ title, description, image, items }) => {
  const imgSrc = image ? resolveSrc(image) : "https://picsum.photos/600/600?grayscale";

  const defaultItems = [
    {
      title: 'Multi-Device Access',
      description: 'Fully accessible on smartphones, tablets, and computers. Health care in your pocket.',
      icon: 'smartphone'
    },
    {
      title: 'Easy Appointment Booking',
      description: 'Intuitive interface to find doctors, view availability, and book slots in seconds.',
      icon: 'monitor'
    },
    {
      title: 'Integrated Digital Records',
      description: 'Secure storage of your medical history, prescriptions, and lab reports in one place.',
      icon: 'database'
    },
    {
      title: 'Seamless Payments',
      description: 'Integrated online payments and pharmacy coordination for a hassle-free experience.',
      icon: 'credit-card'
    }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;
  const defaultIcons = [Smartphone, Monitor, Database, CreditCard];

  const renderIcon = (iconName: string | undefined, index: number) => {
    const Icon = getIcon(iconName);
    const DefaultIcon = defaultIcons[index] || Smartphone;
    const IconComp = Icon || DefaultIcon;
    return <IconComp className="w-6 h-6 text-teal-600" />;
  };

  return (
    <section id="tech" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
             <div className="relative">
                <div className="absolute inset-0 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
                <img
                  src={imgSrc}
                  alt="App Interface on Phone"
                  className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl border-8 border-gray-900"
                />
             </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {title || "Built on Advanced Technology"}
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              {description || "Our platform combines ease of use with powerful medical tools, ensuring a seamless experience for both patients and providers."}
            </p>

            <div className="space-y-8">
              {displayItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">
                    {renderIcon(item.icon, idx)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechPlatform;
