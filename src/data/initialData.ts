import { StudentProfile, Mentor, Opportunity, GrowthStep } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: "Alex Rivera",
  tagline: "Aspiring Robotics Engineer & Open Source Enthusiast",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  academicLevel: "Undergraduate Student (3rd Year)",
  institution: "State Institute of Technology (Demo)",
  location: "Midwest Region, USA",
  bio: "Passionate about autonomous navigation, embedded robotics, and computer vision. Seeking mentorship to transition from academic simulations to real-world field robotics research and hardware prototyping.",
  skills: [
    { name: "Python", level: "Advanced" },
    { name: "ROS / ROS2", level: "Intermediate" },
    { name: "C++", level: "Intermediate" },
    { name: "OpenCV", level: "Intermediate" },
    { name: "PyTorch", level: "Beginner" },
    { name: "CAD Modeling", level: "Beginner" },
    { name: "Arduino / Raspberry Pi", level: "Advanced" }
  ],
  interests: [
    "Robotics",
    "Computer Vision",
    "Autonomous Systems",
    "Embedded Linux",
    "AI Ethics",
    "Open Source Robotics"
  ],
  subjects: [
    "Linear Algebra & Multivariable Calculus",
    "Control Theory",
    "Data Structures & Algorithms",
    "Mechatronics Engineering",
    "Machine Learning Foundations"
  ],
  careerGoals: [
    "Secure a summer research fellowship in autonomous systems",
    "Contribute to a major open-source robotics library (e.g., ROS2)",
    "Publish a first-author paper on vision-based obstacle avoidance",
    "Prepare competitive applications for robotics MS/PhD programs"
  ],
  guidanceAreas: [
    "Navigating graduate research program applications without alumni contacts",
    "Code architecture reviews for complex ROS node pipelines",
    "Drafting compelling research statements & cold-emailing lab director mentors",
    "Selecting hardware component vendors for low-budget prototypes"
  ],
  projects: [
    {
      id: "proj-1",
      title: "RoverVision: Autonomous Obstacle Detector",
      description: "A ROS2 node that processes live stereo camera feeds to map 3D point clouds and generate real-time collision-free paths for small ground rovers.",
      techStack: ["Python", "ROS2", "OpenCV", "YOLOv8"],
      link: "https://github.com/demo/rover-vision",
      date: "Oct 2024",
      category: "Robotics"
    },
    {
      id: "proj-2",
      title: "MicroPID Temperature & Motor Controller",
      description: "Custom C++ firmware for microcontroller board implementing digital PID loops for high-precision brushless motor velocity control.",
      techStack: ["C++", "Arduino", "Embedded Systems"],
      link: "https://github.com/demo/micro-pid",
      date: "Dec 2024",
      category: "Embedded"
    }
  ]
};

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: "mentor-1",
    name: "Dr. Maya Sharma",
    title: "Senior Robotics & Computer Vision Research Scientist",
    organization: "Institute for Intelligent Systems (Demo)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    verified: true,
    skills: ["Python", "ROS / ROS2", "Computer Vision", "OpenCV", "C++", "Autonomous Systems"],
    expertise: ["SLAM & Navigation", "Deep Learning for Perception", "Graduate Research Guidance", "Paper Writing"],
    bio: "Focuses on visual SLAM and deep learning perception models for spatial navigation. First-generation college graduate dedicated to opening doors for non-traditional students.",
    location: "Boston, MA",
    experienceYears: 11,
    rating: 4.9,
    totalMentees: 28,
    availableSessions: ["1:1 Office Hours", "Code & Architecture Review", "Research Proposal Guidance"],
    nextAvailable: "This Thursday, 3:00 PM EST",
    languages: ["English", "Hindi"]
  },
  {
    id: "mentor-2",
    name: "Marcus Vance",
    title: "Principal Embedded Systems Engineer",
    organization: "NextGen Mobility Labs (Demo)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    verified: true,
    skills: ["C++", "Python", "Embedded Systems", "Arduino / Raspberry Pi", "CAD Modeling"],
    expertise: ["Hardware Architecture", "Firmware Optimization", "Industry Career Transitions", "Resume Review"],
    bio: "Specializes in low-power firmware development for autonomous vehicle sensors. Self-taught engineer passionate about merit-based talent identification.",
    location: "San Jose, CA",
    experienceYears: 9,
    rating: 4.8,
    totalMentees: 19,
    availableSessions: ["1:1 Office Hours", "Portfolio Feedback", "Code & Architecture Review"],
    nextAvailable: "Friday, 1:00 PM PST",
    languages: ["English"]
  },
  {
    id: "mentor-3",
    name: "Elena Rostova",
    title: "AI Research Fellow & PhD Candidate",
    organization: "Cognitive Robotics Group (Demo)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    verified: true,
    skills: ["Python", "PyTorch", "ROS / ROS2", "Computer Vision", "Machine Learning Foundations"],
    expertise: ["Reinforcement Learning", "Simulation to Real Transfer", "Fellowship Applications"],
    bio: "Researching sim-to-real transfer learning for robotic manipulation arms. Helps students write standout fellowship and research grant proposals.",
    location: "Chicago, IL",
    experienceYears: 6,
    rating: 5.0,
    totalMentees: 14,
    availableSessions: ["Research Proposal Guidance", "1:1 Office Hours"],
    nextAvailable: "Monday, 4:00 PM CST",
    languages: ["English", "Russian"]
  },
  {
    id: "mentor-4",
    name: "David K. Chen",
    title: "Open Source Tech Lead & Systems Architect",
    organization: "Open Robotics Foundation (Demo)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    verified: true,
    skills: ["Python", "C++", "ROS / ROS2", "Data Structures & Algorithms", "Open Source Robotics"],
    expertise: ["Open Source Maintenance", "Large-scale C++ Infrastructure", "Technical Interview Prep"],
    bio: "Core contributor to open robotics tooling. Passionate about empowering students who lack elite campus recruiting access to gain top-tier open source credentials.",
    location: "Austin, TX",
    experienceYears: 14,
    rating: 4.9,
    totalMentees: 35,
    availableSessions: ["Code & Architecture Review", "Portfolio Feedback", "1:1 Office Hours"],
    nextAvailable: "Wednesday, 2:00 PM CST",
    languages: ["English", "Mandarin"]
  },
  {
    id: "mentor-5",
    name: "Dr. Amara Thorne",
    title: "Associate Director of AI Equity Research",
    organization: "Public Tech Policy Lab (Demo)",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    verified: true,
    skills: ["AI Ethics", "Python", "Machine Learning Foundations", "Data Science"],
    expertise: ["Algorithmic Fairness", "Interdisciplinary Tech Careers", "Graduate Admissions"],
    bio: "Conducts empirical research on bias mitigation in autonomous software. Guides students building ethical frameworks alongside technical systems.",
    location: "Washington, D.C.",
    experienceYears: 12,
    rating: 4.9,
    totalMentees: 22,
    availableSessions: ["Research Proposal Guidance", "1:1 Office Hours"],
    nextAvailable: "Next Tuesday, 11:00 AM EST",
    languages: ["English"]
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Summer Open-Source Robotics Fellowship (Demo)",
    organization: "RoboSphere Innovation Fund",
    type: "Research Program",
    description: "A 10-week remote research cohort pairing students with lead open-source robotics engineers. Build production ROS2 packages with a fully funded stipend.",
    stipend: "$6,500 Stipend + Hardware Kit",
    location: "Remote (Global)",
    deadline: "28 Days Left",
    matchingSkills: ["Python", "ROS / ROS2", "C++"],
    eligibility: "Open to underrepresented or resource-limited university students worldwide.",
    link: "#apply-opp-1",
    featured: true,
    difficulty: "Intermediate",
    duration: "10 Weeks"
  },
  {
    id: "opp-2",
    title: "Equal Pathways STEM Scholarship Grant (Demo)",
    organization: "Future Tech Foundation",
    type: "Scholarship",
    description: "Need-based academic grant providing tuition assistance and equipment support for undergraduate students pursuing robotics, AI, or hardware computing.",
    stipend: "$5,000 Direct Grant",
    location: "National (US)",
    deadline: "14 Days Left",
    matchingSkills: ["Python", "Autonomous Systems"],
    eligibility: "Undergraduate students without legacy university connections or major departmental funding.",
    link: "#apply-opp-2",
    featured: true,
    difficulty: "All Levels",
    duration: "Academic Year 2025"
  },
  {
    id: "opp-3",
    title: "Autonomous Navigation Student Challenge 2025 (Demo)",
    organization: "Global Field Robotics Association",
    type: "Competition",
    description: "Simulated micro-rover challenge where student teams write OpenCV and ROS navigation pipelines to maneuver harsh virtual terrains.",
    stipend: "$10,000 Prize Pool + Industry Exposure",
    location: "Virtual Competition",
    deadline: "42 Days Left",
    matchingSkills: ["Python", "OpenCV", "ROS / ROS2", "C++"],
    eligibility: "Individual students or teams of up to 4 students. Mentors assigned upon qualification.",
    link: "#apply-opp-3",
    featured: false,
    difficulty: "Intermediate",
    duration: "6 Weeks"
  },
  {
    id: "opp-4",
    title: "Guided Project: Embedded Micro-Controller ROS Node (Demo)",
    organization: "GuruSphere Guided Labs",
    type: "Guided Project",
    description: "Construct a end-to-end hardware-in-the-loop obstacle detection system. Includes code reviews from verified industry mentors.",
    stipend: "Free Mentorship & Kit Sponsorship",
    location: "Self-Paced / Hybrid",
    deadline: "Rolling Admissions",
    matchingSkills: ["Arduino / Raspberry Pi", "C++", "Python"],
    eligibility: "Students with basic electronics background wanting portfolio project guidance.",
    link: "#apply-opp-4",
    featured: false,
    difficulty: "Beginner",
    duration: "4 Weeks"
  },
  {
    id: "opp-5",
    title: "Computer Vision & Edge AI Sprint Cohort (Demo)",
    organization: "Edge Intelligence Guild",
    type: "Mentorship Cohort",
    description: "Weekly small-group coaching led by Dr. Maya Sharma on optimizing YOLO models for low-power Raspberry Pi edge devices.",
    stipend: "Full Sponsorship (No Cost)",
    location: "Online Video Cohort",
    deadline: "7 Days Left",
    matchingSkills: ["OpenCV", "PyTorch", "Python"],
    eligibility: "Students looking for structured research mentorship and peer feedback.",
    link: "#apply-opp-5",
    featured: true,
    difficulty: "Intermediate",
    duration: "8 Weeks"
  },
  {
    id: "opp-6",
    title: "Undergraduate Robotics Research Assistantship (Demo)",
    organization: "State Smart Systems Lab",
    type: "Internship",
    description: "Virtual undergraduate research assistant spot analyzing multi-robot swarm coordinate algorithms using ROS2 and Gazebo simulator.",
    stipend: "$22 / hour (20 hrs/week)",
    location: "Remote",
    deadline: "19 Days Left",
    matchingSkills: ["ROS / ROS2", "Python", "Control Theory"],
    eligibility: "Enrolled undergraduate students passionate about swarm systems.",
    link: "#apply-opp-6",
    featured: false,
    difficulty: "Advanced",
    duration: "12 Weeks (Summer)"
  }
];

export const INITIAL_GROWTH_STEPS: GrowthStep[] = [
  {
    id: "step-1",
    title: "Create Profile",
    description: "Add your core skills, interests, and career trajectory so our matching algorithm can connect you.",
    completed: true,
    actionText: "Edit Profile",
    targetTab: "profile",
    completedDate: "Completed"
  },
  {
    id: "step-2",
    title: "Build First Project",
    description: "Document a working project or code repo in your profile to showcase your hands-on problem solving.",
    completed: true,
    actionText: "View Projects",
    targetTab: "profile",
    completedDate: "Completed"
  },
  {
    id: "step-3",
    title: "Find a Mentor",
    description: "Connect with a verified mentor in your target field and send a tailored mentorship request.",
    completed: false,
    inProgress: true,
    actionText: "Match Mentors",
    targetTab: "mentors"
  },
  {
    id: "step-4",
    title: "Join Research / Guided Project",
    description: "Collaborate on an active open project or research cohort under mentor supervision.",
    completed: false,
    actionText: "Explore Projects",
    targetTab: "opportunities"
  },
  {
    id: "step-5",
    title: "Build Portfolio",
    description: "Refine your technical portfolio with peer & mentor code reviews to stand out.",
    completed: false,
    actionText: "Update Portfolio",
    targetTab: "profile"
  },
  {
    id: "step-6",
    title: "Apply for Opportunity",
    description: "Submit a competitive application for a scholarship, research program, or fellowship.",
    completed: false,
    actionText: "Browse Opportunities",
    targetTab: "opportunities"
  }
];

export const GAP_STATISTICS = [
  {
    stat: "70%",
    label: "Unlisted Opportunities",
    description: "Of internships & research positions are filled through existing personal or institutional networks rather than open postings."
  },
  {
    stat: "4.2x",
    label: "Mentorship Advantage",
    description: "Students with structured mentor guidance are 4.2 times more likely to land merit research grants regardless of zip code."
  },
  {
    stat: "85%",
    label: "Confidence Boost",
    description: "Of first-generation STEM talent report higher retention in technical fields when connected to a verified industry mentor."
  }
];
