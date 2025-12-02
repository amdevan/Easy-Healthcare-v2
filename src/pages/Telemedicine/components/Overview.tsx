import React from 'react';
import { MapPin, Users, Heart } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Redefining Healthcare Accessibility</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            At <span className="font-semibold text-teal-600">Easy Health Care</span>, we believe quality medical attention shouldn't be limited by geography. Our telemedicine platform bridges the gap between patients and certified doctors, designed specifically to serve the diverse terrain of Nepal. Whether you are in the heart of Kathmandu or a remote village in the Himalayas, we bring the clinic to you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Specialists</h3>
            <p className="text-gray-600">
              Direct remote access to a wide network of verified general physicians and specialized consultants ready to assist you.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Nationwide Access</h3>
            <p className="text-gray-600">
              Designed for accessibility across Nepal, ensuring that even the most remote regions have a lifeline to professional care.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Continuity of Care</h3>
            <p className="text-gray-600">
              We prioritize your long-term health by reducing the burden of travel and ensuring consistent follow-ups for better outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
