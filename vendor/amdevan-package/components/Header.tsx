import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-teal-500">
            Vitality<span className="text-slate-700 font-medium">Health</span>
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => window.location.hash = '#packages'} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Packages</button>
          <button onClick={() => window.location.hash = '#services'} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Services</button>
          <button onClick={() => window.location.hash = '#about'} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">About Us</button>
        </nav>

        <button className="hidden md:block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
          Book Appointment
        </button>
      </div>
    </header>
  );
};

export default Header;