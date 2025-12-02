import React from 'react';
import { Home, Globe, TrendingUp, DollarSign, Lock } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Patients Trust Us</h2>
            <p className="text-teal-100 text-lg leading-relaxed mb-8">
              We have built our platform with the patient at the center. Every feature is designed to make healthcare simpler, faster, and more effective for you and your family.
            </p>
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border border-teal-700">
               <img src="https://picsum.photos/400/500?grayscale&blur=2" alt="Happy family" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-semibold text-white">Serving over 10,000 families</p>
               </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Care from Home</h3>
                <p className="text-teal-100/80">Consult with top doctors from the comfort of your living room or workplace, eliminating the stress of waiting rooms.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">True Accessibility</h3>
                <p className="text-teal-100/80">We bridge the gap for remote and underserved areas, bringing specialist care to places where it was previously unavailable.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Continuous Care</h3>
                <p className="text-teal-100/80">Ideal for chronic disease management, maternal health, and child care, ensuring no gap in medical attention.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
                <p className="text-teal-100/80">Save significant money and time on travel, lodging, and hospital administrative fees.</p>
              </div>
            </div>

            <div className="flex gap-4 sm:col-span-2">
              <div className="w-12 h-12 rounded-lg bg-teal-800 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-teal-100/80">Your health data is sacred. We use end-to-end encryption to ensure your consultations and records remain 100% private and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
