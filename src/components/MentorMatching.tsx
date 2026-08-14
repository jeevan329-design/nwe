import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle, 
  Star, 
  SlidersHorizontal,
  MessageSquare,
  Award
} from 'lucide-react';
import { Mentor, StudentProfile, MentorshipRequest } from '../types';
import { calculateMatchScore, saveMentorRequest } from '../lib/storage';

interface MentorMatchingProps {
  mentors: Mentor[];
  studentProfile: StudentProfile;
  onRequestSubmitted: (request: MentorshipRequest) => void;
  sentRequests: MentorshipRequest[];
}

export const MentorMatching: React.FC<MentorMatchingProps> = ({
  mentors,
  studentProfile,
  onRequestSubmitted,
  sentRequests,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('All');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('All');

  // Request Modal State
  const [selectedMentor, setSelectedSessionMentor] = useState<Mentor | null>(null);
  const [sessionType, setSessionType] = useState<string>('1:1 Office Hours');
  const [topic, setTopic] = useState<string>('ROS2 Code Pipeline & Research Guidance');
  const [message, setMessage] = useState<string>(
    "Hi! I am working on autonomous rover vision algorithms. I would love 30 minutes of guidance on structuring my ROS2 node for field deployment."
  );
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Compute matched mentors with scores
  const mentorsWithScores = mentors.map((m) => {
    const score = calculateMatchScore(studentProfile, m.skills);
    return { ...m, matchScore: score };
  });

  // Sort by match score descending
  mentorsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Extract unique expertise areas
  const allExpertiseAreas = ['All', ...Array.from(new Set(mentors.flatMap((m) => m.expertise)))];

  // Filter mentors
  const filteredMentors = mentorsWithScores.filter((mentor) => {
    const matchesQuery =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise =
      selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);

    const matchesSession =
      selectedSessionType === 'All' || mentor.availableSessions.includes(selectedSessionType as any);

    return matchesQuery && matchesExpertise && matchesSession;
  });

  // Handle Mentorship Request Submission
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    const newRequest: MentorshipRequest = {
      id: `req-${Date.now()}`,
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      studentName: studentProfile.name,
      sessionType,
      topic,
      message,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    saveMentorRequest(newRequest);
    onRequestSubmitted(newRequest);
    setRequestSuccess(true);

    setTimeout(() => {
      setRequestSuccess(false);
      setSelectedSessionMentor(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. SECTION HEADER & RULE-BASED MATCHING BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Skill-Based Mentor Recommendation Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect With Verified Mentors
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            GuruSphere dynamically computes match scores based on your active technical skills (<span className="text-amber-300 font-semibold">{studentProfile.skills.map(s => s.name).slice(0, 4).join(', ')}</span>) and domain goals. Fictional demo profiles.
          </p>
        </div>
      </div>

      {/* Sent Requests Drawer Banner if active */}
      {sentRequests.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>
              You have <strong className="font-bold">{sentRequests.length} active mentorship request(s)</strong> pending review!
            </span>
          </div>
          <span className="font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px]">
            Latest: {sentRequests[0].mentorName} ({sentRequests[0].status})
          </span>
        </div>
      )}

      {/* 2. FILTERS & SEARCH TOOLBAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, skill (Python, ROS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Expertise Dropdown Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </div>
          
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {allExpertiseAreas.map((exp, idx) => (
              <option key={idx} value={exp}>
                Expertise: {exp}
              </option>
            ))}
          </select>

          <select
            value={selectedSessionType}
            onChange={(e) => setSelectedSessionType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Session Types</option>
            <option value="1:1 Office Hours">1:1 Office Hours</option>
            <option value="Code & Architecture Review">Code & Architecture Review</option>
            <option value="Research Proposal Guidance">Research Proposal Guidance</option>
            <option value="Portfolio Feedback">Portfolio Feedback</option>
          </select>
        </div>

      </div>

      {/* 3. MENTOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const isRequested = sentRequests.some((r) => r.mentorId === mentor.id);

          return (
            <div
              key={mentor.id}
              className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative ${
                mentor.matchScore && mentor.matchScore >= 90
                  ? 'border-indigo-300 ring-1 ring-indigo-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Mentor
                </span>
                
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  {mentor.matchScore}% Match
                </span>
              </div>

              {/* Mentor Identity */}
              <div className="flex items-start gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                />
                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600">{mentor.title}</p>
                  <p className="text-[11px] text-slate-500">{mentor.organization}</p>
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {mentor.bio}
              </p>

              {/* Technical Skills Overlap */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase text-slate-400">
                  Relevant Technical Overlap
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skills.map((skill, sIdx) => {
                    const studentHasSkill = studentProfile.skills.some(
                      (s) => s.name.toLowerCase() === skill.toLowerCase()
                    );
                    return (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                          studentHasSkill
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {skill} {studentHasSkill && '✓'}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Sessions & Next Available */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-indigo-900 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Next Slot: <strong>{mentor.nextAvailable}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{mentor.totalMentees} Mentees Guided • {mentor.experienceYears} Yrs Exp</span>
                </div>
              </div>

              {/* Action Button */}
              {isRequested ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-emerald-300"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Request Sent (Pending)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedSessionMentor(mentor);
                    setRequestSuccess(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Request Mentorship</span>
                </button>
              )}

              {/* Fictional Profile Disclaimer */}
              <div className="text-[10px] text-slate-400 text-center italic">
                Fictional Demo Mentor Profile
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. REQUEST MENTORSHIP MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 border border-slate-200 animate-in zoom-in-95">
            
            {requestSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Request Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your request has been logged in your local growth progress pathway. Step 3 ("Find a Mentor") is now marked as in-progress!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                  <img
                    src={selectedMentor.avatar}
                    alt={selectedMentor.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase">
                      Mentorship Session Request
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {selectedMentor.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedMentor.title}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Choose Session Type
                    </label>
                    <select
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {selectedMentor.availableSessions.map((session, sIdx) => (
                        <option key={sIdx} value={session}>
                          {session}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Topic / Project Focus
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Personal Message & Guidance Needs
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div className="font-bold text-slate-800">Next Available Window:</div>
                    <div>{selectedMentor.nextAvailable}</div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSessionMentor(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Mentorship Request</span>
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
