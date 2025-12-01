import React from 'react';

const InPageNav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-30 backdrop-blur bg-white/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex gap-3">
            <a href="#features" className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">Features</a>
            <a href="#shop" className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">Shop</a>
            <a href="#upload" className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">Upload</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="#upload" className="px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 hover:brightness-110 shadow">
              Upload Prescription
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InPageNav;