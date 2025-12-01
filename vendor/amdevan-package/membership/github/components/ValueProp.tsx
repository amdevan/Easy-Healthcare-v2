import React from 'react';
import { VALUE_PROPS } from '../constants';

const ValueProp: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-rose-500 opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Why Families Trust <span className="text-teal-400">EasyCare 365</span>
          </h2>
          <p className="mt-4 text-xl text-teal-100 max-w-2xl mx-auto font-light">
            Bridging the distance with technology, compassion, and reliable human touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {VALUE_PROPS.map((prop, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/10 hover:bg-white/15 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="p-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-lg text-white transform -rotate-3">
                  {prop.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{prop.title}</h3>
              </div>
              <ul className="space-y-5">
                {prop.points.map((point, i) => (
                  <li key={i} className="flex items-start text-teal-50">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-500/30 border border-teal-400/50 mr-4 flex-shrink-0 text-teal-300 text-xs">✓</span>
                    <span className="text-lg leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProp;