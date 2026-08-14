import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  GraduationCap, 
  Users, 
  Zap, 
  Briefcase, 
  Rocket, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrowthStep } from '../types';

interface GrowthPathProps {
  steps: GrowthStep[];
  onToggleStep: (stepId: string) => void;
  onNavigateTab: (tab: string) => void;
  progressPercent: number;
}

export const GrowthPath: React.FC<GrowthPathProps> = ({
  steps,
  onToggleStep,
  onNavigateTab,
  progressPercent,
}) => {
  // Fire celebratory confetti when a step is completed
  const handleStepClick = (step: GrowthStep) => {
    onToggleStep(step.id);
    if (!step.completed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const completedCount = steps.filter(s => s.completed).length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. PROGRESS BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> My Personal Equal Access Pathway
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              From Talent to Opportunity
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track your milestones as you turn raw technical interest into verified code projects, mentor relationships, and research applications.
            </p>
          </div>

          {/* Progress Ring / Percentage Box */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-indigo-500/30 flex items-center gap-5 shrink-0 shadow-lg">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-700"
                  strokeWidth="3.5"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-black text-sm text-white">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {completedCount} of {steps.length} Completed
              </div>
              <p className="text-xs text-indigo-300">
                {progressPercent === 100
                  ? "🎉 Complete pathway achieved!"
                  : "Keep taking actions to unlock opportunities"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE FLOW DIAGRAM VISUALIZER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            The GuruSphere Pathway Model
          </h2>
          <p className="text-xs text-slate-500">
            A transparent sequence designed to bypass traditional gatekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { label: "1. Talent", desc: "Skills & Projects", icon: GraduationCap, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
            { label: "2. Mentor", desc: "1:1 Office Hours", icon: Users, color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "3. Guidance", desc: "Code & Architecture", icon: Zap, color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "4. Opportunity", desc: "Scholarships & Research", icon: Briefcase, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "5. Growth", desc: "Accelerated Pathway", icon: Rocket, color: "bg-sky-50 text-sky-700 border-sky-200" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center space-y-2 flex flex-col items-center justify-center ${item.color}`}
              >
                <Icon className="w-6 h-6" />
                <div className="font-bold text-xs">{item.label}</div>
                <div className="text-[10px] opacity-80">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE PATHWAY STEPS CHECKLIST */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Interactive Milestones Checklist</span>
        </h2>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                step.completed
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : step.inProgress
                  ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleStepClick(step)}
                  className="mt-0.5 focus:outline-none"
                  title="Click to toggle completion"
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : step.inProgress ? (
                    <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase font-mono">
                      Step 0{idx + 1}
                    </span>
                    <h3 className={`font-bold text-base ${step.completed ? 'text-emerald-950 line-through decoration-emerald-500' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                    {step.completed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {step.completedDate || '✓ Completed'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigateTab(step.targetTab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                  step.completed
                    ? 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                }`}
              >
                <span>{step.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
