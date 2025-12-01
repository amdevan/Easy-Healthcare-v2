import React from 'react';
import { MapPin, BarChart3, Globe, Lightbulb, Rocket, ArrowUpRight } from 'lucide-react';

const FutureDirection: React.FC = () => {
  const steps = [
    {
      icon: MapPin,
      year: "2025-2026",
      title: "Municipal Expansion",
      desc: "Telehealth-integrated clinics expanding digital infrastructure across municipalities.",
      color: "blue"
    },
    {
      icon: BarChart3,
      year: "2025-2027",
      title: "Data Intelligence",
      desc: "Real-time health dashboards empowering local governments with actionable insights.",
      color: "indigo"
    },
    {
      icon: Globe,
      year: "2026-2028",
      title: "National Coverage",
      desc: "Nationwide home health network bringing care to every doorstep in Nepal.",
      color: "violet"
    },
    {
      icon: Lightbulb,
      year: "2026-2029",
      title: "Innovation Hubs",
      desc: "Collaborative research labs driving the next generation of healthcare technology.",
      color: "fuchsia"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto relative z-10">
        
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Rocket size={12} />
              <span>Vision 2030</span>
           </div>
           <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
             Charting Our Future
           </h2>
           <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
             A strategic roadmap to transform healthcare delivery through innovation, data, and accessibility.
           </p>
        </div>

        <div className="relative">
           {/* Central Dashed Line for Desktop */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px border-l-2 border-dashed border-slate-300 -translate-x-1/2 opacity-50"></div>
           
           {/* Mobile Line */}
           <div className="md:hidden absolute left-5 top-0 bottom-10 w-px border-l-2 border-dashed border-slate-300 opacity-50"></div>

           <div className="space-y-8 md:space-y-0 relative">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                // Colors mapping
                const colors: Record<string, string> = {
                    blue: "bg-blue-500 shadow-blue-200 border-blue-100",
                    indigo: "bg-indigo-500 shadow-indigo-200 border-indigo-100",
                    violet: "bg-violet-500 shadow-violet-200 border-violet-100",
                    fuchsia: "bg-fuchsia-500 shadow-fuchsia-200 border-fuchsia-100"
                };
                
                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} md:mb-10`}>
                     
                     {/* Spacer for the other side */}
                     <div className="hidden md:block md:w-1/2"></div>

                     {/* Center Point */}
                     <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                        <div className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white ${colors[step.color].split(' ')[0]} transition-transform duration-500 hover:scale-110`}>
                           <step.icon size={18} />
                        </div>
                     </div>

                     {/* Content Card */}
                     <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 bg-opacity-10 text-${step.color}-600 bg-${step.color}-50`}>
                            {step.year}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 md:inline-flex md:items-baseline">
                             {step.title}
                             <ArrowUpRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

      </div>
    </section>
  );
};

export default FutureDirection;