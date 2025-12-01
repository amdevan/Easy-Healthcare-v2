import React from 'react';
import { HealthPackage } from '../types';
import { 
  Activity, Briefcase, Heart, User, Clock, 
  Users, Baby, Shield, Smile, Smartphone, ArrowRight 
} from 'lucide-react';

interface PackageCardProps {
  data: HealthPackage;
  onClick: (pkg: HealthPackage) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  activity: <Activity className="w-7 h-7" />,
  briefcase: <Briefcase className="w-7 h-7" />,
  heart: <Heart className="w-7 h-7" />,
  user: <User className="w-7 h-7" />,
  clock: <Clock className="w-7 h-7" />,
  users: <Users className="w-7 h-7" />,
  baby: <Baby className="w-7 h-7" />,
  shield: <Shield className="w-7 h-7" />,
  smile: <Smile className="w-7 h-7" />,
  smartphone: <Smartphone className="w-7 h-7" />
};

// Define colorful themes to rotate through based on ID
const themes = [
  { // Theme 1: Rose
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    hoverBorder: 'group-hover:border-rose-300',
    iconBg: 'bg-white',
    iconColor: 'text-rose-600',
    gradient: 'from-rose-400 to-pink-500',
    text: 'text-rose-950',
    subText: 'text-rose-700/70',
    badge: 'bg-white text-rose-700 border-rose-100',
    shadow: 'shadow-rose-200/60 hover:shadow-rose-300/60'
  },
  { // Theme 2: Indigo
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    hoverBorder: 'group-hover:border-indigo-300',
    iconBg: 'bg-white',
    iconColor: 'text-indigo-600',
    gradient: 'from-indigo-400 to-blue-500',
    text: 'text-indigo-950',
    subText: 'text-indigo-700/70',
    badge: 'bg-white text-indigo-700 border-indigo-100',
    shadow: 'shadow-indigo-200/60 hover:shadow-indigo-300/60'
  },
  { // Theme 3: Amber
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hoverBorder: 'group-hover:border-amber-300',
    iconBg: 'bg-white',
    iconColor: 'text-amber-600',
    gradient: 'from-amber-400 to-orange-500',
    text: 'text-amber-950',
    subText: 'text-amber-800/70',
    badge: 'bg-white text-amber-700 border-amber-100',
    shadow: 'shadow-amber-200/60 hover:shadow-amber-300/60'
  },
  { // Theme 4: Teal
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    hoverBorder: 'group-hover:border-teal-300',
    iconBg: 'bg-white',
    iconColor: 'text-teal-600',
    gradient: 'from-teal-400 to-emerald-500',
    text: 'text-teal-950',
    subText: 'text-teal-700/70',
    badge: 'bg-white text-teal-700 border-teal-100',
    shadow: 'shadow-teal-200/60 hover:shadow-teal-300/60'
  },
  { // Theme 5: Violet
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    hoverBorder: 'group-hover:border-violet-300',
    iconBg: 'bg-white',
    iconColor: 'text-violet-600',
    gradient: 'from-violet-400 to-purple-500',
    text: 'text-violet-950',
    subText: 'text-violet-700/70',
    badge: 'bg-white text-violet-700 border-violet-100',
    shadow: 'shadow-violet-200/60 hover:shadow-violet-300/60'
  },
  { // Theme 6: Cyan
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    hoverBorder: 'group-hover:border-cyan-300',
    iconBg: 'bg-white',
    iconColor: 'text-cyan-600',
    gradient: 'from-cyan-400 to-sky-500',
    text: 'text-cyan-950',
    subText: 'text-cyan-700/70',
    badge: 'bg-white text-cyan-700 border-cyan-100',
    shadow: 'shadow-cyan-200/60 hover:shadow-cyan-300/60'
  }
];

const PackageCard: React.FC<PackageCardProps> = ({ data, onClick }) => {
  const themeIndex = (data.id || 0) % themes.length;
  const theme = themes[themeIndex];

  return (
    <div 
      onClick={() => onClick(data)}
      className={`
        group relative h-full rounded-[2.5rem] p-8 
        ${theme.bg}
        border-[1px] ${theme.border} ${theme.hoverBorder}
        shadow-xl ${theme.shadow}
        hover:-translate-y-2 hover:scale-[1.02]
        transition-all duration-500 ease-out cursor-pointer overflow-hidden
        flex flex-col
      `}
    >
      {/* Decorative Gradient Blobs - Increased Opacity for more color */}
      <div className={`absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.08] group-hover:opacity-15 blur-3xl transition-opacity duration-500`} />
      <div className={`absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr ${theme.gradient} opacity-[0.08] group-hover:opacity-15 blur-3xl transition-opacity duration-500`} />

      {/* Header: Icon & Price */}
      <div className="relative z-10 flex justify-between items-start mb-8">
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center 
          ${theme.iconBg} ${theme.iconColor} 
          shadow-sm border border-white/50
          group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out
        `}>
          {iconMap[data.iconName]}
        </div>
        {data.priceEstimate && (
           <div className={`
             px-4 py-2 rounded-full text-sm font-bold tracking-tight shadow-sm border
             ${theme.badge}
           `}>
             {data.priceEstimate}
           </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className={`text-2xl font-bold mb-3 ${theme.text} leading-tight group-hover:tracking-wide transition-all`}>
          {data.title}
        </h3>
        <p className={`${theme.subText} text-sm leading-relaxed mb-6 line-clamp-3 font-medium`}>
          {data.purpose}
        </p>
      </div>

      {/* Footer / CTA */}
      <div className={`relative z-10 pt-6 mt-auto border-t border-white/40 flex items-center justify-between`}>
         <div className="flex flex-col">
            <span className={`text-[10px] font-bold ${theme.subText} uppercase tracking-widest mb-1 opacity-80`}>Target Audience</span>
            <span className={`text-xs font-bold ${theme.text} truncate max-w-[140px]`}>{data.target}</span>
         </div>

         <button className={`
           w-12 h-12 rounded-full flex items-center justify-center
           bg-white ${theme.iconColor}
           group-hover:bg-gradient-to-r ${theme.gradient} group-hover:text-white
           transition-all duration-500 shadow-md group-hover:shadow-lg
         `}>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
         </button>
      </div>
    </div>
  );
};

export default PackageCard;