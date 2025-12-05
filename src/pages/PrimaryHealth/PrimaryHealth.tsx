import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HeartPulse, Stethoscope, Pill, Baby, Activity, Heart, ShieldCheck, Microscope, UserPlus, Calendar, Clock, User, Mail, Phone, FileText, Check } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#0d9488" />
          </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>Accepting New Patients</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Primary Care Built on <span className="text-teal-600">Trust</span> & <span className="text-teal-600">Continuity</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Accessible, affordable, and high-quality general outpatient services. We believe in building long-term relationships for better health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#appointment" className="inline-flex justify-center items-center px-8 py-3.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200">
                Schedule Visit
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="inline-flex justify-center items-center px-8 py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-lg hover:bg-slate-50 transition-all">
                View Services
              </a>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-teal-500 h-5 w-5" /><span>Walk-ins Welcome</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-teal-500 h-5 w-5" /><span>Affordable Plans</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-teal-500 h-5 w-5" /><span>Expert Physicians</span></div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-100">
              <img
                src="https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor consulting with patient"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=60&w=1600&auto=format&fit=crop'; }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <p className="font-medium">"Continuous care is the cornerstone of lifelong health."</p>
                <p className="text-sm opacity-80 mt-1">- Lead Physician</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Comprehensive Care</p>
                  <p className="text-xs text-slate-500">From diagnosis to recovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type ServiceItem = { title: string; description: string; icon: React.ReactNode };

const servicesList: ServiceItem[] = [
  { title: 'General Outpatient', description: 'Comprehensive diagnosis and treatment for common illnesses, infections, and minor injuries with minimal wait times.', icon: <Stethoscope className="w-8 h-8 text-white" /> },
  { title: 'Chronic Disease Management', description: 'Ongoing support for diabetes, hypertension, asthma, and other long-term conditions to ensure stable health.', icon: <Activity className="w-8 h-8 text-white" /> },
  { title: 'Preventive Care', description: 'Regular health screenings, immunizations, and wellness check-ups to catch issues before they become serious.', icon: <ShieldCheck className="w-8 h-8 text-white" /> },
  { title: 'Pediatric & Family Care', description: 'Gentle, specialized care for children and comprehensive health plans for the entire family unit.', icon: <Baby className="w-8 h-8 text-white" /> },
  { title: 'Diagnostic Labs', description: 'On-site blood work and sample collection for rapid diagnosis and faster treatment planning.', icon: <Microscope className="w-8 h-8 text-white" /> },
  { title: 'Cardiovascular Health', description: 'Monitoring heart health, blood pressure management, and cholesterol screenings.', icon: <Heart className="w-8 h-8 text-white" /> },
  { title: 'Pharmacy Services', description: 'Convenient access to prescription medications and expert pharmacist consultations.', icon: <Pill className="w-8 h-8 text-white" /> },
  { title: 'Mental Wellness', description: 'Basic counseling and referrals for mental health support, treating the mind alongside the body.', icon: <UserPlus className="w-8 h-8 text-white" /> },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-2">Our Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Holistic Clinical Services</h3>
          <p className="text-slate-600 text-lg">We provide a wide range of primary care services designed to be affordable and accessible. Our focus is on your continuous well-being.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <div key={index} className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 transition-all duration-300">
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-600 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="relative z-10 max-w-2xl">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Quality Healthcare Shouldn't Break the Bank</h3>
             <p className="text-blue-100 text-lg">We offer transparent pricing, sliding scale options, and accept most major insurance plans. No hidden fees, just honest care.</p>
           </div>
           <div className="relative z-10 shrink-0">
             <a href="#appointment" className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors">Check Our Rates</a>
           </div>
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/400/500?grayscale" alt="Clinic Interior" className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/400/500?blur=2'; }} />
              <img src="https://picsum.photos/400/500?blur=2" alt="Happy Patient" className="rounded-2xl shadow-lg mb-8" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/400/500'; }} />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h4 className="text-teal-600 font-bold uppercase tracking-wide">About Primary Health Care</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Dedicated to Continuous & Affordable Care</h2>
            <p className="text-slate-600 text-lg leading-relaxed">Founded on the belief that healthcare should be a right, not a privilege, our Primary Health Care service focuses on reducing barriers to quality medical attention. We specialize in general outpatient services designed to fit your busy life.</p>
            <p className="text-slate-600 leading-relaxed">Our "Continuity of Care" model ensures you see the same team of professionals who know your history, preferences, and health goals. From minor check-ups to managing complex chronic conditions, we walk the journey with you.</p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div><h3 className="text-3xl font-bold text-teal-600">15k+</h3><p className="text-slate-500">Patients Served</p></div>
              <div><h3 className="text-3xl font-bold text-teal-600">98%</h3><p className="text-slate-500">Satisfaction Rate</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AppointmentForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };
  if (submitted) {
    return (
      <section id="appointment" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
             <p className="text-lg text-slate-600 mb-8">Thank you for your request. Our team will contact you shortly to confirm your appointment time.</p>
             <button onClick={() => setSubmitted(false)} className="text-teal-600 font-semibold hover:underline">Book another appointment</button>
           </div>
        </div>
      </section>
    );
  }
  return (
    <section id="appointment" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          <div className="lg:w-5/12 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Book Your Consultation</h2>
            <p className="text-slate-600">Prioritize your health with our flexible scheduling. We offer same-day appointments for acute needs and convenient slots for routine check-ups.</p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-start gap-4"><div className="bg-teal-50 p-3 rounded-lg text-teal-600"><Clock size={24} /></div><div><h4 className="font-bold text-slate-900">Clinic Hours</h4><p className="text-sm text-slate-500 mt-1">Mon - Fri: 8:00 AM - 8:00 PM</p><p className="text-sm text-slate-500">Sat: 9:00 AM - 5:00 PM</p><p className="text-sm text-slate-500">Sun: Closed</p></div></div>
              <div className="w-full h-px bg-slate-100 my-4"></div>
              <div className="flex items-start gap-4"><div className="bg-teal-50 p-3 rounded-lg text-teal-600"><Phone size={24} /></div><div><h4 className="font-bold text-slate-900">Support Contact</h4><p className="text-sm text-slate-500 mt-1">For life-threatening emergencies, please call local emergency services.</p><p className="text-sm text-slate-500 mt-1">Clinic Line: (555) 019-2834</p></div></div>
            </div>
          </div>
          <div className="lg:w-7/12">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-teal-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative"><User className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none" placeholder="John Doe" /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <div className="relative"><Phone className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="tel" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none" placeholder="(555) 000-0000" /></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="email" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none" placeholder="john@example.com" /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                  <div className="relative"><Calendar className="absolute left-3 top-3 text-slate-400" size={18} /><input required type="date" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none" /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>
                  <div className="relative"><Clock className="absolute left-3 top-3 text-slate-400" size={18} /><select className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none appearance-none"><option>Morning (8am - 12pm)</option><option>Afternoon (12pm - 4pm)</option><option>Evening (4pm - 8pm)</option></select></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Visit</label>
                  <div className="relative"><FileText className="absolute left-3 top-3 text-slate-400" size={18} /><textarea className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none h-24 resize-none" placeholder="Briefly describe your symptoms or check-up needs..."></textarea></div>
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100">Confirm Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrimaryHealth: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <AppointmentForm />
    </main>
  );
};

export default PrimaryHealth;
