import React, { use State } from 'react';
import { HEALTH_PACKAGES, ADDITIONAL_SERVICES } from './constants';
import { HealthPackage } from './types';
import Hero from './components/Hero';
import PackageCard from './components/PackageCard';
import PackageModal from './components/PackageModal';
import AIAssistant from './components/AIAssistant';
import { Plus, ArrowUpRight, Check, Star } from 'lucide-react';

function App() {
  const [selectedPackage, setSelectedPackage] = useState<HealthPackage | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      <main className="flex-grow">
        <Hero />

        {/* Packages Grid */}
        <section id="packages" className="py-24 px-6 container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Curated Wellness Packages</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Choose from our specialized health packages designed to cater to every stage of life with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {HEALTH_PACKAGES.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                data={pkg} 
                onClick={setSelectedPackage} 
              />
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section id="services" className="py-24 bg-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 -z-0 opacity-50"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Comprehensive Care</span>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Beyond the Basics</h2>
                <p className="text-slate-500 text-lg">
                   Personalize your healthcare experience with our premium add-on services available across all packages.
                </p>
              </div>
              <button className="group flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full font-medium transition-all">
                Full Service Catalog 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ADDITIONAL_SERVICES.map((service, index) => (
                <div key={index} className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{service}</h3>
                  <p className="text-slate-400 text-sm">Available on request</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern CTA Banner */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden text-center shadow-2xl shadow-slate-900/20">
               
               {/* Abstract shapes */}
               <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                 <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-600/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
               </div>

               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-white/20 text-white">
                    <Star className="w-8 h-8 fill-current" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                   Your Health Journey Starts Here
                 </h2>
                 <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl">
                   Join thousands of members who trust Vitality Health for their preventative and chronic care needs. Simple, transparent, and effective.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                   <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition-colors w-full sm:w-auto shadow-lg">
                     Book Consultation
                   </button>
                   <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-sm">
                     Contact Sales
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals & Overlays */}
      <PackageModal 
        pkg={selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
      />
      
      <AIAssistant />
    </div>
  );
}

export default App;