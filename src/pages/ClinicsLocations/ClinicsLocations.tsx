import React, { useState, useEffect } from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';
import Hero from './components/Hero';
import LocationCard, { Location } from './components/LocationCard';
import InfrastructureSection from './components/InfrastructureSection';
import LocationModal from './components/LocationModal';

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ClinicsLocations: React.FC = () => {
  const { data: pageData } = usePageContent('clinics-locations');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.subtitle || heroBlock?.data?.description,
    image: heroBlock?.data?.image,
    badge: heroBlock?.data?.badge,
    primaryButtonText: heroBlock?.data?.primary_button_text,
    primaryButtonLink: heroBlock?.data?.primary_button_link,
    secondaryButtonText: heroBlock?.data?.secondary_button_text,
    secondaryButtonLink: heroBlock?.data?.secondary_button_link
  };

  const locationsBlock = pageData?.content?.find(b => b.type === 'locations_list');
  const infrastructureBlock = pageData?.content?.find(b => b.type === 'infrastructure_highlights');
  const ctaBlock = pageData?.content?.find(b => b.type === 'cta_section');

  const displayLocations = locationsBlock?.data?.locations ? locationsBlock.data.locations.map((loc: any) => ({
    ...loc,
    image: resolveSrc(loc.image),
    techSpecs: loc.tech_specs || loc.techSpecs || []
  })) : [];

  const displayHighlights = infrastructureBlock?.data?.highlights ? infrastructureBlock.data.highlights.map((h: any) => ({
    ...h,
    image: resolveSrc(h.image),
    features: h.features
  })) : [];

  const [selected, setSelected] = useState<Location | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main>
      <Hero {...heroProps} />
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">{locationsBlock?.data?.subtitle || "Our Network"}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{locationsBlock?.data?.title || "Clinics & Centers"}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">{locationsBlock?.data?.description || "Find comprehensive care across our accredited locations offering specialized services and advanced diagnostics."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayLocations.map((loc: Location) => (
              <LocationCard key={loc.id} location={loc} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>
      <section id="infrastructure" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayHighlights.map((h: any, i: number) => (
            <InfrastructureSection key={i} title={h.title} description={h.description} image={h.image} reverse={h.reverse} badge={h.badge} features={h.features} />
          ))}
        </div>
      </section>
      {ctaBlock && (
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{ctaBlock.data.title}</h3>
            <p className="text-slate-300 mt-3">{ctaBlock.data.description}</p>
            <a href={ctaBlock.data.button_link} className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
              {ctaBlock.data.button_text} <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </section>
      )}
      {!ctaBlock && (
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to visit?</h3>
            <p className="text-slate-300 mt-3">Call our care coordinator to schedule your appointment at the nearest location.</p>
            <a href="tel:+977123456789" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Call Dispatch <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </section>
      )}
      {selected && (
        <LocationModal selected={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
};

export default ClinicsLocations;
