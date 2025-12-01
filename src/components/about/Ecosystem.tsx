import React from 'react';
import { Building2, Pill, Smartphone, Activity, ArrowRight } from 'lucide-react';

const Ecosystem: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-blue-50/50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent -z-10"></div>
      
      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
           <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">Integrated Care Model</span>
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Ecosystem</h2>
           <p className="text-slate-600 text-base md:text-lg">Easy Health Care operates through a self-owned hybrid healthcare model.</p>
        </div>

        <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-300 -translate-y-1/2 z-0 opacity-50"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                
                {[
                  { icon: Building2, title: "Clinics", desc: "Primary care & diagnostics centers with modern facilities.", color: "blue" },
                  { icon: Pill, title: "Pharmacy", desc: "Retail & Online access to affordable, authentic medicines.", color: "green" },
                  { icon: Smartphone, title: "Digital Health", desc: "Teleconsultation, booking & EHR management platform.", color: "purple" },
                  { icon: Activity, title: "Diagnostics", desc: "Central lab services and reliable home sample collection.", color: "rose" }
                ].map((item, index) => {
                   const colors: {[key:string]: string} = {
                      blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                      green: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
                      purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
                      rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                   };

                   return (
                    <div key={index} className="bg-white border border-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group relative z-10 flex flex-col items-center text-center h-full">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm ${colors[item.color]}`}>
                          <item.icon size={28} />
                       </div>
                       <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                   );
                })}

            </div>
        </div>

        <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-6 border border-slate-100 shadow-sm text-center md:text-left max-w-4xl mx-auto">
           <div className="p-4 bg-blue-50 rounded-full text-blue-600 shrink-0">
              <ArrowRight size={24} />
           </div>
           <div>
             <h4 className="font-bold text-slate-900 text-lg mb-1">A Unified System</h4>
             <p className="text-slate-600 text-sm md:text-base">
                Delivering the full continuum of care — from preventive screening to chronic disease management and home recovery.
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Ecosystem;