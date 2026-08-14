import { StudentProfile, Mentor, GrowthStep, MentorshipRequest, OpportunityApplication } from '../types';
import { INITIAL_STUDENT_PROFILE, INITIAL_GROWTH_STEPS } from '../data/initialData';

const PROFILE_KEY = 'gurusphere_student_profile_v1';
const GROWTH_KEY = 'gurusphere_growth_steps_v1';
const MENTOR_REQUESTS_KEY = 'gurusphere_mentor_requests_v1';
const SAVED_OPPORTUNITIES_KEY = 'gurusphere_saved_opps_v1';
const APPLICATIONS_KEY = 'gurusphere_applications_v1';

export function loadStudentProfile(): StudentProfile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading profile:', e);
  }
  return INITIAL_STUDENT_PROFILE;
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
}

export function loadGrowthSteps(): GrowthStep[] {
  try {
    const saved = localStorage.getItem(GROWTH_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading growth steps:', e);
  }
  return INITIAL_GROWTH_STEPS;
}

export function saveGrowthSteps(steps: GrowthStep[]): void {
  try {
    localStorage.setItem(GROWTH_KEY, JSON.stringify(steps));
  } catch (e) {
    console.error('Error saving growth steps:', e);
  }
}

export function loadMentorRequests(): MentorshipRequest[] {
  try {
    const saved = localStorage.getItem(MENTOR_REQUESTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading requests:', e);
  }
  return [];
}

export function saveMentorRequest(request: MentorshipRequest): MentorshipRequest[] {
  const current = loadMentorRequests();
  const updated = [request, ...current];
  try {
    localStorage.setItem(MENTOR_REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving mentor request:', e);
  }
  return updated;
}

export function loadSavedOpportunityIds(): string[] {
  try {
    const saved = localStorage.getItem(SAVED_OPPORTUNITIES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading saved opps:', e);
  }
  return ['opp-1', 'opp-2']; // default saved demo opps
}

export function toggleSaveOpportunity(id: string): string[] {
  const current = loadSavedOpportunityIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(item => item !== id) : [...current, id];
  try {
    localStorage.setItem(SAVED_OPPORTUNITIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving opp id:', e);
  }
  return updated;
}

export function loadApplications(): OpportunityApplication[] {
  try {
    const saved = localStorage.getItem(APPLICATIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading applications:', e);
  }
  return [];
}

export function saveApplication(app: OpportunityApplication): OpportunityApplication[] {
  const current = loadApplications();
  const updated = [app, ...current];
  try {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving app:', e);
  }
  return updated;
}

// Calculate match percentage between student profile and mentor or opportunity
export function calculateMatchScore(student: StudentProfile, itemSkills: string[]): number {
  if (!itemSkills || itemSkills.length === 0) return 75;
  const studentSkillNames = student.skills.map(s => s.name.toLowerCase());
  const studentInterests = student.interests.map(i => i.toLowerCase());
  const allStudentTags = [...studentSkillNames, ...studentInterests];

  let matches = 0;
  itemSkills.forEach(skill => {
    const sLower = skill.toLowerCase();
    if (allStudentTags.some(tag => tag.includes(sLower) || sLower.includes(tag))) {
      matches += 1;
    }
  });

  const ratio = matches / itemSkills.length;
  // Map ratio from range 70% to 98%
  const score = Math.round(72 + ratio * 26);
  return Math.min(score, 98);
}
