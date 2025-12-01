import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-50 pt-24 lg:pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold mb-6 border border-teal-200">
              <span className="flex h-2 w-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
              Serving Kathmandu Valley & Beyond
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6 tracking-tight">
              Care That Goes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                The Extra Mile
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Professional Non-Emergency Medical Transportation (NEMT) ensuring safe, comfortable, and dignified travel for you and your loved ones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#booking" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-full text-white bg-teal-600 hover:bg-teal-700 hover:scale-105 transition-all shadow-lg hover:shadow-teal-200/50"
              >
                Book a Vehicle
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="tel:+977123456789" className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-base font-semibold rounded-full text-slate-700 hover:bg:white hover:border-teal-500 hover:text-teal-600 transition-all bg-white/50">
                <Phone className="mr-2 h-5 w-5" />
                Call Dispatch
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap justify-center lg:justify-start gap-8 text-slate-500">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">24/7 Availability</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">BLS Trained Staff</span>
              </div>
            </div>
          </div>

          {/* Image Illustration */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2 transition-transform hover:rotate-0 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop" 
                alt="Caring medical staff helping patient" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-medium">Trusted by 50+ Hospitals in Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;