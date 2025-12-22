import React from 'react';

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const ZapIcon = ({ className = "w-3 h-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

export interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  features: string[];
  techSpecs: string[];
  isPrimary: boolean;
}

const LocationCard: React.FC<{ location: Location; onOpen: (loc: Location) => void }> = ({ location, onOpen }) => {
  return (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
    <div className="relative h-48 overflow-hidden">
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/800/400'; }}
      />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${location.isPrimary ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-800 backdrop-blur-sm'}`}>
          {location.type}
        </span>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{location.name}</h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 text-slate-600">
          <MapPinIcon className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" />
          <span className="text-sm">{location.address}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <PhoneIcon className="w-5 h-5 text-blue-500 shrink-0" />
          <span className="text-sm font-medium">{location.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <ClockIcon className="w-5 h-5 text-blue-500 shrink-0" />
          <span className="text-sm">{location.hours}</span>
        </div>
      </div>
      <div className="mt-auto space-y-4">
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Tech</p>
          <div className="flex flex-wrap gap-2">
            {location.techSpecs.map((tech, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100 font-medium flex items-center gap-1">
                <ZapIcon /> {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-2">
          <div className="flex flex-wrap gap-2 mt-2">
            {location.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {location.features.length > 2 && (
              <span className="text-xs text-slate-400 px-1 py-1">+ {location.features.length - 2} more</span>
            )}
          </div>
        </div>
        <button onClick={() => onOpen(location)} className="w-full py-2.5 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors text-sm mt-2 text-center">
          View Details
        </button>
      </div>
    </div>
  </div>
);
};

export default LocationCard;
