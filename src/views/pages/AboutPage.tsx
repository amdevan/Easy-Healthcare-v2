import React from 'react';
import Hero from '@/components/about/Hero';
import CoreValues from '@/components/about/CoreValues';
import OurStory from '@/components/about/OurStory';
import Ecosystem from '@/components/about/Ecosystem';
import Impact from '@/components/about/Impact';
import FutureDirection from '@/components/about/FutureDirection';
import CTA from '@/components/about/CTA';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';

const AboutPage: React.FC = () => {
  const { data: pageData } = usePageContent('about');
  const blocks = pageData?.content || [];
  const renderBlock = (block: any, idx: number) => {
    const t = block?.type;
    const d = block?.data || {};
    if (t === 'hero_section') {
      return <Hero key={idx} title={d.title} subtitle={d.subtitle} description={d.description} image={d.image} badge={d.badge} primaryButtonText={d.primary_button_text} primaryButtonLink={d.primary_button_link} secondaryButtonText={d.secondary_button_text} secondaryButtonLink={d.secondary_button_link} stats={d.stats} />;
    }
    if (t === 'about_section') {
      const images: string[] = Array.isArray(d.images) ? d.images : [];
      const img1 = images[0] ? resolveSrc(images[0]) : "https://picsum.photos/400/500?grayscale";
      const img2 = images[1] ? resolveSrc(images[1]) : "https://picsum.photos/400/500?blur=2";
      return (
        <section key={idx} className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img src={img1} alt={d.title || "About"} className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/400/500?blur=2'; }} />
                  <img src={img2} alt={d.title || "About"} className="rounded-2xl shadow-lg mb-8" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/400/500'; }} />
                </div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <h4 className="text-teal-600 font-bold uppercase tracking-wide">
                  {d.subtitle || "About Easy Health Care"}
                </h4>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {d.title || "Dedicated to Continuous & Affordable Care"}
                </h2>
                <div className="text-slate-600 text-lg leading-relaxed">
                  {d.description ? <span dangerouslySetInnerHTML={{ __html: d.description }} /> : "We bring together clinical care, telemedicine, pharmacy, and diagnostics under one seamless ecosystem — making healthcare simple, connected, and patient-centered."}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (t === 'core_values') {
      return <CoreValues key={idx} mission={d.mission} vision={d.vision} values={d.values} />;
    }
    if (t === 'our_story') {
      return <OurStory key={idx} title={d.title} subtitle={d.subtitle} description1={d.description_1} description2={d.description_2} quote={d.quote} image={d.image} services={d.services} />;
    }
    if (t === 'ecosystem_section') {
      return <Ecosystem key={idx} title={d.title} subtitle={d.subtitle} description={d.description} items={d.items} />;
    }
    if (t === 'impact_section') {
      return <Impact key={idx} title={d.title} subtitle={d.subtitle} description={d.description} stats={d.stats} areas={d.areas} />;
    }
    if (t === 'future_section') {
      return <FutureDirection key={idx} title={d.title} subtitle={d.subtitle} description={d.description} steps={d.steps} />;
    }
    if (t === 'cta_section') {
      return <CTA key={idx} badge={d.badge} title={d.title} description={d.description} primaryButtonText={d.primary_button_text} primaryButtonLink={d.primary_button_link} secondaryLinks={d.secondary_links} />;
    }
    return null;
  };

  return (
    <main>
      {blocks.length > 0 ? blocks.map((b: any, idx: number) => renderBlock(b, idx)) : (
        <>
          <Hero />
          <CoreValues />
          <OurStory />
          <Ecosystem />
          <Impact />
          <FutureDirection />
          <CTA />
        </>
      )}
    </main>
  );
};

export default AboutPage;
