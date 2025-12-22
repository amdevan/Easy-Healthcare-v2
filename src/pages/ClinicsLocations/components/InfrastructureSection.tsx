import React from 'react';

const ShieldCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export interface InfrastructureSectionProps {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  badge: string;
  features?: string[];
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ title, description, image, reverse, badge, features }) => {
  const displayFeatures = features || ["International Safety Standards", "Integrated Digital Monitoring"];
  
  return (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 items-center py-16`}>
    <div className="w-full md:w-1/2 relative">
      <div className="absolute inset-0 bg-blue-600 rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 -z-10 opacity-20"></div>
      <div className="rounded-2xl overflow-hidden shadow-2xl relative">
        <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/1200/800'; }} />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
          <span className="text-sm font-bold text-blue-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4" /> {badge}
          </span>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/2 space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
      </h3>
      <p className="text-slate-600 leading-relaxed text-lg">
        {description}
      </p>
      <ul className="space-y-2">
        {displayFeatures.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default InfrastructureSection;
