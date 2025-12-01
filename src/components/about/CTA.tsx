import React from 'react';
import { Calendar, Users, MapPin, Phone, ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Refined Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full border-[30px] border-white/5"></div>
         <div className="absolute top-[40%] -left-[10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto relative z-10 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
           Join our Community
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Ready to Experience <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Connected Care?</span>
        </h2>
        
        <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-light opacity-90">
          Join thousands of patients who trust Easy Health Care. Whether you need a checkup, home care, or digital consultation, we are here for you.
        </p>

        <div className="flex flex-col items-center gap-6">
          
          {/* Primary Action - Glowing Button */}
          <button className="group relative flex items-center justify-center gap-2.5 bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-base hover:bg-blue-50 transition-all shadow-[0_0_30px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_50px_-15px_rgba(255,255,255,0.7)] hover:-translate-y-1">
            <Calendar size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
            <span>Book an Appointment</span>
            <ArrowRight size={18} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Actions Links */}
          <div className="flex flex-wrap justify-center gap-y-3 gap-x-6 w-full sm:w-auto pt-1">
             <a href="#" className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-xs font-medium group">
                <Users size={14} className="group-hover:text-blue-300" />
                <span className="border-b border-transparent group-hover:border-white/50 pb-0.5 transition-all">Partner with Us</span>
             </a>
             <a href="#" className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-xs font-medium group">
                <MapPin size={14} className="group-hover:text-blue-300" />
                <span className="border-b border-transparent group-hover:border-white/50 pb-0.5 transition-all">Find Locations</span>
             </a>
             <a href="tel:+97714XXXXXX" className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-xs font-medium group">
                <Phone size={14} className="group-hover:text-blue-300" />
                <span className="border-b border-transparent group-hover:border-white/50 pb-0.5 transition-all">Call Support</span>
             </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;