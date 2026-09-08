import React from 'react';
import { GraduationCap, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 sm:py-28 relative bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Academic Background
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Education
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Formal technical education, curriculum focus, and foundational engineering milestones.
          </p>
        </div>

        {/* Education Card / Timeline */}
        <div className="max-w-4xl mx-auto">
          <div 
            id="education-timeline-card"
            className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Top Badge Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                    Undergraduate Program
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {EDUCATION_DATA.degree}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {EDUCATION_DATA.currentSemester}
                </span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
                  {EDUCATION_DATA.period}
                </span>
              </div>
            </div>

            {/* University & Specialization */}
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-base font-semibold text-emerald-300">
                  Specialization in Artificial Intelligence & Machine Learning (AI-ML)
                </h4>
                <p className="text-sm font-medium text-neutral-300 mt-1">
                  {EDUCATION_DATA.institution}
                </p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {EDUCATION_DATA.description}
                </p>
              </div>

              {/* Coursework Matrix */}
              <div className="pt-4 border-t border-neutral-800/60">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Key Academic Coursework & Core Modules
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {EDUCATION_DATA.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline indicator banner */}
              <div className="pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400 bg-neutral-950/40 p-3.5 rounded-xl border border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Timeline: Year 2 of 4 (Continuous Academic Progression)</span>
                </div>
                <span className="font-mono text-neutral-500">Degree Conferred: 2028</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
