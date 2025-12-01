import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800">
      <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-900/50">
                E
              </div>
              <span className="font-bold text-lg tracking-tight">Easy Health</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Making healthcare simple, connected, and accessible for everyone. Join us in building a healthier Nepal.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 text-slate-400 hover:text-white hover:-translate-y-1">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-slate-200">Quick Links</h3>
            <ul className="space-y-2 text-slate-400 text-xs">
              {['About Us', 'Our Doctors', 'Book Appointment', 'Health Packages', 'Careers'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors"></span> 
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-slate-200">Our Services</h3>
            <ul className="space-y-2 text-slate-400 text-xs">
              {['General Consultation', 'Pediatrics', 'Dermatology', 'Lab Diagnostics', 'Home Nursing'].map((link, i) => (
                 <li key={i}><a href="#" className="hover:text-blue-400 transition-colors block">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-slate-200">Contact Us</h3>
            <ul className="space-y-3 text-slate-400 text-xs">
              <li className="flex items-start gap-2.5 group">
                <div className="p-1 bg-slate-800 rounded-md text-blue-500 group-hover:bg-blue-900 transition-colors">
                    <MapPin size={14} className="shrink-0" />
                </div>
                <span className="leading-relaxed">Kathmandu, Nepal<br/>Bagmati Province</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <div className="p-1 bg-slate-800 rounded-md text-blue-500 group-hover:bg-blue-900 transition-colors">
                    <Phone size={14} className="shrink-0" />
                </div>
                <span>+977-1-4XXXXXX</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <div className="p-1 bg-slate-800 rounded-md text-blue-500 group-hover:bg-blue-900 transition-colors">
                    <Mail size={14} className="shrink-0" />
                </div>
                <span>info@easyhealthcare.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-[#0B1120]">
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-[10px] text-center md:text-left">
            © {new Date().getFullYear()} Easy Health Care Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;