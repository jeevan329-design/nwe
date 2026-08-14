import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  CheckCircle, 
  DollarSign, 
  GraduationCap, 
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Opportunity, OpportunityType, StudentProfile, OpportunityApplication } from '../types';
import { calculateMatchScore, toggleSaveOpportunity, saveApplication } from '../lib/storage';

interface OpportunityHubProps {
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  savedOppIds: string[];
  onSavedOppIdsChange: (ids: string[]) => void;
  applications: OpportunityApplication[];
  onApplicationSubmitted: (app: OpportunityApplication) => void;
}

export const OpportunityHub: React.FC<OpportunityHubProps> = ({
  opportunities,
  studentProfile,
  savedOppIds,
  onSavedOppIdsChange,
  applications,
  onApplicationSubmitted,
}) => {
  const [activeType, setActiveType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Application Modal state
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [statement, setStatement] = useState<string>(
    "I am eager to contribute to this research cohort with my background in ROS2, OpenCV obstacle detection, and Python robotics pipelines."
  );
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);

  const opportunityTypes: (OpportunityType | 'All' | 'Saved')[] = [
    'All',
    'Saved',
    'Research Program',
    'Scholarship',
    'Competition',
    'Guided Project',
    'Mentorship Cohort',
    'Internship',
  ];

  // Bookmark toggle
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleSaveOpportunity(id);
    onSavedOppIdsChange(updated);
  };

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.matchingSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      activeType === 'All'
        ? true
        : activeType === 'Saved'
        ? savedOppIds.includes(opp.id)
        : opp.type === activeType;

    const matchesDifficulty =
      selectedDifficulty === 'All' ? true : opp.difficulty === selectedDifficulty;

    return matchesSearch && matchesType && matchesDifficulty;
  });

  // Submit Application
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    const newApp: OpportunityApplication = {
      id: `app-${Date.now()}`,
      opportunityId: selectedOpp.id,
      opportunityTitle: selectedOpp.title,
      organization: selectedOpp.organization,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
      statement: statement.trim(),
    };

    saveApplication(newApp);
    onApplicationSubmitted(newApp);
    setApplicationSuccess(true);

    setTimeout(() => {
      setApplicationSuccess(false);
      setSelectedOpp(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-900/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Merit-Based Opportunity Discovery
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Personalized Opportunity Hub
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Discover research positions, scholarships, and guided cohorts matched to your skill profile. All listings below are <strong className="text-amber-300 font-semibold">clearly labeled DEMO opportunities</strong> for testing the application flow.
          </p>
        </div>
      </div>

      {/* Submitted Applications Notice if active */}
      {applications.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between text-xs text-indigo-900">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-600" />
            <span>
              You have submitted <strong className="font-bold">{applications.length} application(s)</strong>!
            </span>
          </div>
          <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-[11px]">
            Latest: {applications[0].opportunityTitle} ({applications[0].status})
          </span>
        </div>
      )}

      {/* 2. CATEGORY TABS & SEARCH BAR */}
      <div className="space-y-4">
        
        {/* Search & Difficulty Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grants, programs, ROS2, OpenCV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500">Difficulty Level:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {opportunityTypes.map((type, idx) => {
            const isActive = activeType === type;
            return (
              <button
                key={idx}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type === 'Saved' ? `Bookmarks (${savedOppIds.length})` : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. OPPORTUNITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => {
          const isSaved = savedOppIds.includes(opp.id);
          const hasApplied = applications.some((a) => a.opportunityId === opp.id);
          const matchScore = calculateMatchScore(studentProfile, opp.matchingSkills);

          return (
            <div
              key={opp.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
            >
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                      {opp.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                      DEMO
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleToggleSave(opp.id, e)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"
                    title={isSaved ? 'Remove Bookmark' : 'Save Opportunity'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mb-3">
                  {opp.organization}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {opp.description}
                </p>

                {/* Skills requirements */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Skills Match ({matchScore}% Match)
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {opp.matchingSkills.map((skill, sIdx) => {
                      const studentHasSkill = studentProfile.skills.some(
                        (s) => s.name.toLowerCase() === skill.toLowerCase()
                      );
                      return (
                        <span
                          key={sIdx}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            studentHasSkill
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {skill} {studentHasSkill && '✓'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {opp.stipend}
                  </span>
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" /> {opp.deadline}
                  </span>
                </div>

                {hasApplied ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-indigo-200"
                  >
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    <span>Application Submitted (Under Review)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOpp(opp);
                      setApplicationSuccess(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Opportunity (DEMO)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. APPLICATION MODAL */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 border border-slate-200 animate-in zoom-in-95">
            
            {applicationSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your application has been logged in your local growth progress pathway. Step 6 ("Apply for Opportunity") is now marked as complete!
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                      {selectedOpp.type}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      DEMO APPLICATION
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedOpp.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {selectedOpp.organization} • {selectedOpp.location}
                  </p>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">Eligibility & Support:</div>
                    <div className="text-slate-600">{selectedOpp.eligibility}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Statement of Interest & Skill Alignment
                    </label>
                    <textarea
                      rows={4}
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      required
                    />
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Demo Prototype Notice: This application is stored locally to demonstrate equal access workflow. No real application is transmitted to external institutions.
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOpp(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application (DEMO)</span>
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
