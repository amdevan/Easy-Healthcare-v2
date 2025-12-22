import React from 'react';
import { Video, Activity, FileText, CalendarCheck, PhoneCall } from 'lucide-react';
import { getIcon } from '@/utils/iconMapper';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, items }) => {
  const defaultItems = [
    {
      title: 'Virtual Consultations',
      description: 'Connect face-to-face with general physicians, specialized doctors, and mental health experts through our secure, high-definition video platform. Discuss symptoms and get advice without leaving home.',
      icon: 'video'
    },
    {
      title: 'Remote Diagnostics',
      description: 'Leverage the power of modern technology. We integrate with digital health tools and wearables to monitor your vitals remotely, allowing doctors to make data-driven decisions about your health.',
      icon: 'activity'
    },
    {
      title: 'Instant E-Prescriptions',
      description: 'Receive your valid electronic prescription immediately after your consultation. It allows you to purchase medicine from your local pharmacy or order directly through our integrated partners.',
      icon: 'file-text'
    },
    {
      title: 'Online Follow-ups',
      description: 'Recovery is a journey. Our system makes it effortless to schedule and attend follow-up appointments to track your progress, adjust medications, and ensure you are on the path to full health.',
      icon: 'calendar-check'
    },
    {
      title: 'Tele-emergency Support',
      description: 'For urgent situations that require immediate guidance, our tele-emergency support connects you with professionals who can triage your condition and direct you to the nearest physical facility if needed.',
      icon: 'phone-call'
    }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const renderIcon = (iconName: string | undefined, defaultIcon: React.ElementType) => {
    const Icon = getIcon(iconName);
    const IconComp = Icon || defaultIcon;
    return <IconComp className="w-10 h-10 text-teal-600 mb-4" />;
  };

  const defaultIcons = [Video, Activity, FileText, CalendarCheck, PhoneCall];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold tracking-wide uppercase text-sm">
            {subtitle || "Key Features"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            {title || "Comprehensive Digital Care"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, idx) => {
             // Fallback for default icon if using defaultItems order, or just Video if completely unknown
             const fallbackIcon = idx < defaultIcons.length ? defaultIcons[idx] : Video;
             return (
              <div key={idx} className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                {renderIcon(item.icon, fallbackIcon)}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
