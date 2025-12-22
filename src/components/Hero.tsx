import React, { useEffect, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import { getSetting } from '@/controllers/adminController';
import type { Slide } from '@/components/ui/Slider';
import { resolveSrc } from '@/utils/url';
import { fetchSpecialties, SpecialtyDto } from '@/controllers/api';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState<SpecialtyDto[]>([]);
  useEffect(() => {
    let ignore = false;
    fetchSpecialties()
      .then((list) => {
        if (!ignore) setSpecialties(list);
      })
      .catch(() => {})
      .finally(() => {});
    return () => { ignore = true; };
  }, []);
  const findDoctorsLink = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set('q', search.trim());
    if (city.trim()) sp.set('location', city.trim());
    if (specialty.trim()) sp.set('specialty', specialty.trim());
    return `/find-doctors${sp.toString() ? `?${sp.toString()}` : ''}`;
  }, [search, city, specialty]);
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-brand-cyan-light/40 to-white">
      <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          {title ? (
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-gray-900 leading-tight">
               {title}
            </h1>
          ) : (
            <Editable
              tag="h1"
              id="hero-title"
              className="text-4xl md:text-6xl font-extrabold text-brand-gray-900 leading-tight"
            >
              Your Trusted Partner for <span className="text-brand-blue">Easy Healthcare</span>
            </Editable>
          )}

          {subtitle ? (
            <p className="mt-6 text-lg text-brand-gray-500 max-w-xl mx-auto lg:mx-0">
                {subtitle}
            </p>
          ) : (
             <Editable
              tag="p"
              id="hero-subtitle"
              className="mt-6 text-lg text-brand-gray-500 max-w-xl mx-auto lg:mx-0"
            >
              Connecting you with top doctors, online consultations, and trusted clinics for all your health needs.
            </Editable>
          )}

          <div className="mt-8 space-y-4 max-w-md mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
              </div>
              <input 
                type="text" 
                placeholder="Select your city (e.g., Kathmandu)"
                aria-label="Select your city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const sp = new URLSearchParams();
                    if (search.trim()) sp.set('q', search.trim());
                    if (city.trim()) sp.set('location', city.trim());
                    navigate(`/find-doctors${sp.toString() ? `?${sp.toString()}` : ''}`);
                  }
                }}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input 
                type="text" 
                placeholder="Search doctors, clinics, hospitals etc."
                aria-label="Search healthcare providers and services"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const sp = new URLSearchParams();
                    if (search.trim()) sp.set('q', search.trim());
                    if (city.trim()) sp.set('location', city.trim());
                    if (specialty.trim()) sp.set('specialty', specialty.trim());
                    navigate(`/find-doctors${sp.toString() ? `?${sp.toString()}` : ''}`);
                  }
                }}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                list="hero-specialty-list"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Select Specialty"
                aria-label="Select Specialty"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              />
              <datalist id="hero-specialty-list">
                {specialties.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button to={findDoctorsLink} variant="primary" size="lg">Find Doctors</Button>
              <Button to="/telemedicine" variant="outline" size="lg">Video Consult</Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
            {image ? (
                <img 
                    src={resolveSrc(image)} 
                    alt={title || "Hero Image"} 
                    className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]"
                />
            ) : (
                <HomeSlider />
            )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;

const HomeSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [autoPlay, setAutoPlay] = useState(true);
  const [intervalMs, setIntervalMs] = useState(4500);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState('View');

  useEffect(() => {
    let ignore = false;
    getSetting('home.slider')
      .then((value) => {
        if (ignore || !value) return;
        const arr = Array.isArray(value) ? value : (value?.slides ?? null);
        if (Array.isArray(arr) && arr.length > 0) {
          const safe: Slide[] = arr.map((s: any) => ({ src: resolveSrc(String(s.src || '')), alt: s.alt ? String(s.alt) : undefined, href: s.href ? String(s.href) : undefined }))
            .filter((s) => !!s.src);
          if (safe.length > 0) setSlides(safe);
        }
        const opts = (value && !Array.isArray(value) ? (value as any)?.options : null) ?? null;
        if (opts) {
          setAutoPlay(Boolean(opts.autoPlay ?? true));
          const n = Number(opts.intervalMs ?? 4500);
          setIntervalMs(Number.isFinite(n) && n > 0 ? n : 4500);
          setPauseOnHover(Boolean(opts.pauseOnHover ?? true));
          setShowCaptions(Boolean(opts.showCaptions ?? true));
          setShowButton(Boolean(opts.showButton ?? true));
          setButtonText(typeof opts.buttonText === 'string' && opts.buttonText.trim() ? String(opts.buttonText) : 'View');
        }
      })
      .catch(() => {})
      .finally(() => {});
    return () => { ignore = true; };
  }, []);

  if (slides.length === 0) return null;
  return (
    <Slider slides={slides} autoPlay={autoPlay} intervalMs={intervalMs} className="w-[600px] h-[400px]" pauseOnHover={pauseOnHover} showCaptions={showCaptions} showButton={showButton} buttonText={buttonText} />
  );
};
