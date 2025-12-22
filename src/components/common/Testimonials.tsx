import React, { useState } from 'react';
import Editable from '@/components/ui/Editable';

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

interface TestimonialsProps {
  title?: string;
  items?: TestimonialItem[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials: TestimonialItem[] = [
    {
      quote: "Very good app. Well thought out about booking/rescheduling/canceling an appointment. Also, Doctor's feedback mechanism is good and describes all the basics in a good way.",
      author: "Devan Sharma",
      role: "User"
    }
  ];

  const testimonials = items && items.length > 0 ? items : defaultTestimonials;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];
  const initials = current.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        {title ? (
           <h2 className="text-3xl font-extrabold text-brand-gray-900">{title}</h2>
        ) : (
           <Editable tag="h2" id="testimonials-title" className="text-3xl font-extrabold text-brand-gray-900">What our users have to say</Editable>
        )}
        
        <div className="mt-10 max-w-3xl mx-auto relative">
          {testimonials.length > 1 && (
            <button 
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            >
              &lt;
            </button>
          )}
          
          <div className="p-8 bg-white rounded-2xl shadow-sm">
            <p className="text-lg text-brand-gray-700 italic">"{current.quote}"</p>
            <div className="mt-8 flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg">
                {initials}
              </div>
              <div className="text-left">
                <p className="font-bold text-brand-gray-900">{current.author}</p>
                {current.role && <p className="text-sm text-brand-gray-500">{current.role}</p>}
              </div>
            </div>
            {testimonials.length > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-blue' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {testimonials.length > 1 && (
            <button 
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
