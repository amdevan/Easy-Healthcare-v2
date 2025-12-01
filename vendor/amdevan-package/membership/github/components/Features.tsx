import React from 'react';
import { CORE_COMPONENTS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Features: React.FC = () => {
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
          <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">Comprehensive Coverage</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Everything Your Parents Need
          </p>
          <p className="text-xl text-slate-500 leading-relaxed">
            We handle the logistics, medical advocacy, and daily coordination so your parents are never alone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_COMPONENTS.map((feature, index) => {
            const colorTheme = colors[index % colors.length];
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
                  {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
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