import React from 'react';
import { Home, Globe, TrendingUp, DollarSign, Lock } from 'lucide-react';
import { resolveSrc } from '@/utils/url';
import { getIcon } from '@/utils/iconMapper';

interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

interface BenefitsProps {
  title?: string;
  description?: string;
  image?: string;
  imageCaption?: string;
  items?: BenefitItem[];
}

const Benefits: React.FC<BenefitsProps> = ({ title, description, image, imageCaption, items }) => {
  const imgSrc = image ? resolveSrc(image) : "https://picsum.photos/400/500?grayscale&blur=2";

  const defaultItems = [
    {
      title: 'Care from Home',
      description: 'Consult with top doctors from the comfort of your living room or workplace, eliminating the stress of waiting rooms.',
      icon: 'home'
    },
    {
      title: 'True Accessibility',
      description: 'We bridge the gap for remote and underserved areas, bringing specialist care to places where it was previously unavailable.',
      icon: 'globe'
    },
    {
      title: 'Continuous Care',
      description: 'Ideal for chronic disease management, maternal health, and child care, ensuring no gap in medical attention.',
      icon: 'trending-up'
    },
    {
      title: 'Cost Effective',
      description: 'Save significant money and time on travel, lodging, and hospital administrative fees.',
      icon: 'dollar-sign'
    },
    {
      title: 'Secure & Private',
      description: 'Your health data is sacred. We use end-to-end encryption to ensure your consultations and records remain 100% private and secure.',
      icon: 'lock'
    }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const defaultIcons = [Home, Globe, TrendingUp, DollarSign, Lock];

  const renderIcon = (iconName: string | undefined, index: number) => {
     const Icon = getIcon(iconName);
     const DefaultIcon = defaultIcons[index] || Home;
     const IconComp = Icon || DefaultIcon;
     return <IconComp className="w-6 h-6 text-teal-300" />;
  };

  return (
    <section className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {title || "Why Patients Trust Us"}
            </h2>
            <p className="text-teal-100 text-lg leading-relaxed mb-8">
              {description || "We have built our platform with the patient at the center. Every feature is designed to make healthcare simpler, faster, and more effective for you and your family."}
            </p>
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border border-teal-700">
               <img src={imgSrc} alt="Happy family" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-semibold text-white">
                    {imageCaption || "Serving over 10,000 families"}
                  </p>
               </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            {displayItems.map((item, idx) => (
              <div key={idx} className={`flex gap-4 ${idx === 4 ? 'sm:col-span-2' : ''}`}>
                <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                  {renderIcon(item.icon, idx)}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-teal-100/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
