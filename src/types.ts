export interface StudentProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  date: string;
  category: string;
}

export interface StudentProfile {
  name: string;
  tagline: string;
  avatar: string;
  academicLevel: string;
  institution: string;
  location: string;
  bio: string;
  skills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }[];
  interests: string[];
  subjects: string[];
  careerGoals: string[];
  guidanceAreas: string[];
  projects: StudentProject[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatar: string;
  verified: boolean;
  matchScore?: number; // Calculated dynamically or static fallback
  skills: string[];
  expertise: string[];
  bio: string;
  location: string;
  experienceYears: number;
  rating: number;
  totalMentees: number;
  availableSessions: ('1:1 Office Hours' | 'Code & Architecture Review' | 'Portfolio Feedback' | 'Research Proposal Guidance')[];
  nextAvailable: string;
  languages: string[];
}

export type OpportunityType = 'Scholarship' | 'Research Program' | 'Competition' | 'Guided Project' | 'Mentorship Cohort' | 'Internship';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  description: string;
  stipend?: string;
  location: string;
  deadline: string;
  matchingSkills: string[];
  eligibility: string;
  link: string;
  featured?: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
}

export interface GrowthStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  inProgress?: boolean;
  actionText: string;
  targetTab: 'profile' | 'mentors' | 'opportunities' | 'growth';
  completedDate?: string;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  studentName: string;
  sessionType: string;
  topic: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  createdAt: string;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  submittedAt: string;
  status: 'Under Review' | 'Shortlisted' | 'Accepted';
  statement: string;
}
