import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Services from '@/components/common/Services';
import OnlineConsultation from '@/components/common/OnlineConsultation';
import InClinicConsultation from '@/components/common/InClinicConsultation';
import HomeDiagnostics from '@/components/common/HomeDiagnostics';
import Articles from '@/components/common/Articles';
import Testimonials from '@/components/common/Testimonials';
import DownloadApp from '@/components/common/DownloadApp';
import Hero from '@/components/Hero';
import Editable from '@/components/ui/Editable';
import { getHomeHighlights } from '@/controllers/homeController';
import Icon from '@/components/ui/Icon';
import { fetchSpecialties, SpecialtyDto, resolveStorageUrl } from '@/controllers/api';
import { usePageContent } from '@/hooks/usePageContent';
import * as HeroIcons from 'lucide-react'; 
import { getIcon } from '@/utils/iconMapper';

const Home: React.FC = () => {
  const { data: pageData, loading: pageLoading } = usePageContent('home');
  const fallbackHighlights = getHomeHighlights();
  
  const [specialties, setSpecialties] = useState<SpecialtyDto[]>([]);
  const [loadingSpecs, setLoadingSpecs] = useState(false);
  const [specsError, setSpecsError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoadingSpecs(true);
    setSpecsError(null);
    fetchSpecialties()
      .then((res) => { if (!ignore) setSpecialties(res); })
      .catch((e) => setSpecsError(e.message))
      .finally(() => setLoadingSpecs(false));
    return () => { ignore = true; };
  }, []);

  // Extract blocks from page content
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const featuresBlock = pageData?.content?.find(b => b.type === 'features_list');
  const ctaBlock = pageData?.content?.find(b => b.type === 'call_to_action');
  
  const onlineConsultBlock = pageData?.content?.find(b => b.type === 'online_consultation_section');
  const inClinicBlock = pageData?.content?.find(b => b.type === 'in_clinic_consultation_section');
  const diagnosticsBlock = pageData?.content?.find(b => b.type === 'diagnostics_section');
  const articlesBlock = pageData?.content?.find(b => b.type === 'articles_section');
  const downloadAppBlock = pageData?.content?.find(b => b.type === 'download_app_section');

  // Determine what to show
  const heroProps = heroBlock ? {
    title: heroBlock.data.title,
    subtitle: heroBlock.data.subtitle,
    image: heroBlock.data.image
  } : {};

  // Features/Services
  const serviceItems = featuresBlock?.data?.features?.map((f: any) => ({
    title: f.title,
    description: f.description,
    icon: f.icon
  }));

  const testimonialsBlock = pageData?.content?.find(b => b.type === 'testimonials_list');
  const testimonialItems = testimonialsBlock?.data?.testimonials?.map((t: any) => ({
    quote: t.quote,
    author: t.author,
    role: t.role
  }));

  return (
    <>
      <Hero {...heroProps} />
      
      {/* Features / Services List */}
      <Services items={serviceItems} />

      {/* Top Specialities */}
      <section className="py-12 lg:py-20 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between">
              <Editable tag="h2" id="home-top-specialties-title" className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">Top Specialities</Editable>
              <Link to="/find-doctors" className="hidden sm:inline-block px-5 py-2.5 border border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">Browse All</Link>
            </div>
            {loadingSpecs && (
              <div className="mt-6 text-brand-gray-600">Loading specialities...</div>
            )}
            {specsError && (
              <div className="mt-6 text-red-600">{specsError}</div>
            )}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {specialties.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-brand-blue transition-all duration-300 text-center">
                  <div className="bg-blue-50 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {s.icon_url ? (
                      <img
                        src={s.icon_url}
                        alt={s.name}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    ) : ((s.icon_url || s.icon_path) ? (
                      <img
                        src={s.icon_url || resolveStorageUrl(s.icon_path)}
                        alt={s.name}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    ) : (() => {
                        const LucideIcon = getIcon(s.slug) || getIcon(s.name);
                        if (LucideIcon) return <LucideIcon className="w-8 h-8 text-brand-blue" />;
                        if (s.name) return <span className="text-2xl font-bold">{s.name.charAt(0)}</span>;
                        return <Icon name="hospital" alt="Hospital" className="w-10 h-10" />;
                    })())}
                  </div>
                  <Editable tag="p" id={`spec-${s.slug}`} className="font-semibold text-brand-gray-800">{s.name}</Editable>
                  <Link to="/video-consult" className="mt-3 inline-block text-brand-blue font-bold text-sm hover:underline">CONSULT NOW</Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link to="/find-doctors" className="px-5 py-2.5 border border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">Browse All</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Block from Page Content */}
      {ctaBlock && (
        <section className="py-16 bg-brand-blue text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{ctaBlock.data.title}</h2>
                <p className="text-xl mb-8 opacity-90">{ctaBlock.data.description}</p>
                <Link to={ctaBlock.data.button_url} className="inline-block px-8 py-3 bg-white text-brand-blue font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    {ctaBlock.data.button_text}
                </Link>
            </div>
        </section>
      )}

      <OnlineConsultation 
        title={onlineConsultBlock?.data?.title}
        description={onlineConsultBlock?.data?.description}
      />
      <InClinicConsultation 
        items={specialties.map(s => ({
          icon: s.slug || 'doctor',
          icon_path: s.icon_path || undefined,
          icon_url: s.icon_url || undefined,
          name: s.name,
          description: s.description || `Expert consultation for ${s.name}`
        }))} 
        title={inClinicBlock?.data?.title}
        subtitle={inClinicBlock?.data?.subtitle}
      />
      <HomeDiagnostics 
        title={diagnosticsBlock?.data?.title}
        subtitle={diagnosticsBlock?.data?.subtitle}
        image={diagnosticsBlock?.data?.image}
        benefits={diagnosticsBlock?.data?.benefits}
      />
      <Articles 
        title={articlesBlock?.data?.title}
        subtitle={articlesBlock?.data?.subtitle}
        defaultImage={articlesBlock?.data?.default_image}
      />
      <Testimonials items={testimonialItems} title={testimonialsBlock?.data?.title} />
      <DownloadApp 
        title={downloadAppBlock?.data?.title}
        description={downloadAppBlock?.data?.description}
        cta_text={downloadAppBlock?.data?.cta_text}
        google_play_badge={downloadAppBlock?.data?.google_play_badge}
        app_store_badge={downloadAppBlock?.data?.app_store_badge}
        image={downloadAppBlock?.data?.image}
      />
    </>
  );
};

export default Home;
