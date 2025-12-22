import React from 'react';
import Button from '@/components/ui/Button';
import { resolveSrc } from '@/utils/url';
import { getIcon } from '@/utils/iconMapper';
import { ServiceItem } from './types';

interface ServiceGridProps {
  items: ServiceItem[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ items }) => {
  const renderIcon = (iconName: string, className?: string) => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="group relative overflow-hidden rounded-none border bg-white p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-blue"
          >
            {/* Decorative elements */}
            <div
              className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${item.decor} to-transparent opacity-0 group-hover:opacity-100 blur-xl transition`}
              aria-hidden="true"
            />
            <div
              className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${item.decor} to-transparent opacity-0 group-hover:opacity-100 transition`}
              aria-hidden="true"
            />
            {/* Icon */}
            <div className={`h-9 w-9 rounded-md ${item.iconBg} ring-1 ring-black/5 flex items-center justify-center mb-3`}>
                {item.iconImage ? (
                  <img src={resolveSrc(item.iconImage)} alt={item.title} className="h-5 w-5 object-contain" />
                ) : item.iconName ? (
                  renderIcon(item.iconName, "h-5 w-5 text-brand-blue")
                ) : (
                  item.icon
                )}
            </div>
            {/* Content */}
            <h2 className="text-base font-bold text-brand-gray-900">{item.title}</h2>
            <p className="mt-1 text-sm text-brand-gray-600">{item.desc}</p>
            {/* CTA */}
            <div className="mt-4">
              <Button
                to={item.href}
                size="sm"
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-blue-50"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;
