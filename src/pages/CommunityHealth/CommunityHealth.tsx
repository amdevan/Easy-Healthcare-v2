import React, { useState } from 'react';
import { HeartHandshake, Users, Megaphone, Calendar, MapPin, Leaf, HandHeart, School, Baby, ShieldCheck, Activity, Mail, Phone, User, Check } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 text-teal-700 mb-10">
          <HeartHandshake className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">Community Health Programs</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">Health For All, Together</h1>
            <p className="text-lg text-slate-600 max-w-xl">Collaborative outreach, preventive screenings, and awareness campaigns that bring essential healthcare closer to neighborhoods and families.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#programs" className="inline-flex justify-center items-center px-8 py-3.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all">Explore Programs</a>
              <a href="#volunteer" className="inline-flex justify-center items-center px-8 py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-lg hover:bg-slate-50 transition-all">Become a Volunteer</a>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2"><ShieldCheck className="text-teal-500 h-5 w-5" /><span>Screenings & Preventive Care</span></div>
              <div className="flex items-center gap-2"><Users className="text-teal-500 h-5 w-5" /><span>Community Partnerships</span></div>
              <div className="flex items-center gap-2"><Megaphone className="text-teal-500 h-5 w-5" /><span>Health Awareness</span></div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-100">
              <img
                src="https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Community health outreach"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=60&w=1600&auto=format&fit=crop'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type ProgramItem = { icon: React.ReactNode; title: string; description: string };

const programs: ProgramItem[] = [
  { icon: <HandHeart className="h-8 w-8 text-white" />, title: 'Free Health Camps', description: 'Neighborhood-based camps offering basic checkups, BP and sugar tests.' },
  { icon: <School className="h-8 w-8 text-white" />, title: 'School Health', description: 'Awareness, dental hygiene, nutrition talks, and growth tracking.' },
  { icon: <Baby className="h-8 w-8 text-white" />, title: 'Maternal & Child Care', description: 'Antenatal guidance, vaccinations, and postnatal follow-ups.' },
  { icon: <Activity className="h-8 w-8 text-white" />, title: 'NCD Screening', description: 'Diabetes, hypertension, BMI and lifestyle counseling.' },
  { icon: <Leaf className="h-8 w-8 text-white" />, title: 'Wellness & Nutrition', description: 'Diet support, fitness clubs, and mental well-being circles.' },
  { icon: <Megaphone className="h-8 w-8 text-white" />, title: 'Awareness Drives', description: 'Street plays, workshops, and digital campaigns for prevention.' },
];

const ProgramsGrid: React.FC = () => {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-2">Our Initiatives</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Programs That Create Impact</h3>
          <p className="text-slate-600 text-lg">Designed with local communities to improve access, awareness, and outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <div key={i} className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 transition-all duration-300">
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200">{p.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h4>
              <p className="text-slate-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Events: React.FC = () => {
  const upcoming = [
    { title: 'Ward 12 Screening Camp', date: 'Jan 20', place: 'Community Center', desc: 'BP, sugar, BMI, and lifestyle counseling' },
    { title: 'School Nutrition Drive', date: 'Jan 27', place: 'Little Stars School', desc: 'Nutrition talks and dental hygiene kits' },
    { title: 'Women Wellness Circle', date: 'Feb 02', place: 'Health Hub', desc: 'Maternal guidance and postnatal support' },
  ];
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Upcoming Events</h3>
          <a href="#volunteer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">Volunteer</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {upcoming.map((e, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6">
              <div className="flex items-center gap-2 text-teal-700 mb-2"><Calendar className="h-5 w-5" /><span>{e.date}</span></div>
              <div className="flex items-center gap-2 text-slate-700 mb-4"><MapPin className="h-5 w-5" /><span>{e.place}</span></div>
              <div className="text-lg font-bold text-slate-900 mb-1">{e.title}</div>
              <div className="text-slate-600">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VolunteerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setTimeout(() => setSubmitted(true), 800); };
  if (submitted) {
    return (
      <section id="volunteer" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Thanks for joining!</h3>
            <p className="text-lg text-slate-600 mb-8">We will reach out with upcoming events and roles.</p>
            <button onClick={() => setSubmitted(false)} className="text-teal-600 font-semibold hover:underline">Submit another response</button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="volunteer" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">Volunteer With Us</h3>
            <p className="text-slate-600">Support screenings, registrations, logistics, and awareness. Together we amplify impact.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Users className="h-5 w-5 text-teal-600" /><span className="text-slate-700">On-ground support</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Megaphone className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Awareness drives</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Mail className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Coordination</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Leaf className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Wellness circles</span></div>
            </div>
          </div>
          <div>
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-teal-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative"><User className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="Jane Doe" /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <div className="relative"><Phone className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="tel" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="(555) 000-0000" /></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="email" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="jane@example.com" /></div>
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const CommunityHealth: React.FC = () => {
  return (
    <main>
      <Hero />
      <ProgramsGrid />
      <Events />
      <VolunteerForm />
    </main>
  );
};

export default CommunityHealth;
