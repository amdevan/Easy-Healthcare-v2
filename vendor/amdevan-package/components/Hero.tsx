import React from 'react';
import { ChevronRight, ShieldCheck, Star, Users } from 'lucide-react';

type HeroProps = {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  scrollTargetId?: string;
  compact?: boolean;
};

const Hero: React.FC<HeroProps> = ({
  title = 'Healthcare Designed Around Your Life.',
  subtitle = 'Experience the future of wellness with our curated health packages. From preventative checks to chronic care, we combine technology with empathy.',
  primaryCtaText = 'View Packages',
  secondaryCtaText = 'How it Works',
  scrollTargetId = 'packages',
  compact = false,
}) => {
  return (
    <section className={`relative ${compact ? 'pt-8 pb-12 lg:pt-10 lg:pb-16' : 'pt-32 pb-20 lg:pt-40 lg:pb-28'} overflow-hidden bg-slate-50`}>
      {/* Modern Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-teal-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-slate-200/50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm animate-fade-in-up">
          <ShieldCheck className="w-4 h-4" />
          <span>Trusted by 10,000+ Families</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600">
            {title}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {primaryCtaText} <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:border-teal-600 hover:text-teal-600 transition-all shadow-sm hover:shadow-md">
            {secondaryCtaText}
          </button>
        </div>

        {/* Stats / Trust Strip */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <div className="flex items-center gap-2">
             <Star className="w-5 h-5 text-teal-500 fill-teal-500" />
             <span className="font-semibold text-slate-700">4.9/5 Rating</span>
           </div>
           <div className="flex items-center gap-2">
             <Users className="w-5 h-5 text-teal-500" />
             <span className="font-semibold text-slate-700">Top Specialists</span>
           </div>
           <div className="flex items-center gap-2">
             <ShieldCheck className="w-5 h-5 text-teal-500" />
             <span className="font-semibold text-slate-700">Secure Records</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;