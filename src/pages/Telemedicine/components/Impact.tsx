import React from 'react';

interface ImpactItem {
  value: string;
  label: string;
  description: string;
}

interface ImpactProps {
  title?: string;
  items?: ImpactItem[];
}

const Impact: React.FC<ImpactProps> = ({ title, items }) => {
  const defaultItems = [
    { value: '50%', label: 'Reduced Wait Times', description: 'Helping reduce crowding in hospitals and clinics.' },
    { value: '98%', label: 'Patient Satisfaction', description: 'Improving accessibility leads to happier, healthier patients.' },
    { value: '24/7', label: 'Tech-Driven Care', description: 'Positioning Easy Health Care as a modern leader.' }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {title || "Empowering Nepal's Healthcare Ecosystem"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {displayItems.map((item, idx) => (
                <div key={idx} className="p-6 border border-gray-700 rounded-xl bg-gray-800/50 backdrop-blur">
                  <div className="text-4xl font-bold text-teal-400 mb-2">{item.value}</div>
                  <h4 className="text-lg font-semibold mb-2">{item.label}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
