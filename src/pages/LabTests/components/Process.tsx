import { ListChecks, CalendarClock, FlaskConical, FileText, LucideIcon } from "lucide-react";
import { getIcon } from "@/utils/iconMapper";
import React from "react";

interface ProcessStep {
  title: string;
  description: string;
  icon?: LucideIcon | React.ElementType;
  tone?: string;
}

interface ProcessProps {
  title?: string;
  description?: string;
  steps?: { title: string; description: string; icon?: string; tone?: string }[];
}

export default function Process({ title, description, steps }: ProcessProps) {
  const defaultSteps: ProcessStep[] = [
    {
      title: "Choose Test",
      description: "Select from a catalog of popular and specific tests",
      icon: ListChecks,
      tone: "from-sky-400 to-sky-600",
    },
    {
      title: "Book Slot",
      description: "Pick a convenient home collection time",
      icon: CalendarClock,
      tone: "from-cyan-400 to-cyan-600",
    },
    {
      title: "Sample Collection",
      description: "A trained professional collects samples at your location",
      icon: FlaskConical,
      tone: "from-indigo-400 to-indigo-600",
    },
    {
      title: "Digital Report",
      description: "Receive verified reports with smart insights",
      icon: FileText,
      tone: "from-slate-400 to-slate-600",
    },
  ];

  const displaySteps = steps && steps.length > 0
    ? steps.map((step, idx) => {
        const IconComponent = getIcon(step.icon);
        const defaultStep = defaultSteps[idx % defaultSteps.length];
        return {
            ...step,
            icon: IconComponent || defaultStep.icon,
            tone: step.tone || defaultStep.tone,
        };
      })
    : defaultSteps;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {title || "How It Works"}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {description || "Simple, transparent steps from booking to results."}
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displaySteps.map((step, idx) => {
            const Icon = step.icon || FileText;
            return (
              <li key={idx} className="relative">
                <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${step.tone} p-3 text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-slate-500">Step {idx + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
