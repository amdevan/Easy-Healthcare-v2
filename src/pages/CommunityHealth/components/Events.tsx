import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface EventItem { title: string; date: string; location: string; description: string; }

interface EventsProps {
  title?: string;
  ctaText?: string;
  events?: EventItem[];
}

const Events: React.FC<EventsProps> = ({ title, ctaText, events }) => {
  const upcoming: EventItem[] = [
    { title: 'Ward 12 Screening Camp', date: 'Jan 20', location: 'Community Center', description: 'BP, sugar, BMI, and lifestyle counseling' },
    { title: 'School Nutrition Drive', date: 'Jan 27', location: 'Little Stars School', description: 'Nutrition talks and dental hygiene kits' },
    { title: 'Women Wellness Circle', date: 'Feb 02', location: 'Health Hub', description: 'Maternal guidance and postnatal support' },
  ];
  
  const displayEvents = events && events.length > 0 ? events : upcoming;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{title || "Upcoming Events"}</h3>
          <a href="#volunteer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">{ctaText || "Volunteer"}</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayEvents.map((e, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6">
              <div className="flex items-center gap-2 text-teal-700 mb-2"><Calendar className="h-5 w-5" /><span>{e.date}</span></div>
              <div className="flex items-center gap-2 text-slate-700 mb-4"><MapPin className="h-5 w-5" /><span>{e.location}</span></div>
              <div className="text-lg font-bold text-slate-900 mb-1">{e.title}</div>
              <div className="text-slate-600">{e.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
