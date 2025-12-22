import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import CTA from './components/CTA';
import Stats from './components/Stats';
import { ServiceItem, StatsItem } from './components/types';

const Services: React.FC = () => {
  const { data: pageData } = usePageContent('services');

  const defaultItems: ServiceItem[] = [
    {
      id: 'primary-health-care',
      title: 'Primary Health Care',
      desc:
        'Comprehensive outpatient care with general physicians and specialists for immediate, preventive, and routine health needs.',
      iconBg: 'bg-blue-100',
      href: '/find-doctors',
      decor: 'from-blue-200',
      iconName: 'Stethoscope',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'laboratory-diagnostic-services',
      title: 'Laboratory & Diagnostic Services',
      desc:
        'High-quality diagnostic services integrated with digital reporting, home sample collection, and partner imaging support.',
      iconBg: 'bg-green-100',
      href: '/lab-tests',
      decor: 'from-green-200',
      iconName: 'FlaskConical',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 3v7l-4 8h14l-4-8V3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'health-package',
      title: 'Health Package',
      desc:
        'Curated health packages for preventive, family, and chronic-care needs with transparent inclusions and pricing.',
      iconBg: 'bg-rose-100',
      href: '/health-package',
      decor: 'from-rose-200',
      iconName: 'Package',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M4 10h16M10 6h4M7 14h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'nemt',
      title: 'Non-Emergency Medical Transportation (NEMT)',
      desc:
        'Safe and reliable transport for non-critical patients requiring mobility support, scheduled visits, and hospital appointments.',
      iconBg: 'bg-amber-100',
      href: '/nemt',
      decor: 'from-amber-200',
      iconName: 'Ambulance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 14h13l3 3h2v-5h-5l-3-3H6l-3 5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'digital-health-telemedicine',
      title: 'Digital Health & Telemedicine',
      desc:
        'Remote consultations with doctors through secure telemedicine, offering e-prescriptions, EMR integration, and virtual assistance.',
      iconBg: 'bg-indigo-100',
      href: '/video-consult',
      decor: 'from-indigo-200',
      iconName: 'Video',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M15 10l4.5-2.5v9L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'community-health-programs',
      title: 'Community Health Programs',
      desc:
        'Preventive health initiatives including community screenings, corporate health camps, immunization drives, and awareness programs.',
      iconBg: 'bg-emerald-100',
      href: '/about',
      decor: 'from-emerald-200',
      iconName: 'Users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 21C7 16 4 13 4 9a8 8 0 1116 0c0 4-3 7-8 12z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Map API data to items if available
  const servicesBlock = pageData?.content?.find(b => b.type === 'services_list' || b.type === 'features_list');
  const items: ServiceItem[] = servicesBlock?.data?.features ? servicesBlock.data.features.map((f: any, idx: number) => {
      // Try to match with default item style if possible, or use generic
      const def = defaultItems[idx % defaultItems.length];
      return {
          id: f.id || `service-${idx}`,
          title: f.title,
          desc: f.description,
          iconBg: def.iconBg, // Reuse styles for now
          href: f.url || '#',
          decor: def.decor,
          iconName: f.icon,
          iconImage: f.image
      };
  }) : defaultItems;

  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const heroTitle = heroBlock?.data?.title || "Our Services";
  const heroSubtitle = heroBlock?.data?.description || "Explore our comprehensive range of healthcare solutions designed to provide you with the best medical support at every step.";

  const ctaBlock = pageData?.content?.find(b => b.type === 'cta_section');
  
  const statsBlock = pageData?.content?.find(b => b.type === 'stats_section');
  const statsItems: StatsItem[] = statsBlock?.data?.items || [
    { value: "24/7", label: "SUPPORT" },
    { value: "50+", label: "SPECIALISTS" },
    { value: "10k+", label: "PATIENTS" },
    { value: "98%", label: "SATISFACTION" }
  ];

  return (
    <main className="bg-white">
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <ServiceGrid items={items} />
      <CTA 
        title={ctaBlock?.data?.title || "Ready to prioritize your health?"}
        description={ctaBlock?.data?.description || "Book an appointment today or consult with our specialists online. Your journey to better health starts here."}
        primaryButtonText={ctaBlock?.data?.primaryButtonText}
        primaryButtonUrl={ctaBlock?.data?.primaryButtonUrl}
        secondaryButtonText={ctaBlock?.data?.secondaryButtonText}
        secondaryButtonUrl={ctaBlock?.data?.secondaryButtonUrl}
      />
      <Stats items={statsItems} />
    </main>
  );
};

export default Services;
