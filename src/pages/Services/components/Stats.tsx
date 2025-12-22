import React from 'react';
import { StatsItem } from './types';

interface StatsProps {
  items: StatsItem[];
}

const Stats: React.FC<StatsProps> = ({ items }) => {
  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((stat, idx) => (
          <div key={idx}>
            <div className="text-2xl md:text-3xl font-extrabold text-brand-gray-900">{stat.value}</div>
            <div className="mt-1 text-xs md:text-sm text-brand-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
