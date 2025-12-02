import React from 'react';
import { ShieldCheck, Users, Briefcase, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white pt-10 pb-20 lg:pt-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Excellence in Governance</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Leading with <span className="text-brand-blue relative">
                Vision & Integrity
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-yellow opacity-40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our Board of Directors is dedicated to steering Easy Healthcare101 towards a future of accessible, high-quality care for all. We uphold the highest standards of corporate responsibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#board-members" className="px-8 py-4 rounded-full bg-brand-blue text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all text-center">
                Meet the Board
              </a>
              <button className="px-8 py-4 rounded-full bg-white text-gray-700 border border-gray-200 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                Corporate Governance
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              <div>
                <div className="flex items-center gap-2 text-brand-blue mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-bold text-2xl">150+</span>
                </div>
                <p className="text-sm text-gray-500">Years Combined Exp.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-brand-blue mb-1">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-bold text-2xl">Fortune 500</span>
                </div>
                <p className="text-sm text-gray-500">Leadership Backgrounds</p>
              </div>
              <div>
                 <div className="flex items-center gap-2 text-brand-blue mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold text-2xl">$2.5B+</span>
                </div>
                <p className="text-sm text-gray-500">Assets Managed</p>
              </div>
            </div>
          </div>
          <div className="relative lg:h-[600px] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-brand-yellow/5 rounded-[2rem] transform rotate-3"></div>
             <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600" 
               alt="Board of Directors Meeting" 
               referrerPolicy="no-referrer"
               onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=60&w=1200'; }}
               className="relative rounded-2xl shadow-2xl object-cover h-full w-full z-10"
             />
             <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-gray-50 hidden md:block">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 font-semibold uppercase">Compliance</p>
                   <p className="text-lg font-bold text-gray-900">100% Audited</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
