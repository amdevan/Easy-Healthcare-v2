import { Home, BarChart3, BadgeCheck, FileText, LucideIcon } from "lucide-react";
import { getIcon } from "@/utils/iconMapper";
import React from "react";

interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon | React.ElementType; 
  color?: string;
}

interface FeaturesProps {
  title?: string;
  description?: string;
  items?: { title: string; description: string; icon?: string; color?: string }[];
}

export default function Features({ title, description, items }: FeaturesProps) {
  const defaultFeatures: FeatureItem[] = [
    {
      title: "Home Sample Collection",
      description: "Certified phlebotomists collect samples from your doorstep",
      icon: Home,
      color: "text-sky-600",
    },
    {
      title: "Smart Health Trends",
      description: "Track your results over time with visual insights",
      icon: BarChart3,
      color: "text-indigo-600",
    },
    {
      title: "NABL Certified Labs",
      description: "Accurate results from trusted, standardized labs",
      icon: BadgeCheck,
      color: "text-cyan-600",
    },
    {
      title: "Fast Digital Reports",
      description: "Get your reports within 24–48 hours",
      icon: FileText,
      color: "text-slate-600",
    },
  ];

  const displayFeatures = items && items.length > 0 
    ? items.map((item, index) => {
        const IconComponent = getIcon(item.icon);
        const defaultFeature = defaultFeatures[index % defaultFeatures.length];
        return {
            ...item,
            icon: IconComponent || defaultFeature.icon,
            color: item.color || defaultFeature.color
        };
      })
    : defaultFeatures;

  return (
    <section className="relative bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {title || "Why Choose Us"}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {description || "We combine convenience, accuracy, and smart insights to make lab testing effortless and informative."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayFeatures.map((f, idx) => {
            const Icon = f.icon || FileText;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className={`mb-4 inline-flex rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200 ${f.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
