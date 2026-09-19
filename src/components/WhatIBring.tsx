import React from 'react';
import { Sparkles, Rocket, Layers, Bot, TrendingUp, Check } from 'lucide-react';
import { WHAT_I_BRING } from '../data/portfolioData';

export const WhatIBring: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-teal-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-teal-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="what-i-bring" className="py-10 sm:py-14 md:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Value Proposition
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            What I Bring
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Key qualities, work ethic, and professional mindset that make me an enthusiastic and impactful team member.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WHAT_I_BRING.map((item, idx) => (
            <div
              key={idx}
              id={`value-card-${idx}`}
              className={`p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-neutral-800/60 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Work Ethic</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
