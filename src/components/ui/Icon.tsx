import React from 'react';

// Import SVGs as URLs (Vite will handle asset URLs)
import toothIcon from '@/assets/icons/tooth.svg';
import pregnancyIcon from '@/assets/icons/pregnancy.svg';
import saladIcon from '@/assets/icons/salad.svg';
import exerciseIcon from '@/assets/icons/exercise.svg';
import brainIcon from '@/assets/icons/brain.svg';
import acneIcon from '@/assets/icons/acne.svg';
import bedIcon from '@/assets/icons/bed.svg';
import feverIcon from '@/assets/icons/fever.svg';
import babyIcon from '@/assets/icons/baby.svg';
import depressionIcon from '@/assets/icons/depression.svg';
import hospitalIcon from '@/assets/icons/hospital.svg';

const ICON_MAP: Record<string, string> = {
  dentist: toothIcon,
  gynecology: pregnancyIcon,
  pregnancy: pregnancyIcon,
  nutrition: saladIcon,
  physiotherapy: exerciseIcon,
  neurology: brainIcon,
  acne: acneIcon,
  bed: bedIcon,
  fever: feverIcon,
  baby: babyIcon,
  depression: depressionIcon,
  hospital: hospitalIcon,
};

type IconProps = {
  name: keyof typeof ICON_MAP | string;
  alt?: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, alt, className }) => {
  const isUrl = name.startsWith('http') || name.startsWith('/') || name.startsWith('data:');
  const src = isUrl ? name : (ICON_MAP[name] ?? ICON_MAP['hospital']);
  return (
    <img src={src} alt={alt || String(name)} className={className} />
  );
};

export default Icon;