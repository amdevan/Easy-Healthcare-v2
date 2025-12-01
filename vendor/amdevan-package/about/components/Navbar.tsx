import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Calendar, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-all duration-200";
  const activeNavLinkClasses = "text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm ring-1 ring-blue-100";

  return (
    <>
      {/* Top Utility Bar */}
      <div className={`bg-slate-900 text-slate-300 transition-all duration-500 ease-in-out hidden lg:block ${scrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'h-auto opacity-100 py-1.5'}`}>
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto flex justify-between items-center text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-5">
             <a href="tel:+97714XXXXXX" className="flex items-center gap-1.5 hover:text-white transition-colors">
               <Phone size={12} className="text-blue-400" />
               <span>+977-1-4XXXXXX</span>
             </a>
             <a href="mailto:info@easyhealthcare.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
               <Mail size={12} className="text-blue-400" />
               <span>info@easyhealthcare.com</span>
             </a>
          </div>
          <div className="flex items-center gap-5">
             <div className="flex items-center gap-1.5">
               <MapPin size={12} className="text-green-400" />
               <span>Kathmandu, Nepal</span>
             </div>
             <span className="text-slate-700">|</span>
             <span>Sun-Fri, 7AM - 8PM</span>
          </div>
        </div>
      </div>

      <header 
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-sm py-2' 
            : 'bg-white py-3 border-b border-slate-50'
        }`}
      >
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer select-none group">
              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600 blur rounded-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                 <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-inner border border-blue-500">
                    EH
                 </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-slate-900 text-base leading-none tracking-tight group-hover:text-blue-700 transition-colors">Easy Health</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Care Pvt. Ltd.</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-slate-100/50">
              <a href="#" className={navLinkClasses}>Home</a>
              <a href="#" className={navLinkClasses}>Services</a>
              <a href="#" className={activeNavLinkClasses}>About Us</a>
              <a href="#" className={navLinkClasses}>Doctors</a>
              <a href="#" className={navLinkClasses}>Contact</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center pl-4">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95 active:translate-y-0">
                <Calendar size={14} />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none active:bg-slate-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`lg:hidden fixed top-0 right-0 z-50 w-[80%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-slate-100`}>
          <div className="p-5 border-b border-slate-50 flex justify-between items-center">
            <span className="font-bold text-lg text-slate-900">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} className="text-slate-400" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
             <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 text-slate-600 font-medium transition-all active:scale-[0.98]">
               Home <ChevronRight size={16} className="text-slate-300" />
             </a>
             <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/50 text-blue-700 font-bold transition-all border border-blue-100 shadow-sm">
               About Us <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
             </a>
             <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 text-slate-600 font-medium transition-all active:scale-[0.98]">
               Services <ChevronRight size={16} className="text-slate-300" />
             </a>
             <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 text-slate-600 font-medium transition-all active:scale-[0.98]">
               Doctors <ChevronRight size={16} className="text-slate-300" />
             </a>
             <a href="#" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 text-slate-600 font-medium transition-all active:scale-[0.98]">
               Contact <ChevronRight size={16} className="text-slate-300" />
             </a>
          </div>

          <div className="p-5 border-t border-slate-50 bg-slate-50/50">
             <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm">
                <Calendar size={16} />
                Book Appointment
             </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;