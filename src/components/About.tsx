import React from 'react';
import { GraduationCap, CodeXml, Cpu, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { PERSONAL_INFO, HIGHLIGHT_CARDS } from '../data/portfolioData';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'CodeXml':
        return <CodeXml className="w-5 h-5 text-teal-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Introduction
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            A snapshot of my academic journey, core engineering passions, and continuous growth trajectory.
          </p>
        </div>

        {/* Narrative & Quick Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main About text block */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-4">
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
              {PERSONAL_INFO.bio}
            </p>

            <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Affiliated with AKTU (3rd Semester)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Specializing in CSE with AI-ML focus</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hands-on Python desktop & web apps</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Internship-ready software mindset</span>
              </div>
            </div>
          </div>

          {/* Academic Profile Snippet Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Current Status</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-500 block">Institution</span>
                <span className="text-neutral-200 font-medium">{PERSONAL_INFO.university}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Degree Program</span>
                <span className="text-neutral-200 font-medium">{PERSONAL_INFO.degree}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Current Semester</span>
                <span className="text-emerald-400 font-medium font-mono">{PERSONAL_INFO.currentSemester}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Career Direction</span>
                <span className="text-neutral-200 font-medium">Software Development & AI Engineering</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHT_CARDS.map((card, index) => (
            <div
              key={index}
              id={`highlight-card-${index}`}
              className="p-6 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getIcon(card.iconName)}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mb-1 uppercase tracking-wider">
                  {card.subtitle}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Domain Focus</span>
                <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
