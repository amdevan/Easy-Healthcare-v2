import { Star, Clock, Shield, Truck } from "lucide-react";
import { getIcon } from "@/utils/iconMapper";

interface HeroStat {
  label: string;
  value: string;
  icon?: string;
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  stats?: HeroStat[];
}

export default function Hero({ title, subtitle, image, stats }: HeroProps) {
  const defaultStats: HeroStat[] = [
    { label: "Certified", value: "NABL Labs", icon: "shield" },
    { label: "Collection", value: "Home Pickup", icon: "truck" },
    { label: "Reports", value: "24-48 Hours", icon: "clock" },
    { label: "Rating", value: "4.8 / 5", icon: "star" }
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  const renderIcon = (iconName?: string) => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className="mr-2 h-5 w-5 text-sky-600" /> : null;
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-indigo-50">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200 to-cyan-200 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200 to-sky-200 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text content */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm shadow-sm ring-1 ring-sky-100">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <Star className="h-3.5 w-3.5" />
              </span>
              AI Symptom Checker 2.0
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {title || "Lab Testing, Reimagined"}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {subtitle || "Book lab tests from trusted NABL-certified labs, get home sample collection, and receive digital reports—fast, secure, and hassle-free."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#test-catalog"
                className="inline-flex items-center rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Explore Tests
              </a>
              <a
                href="#assistant"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Ask AI Assistant
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {displayStats.map((stat, index) => {
                const Icon = stat.icon ? (getIcon(stat.icon) || Shield) : Shield;
                return (
                  <div key={index} className="rounded-xl bg-white/70 p-4 text-center shadow-sm ring-1 ring-slate-200">
                    <dt className="flex items-center justify-center text-slate-500">
                      <Icon className="mr-2 h-5 w-5 text-sky-600" /> {stat.label}
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Right: visual/card */}
          <div className="relative">
            {image ? (
              <div className="relative mx-auto w-full max-w-md">
                 <img 
                   src={image} 
                   alt={title || "Lab Tests"} 
                   className="rounded-2xl shadow-xl ring-1 ring-slate-200 object-cover w-full h-auto"
                 />
              </div>
            ) : (
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Next Pickup</p>
                    <p className="text-xl font-semibold text-slate-900">Tomorrow, 9:30 AM</p>
                  </div>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                    Scheduled
                  </span>
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">CBC + Thyroid Panel</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">Tracking ID: #EH-7543</p>
                    </div>
                    <Clock className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3 text-center ring-1 ring-slate-200">
                    <p className="text-xs text-slate-500">Pickup</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Booked</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 text-center ring-1 ring-slate-200">
                    <p className="text-xs text-slate-500">Lab</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Processing</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 text-center ring-1 ring-slate-200">
                    <p className="text-xs text-slate-500">Report</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Soon</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 rounded-xl bg-white/70 px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
                <span className="inline-flex items-center text-slate-700">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" /> 4.8 rating
                </span>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

