import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-12 lg:py-20 overflow-hidden">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-green-50/40 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/tiny-grid.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Easy Health Care Pvt. Ltd.
             </div>
             
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 leading-[1.1] tracking-tight">
               About Us
             </h1>
             
             <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-5 font-sans tracking-tight">
               स्वास्थ्य तपाईको साथ हाम्रो
             </h2>

             <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 pr-4 font-normal max-w-xl">
               Bringing together clinical care, telemedicine, pharmacy, and diagnostics under one seamless ecosystem — making healthcare <span className="font-semibold text-slate-800">simple, connected, and patient-centered.</span>
             </p>

             <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group">
                  Explore Services
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-sm hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50 transition-all flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0">
                  Contact Us
                </button>
             </div>
          </div>

          {/* Right Image - Layered Card Style */}
          <div className="relative hidden lg:block perspective-1000">
             {/* Background Decor */}
             <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 opacity-5 scale-105 transform translate-x-4 translate-y-4"></div>
             
             {/* Main Image */}
             <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border-[5px] border-white ring-1 ring-slate-100 bg-white">
                 <img 
                   src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop" 
                   alt="Doctor consulting with patient" 
                   className="w-full h-auto object-cover aspect-[16/10] hover:scale-105 transition-transform duration-1000 ease-in-out"
                   loading="eager"
                 />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-5 py-3 rounded-xl shadow-lg border border-green-50 flex items-center gap-3 animate-fade-in-up">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Trusted Care</p>
                      <p className="text-sm font-bold text-slate-900">For Every Generation</p>
                    </div>
                 </div>
             </div>
          </div>

          {/* Mobile Image */}
           <div className="relative lg:hidden mt-6">
             <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-100 border-4 border-white">
                 <img 
                   src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" 
                   alt="Doctor consulting with patient" 
                   className="w-full h-56 object-cover"
                   loading="eager"
                 />
             </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;