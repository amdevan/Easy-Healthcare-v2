import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import Hero from './components/Hero';
import ProgramsGrid from './components/ProgramsGrid';
import Events from './components/Events';
import VolunteerForm from './components/VolunteerForm';

const CommunityHealth: React.FC = () => {
  const { data: pageData } = usePageContent('community-health');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const programsBlock = pageData?.content?.find(b => b.type === 'programs_section');
  const eventsBlock = pageData?.content?.find(b => b.type === 'events_section');
  const volunteerBlock = pageData?.content?.find(b => b.type === 'volunteer_section');

  const heroProps = {
    title: heroBlock?.data?.title,
    subtitle: heroBlock?.data?.subtitle,
    image: heroBlock?.data?.image
  };

  const programsProps = {
    title: programsBlock?.data?.title,
    subtitle: programsBlock?.data?.subtitle,
    description: programsBlock?.data?.description,
    programs: programsBlock?.data?.items
  };

  const eventsProps = {
    title: eventsBlock?.data?.title,
    ctaText: eventsBlock?.data?.ctaText,
    events: eventsBlock?.data?.items
  };

  const volunteerProps = {
    title: volunteerBlock?.data?.title,
    subtitle: volunteerBlock?.data?.description,
    successTitle: volunteerBlock?.data?.success_title,
    successMessage: volunteerBlock?.data?.success_message,
    labels: volunteerBlock?.data?.labels,
    placeholders: volunteerBlock?.data?.placeholders
  };

  return (
    <main>
      <Hero {...heroProps} />
      <ProgramsGrid {...programsProps} />
      <Events {...eventsProps} />
      <VolunteerForm {...volunteerProps} />
    </main>
  );
};

export default CommunityHealth;
