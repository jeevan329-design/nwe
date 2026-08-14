import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';

export const OpportunityGapCalculator: React.FC = () => {
  const [hasWarmConnections, setHasWarmConnections] = useState<boolean>(false);
  const [attendsEliteSchool, setAttendsEliteSchool] = useState<boolean>(false);
  const [hasVerifiedProjects, setHasVerifiedProjects] = useState<boolean>(true);

  // Calculate traditional access rate vs. GuruSphere access rate
  const traditionalScore = (hasWarmConnections ? 50 : 10) + (attendsEliteSchool ? 40 : 10);
  const guruSphereScore = 85 + (hasVerifiedProjects ? 10 : 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>INTERACTIVE GAP SIMULATOR</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          How the Opportunity Gap Impacts Talent Access
        </h3>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
          In traditional academic and professional ecosystems, up to <strong className="text-amber-300">70% of research, scholarships, and fellowships</strong> flow through informal networks. Compare traditional access against GuruSphere's merit-based matching:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Student Background Variables
            </h4>

            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="pr-2">
                <div className="text-sm font-semibold text-slate-200">Personal Warm Connections</div>
                <div className="text-xs text-slate-400">Family/alumni contacts in industry</div>
              </div>
              <button
                onClick={() => setHasWarmConnections(!hasWarmConnections)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  hasWarmConnections ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hasWarmConnections ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="pr-2">
                <div className="text-sm font-semibold text-slate-200">Elite Institution Brand</div>
                <div className="text-xs text-slate-400">On-campus corporate recruiting hubs</div>
              </div>
              <button
                onClick={() => setAttendsEliteSchool(!attendsEliteSchool)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  attendsEliteSchool ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    attendsEliteSchool ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="pr-2">
                <div className="text-sm font-semibold text-slate-200">Verified Technical Projects</div>
                <div className="text-xs text-slate-400">Demonstrated code & robotics skills</div>
              </div>
              <button
                onClick={() => setHasVerifiedProjects(!hasVerifiedProjects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  hasVerifiedProjects ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hasVerifiedProjects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Traditional Network Access Meter */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-rose-950/40 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-bold text-slate-200">Traditional Connection Access Rate</span>
                </div>
                <span className="text-xl font-extrabold text-rose-400">{traditionalScore}%</span>
              </div>
              
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${traditionalScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-400">
                {!hasWarmConnections && !attendsEliteSchool
                  ? "Without warm contacts or an elite school name, qualified students miss out on ~80% of opportunities."
                  : "Access depends heavily on privilege, university brand, and who you know."}
              </p>
            </div>

            {/* GuruSphere Merit Pathway Meter */}
            <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 p-5 rounded-2xl border border-indigo-500/30 relative shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">GuruSphere Skill & Mentor Match Rate</span>
                </div>
                <span className="text-2xl font-black text-emerald-400">{guruSphereScore}%</span>
              </div>

              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${guruSphereScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-indigo-200">
                <span>Verified skills + 1:1 mentor code reviews level the playing field.</span>
                <span className="font-bold text-emerald-300">+{guruSphereScore - traditionalScore}% Equalized Boost</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
