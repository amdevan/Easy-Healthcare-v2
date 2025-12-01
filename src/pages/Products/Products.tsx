import React, { useState } from 'react';
import { HEALTH_PACKAGES, ADDITIONAL_SERVICES } from '../../../vendor/amdevan-package/constants';
import PackageCard from '../../../vendor/amdevan-package/components/PackageCard';
import PackageModal from '../../../vendor/amdevan-package/components/PackageModal';
import VendorHero from '../../../vendor/amdevan-package/components/Hero';
import { HealthPackage } from '../../../vendor/amdevan-package/types';
import { Plus, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const Products: React.FC = () => {
  const [selected, setSelected] = useState<HealthPackage | null>(null);

  return (
    <section className="pt-0 pb-8 lg:pb-12 bg-brand-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <VendorHero
            title="Health Packages Designed Around Your Life"
            subtitle="Browse preventive, family, and chronic-care packages. Simple, clear inclusions and pricing."
            primaryCtaText="Browse Packages"
            secondaryCtaText="How It Works"
            scrollTargetId="packages"
            compact
          />
        </div>

        <div id="packages" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {HEALTH_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} data={pkg} onClick={(p) => setSelected(p)} />
          ))}
        </div>

        {/* Beyond the Basics: Additional premium add-on services as cards */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700">Comprehensive Care</p>
              <h2 className="mt-1 text-2xl font-bold text-brand-gray-900">Beyond the Basics</h2>
              <p className="mt-2 text-brand-gray-600 max-w-2xl">Personalize your healthcare experience with our premium add-on services available across all packages.</p>
            </div>
            <div className="hidden md:block">
              <Button to="/services" variant="outline" size="sm">
                Full Service Catalog <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADDITIONAL_SERVICES.map((svc) => (
              <div key={svc} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-teal-50 text-teal-600">
                    <Plus className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-brand-gray-900">{svc}</p>
                    <p className="text-xs text-brand-gray-500 mt-1">Available on request</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-800 p-10 text-center text-white shadow-xl">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 mb-4">
              <span className="text-white text-lg">✦</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Your Health Journey Starts Here</h3>
            <p className="mt-3 text-sm md:text-base text-slate-300">Join thousands who trust Vitality Health for preventive and chronic care needs. Simple, transparent, and effective.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button to="/video-consult" variant="primary" size="md">Book Consultation</Button>
              <Button to="/contact" variant="secondary" size="md">Contact Sales</Button>
            </div>
          </div>
        </div>
      </div>

      {selected && <PackageModal pkg={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Products;