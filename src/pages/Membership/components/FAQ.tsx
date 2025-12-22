import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the 'Dedicated Care Coordinator' work?",
    answer: "You are assigned a specific Care Coordinator who acts as your primary point of contact. They manage appointments, coordinate with doctors, handle hospital logistics, and update you regularly. You can reach them via WhatsApp or our platform."
  },
  {
    question: "Can I add more family members to a plan?",
    answer: "The standard plans cover one individual. However, we offer discounted add-on rates for spouses or additional family members. Please contact our support team for a custom family quote."
  },
  {
    question: "What happens if there is a medical emergency?",
    answer: "In an emergency, our team coordinates immediate ambulance dispatch and hospital admission. While we are not an ambulance service ourselves, our network ensures the fastest possible response, and your Care Coordinator manages the hospital admission process so you don't have to worry about paperwork during a crisis."
  },
  {
    question: "Are the home health visits performed by doctors?",
    answer: "Home health visits are typically conducted by registered nurses (RNs) or health assistants who monitor vitals, review medications, and perform general screenings. Doctor visits can be arranged as an add-on service or if deemed medically necessary during a nurse visit."
  },
  {
    question: "Is the subscription refundable?",
    answer: "We offer a 30-day money-back guarantee if you are not satisfied with our initial service setup. After that, subscriptions are non-refundable but can be transferred to another family member."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Everything you need to know about EasyCare 365.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`
                bg-white rounded-2xl border transition-all duration-300
                ${openIndex === index ? 'border-teal-200 shadow-lg shadow-teal-100/50' : 'border-slate-200 hover:border-teal-200'}
              `}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-medium ${openIndex === index ? 'text-teal-700' : 'text-slate-900'}`}>
                  {faq.question}
                </span>
                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-teal-500' : 'text-slate-400'}`} />
                </span>
              </button>
              
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-dashed border-slate-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500">
            Still have questions?{' '}
            <a href="/contact" className="font-semibold text-teal-600 hover:text-teal-500">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
