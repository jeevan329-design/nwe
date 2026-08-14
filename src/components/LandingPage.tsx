import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Rocket, 
  Target, 
  ChevronRight,
  BookOpen,
  Award,
  Zap,
  Star
} from 'lucide-react';
import { OpportunityGapCalculator } from './OpportunityGapCalculator';
import { GAP_STATISTICS } from '../data/initialData';
import { Mentor, Opportunity, StudentProfile } from '../types';
import { calculateMatchScore } from '../lib/storage';

interface LandingPageProps {
  onExploreStudent: () => void;
  onOpenMentorModal: () => void;
  mentors: Mentor[];
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  onRequestMentorship: (mentor: Mentor) => void;
  onViewOpportunity: (opp: Opportunity) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreStudent,
  onOpenMentorModal,
  mentors,
  opportunities,
  studentProfile,
  onRequestMentorship,
  onViewOpportunity,
}) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-16">
        
        {/* Hero Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-amber-500/20 border border-indigo-500/30 text-indigo-200 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Equalizing Access for Tomorrow's Innovators</span>
          </div>

          {/* Main Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Talent shouldn't depend on{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
              connections.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl font-normal text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connect with verified mentors, discover opportunities, and turn your potential into a pathway.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreStudent}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 shadow-xl shadow-indigo-900/40 hover:shadow-indigo-800/60 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Explore as Student</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenMentorModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <Users className="w-5 h-5 text-amber-400" />
              <span>Become a Mentor</span>
            </button>
          </div>

          {/* Core Flow Summary Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {[
              { label: "1. Talent", desc: "Skills & Projects", icon: GraduationCap, color: "text-indigo-400" },
              { label: "2. Mentor", desc: "Verified Guidance", icon: Users, color: "text-purple-400" },
              { label: "3. Guidance", desc: "Code Reviews & Prep", icon: Zap, color: "text-amber-400" },
              { label: "4. Opportunity", desc: "Merit Fellowships", icon: Briefcase, color: "text-emerald-400" },
              { label: "5. Growth", desc: "Accelerated Career", icon: Rocket, color: "text-sky-400" },
            ].map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 flex flex-col items-center">
                  <StepIcon className={`w-5 h-5 mb-1 ${step.color}`} />
                  <div className="text-xs font-bold text-white">{step.label}</div>
                  <div className="text-[10px] text-slate-400">{step.desc}</div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. EXPLANATION OF THE OPPORTUNITY GAP & STATS */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Why GuruSphere Exists
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Bridging the Invisible Network Divide
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Millions of ambitious students possess world-class technical talent, but lack the personal introductions, elite alumni networks, or zip code leverage to access life-changing research grants and mentorship.
          </p>
        </div>

        {/* Gap Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GAP_STATISTICS.map((item, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full pointer-events-none group-hover:bg-indigo-100 transition-colors" />
              <div className="text-4xl font-black text-indigo-600 mb-2">{item.stat}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.label}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Simulator */}
        <OpportunityGapCalculator />
      </section>

      {/* 3. CORE PLATFORM FLOW VISUALIZER */}
      <section className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-indigo-800 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">
            The Merit-Based Pathway Flow
          </h2>
          <p className="text-indigo-200 text-sm">
            How GuruSphere replaces arbitrary warm introductions with transparent skill verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/70 p-6 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl border border-indigo-500/30">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Build Skill Profile</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Showcase your code repositories, robotics projects, and key subjects rather than just school rank or prestige.
            </p>
          </div>

          <div className="bg-slate-950/70 p-6 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xl border border-purple-500/30">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Match with Verified Mentors</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our rule-based algorithm identifies mentors with matching research topics (e.g., OpenCV, ROS2) for 1:1 office hours.
            </p>
          </div>

          <div className="bg-slate-950/70 p-6 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Unlock Merit Opportunities</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Receive mentor endorsements, refine fellowship essays, and directly apply for research programs and grants.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MENTORS SPOTLIGHT */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
              Verified Mentorship
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Learn From Industry & Academic Leaders
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top research scientists and engineers offering 1:1 code reviews and research guidance.
            </p>
          </div>
          <button
            onClick={onExploreStudent}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>View All Mentors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mentor Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.slice(0, 3).map((mentor) => {
            const matchScore = calculateMatchScore(studentProfile, mentor.skills);
            return (
              <div 
                key={mentor.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Mentor
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs border border-indigo-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {matchScore}% Match
                  </span>
                </div>

                {/* Profile header */}
                <div className="flex items-start gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm ring-2 ring-slate-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-medium">{mentor.title}</p>
                    <p className="text-[11px] text-slate-500">{mentor.organization}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skills.slice(0, 3).map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                      +{mentor.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Request Button */}
                <button
                  onClick={() => onRequestMentorship(mentor)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Request Mentorship</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED DEMO OPPORTUNITIES SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
              Curated Opportunities
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Scholarships, Fellowships & Research Cohorts
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Handpicked positions designed for merit-based student access.
            </p>
          </div>
          <button
            onClick={onExploreStudent}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>Browse All Opportunities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.slice(0, 3).map((opp) => (
            <div
              key={opp.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {opp.type}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-600">
                    {opp.deadline}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base line-clamp-2">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {opp.organization}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {opp.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  {opp.stipend}
                </div>

                <button
                  onClick={() => onViewOpportunity(opp)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>View & Apply (DEMO)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EDUCATIONAL PROTOTYPE SUMMARY & FAQ */}
      <section className="bg-slate-100 rounded-3xl p-8 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>About GuruSphere Educational Prototype</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          GuruSphere is built as an educational demonstration to illustrate how open skill verification and non-privileged mentorship matching can dismantle systemic opportunity gaps. This software demo provides interactive profile editing, rule-based mentor recommendations, growth path tracking, and opportunity applications saved in local browser storage.
        </p>
      </section>

    </div>
  );
};
