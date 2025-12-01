import React from 'react';
import { CheckCircle2, Quote } from 'lucide-react';

const OurStory: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-blue-600 rounded-full"></span>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Who We Are</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Transforming Healthcare Access in Nepal
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base max-w-2xl">
              Easy Health Care Pvt. Ltd. (Easy Health Care 101) is a forward-thinking healthcare organization dedicated to providing accessible, affordable, and high-quality health services to individuals, families, and communities.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base max-w-2xl">
              Founded with a vision to bridge the gap between traditional care and modern digital health, we blend technology, compassion, and community outreach to ensure continuous and personalized care — at our clinics, at home, or online.
            </p>
            
            <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm mb-6 relative max-w-xl">
               <Quote className="absolute top-4 left-4 w-6 h-6 text-blue-100 -z-10" />
               <p className="text-slate-800 font-medium italic pl-2 relative z-10 text-sm md:text-base">
                  "We bring together clinical care, telemedicine, pharmacy, and diagnostics under one seamless ecosystem."
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
               {[
                 "Clinical Care", 
                 "Telemedicine", 
                 "Pharmacy Services", 
                 "Diagnostics", 
                 "Medical Logistics"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2.5 group">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
             <div className="relative p-2 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
                <img 
                   src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop" 
                   alt="Medical Team Collaboration" 
                   className="w-full h-auto object-cover rounded-[1.75rem] aspect-[16/10]"
                   loading="lazy"
                 />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;