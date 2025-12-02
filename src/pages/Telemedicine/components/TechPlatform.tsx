import React from 'react';
import { Smartphone, Monitor, Database, CreditCard } from 'lucide-react';

const TechPlatform: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
             <div className="relative">
                <div className="absolute inset-0 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
                <img
                  src="https://picsum.photos/600/600?grayscale"
                  alt="App Interface on Phone"
                  className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl border-8 border-gray-900"
                />
             </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built on Advanced Technology</h2>
            <p className="text-lg text-gray-600 mb-10">
              Our platform combines ease of use with powerful medical tools, ensuring a seamless experience for both patients and providers.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Smartphone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Multi-Device Access</h3>
                  <p className="text-gray-600">Fully accessible on smartphones, tablets, and computers. Health care in your pocket.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Monitor className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Easy Appointment Booking</h3>
                  <p className="text-gray-600">Intuitive interface to find doctors, view availability, and book slots in seconds.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Database className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Integrated Digital Records</h3>
                  <p className="text-gray-600">Secure storage of your medical history, prescriptions, and lab reports in one place.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CreditCard className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Seamless Payments</h3>
                  <p className="text-gray-600">Integrated online payments and pharmacy coordination for a hassle-free experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechPlatform;
