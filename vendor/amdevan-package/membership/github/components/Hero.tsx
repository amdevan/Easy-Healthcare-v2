import React from 'react';
import { ArrowRight, ShieldCheck, Star, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-100 blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-rose-100 blur-3xl opacity-50 animate-pulse-slow animate-delay-300"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 md:pt-20 px-4 sm:px-6 lg:px-8">
          <main className="mx-auto max-w-7xl">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-teal-200 bg-white text-teal-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm animate-fade-in-up">
                <ShieldCheck className="w-4 h-4 mr-2 text-teal-500" /> Trusted by the Nepali Diaspora
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl leading-tight animate-fade-in-up animate-delay-100">
                <span className="block">Care for your parents,</span>{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">from miles away.</span>
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed animate-fade-in-up animate-delay-200">
                EasyCare 365 ensures your loved ones in Nepal receive medical attention, preventative care, and health coordination. Reliable, compassionate, and always there when you can't be.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4 animate-fade-in-up animate-delay-300">
                <div className="rounded-full shadow-lg shadow-teal-200/50">
                  <a
                    href="#pricing"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-teal-600 hover:bg-teal-700 md:text-lg transition-all transform hover:scale-105 hover:shadow-teal-500/40 hover:shadow-2xl"
                  >
                    View Packages
                  </a>
                </div>
                <div className="mt-3 sm:mt-0">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:text-teal-600 md:text-lg transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  >
                    How it Works <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-10 flex items-center gap-4 sm:justify-center lg:justify-start animate-fade-in-up animate-delay-300">
                <div className="flex -space-x-2">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt=""/>
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt=""/>
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/86.jpg" alt=""/>
                  <div className="h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+2k</div>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  <div className="flex items-center text-amber-400 mb-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  Happy families connected
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 lg:bg-transparent">
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:h-full">
          <div className="absolute top-6 left-4 sm:top-10 sm:left-10 z-20 animate-fade-in-up animate-delay-300">
            <div className="bg-white/95 backdrop-blur-md border border-white/50 px-5 py-4 rounded-2xl shadow-2xl shadow-slate-900/10 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
              <div className="flex-shrink-0 bg-teal-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-teal-600 fill-teal-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting Plan</span>
                <p className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                  Care for your parents for just <span className="text-teal-600 text-lg">$1/day</span>.
                </p>
              </div>
            </div>
          </div>

           <img
            className="absolute inset-0 w-full h-full object-cover lg:rounded-bl-[4rem] animate-float"
            src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1000&auto=format&fit=crop"
            alt="Nepali elderly couple smiling"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent lg:rounded-bl-[4rem] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;