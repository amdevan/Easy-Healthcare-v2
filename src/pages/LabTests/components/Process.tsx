import { ListChecks, CalendarClock, FlaskConical, FileText } from "lucide-react";

export default function Process() {
  const steps = [
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

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600">
            Simple, transparent steps from booking to results.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li key={step.title} className="relative">
              <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${step.tone} p-3 text-white`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-500">Step {idx + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
