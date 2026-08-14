import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DemoDisclaimerBanner } from './components/DemoDisclaimerBanner';
import { LandingPage } from './components/LandingPage';
import { StudentProfileView } from './components/StudentProfile';
import { MentorMatching } from './components/MentorMatching';
import { OpportunityHub } from './components/OpportunityHub';
import { GrowthPath } from './components/GrowthPath';
import { BecomeMentorModal } from './components/BecomeMentorModal';
import { Footer } from './components/Footer';

import { 
  StudentProfile, 
  Mentor, 
  Opportunity, 
  GrowthStep, 
  MentorshipRequest, 
  OpportunityApplication 
} from './types';
import { INITIAL_MENTORS, INITIAL_OPPORTUNITIES } from './data/initialData';
import { 
  loadStudentProfile, 
  saveStudentProfile, 
  loadGrowthSteps, 
  saveGrowthSteps, 
  loadMentorRequests, 
  loadSavedOpportunityIds, 
  loadApplications 
} from './lib/storage';

export function App() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Core Data States with local storage sync
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(loadStudentProfile);
  const [growthSteps, setGrowthSteps] = useState<GrowthStep[]>(loadGrowthSteps);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [opportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  
  const [mentorRequests, setMentorRequests] = useState<MentorshipRequest[]>(loadMentorRequests);
  const [savedOppIds, setSavedOppIds] = useState<string[]>(loadSavedOpportunityIds);
  const [applications, setApplications] = useState<OpportunityApplication[]>(loadApplications);

  // Modal State
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(false);

  // Sync profile changes
  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setStudentProfile(updatedProfile);
    saveStudentProfile(updatedProfile);

    // Auto update portfolio step if student has 3+ projects
    if (updatedProfile.projects.length >= 3) {
      updateStepCompletion('step-5', true);
    }
  };

  // Helper to update growth path step completion
  const updateStepCompletion = (stepId: string, completed: boolean) => {
    setGrowthSteps((prev) => {
      const updated = prev.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            completed,
            inProgress: false,
            completedDate: completed ? 'Just Now' : undefined,
          };
        }
        return step;
      });
      saveGrowthSteps(updated);
      return updated;
    });
  };

  // Toggle Growth Step completion
  const handleToggleStep = (stepId: string) => {
    setGrowthSteps((prev) => {
      const updated = prev.map((step) => {
        if (step.id === stepId) {
          const nextCompleted = !step.completed;
          return {
            ...step,
            completed: nextCompleted,
            inProgress: false,
            completedDate: nextCompleted ? 'Completed' : undefined,
          };
        }
        return step;
      });
      saveGrowthSteps(updated);
      return updated;
    });
  };

  // Handle Mentor Request Submitted
  const handleMentorRequestSubmitted = (newRequest: MentorshipRequest) => {
    setMentorRequests((prev) => [newRequest, ...prev]);
    // Automatically mark Step 3 ("Find a Mentor") as completed!
    updateStepCompletion('step-3', true);
  };

  // Handle Opportunity Application Submitted
  const handleApplicationSubmitted = (newApp: OpportunityApplication) => {
    setApplications((prev) => [newApp, ...prev]);
    // Automatically mark Step 6 ("Apply for Opportunity") as completed!
    updateStepCompletion('step-6', true);
  };

  // Handle View Opportunity from Landing Page
  const handleViewOpportunity = (_opp: Opportunity) => {
    setActiveTab('opportunities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Request Mentorship from Landing Page
  const handleRequestMentorshipFromLanding = (_mentor: Mentor) => {
    setActiveTab('mentors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate Growth Percentage
  const completedStepsCount = growthSteps.filter((s) => s.completed).length;
  const growthProgressPercent = Math.round((completedStepsCount / growthSteps.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Demo Disclaimer Banner */}
      <DemoDisclaimerBanner />

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        growthProgressPercent={growthProgressPercent}
        openMentorModal={() => setIsMentorModalOpen(true)}
        studentName={studentProfile.name}
      />

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'landing' && (
          <LandingPage
            onExploreStudent={() => setActiveTab('growth')}
            onOpenMentorModal={() => setIsMentorModalOpen(true)}
            mentors={mentors}
            opportunities={opportunities}
            studentProfile={studentProfile}
            onRequestMentorship={handleRequestMentorshipFromLanding}
            onViewOpportunity={handleViewOpportunity}
          />
        )}

        {activeTab === 'growth' && (
          <GrowthPath
            steps={growthSteps}
            onToggleStep={handleToggleStep}
            onNavigateTab={setActiveTab}
            progressPercent={growthProgressPercent}
          />
        )}

        {activeTab === 'mentors' && (
          <MentorMatching
            mentors={mentors}
            studentProfile={studentProfile}
            onRequestSubmitted={handleMentorRequestSubmitted}
            sentRequests={mentorRequests}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunityHub
            opportunities={opportunities}
            studentProfile={studentProfile}
            savedOppIds={savedOppIds}
            onSavedOppIdsChange={setSavedOppIds}
            applications={applications}
            onApplicationSubmitted={handleApplicationSubmitted}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProfileView
            profile={studentProfile}
            onUpdateProfile={handleUpdateProfile}
            onProjectAdded={() => updateStepCompletion('step-2', true)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />

      {/* Mentor Signup Application Modal */}
      <BecomeMentorModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
      />

    </div>
  );
}

export default App;
