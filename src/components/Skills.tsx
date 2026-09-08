import React from 'react';
import { Terminal, Layout, Wrench, Briefcase, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-teal-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-teal-400" />;
      default:
        return <Terminal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Technical & Professional Skills
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            A balanced mix of programming languages, web development fundamentals, modern developer tools, and team competencies.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div
              key={catIdx}
              id={`skill-category-${catIdx}`}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/50">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    0{catIdx + 1}
                  </span>
                </div>

                {/* Skills list */}
                <div className="space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 hover:border-neutral-700 transition-colors flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                            {skill.name}
                          </h4>
                        </div>
                        {skill.note && (
                          <p className="text-xs text-neutral-400 pl-5.5">
                            {skill.note}
                          </p>
                        )}
                      </div>

                      {skill.level && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400 border border-neutral-700/60 shrink-0">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom pill hint */}
              <div className="pt-4 mt-4 border-t border-neutral-800/50 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>Domain Ready</span>
                <span className="text-neutral-400">{category.skills.length} competencies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
