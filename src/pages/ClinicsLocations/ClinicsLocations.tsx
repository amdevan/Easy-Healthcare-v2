import React, { useState, useEffect } from 'react';

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ShieldCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

const ZapIcon = ({ className = "w-3 h-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

interface Location {
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

const locations: Location[] = [
  {
    id: 1,
    name: "MedCore Central Hospital",
    type: "Flagship Center",
    address: "1200 Healthcare Blvd, Metro City, ST 90210",
    phone: "(555) 123-4567",
    hours: "Open 24/7",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200",
    features: ["Emergency 24/7", "Trauma Center", "Advanced Cardiology"],
    techSpecs: ["3T MRI", "Robotic Surgery Suite", "Hybrid Cath Lab"],
    isPrimary: true
  },
  {
    id: 2,
    name: "Westside Family Clinic",
    type: "Outpatient Clinic",
    address: "450 West Avenue, Suite 100, Westside, ST 90212",
    phone: "(555) 987-6543",
    hours: "Mon-Sat: 8:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    features: ["Pediatrics", "Family Medicine", "Vaccination Center"],
    techSpecs: ["Digital X-Ray", "Telemedicine Kiosk"],
    isPrimary: false
  },
  {
    id: 3,
    name: "North Hills Specialist Center",
    type: "Specialty Hub",
    address: "880 North Rise Dr, North Hills, ST 90214",
    phone: "(555) 456-7890",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1200",
    features: ["Dermatology", "Orthopedics", "Physical Therapy"],
    techSpecs: ["Open MRI", "3D Mammography", "Hydrotherapy Pool"],
    isPrimary: false
  }
];

const Hero: React.FC = () => (
  <div className="relative bg-slate-900 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=2000"
        alt="Hospital Lobby"
        className="w-full h-full object-cover opacity-30"
        referrerPolicy="no-referrer"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/2000/900?blur=2'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="max-w-2xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-sm">
          Leading Medical Infrastructure & Technology
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          World-Class Care,<br />
          <span className="text-blue-400">Powered by Innovation</span>
        </h1>
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Experience state-of-the-art infrastructure and advanced medical technology across our network of accredited clinics and specialized centers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#locations" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50">
            Find Nearest Clinic <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a href="#infrastructure" className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all">
            Explore Technology
          </a>
        </div>
      </div>
    </div>
  </div>
);

const LocationCard: React.FC<{ location: Location; onOpen: (loc: Location) => void }> = ({ location, onOpen }) => (
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

interface InfrastructureSectionProps {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  badge: string;
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ title, description, image, reverse, badge }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 items-center py-16`}>
    <div className="w-full md:w-1/2 relative">
      <div className="absolute inset-0 bg-blue-600 rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 -z-10 opacity-20"></div>
      <div className="rounded-2xl overflow-hidden shadow-2xl relative">
        <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/1200/800'; }} />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
          <span className="text-sm font-bold text-blue-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4" /> {badge}
          </span>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/2 space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
      </h3>
      <p className="text-slate-600 leading-relaxed text-lg">
        {description}
      </p>
      <ul className="space-y-2">
        <li className="flex items-center gap-3 text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span>International Safety Standards</span>
        </li>
        <li className="flex items-center gap-3 text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span>Integrated Digital Monitoring</span>
        </li>
      </ul>
    </div>
  </div>
);

const infrastructureHighlights = [
  {
    title: "Advanced Diagnostic Imaging",
    description: "Our clinics are equipped with the latest 3 Tesla MRI machines and 128-slice CT scanners, providing high-resolution imaging for accurate and early diagnosis. We prioritize low-radiation protocols for patient safety.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1600",
    reverse: false,
    badge: "ISO Certified Imaging"
  },
  {
    title: "Modular Operation Theatres",
    description: "Our modular operation theatres utilize HEPA filtration systems to maintain ISO Class 5 sterility. Equipped with robotic surgical assistants and integrated monitoring systems, we ensure precision in every procedure.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1600",
    reverse: true,
    badge: "Class 5 Sterility"
  },
  {
    title: "Smart ICU & Recovery Suites",
    description: "Patient recovery is our priority. Our Smart ICUs feature continuous multi-parameter monitoring connected to a central command center. Private recovery suites are designed with ergonomics and calmness in mind.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1600",
    reverse: false,
    badge: "24/7 Monitoring"
  }
];

const ClinicsLocations: React.FC = () => {
  const [selected, setSelected] = useState<Location | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const mapsUrl = (addr: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
  const telUrl = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <main>
      <Hero />
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Our Network</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Clinics & Centers</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">Find comprehensive care across our accredited locations offering specialized services and advanced diagnostics.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <LocationCard key={loc.id} location={loc} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>
      <section id="infrastructure" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {infrastructureHighlights.map((h, i) => (
            <InfrastructureSection key={i} title={h.title} description={h.description} image={h.image} reverse={h.reverse} badge={h.badge} />
          ))}
        </div>
      </section>
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to visit?</h3>
          <p className="text-slate-300 mt-3">Call our care coordinator to schedule your appointment at the nearest location.</p>
          <a href="tel:+977123456789" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Call Dispatch <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </section>
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
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
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClinicsLocations;
