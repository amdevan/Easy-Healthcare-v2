import React from 'react';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  content: string;
  author: string;
  location: string;
  role: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    content: "Living in Sydney, I was constantly worried about my mother's diabetes management in Kathmandu. EasyCare 365 has been a godsend. The weekly nurse visits and detailed reports give me total peace of mind.",
    author: "Sushil K.",
    location: "Sydney, Australia",
    role: "Son of 72-year-old member",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "The emergency coordination was incredible. When my father had a fall, the Care Coordinator was at the hospital before I could even book a flight. They handled everything professionally and with such kindness.",
    author: "Anjali S.",
    location: "New York, USA",
    role: "Daughter of 80-year-old member",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    content: "I didn't realize how much logistics goes into medical care until I started using this service. No more queuing for appointments or running around for medicines. It's all done for us.",
    author: "Rajesh M.",
    location: "London, UK",
    role: "Son of 68-year-old member",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 text-slate-100">
          <Quote size={400} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">Success Stories</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Trusted by Families Worldwide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-3xl p-8 relative hover:shadow-xl transition-shadow duration-300 border border-slate-100"
            >
              <div className="absolute -top-6 left-8 bg-teal-500 text-white p-3 rounded-2xl shadow-lg transform rotate-3">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.author}</h4>
                  <p className="text-xs font-medium text-teal-600 uppercase tracking-wide">{testimonial.location}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
