import React from 'react';
import { UserPlus, Calendar, Clock, Video, FileCheck } from 'lucide-react';
import { StepProps } from '@/pages/Telemedicine/types';

const steps: StepProps[] = [
  { number: 1, title: 'Register', description: 'Sign up quickly through our website or mobile app with your basic details.' },
  { number: 2, title: 'Select Service', description: 'Choose the type of consultation you need (General, Specialist, Mental Health).' },
  { number: 3, title: 'Choose Time', description: 'Browse doctor availability and pick a time slot that works for you.' },
  { number: 4, title: 'Connect', description: 'Join the secure video or phone call at your scheduled time.' },
  { number: 5, title: 'Care Plan', description: 'Receive your digital prescription and detailed follow-up plan instantly.' }
];

const icons = [UserPlus, Calendar, Clock, Video, FileCheck];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-teal-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get quality medical care in 5 simple steps</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-teal-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = icons[idx];
              return (
                <div key={step.number} className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg border-4 border-white md:border-teal-50">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
