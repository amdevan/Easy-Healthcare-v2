import React from 'react';
import { CORE_COMPONENTS } from '../constants';
import { CheckCircle2, Stethoscope, Home, Smartphone, PhoneCall, UserCheck, Activity } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  details: string[];
  icon?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: FeatureItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  'stethoscope': <Stethoscope className="w-6 h-6" />,
  'user-check': <UserCheck className="w-6 h-6" />,
  'home': <Home className="w-6 h-6" />,
  'smartphone': <Smartphone className="w-6 h-6" />,
  'phone-call': <PhoneCall className="w-6 h-6" />,
  'default': <Activity className="w-6 h-6" />
};

const Features: React.FC<FeaturesProps> = ({ title, subtitle, description, items }) => {
  const displayItems = items || CORE_COMPONENTS.map(c => ({
    ...c,
    icon: 'default' // This won't be used because we check for ReactNode in original constant
  }));

  const colors = [
    { 
      bg: 'bg-teal-50', 
      text: 'text-teal-600', 
      border: 'border-slate-100 group-hover:border-teal-200', 
      shadow: 'shadow-lg shadow-teal-100/60 hover:shadow-2xl hover:shadow-teal-500/50',
      iconBg: 'bg-teal-100' 
    },
    { 
      bg: 'bg-sky-50', 
      text: 'text-sky-600', 
      border: 'border-slate-100 group-hover:border-sky-200', 
      shadow: 'shadow-lg shadow-sky-100/60 hover:shadow-2xl hover:shadow-sky-500/50',
      iconBg: 'bg-sky-100'
    },
    { 
      bg: 'bg-rose-50', 
      text: 'text-rose-600', 
      border: 'border-slate-100 group-hover:border-rose-200', 
      shadow: 'shadow-lg shadow-rose-100/60 hover:shadow-2xl hover:shadow-rose-500/50',
      iconBg: 'bg-rose-100'
    },
    { 
      bg: 'bg-indigo-50', 
      text: 'text-indigo-600', 
      border: 'border-slate-100 group-hover:border-indigo-200', 
      shadow: 'shadow-lg shadow-indigo-100/60 hover:shadow-2xl hover:shadow-indigo-500/50',
      iconBg: 'bg-indigo-100'
    },
    { 
      bg: 'bg-amber-50', 
      text: 'text-amber-600', 
      border: 'border-slate-100 group-hover:border-amber-200', 
      shadow: 'shadow-lg shadow-amber-100/60 hover:shadow-2xl hover:shadow-amber-500/50',
      iconBg: 'bg-amber-100'
    },
  ];

  return (
    <div id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">{subtitle || "Comprehensive Coverage"}</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {title || "Everything Your Parents Need"}
          </p>
          <p className="text-xl text-slate-500 leading-relaxed">
            {description || "We handle the logistics, medical advocacy, and daily coordination so your parents are never alone."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((feature, index) => {
            const colorTheme = colors[index % colors.length];
            // Handle icon: if it's a string (from backend props), use map. If it's a ReactNode (from constants), use it.
            // Note: The 'items' prop expects FeatureItem where icon is string. CORE_COMPONENTS has ReactNode.
            // We need to handle both cases if we mix them, but here displayItems comes from either props OR mapped CORE_COMPONENTS.
            // If from props, icon is string. If from CORE_COMPONENTS, icon is ReactNode (in the original constant).
            
            let iconNode: React.ReactNode;
            if (items) {
               // Dynamic items
               const iconName = feature.icon?.toLowerCase() || 'default';
               iconNode = iconMap[iconName] || iconMap['default'];
            } else {
               // Fallback to constant
               iconNode = CORE_COMPONENTS[index].icon;
            }

            return (
              <div 
                key={index} 
                className={`
                  group relative bg-white p-8 rounded-[2rem] border transition-all duration-500 
                  ${colorTheme.border} 
                  ${colorTheme.shadow}
                  hover:-translate-y-2
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${colorTheme.bg} ${colorTheme.text} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  {React.isValidElement(iconNode) ? React.cloneElement(iconNode as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" }) : iconNode}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-900 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-3 pt-6 border-t border-slate-50">
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-600 group/item">
                      <CheckCircle2 className={`w-5 h-5 ${colorTheme.text} mr-3 mt-0.5 flex-shrink-0 opacity-70 group-hover/item:opacity-100 transition-opacity`} />
                      <span className="group-hover/item:text-slate-800 transition-colors">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;