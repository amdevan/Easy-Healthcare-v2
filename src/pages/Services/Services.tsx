import React from 'react';
import Button from '@/components/ui/Button';

const Services: React.FC = () => {
  const items = [
    {
      id: 'primary-health-care',
      title: 'Primary Health Care',
      desc:
        'Comprehensive outpatient care with general physicians and specialists for immediate, preventive, and routine health needs.',
      iconBg: 'bg-blue-100',
      href: '/find-doctors',
      decor: 'from-blue-200',
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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 3v7l-4 8h14l-4-8V3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'pharmacy-services',
      title: 'Pharmacy Services',
      desc:
        'Licensed in-house and online pharmacy providing authentic medicines, online ordering, home delivery, and prescription management.',
      iconBg: 'bg-rose-100',
      href: '/pharmacy',
      decor: 'from-rose-200',
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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 21C7 16 4 13 4 9a8 8 0 1116 0c0 4-3 7-8 12z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue bg-blue-50 px-3 py-1 rounded-full">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L6.5 20l2-7L3 9h7l2-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            WORLD CLASS CARE
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-gray-900">Our Services</h1>
          <p className="mt-3 text-brand-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of healthcare solutions designed to provide you with the best medical support at every step.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="group relative overflow-hidden rounded-none border bg-white p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-blue"
            >
              <div
                className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${item.decor} to-transparent opacity-0 group-hover:opacity-100 blur-xl transition`}
                aria-hidden="true"
              />
              <div
                className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${item.decor} to-transparent opacity-0 group-hover:opacity-100 transition`}
                aria-hidden="true"
              />
              <div className={`h-9 w-9 rounded-md ${item.iconBg} ring-1 ring-black/5 flex items-center justify-center mb-3`}>{item.icon}</div>
              <h2 className="text-base font-bold text-brand-gray-900">{item.title}</h2>
              <p className="mt-1 text-sm text-brand-gray-600">{item.desc}</p>
              <div className="mt-4">
                <Button
                  to={item.href}
                  size="sm"
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-blue-50"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="container mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white p-8 md:p-12 shadow-md">
          <h3 className="text-xl md:text-2xl font-extrabold text-center">Ready to prioritize your health?</h3>
          <p className="mt-3 text-sm md:text-base text-center max-w-2xl mx-auto opacity-90">
            Book an appointment today or consult with our specialists online. Your journey to better health starts here.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button to="/video-consult" size="md" variant="primary" className="bg-white text-brand-blue hover:bg-blue-50">
              Schedule Visit
            </Button>
            <Button to="/contact" size="md" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">24/7</div>
            <div className="mt-1 text-xs md:text-sm text-brand-gray-500">SUPPORT</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">50+</div>
            <div className="mt-1 text-xs md:text-sm text-brand-gray-500">SPECIALISTS</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">10k+</div>
            <div className="mt-1 text-xs md:text-sm text-brand-gray-500">PATIENTS</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">98%</div>
            <div className="mt-1 text-xs md:text-sm text-brand-gray-500">SATISFACTION</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
