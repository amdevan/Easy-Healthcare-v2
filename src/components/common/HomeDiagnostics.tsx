import React from 'react';
import Editable from '@/components/ui/Editable';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const HomeDiagnostics: React.FC = () => {
    const benefits = [
        {
            id: 'benefit-reach',
            text: 'Expand your patient reach beyond the clinic.'
        },
        {
            id: 'benefit-flexibility',
            text: 'Enjoy a flexible schedule that you control.'
        },
        {
            id: 'benefit-earnings',
            text: 'Increase your earnings with premium home services.'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-cyan-50">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:p-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Info and CTA */}
                        <div className="order-2 lg:order-1">
                            <Editable tag="h2" id="doctor-home-visit-title" className="text-4xl font-extrabold text-brand-gray-900">
                                Expand Your Practice. Offer Home Visits.
                            </Editable>
                            <Editable tag="p" id="doctor-home-visit-subtitle" className="mt-4 text-lg text-brand-gray-500">
                                Join our network of esteemed doctors providing compassionate care at patients' homes. Increase your reach, manage your schedule flexibly, and boost your earnings.
                            </Editable>
                            
                            <ul className="mt-8 space-y-4">
                                {benefits.map(benefit => (
                                    <li key={benefit.id} className="flex items-start space-x-3">
                                        <CheckIcon />
                                        <Editable tag="span" id={benefit.id} className="text-brand-gray-700">
                                            {benefit.text}
                                        </Editable>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10">
                                <a href="#" className="inline-block px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors text-lg">
                                    Join as a Partner
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Image */}
                        <div className="order-1 lg:order-2 flex justify-center">
                           <img 
                                src="https://images.unsplash.com/photo-1659353886973-ced1dfeab3ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Scenic mountain landscape"
                                className="rounded-2xl shadow-xl w-full max-w-md object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeDiagnostics;
