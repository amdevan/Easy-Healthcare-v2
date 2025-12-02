import React from 'react';
import { ArrowRight, Video, ShieldCheck, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Accessible Healthcare Anytime, Anywhere
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Expert Care, <br />
              <span className="text-teal-600">Just a Click Away.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of medicine with secure remote consultations, high-quality video calls, and instant digital prescriptions. Quality healthcare, now from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#cta"
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-2 group"
              >
                Book an Online Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-teal-200 hover:bg-teal-50 transition-all flex items-center justify-center"
              >
                Learn How It Works
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-500" />
                HD Video Calls
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500" />
                24/7 Availability
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Online telemedicine consultation"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://picsum.photos/800/600?grayscale'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Doctor is online</p>
                  <p className="text-sm text-gray-500">General Physician • 15 years exp.</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-full hover:bg-teal-700">
                  Connect
                </button>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
