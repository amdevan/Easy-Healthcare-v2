import React from 'react';
import { Location } from './LocationCard';

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

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

interface LocationModalProps {
  selected: Location;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ selected, onClose }) => {
  const mapsUrl = (addr: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
  const telUrl = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-48">
          <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/1200/500'; }} />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${selected.isPrimary ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-800 backdrop-blur-sm'}`}>{selected.type}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-900">{selected.name}</h3>
          <div className="mt-4 space-y-3 text-slate-700">
            <div className="flex items-start gap-3"><MapPinIcon className="w-5 h-5 text-blue-500" /><span>{selected.address}</span></div>
            <div className="flex items-center gap-3"><PhoneIcon className="w-5 h-5 text-blue-500" /><a href={telUrl(selected.phone)} className="font-medium text-blue-700 hover:underline">{selected.phone}</a></div>
            <div className="flex items-center gap-3"><ClockIcon className="w-5 h-5 text-blue-500" /><span>{selected.hours}</span></div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Tech</p>
            <div className="flex flex-wrap gap-2">
              {selected.techSpecs.map((t, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100 font-medium flex items-center gap-1"><ZapIcon /> {t}</span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {selected.features.map((f, i) => (
              <span key={i} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border">{f}</span>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <a href={mapsUrl(selected.address)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Open in Maps <ArrowRightIcon className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-3">
              <a href={telUrl(selected.phone)} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50">Call</a>
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
