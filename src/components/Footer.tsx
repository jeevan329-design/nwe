import React from 'react';
import { Sparkles, Heart, ShieldAlert, GraduationCap, Github } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white">GuruSphere</span>
            </div>

            <p className="text-sm font-medium text-slate-300">
              Tagline: "Talent shouldn't depend on connections."
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              GuruSphere is a conceptual ed-tech platform designed to reduce the opportunity gap for talented students without elite institutional or warm personal networks.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform Pathways
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigateTab('growth')} className="hover:text-indigo-400 transition-colors">
                  My Growth Pathway
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('mentors')} className="hover:text-indigo-400 transition-colors">
                  Mentor Recommendation Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('opportunities')} className="hover:text-indigo-400 transition-colors">
                  Personalized Opportunity Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('profile')} className="hover:text-indigo-400 transition-colors">
                  Student Skills & Projects Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Demo Disclaimer Box */}
          <div className="md:col-span-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <ShieldAlert className="w-4 h-4" /> Educational Demo Prototype Notice
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              This prototype is built to showcase equal access design principles. All mentors, opportunities, and partner institutions listed on this site are fictional demo simulations. No real university affiliations are implied.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} GuruSphere. Designed for Equal Opportunity Access.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for non-traditional student talent worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
