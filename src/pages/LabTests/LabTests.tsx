import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';

export default function LabTests() {
  const { data: pageData } = usePageContent('lab-tests');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const featuresBlock = pageData?.content?.find(b => b.type === 'features_section');
  const processBlock = pageData?.content?.find(b => b.type === 'process_section');
  
  const heroImg = heroBlock?.data?.image 
    ? resolveSrc(heroBlock.data.image) 
    : undefined;

  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.subtitle || heroBlock?.data?.description,
    image: heroImg,
    stats: heroBlock?.data?.stats
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <Hero {...heroProps} />
        <Features 
          title={featuresBlock?.data?.title} 
          description={featuresBlock?.data?.description}
          items={featuresBlock?.data?.items}
        />
        <Process 
          title={processBlock?.data?.title} 
          description={processBlock?.data?.description}
          steps={processBlock?.data?.steps}
        />
      </main>
    </div>
  );
}

