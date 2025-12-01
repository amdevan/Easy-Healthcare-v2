import React from 'react';
import { Heart, Stethoscope, Truck, Pill, Store, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS, CURRENCY } from './constants';
import { PrescriptionUpload } from './components/PrescriptionUpload';
import { PharmacistChat } from './components/PharmacistChat';
import InPageNav from './components/InPageNav';

const Pharmacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-teal-50 via-indigo-50 to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 p-2 rounded-lg mr-2 shadow-md">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-2xl text-slate-800 tracking-tight">Easy<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600">Health</span></span>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Medicines, delivered</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 xl:inline">safely to your doorstep.</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Upload your prescription or browse OTC essentials today. Pharmacist-verified and fast delivery.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#upload" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 hover:brightness-110 md:py-4 md:text-lg transition-all shadow-lg">
                      Upload Prescription
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#shop" className="w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-md text-primary-700 bg-white border-primary-200 hover:bg-primary-50 md:py-4 md:text-lg transition-all shadow-sm">
                      Shop Medicines
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://picsum.photos/seed/medical/1600/900"
            alt="Doctor holding tablet"
          />
        </div>
      </div>

      {/* Sticky In-Page Navigation */}
      <InPageNav />

      {/* Features */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A better way to get your healthcare
            </h3>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div tabIndex={0} className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-slate-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white shadow">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">Pharmacist Verified</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Every order is reviewed by a licensed pharmacist for safety and interactions.
                </dd>
              </div>

              <div tabIndex={0} className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-slate-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white shadow">
                  <Truck className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">Fast Delivery</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Quick home delivery within Kathmandu Valley and express options for nearby districts.
                </dd>
              </div>

              <div tabIndex={0} className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-slate-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white shadow">
                  <Pill className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">EasyCare 365</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Automated refills for chronic conditions so you never run out of medicine.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Shop Coming Soon (exact-style to mirror GitHub repo) */}
      <section id="shop" className="py-12 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary-50 p-4 rounded-full ring-8 ring-primary-50/50">
              <Store className="w-10 h-10 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600">Shop Coming Soon</h2>
          <p className="mt-2 text-brand-gray-600 text-center">We’re preparing a curated online pharmacy with pharmacist oversight.</p>

          {/* Feature cards to match repo’s placeholder layout */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div tabIndex={0} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-center">
              <div className="mx-auto w-12 h-12 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-gray-900">Curated OTC Essentials</h3>
              <p className="mt-2 text-sm text-brand-gray-600">Handpicked everyday medicines and wellness products you trust.</p>
            </div>

            <div tabIndex={0} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-center">
              <div className="mx-auto w-12 h-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-gray-900">Pharmacist-Verified Safety</h3>
              <p className="mt-2 text-sm text-brand-gray-600">Every order checked for interactions and safe usage guidance.</p>
            </div>

            <div tabIndex={0} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-center">
              <div className="mx-auto w-12 h-12 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-gray-900">Fast & Reliable Delivery</h3>
              <p className="mt-2 text-sm text-brand-gray-600">Quick delivery within Kathmandu Valley and nearby districts.</p>
            </div>
          </div>

          {/* Urgent attention CTA aligned with repo intent */}
          <div className="mt-10 flex flex-col items-center">
            <div className="rounded-md shadow">
              <a href="#upload" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 hover:brightness-110 md:py-4 md:text-lg transition-all shadow-lg">
                Need urgent attention? Upload Prescription
              </a>
            </div>
            <p className="mt-3 text-sm text-brand-gray-600">Or chat with our AI Pharmacist for quick guidance.</p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="bg-white">
        <PrescriptionUpload />
      </section>

      {/* Floating Chat */}
      <PharmacistChat />
    </div>
  );
};

export default Pharmacy;
