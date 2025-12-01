import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check, X as XIcon, Zap, Star, Shield, ArrowRight } from 'lucide-react';

const Pricing: React.FC = () => {
  const getTheme = (id: string) => {
    switch (id) {
      case 'basic':
        return {
          border: 'border-sky-100 hover:border-sky-300',
          bg: 'bg-white',
          badgeBg: 'bg-sky-50',
          badgeText: 'text-sky-700',
          priceText: 'text-slate-900',
          button: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-600 hover:text-white hover:border-sky-600',
          iconBg: 'bg-sky-100',
          iconColor: 'text-sky-600',
          shadow: 'shadow-xl shadow-sky-200/80 hover:shadow-2xl hover:shadow-sky-500/60',
          ring: 'group-hover:ring-2 group-hover:ring-sky-400 group-hover:ring-offset-2',
        };
      case 'plus':
        return {
          border: 'border-teal-200 hover:border-teal-400',
          bg: 'bg-white',
          badgeBg: 'bg-teal-50',
          badgeText: 'text-teal-700',
          priceText: 'text-slate-900',
          button: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] hover:from-teal-400 hover:to-emerald-400',
          iconBg: 'bg-teal-100',
          iconColor: 'text-teal-600',
          shadow: 'shadow-2xl shadow-teal-200/80 hover:shadow-2xl hover:shadow-teal-500/60',
          ring: 'ring-1 ring-teal-500 ring-offset-0',
        };
      case 'premium':
        return {
          border: 'border-rose-100 hover:border-rose-300',
          bg: 'bg-white',
          badgeBg: 'bg-rose-50',
          badgeText: 'text-rose-700',
          priceText: 'text-slate-900',
          button: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600',
          iconBg: 'bg-rose-100',
          iconColor: 'text-rose-600',
          shadow: 'shadow-xl shadow-rose-200/80 hover:shadow-2xl hover:shadow-rose-500/60',
          ring: 'group-hover:ring-2 group-hover:ring-rose-400 group-hover:ring-offset-2',
        };
      default:
        return {
          border: 'border-slate-200',
          bg: 'bg-white',
          badgeBg: 'bg-slate-100',
          badgeText: 'text-slate-700',
          priceText: 'text-slate-900',
          button: 'bg-slate-50 text-slate-900',
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          shadow: '',
          ring: '',
        };
    }
  };

  return (
    <div id="pricing" className="bg-slate-50 py-24 scroll-mt-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-300/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow animate-delay-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h2 className="text-teal-600 font-bold tracking-wide uppercase text-sm mb-3">Simple, Transparent Pricing</h2>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6 tracking-tight">
            Choose the Perfect Care Plan
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Invest in your parents' health and your peace of mind. No hidden fees, just comprehensive care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const theme = getTheme(plan.id);
            const isHighlighted = plan.highlight;

            return (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col rounded-[2rem] transition-all duration-500 group
                  ${isHighlighted ? 'lg:-mt-8 lg:mb-8 z-10 border-2 scale-100 lg:scale-105' : 'border hover:-translate-y-4'}
                  ${theme.border} ${theme.bg} ${theme.shadow}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {isHighlighted && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 w-full text-center">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-teal-500/40 uppercase tracking-wider animate-bounce">
                      <Zap className="w-4 h-4 fill-current" /> Most Popular
                    </span>
                  </div>
                )}

                <div className={`p-8 ${isHighlighted ? 'pt-12' : ''} flex-1 flex flex-col h-full`}>
                  <div className="flex justify-between items-center mb-6">
                    <div className={`inline-block px-4 py-1.5 rounded-xl text-sm font-bold tracking-wide uppercase ${theme.badgeBg} ${theme.badgeText}`}>
                      {plan.name.replace('EasyCare 365 ', '')}
                    </div>
                    <div className={`p-2 rounded-full ${theme.iconBg} transition-transform duration-500 group-hover:rotate-12`}>
                      {plan.id === 'premium' && <Star className={`w-6 h-6 ${theme.iconColor} fill-current opacity-50`} />}
                      {plan.id === 'basic' && <Shield className={`w-6 h-6 ${theme.iconColor} fill-current opacity-50`} />}
                      {plan.id === 'plus' && <Zap className={`w-6 h-6 ${theme.iconColor} fill-current opacity-50`} />}
                    </div>
                  </div>

                  <div className="flex items-baseline mb-2">
                    <span className={`text-5xl font-extrabold tracking-tighter ${theme.priceText}`}>
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-lg font-medium text-slate-400">{plan.period}</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-8">{plan.description}</p>

                  <div className={`border-t border-dashed ${plan.id === 'plus' ? 'border-teal-200' : 'border-slate-100'} mb-8`}></div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 transition-all duration-300 ${feature.included ? theme.iconBg : 'bg-slate-50'}`}>
                          {feature.included ? (
                            <Check className={`h-3.5 w-3.5 ${theme.iconColor}`} strokeWidth={3} />
                          ) : (
                            <XIcon className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
                          )}
                        </div>
                        <p className={`ml-3 text-sm font-medium transition-colors duration-300 ${feature.included ? 'text-slate-700' : 'text-slate-400 line-through opacity-60'}`}>
                          {feature.text}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                      w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-bold border
                      transition-all duration-300 transform active:scale-95 group/btn
                      ${theme.button}
                    `}
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center animate-fade-in-up animate-delay-300">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="bg-teal-50 p-3 rounded-full text-teal-600">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900">Need a custom family package?</h3>
              <p className="text-slate-500 text-sm">We offer special discounts for multiple family members.</p>
            </div>
            <a href="#" className="md:ml-4 px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;