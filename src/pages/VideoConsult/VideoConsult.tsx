import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import OnlineConsultation from '@/components/common/OnlineConsultation';

const VideoConsult: React.FC = () => {
  const { data: pageData } = usePageContent('video-consult');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const consultBlock = pageData?.content?.find(b => b.type === 'consultation_section');

  return (
    <section className="py-12 lg:py-20 bg-brand-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">
            {heroBlock?.data?.title || "Instant Video Consultation"}
          </h1>
          <p className="mt-4 text-brand-gray-600">
            {heroBlock?.data?.description || "Connect with verified doctors online within minutes for private, secure consultations."}
          </p>
        </div>
        <div className="mt-8">
          <OnlineConsultation 
            title={consultBlock?.data?.title}
            description={consultBlock?.data?.description}
            items={consultBlock?.data?.items}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoConsult;