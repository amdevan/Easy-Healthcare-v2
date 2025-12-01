import React, { useEffect, useState, useRef } from 'react';
import { Users, Building, GraduationCap, Home, CheckCircle2 } from 'lucide-react';

// Enhanced Counter for smoother animation
const Counter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic duration based on magnitude to ensure responsiveness
  const duration = end > 100 ? 2500 : 1500;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo for smoother, more premium feel
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = ease * end;
      
      // Smart formatting during animation
      if (end >= 1000) {
        // For large numbers (e.g. 10k), show decimal precision during animation for smoothness
        // e.g. 1.2k, 5.5k...
        const inK = currentVal / 1000;
        const formatted = inK.toFixed(1).replace(/\.0$/, ''); 
        setDisplayValue(`${formatted}k`);
      } else {
        // For small numbers, just integer
        setDisplayValue(Math.floor(currentVal).toString());
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
         // Final state: Ensure clean formatting matches target
         if (end >= 1000) {
             const inK = end / 1000;
             setDisplayValue(`${inK}k`);
         } else {
             setDisplayValue(end.toString());
         }
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const Impact: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden border-t border-slate-50">
       {/* Map Background - Visualizes reach */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100 100C200 50 300 150 400 100" stroke="#2563EB" strokeWidth="2" strokeDasharray="5 5"/>
             <circle cx="100" cy="100" r="4" fill="#2563EB"/>
             <circle cx="400" cy="100" r="4" fill="#2563EB"/>
             <path d="M800 300C700 200 600 400 500 300" stroke="#16A34A" strokeWidth="2" strokeDasharray="5 5"/>
          </svg>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto relative z-10">
        
        <div className="text-center mb-12">
           <div className="inline-block p-1.5 px-3 rounded-full bg-green-50 text-green-700 text-[10px] font-bold tracking-widest uppercase mb-2">
              Our Reach
           </div>
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Making a Real Impact</h2>
           <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
             Since inception, Easy Health Care has served thousands of patients through its clinics and digital services.
           </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           
           {[
             { icon: Users, val: 10000, suffix: "+", label: "Patients Served", color: "blue" },
             { icon: Building, val: 15, suffix: "+", label: "Municipal Partners", color: "green" },
             { icon: GraduationCap, val: 200, suffix: "+", label: "Workers Trained", color: "purple" },
             { icon: Home, val: 5000, suffix: "+", label: "Home Visits", color: "rose" }
           ].map((stat, i) => {
             return (
                <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                     stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                     stat.color === 'green' ? 'bg-green-50 text-green-600' : 
                     stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
                     'bg-rose-50 text-rose-600'
                   }`}>
                      <stat.icon size={26} />
                   </div>
                   <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                     <Counter end={stat.val} suffix={stat.suffix} />
                   </h3>
                   <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
             );
           })}
        </div>

        {/* Key Impact Areas */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
           {/* Abstract decorative shapes */}
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full mix-blend-overlay blur-3xl opacity-20 -mr-10 -mt-10"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 rounded-full mix-blend-overlay blur-3xl opacity-20 -ml-10 -mb-10"></div>

           <div className="relative z-10 grid lg:grid-cols-3 gap-8 lg:gap-12">
             <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">Key Impact Areas</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We focus our efforts where they matter most—bridging the gap between urban medical excellence and rural accessibility needs.
                </p>
                <button className="text-white text-sm font-semibold underline decoration-blue-400 underline-offset-4 hover:text-blue-300 transition-colors">
                  View annual report
                </button>
             </div>
             <div className="lg:col-span-2 grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                   "Improved healthcare access in urban & semi-urban regions",
                   "Specialized support for elderly and urban poor communities",
                   "Employment & training for healthcare professionals",
                   "Strengthened municipal Primary Health Centers (PHCs)",
                   "Medication delivery & transport for chronic patients"
                ].map((item, i) => (
                   <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-0.5 p-0.5 rounded-full bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-slate-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                   </div>
                ))}
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Impact;