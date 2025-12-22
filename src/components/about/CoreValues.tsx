import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { getIcon } from '@/utils/iconMapper';

interface CoreValuesProps {
  mission?: {
    title: string;
    description: string;
    icon: string;
  };
  vision?: {
    title: string;
    description: string;
    icon: string;
  };
  values?: {
    title: string;
    icon: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

const CoreValues: React.FC<CoreValuesProps> = ({ mission, vision, values }) => {
  const MissionIcon = mission?.icon ? getIcon(mission.icon) : Target;
  const VisionIcon = vision?.icon ? getIcon(vision.icon) : Eye;
  const ValuesIcon = values?.icon ? getIcon(values.icon) : Heart;

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Mission */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-100 border-t-4 border-t-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {MissionIcon && <MissionIcon size={80} className="text-blue-600" />}
             </div>
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {MissionIcon && <MissionIcon size={24} />}
             </div>
             <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">{mission?.title || "Our Mission"}</h3>
             <p className="text-slate-600 text-sm leading-relaxed flex-grow relative z-10">
               {mission?.description || "To make healthcare simple, connected, and inclusive by integrating technology, professional care, and community-based models — ensuring that quality health services are available to everyone, everywhere."}
             </p>
          </div>

          {/* Vision */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-100 border-t-4 border-t-green-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {VisionIcon && <VisionIcon size={80} className="text-green-600" />}
             </div>
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {VisionIcon && <VisionIcon size={24} />}
             </div>
             <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">{vision?.title || "Our Vision"}</h3>
             <p className="text-slate-600 text-sm leading-relaxed flex-grow relative z-10">
               {vision?.description || "To become Nepal's most trusted and innovative primary healthcare network, leading the transformation of healthcare delivery through digital integration, patient-centered care, and sustainable partnerships."}
             </p>
          </div>

          {/* Values */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-100 border-t-4 border-t-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {ValuesIcon && <ValuesIcon size={80} className="text-purple-600" />}
             </div>
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {ValuesIcon && <ValuesIcon size={24} />}
             </div>
             <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-4">{values?.title || "Our Values"}</h3>
             <ul className="space-y-3 text-slate-600 flex-grow relative z-10">
                {(values?.items || [
                  { title: "Compassion", description: "Empathy in every interaction." },
                  { title: "Integrity", description: "Transparency guides us." },
                  { title: "Accessibility", description: "Care within everyone's reach." },
                  { title: "Innovation", description: "Tech that simplifies care." }
                ]).map((val, i) => (
                  <li key={i} className={`pl-3 border-l-[3px] border-purple-200 group-hover:border-purple-400 transition-colors`}>
                    <strong className="text-slate-900 text-sm block">{val.title}</strong> 
                    <span className="text-[11px] text-slate-500">{val.description}</span>
                  </li>
                ))}
             </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreValues;
