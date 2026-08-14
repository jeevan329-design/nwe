import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export const DemoDisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium text-[11px]">
            <Sparkles className="w-3 h-3" /> DEMO PROTOTYPE
          </span>
          <span>
            GuruSphere is a conceptual platform designed to equalize opportunity access. All profiles & opportunities are simulated.
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden md:inline">• Talent shouldn't depend on connections</span>
          <a 
            href="#opportunity-gap" 
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 flex items-center gap-1"
          >
            <Info className="w-3 h-3" /> Learn About The Gap
          </a>
        </div>
      </div>
    </div>
  );
};
