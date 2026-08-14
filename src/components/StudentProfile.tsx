import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Plus, 
  Trash2, 
  Code, 
  FolderPlus, 
  Target, 
  HelpCircle, 
  Edit3, 
  Check, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { StudentProfile, StudentProject } from '../types';

interface StudentProfileProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onProjectAdded?: () => void;
}

export const StudentProfileView: React.FC<StudentProfileProps> = ({
  profile,
  onUpdateProfile,
  onProjectAdded,
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profile.bio);

  // New Skill Modal state
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  // New Interest / Subject / Goal state
  const [newInterestInput, setNewInterestInput] = useState('');
  const [showInterestInput, setShowInterestInput] = useState(false);

  // New Project Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectCategory, setProjectCategory] = useState('Robotics');

  // Save Bio update
  const handleSaveBio = () => {
    onUpdateProfile({ ...profile, bio: bioText });
    setIsEditingBio(false);
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const updatedSkills = [...profile.skills, { name: newSkillName.trim(), level: newSkillLevel }];
    onUpdateProfile({ ...profile, skills: updatedSkills });
    setNewSkillName('');
    setShowSkillModal(false);
  };

  // Remove Skill
  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills = profile.skills.filter(s => s.name !== skillName);
    onUpdateProfile({ ...profile, skills: updatedSkills });
  };

  // Add Interest
  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterestInput.trim()) return;
    if (!profile.interests.includes(newInterestInput.trim())) {
      const updated = [...profile.interests, newInterestInput.trim()];
      onUpdateProfile({ ...profile, interests: updated });
    }
    setNewInterestInput('');
    setShowInterestInput(false);
  };

  // Remove Interest
  const handleRemoveInterest = (interestName: string) => {
    const updated = profile.interests.filter(i => i !== interestName);
    onUpdateProfile({ ...profile, interests: updated });
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDesc.trim()) return;

    const techArray = projectTech
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newProject: StudentProject = {
      id: `proj-${Date.now()}`,
      title: projectTitle.trim(),
      description: projectDesc.trim(),
      techStack: techArray.length > 0 ? techArray : ['Python', 'Robotics'],
      link: projectLink.trim() || 'https://github.com/demo/project',
      date: 'Just Now',
      category: projectCategory
    };

    const updatedProjects = [newProject, ...profile.projects];
    onUpdateProfile({ ...profile, projects: updatedProjects });

    if (onProjectAdded) onProjectAdded();

    // Reset Form
    setProjectTitle('');
    setProjectDesc('');
    setProjectTech('');
    setProjectLink('');
    setShowProjectModal(false);
  };

  // Remove Project
  const handleRemoveProject = (projectId: string) => {
    const updated = profile.projects.filter(p => p.id !== projectId);
    onUpdateProfile({ ...profile, projects: updated });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 absolute top-0 left-0 right-0" />
        
        <div className="relative pt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-slate-800"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Demo Profile Active
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-indigo-600">
                {profile.tagline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  {profile.academicLevel}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  {profile.institution}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-around gap-6 text-center">
            <div>
              <div className="text-xl font-black text-indigo-600">{profile.skills.length}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Skills</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-xl font-black text-purple-600">{profile.projects.length}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Projects</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-xl font-black text-amber-600">{profile.interests.length}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Interests</div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Student Statement & Focus
            </h3>
            {!isEditingBio ? (
              <button
                onClick={() => setIsEditingBio(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Statement
              </button>
            ) : (
              <button
                onClick={handleSaveBio}
                className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
            )}
          </div>

          {!isEditingBio ? (
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {profile.bio}
            </p>
          ) : (
            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-2xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800"
            />
          )}
        </div>
      </div>

      {/* 2. SKILLS & INTERESTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SKILLS PANEL */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <span>Technical Skills</span>
              </h2>
              <p className="text-xs text-slate-500">Skills are used by GuruSphere to compute mentor compatibility.</p>
            </div>
            <button
              onClick={() => setShowSkillModal(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.skills.map((skill, idx) => {
              const levelColors = {
                Beginner: 'bg-slate-100 text-slate-700 border-slate-200',
                Intermediate: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                Advanced: 'bg-purple-50 text-purple-700 border-purple-200',
                Expert: 'bg-emerald-50 text-emerald-700 border-emerald-200',
              };
              return (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${levelColors[skill.level] || 'bg-slate-100'}`}
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({skill.level})</span>
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="hover:text-rose-600 transition-colors ml-1"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERESTS PANEL */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Research & Domain Interests</span>
              </h2>
              <p className="text-xs text-slate-500">Fields and technologies you wish to explore.</p>
            </div>
            <button
              onClick={() => setShowInterestInput(!showInterestInput)}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Interest
            </button>
          </div>

          {showInterestInput && (
            <form onSubmit={handleAddInterest} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Autonomous Navigation, Bio-Robotics"
                value={newInterestInput}
                onChange={(e) => setNewInterestInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Add
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 flex items-center gap-2"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-slate-400" />
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 3. PROJECTS MANAGER PANEL */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FolderPlus className="w-6 h-6 text-indigo-600" />
              <span>Demonstrated Technical Projects</span>
            </h2>
            <p className="text-xs text-slate-500">
              Projects build proof-of-work so mentors can evaluate technical momentum.
            </p>
          </div>
          <button
            onClick={() => setShowProjectModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative flex flex-col justify-between hover:border-indigo-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{proj.date}</span>
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{proj.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    <span>View Repository / Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CAREER GOALS & GUIDANCE NEEDED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Career Goals */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Target Career & Academic Milestones</span>
          </h3>
          <ul className="space-y-2.5">
            {profile.careerGoals.map((goal, gIdx) => (
              <li key={gIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guidance Needed */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Areas Where Mentorship Guidance is Needed</span>
          </h3>
          <ul className="space-y-2.5">
            {profile.guidanceAreas.map((area, aIdx) => (
              <li key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{area}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* MODAL 1: ADD SKILL MODAL */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900">Add Technical Skill</h3>
            
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g., PyTorch, ROS2, C++, OpenCV"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900">Add Technical Project</h3>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous Drone Obstacle Navigation"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Robotics">Robotics</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Embedded Systems">Embedded Systems</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Key Features</label>
                <textarea
                  rows={3}
                  placeholder="Briefly explain what the project does and your specific role..."
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="Python, ROS2, OpenCV, PyTorch"
                  value={projectTech}
                  onChange={(e) => setProjectTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Demo Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/project"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
                >
                  Save & Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
