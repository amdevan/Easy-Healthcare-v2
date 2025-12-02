import React from 'react';
import { Video, Activity, FileText, CalendarCheck, PhoneCall } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Key Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Comprehensive Digital Care</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Video className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Virtual Consultations</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect face-to-face with general physicians, specialized doctors, and mental health experts through our secure, high-definition video platform. Discuss symptoms and get advice without leaving home.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Activity className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Remote Diagnostics</h3>
            <p className="text-gray-600 leading-relaxed">
              Leverage the power of modern technology. We integrate with digital health tools and wearables to monitor your vitals remotely, allowing doctors to make data-driven decisions about your health.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <FileText className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant E-Prescriptions</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive your valid electronic prescription immediately after your consultation. It allows you to purchase medicine from your local pharmacy or order directly through our integrated partners.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <CalendarCheck className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Online Follow-ups</h3>
            <p className="text-gray-600 leading-relaxed">
              Recovery is a journey. Our system makes it effortless to schedule and attend follow-up appointments to track your progress, adjust medications, and ensure you are on the path to full health.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
            <PhoneCall className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tele-emergency Support</h3>
            <p className="text-gray-600 leading-relaxed">
              For urgent situations that require immediate guidance, our tele-emergency support connects you with professionals who can triage your condition and direct you to the nearest physical facility if needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
