import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const members = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chairperson of the Board",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Dr. Mitchell brings over 20 years of experience in healthcare administration and clinical excellence, leading major hospital networks across the country."
  },
  {
    name: "James Wilson",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "James is a visionary leader focused on transforming patient care through technology and innovation, previously serving as VP of Operations at HealthTech Global."
  },
  {
    name: "Dr. Emily Chen",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1594824476969-51c44d7eccca?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Dr. Chen leads our medical strategy, ensuring the highest standards of care and patient safety. She is a renowned cardiologist and published researcher."
  },
  {
    name: "Michael Ross",
    role: "Non-Executive Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Michael brings extensive financial expertise and corporate governance experience to the board, having guided multiple Fortune 500 companies."
  },
  {
    name: "David Kim",
    role: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "David oversees our financial strategy and investor relations, ensuring sustainable growth and fiscal responsibility."
  },
  {
    name: "Dr. Olivia Martinez",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Olivia leads our digital transformation initiatives, leveraging AI and data analytics to improve patient outcomes."
  },
  {
    name: "Robert Langdon",
    role: "Head of Legal & Compliance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Robert ensures all corporate operations adhere to regulatory standards and manages our legal affairs."
  },
  {
    name: "Anita Patel",
    role: "VP of Human Resources",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=500",
    bio: "Anita champions our people-first culture, overseeing talent acquisition and employee development programs."
  }
];

const BoardMembers: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-blue font-bold tracking-wide uppercase text-sm mb-3">Leadership</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Board of Directors</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Guided by a diverse team of experienced leaders committed to revolutionizing healthcare accessibility, quality, and patient satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div key={index} className="group relative flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-6 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = (member.image + '&q=60&w=320'); }}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkBlue/90 via-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <div className="flex gap-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <a href="#" className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Linkedin className="w-5 h-5" /></a>
                     <a href="#" className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Twitter className="w-5 h-5" /></a>
                     <a href="#" className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Mail className="w-5 h-5" /></a>
                   </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-brand-blue font-medium mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
