import React from 'react';
import { FileText, Users, Scale, Shield, ArrowRight } from 'lucide-react';

const committees = [
  {
    icon: <Scale className="w-6 h-6 text-brand-blue" />,
    title: "Audit Committee",
    description: "Oversees financial reporting, internal controls, and independent auditors to ensure accuracy and transparency."
  },
  {
    icon: <Users className="w-6 h-6 text-brand-blue" />,
    title: "Compensation Committee",
    description: "Reviews and approves compensation strategies for executive officers and directors to align with shareholder interests."
  },
  {
    icon: <Shield className="w-6 h-6 text-brand-blue" />,
    title: "Nomination & Governance",
    description: "Identifies qualified individuals to serve on the board and develops corporate governance guidelines."
  },
  {
    icon: <FileText className="w-6 h-6 text-brand-blue" />,
    title: "Ethics & Compliance",
    description: "Ensures the company adheres to legal standards and internal policies, promoting a culture of integrity."
  }
];

const documents = [
  "Code of Business Conduct and Ethics",
  "Corporate Governance Guidelines",
  "Audit Committee Charter",
  "Compensation Committee Charter"
];

const Governance: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Board Committees</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Our Board has established standing committees to assist in discharging its responsibilities. 
              These committees play a vital role in ensuring effective governance and oversight.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {committees.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-brand-blue text-white p-8 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Governance Documents</h3>
               <p className="text-blue-100 mb-6 relative z-10">
                 Transparency is key to our operations. Access our foundational governance documents below.
               </p>
               <ul className="space-y-3 relative z-10">
                 {documents.map((doc, idx) => (
                   <li key={idx} className="flex items-center gap-3 group cursor-pointer">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-300 group-hover:text-brand-blue transition-colors">
                       <FileText className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-medium border-b border-transparent group-hover:border-blue-300 transition-all">
                       {doc}
                     </span>
                   </li>
                 ))}
               </ul>
               <button className="mt-8 flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-white transition-colors">
                 View All Documents <ArrowRight className="w-4 h-4" />
               </button>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
               <h3 className="font-bold text-gray-900 mb-4">Shareholder Engagement</h3>
               <p className="text-gray-600 text-sm mb-4">
                 We value the input of our shareholders and are committed to maintaining an open dialogue. 
                 Our Board reviews shareholder feedback regularly to inform our governance practices.
               </p>
               <a href="#contact" className="text-brand-blue font-semibold text-sm hover:underline">
                 Contact Investor Relations
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Governance;
