/**
 * Timeline data derived from resume.md
 * Organized chronologically with education, experience, projects, and achievements
 */

export const resumeTimelineData = {
  education: [
    {
      id: 'uwc-bsc',
      period: '2018 - 2024',
      title: 'BSc Computer Science',
      institution: 'University of the Western Cape',
      details: [
        'Major: Computer Science',
        'Minor: Information Systems',
        'Elected: Physics',
        'Merit Award in Mathematics (2021)',
        'Merit Award in Astrophysics (2023)'
      ],
      type: 'education',
      status: 'completed'
    },
    {
      id: 'stanger-manor',
      period: '2012 - 2017',
      title: 'Matric (Information Technology)',
      institution: 'Stanger Manor Secondary',
      details: [
        'National Senior Certificate',
        'Focus: Information Technology'
      ],
      type: 'education',
      status: 'completed'
    }
  ],
  experience: [
    {
      id: 'samsung-fil',
      period: 'Mar 2025 - Present',
      title: 'Samsung Future Innovation Lab',
      company: 'University of the Western Cape / Belhar',
      description: 'Multiplatform Software Development (C#, .NET MAUI)',
      highlights: [
        'Agile & Scrum methodologies',
        'Project Management',
        'Professional communication & presentation'
      ],
      type: 'work',
      status: 'current'
    },
    {
      id: 'physics-tutor',
      period: 'Feb 2020 - 2024',
      title: 'Lead Physics Tutor',
      company: 'University of the Western Cape',
      description: 'Supervised 20-30 students per lab session',
      highlights: [
        'Lesson planning & materials preparation',
        'Assessment of lab reports and exams',
        'Student mentorship'
      ],
      type: 'work',
      status: 'completed'
    },
    {
      id: 'meals-on-time',
      period: 'Jan 2022 - Dec 2024',
      title: 'Website Developer',
      company: 'Meals on Time / Kraaifontein',
      description: 'Built and maintained informational website',
      highlights: [
        'Menu & product display',
        'Social media management',
        'Functionality updates'
      ],
      type: 'work',
      status: 'completed'
    },
    {
      id: 'cuban-connection',
      period: 'Nov 2022 - Dec 2023',
      title: 'Website Admin & Developer',
      company: 'Cuban Connection / Goodwood',
      description: 'Created and managed e-commerce platform',
      highlights: [
        'IT support',
        'Catalog creation',
        'Social media management'
      ],
      type: 'work',
      status: 'completed'
    },
    {
      id: 'lm-tutoring',
      period: 'Jun 2023 - Dec 2024',
      title: 'Mathematics & English Tutor',
      company: 'LM Tutoring / Kraaifontein',
      description: 'Tutored Grades 6-11',
      highlights: [
        'Personalized lesson plans',
        'Performance evaluations',
        'Student progress tracking'
      ],
      type: 'work',
      status: 'completed'
    },
    {
      id: 'cs-volunteer',
      period: 'Apr 2024 - Present',
      title: 'Computer Science Volunteer',
      company: 'UWC IT Society & Women in Tech',
      description: 'Promoting STEM careers in high schools',
      highlights: [
        'Educational talks',
        'Hands-on sessions',
        'STEM advocacy'
      ],
      type: 'volunteer',
      status: 'current'
    }
  ],
  projects: [
    {
      id: 'financebuddy',
      period: 'Sep 2025',
      title: 'FinanceBuddy',
      description: 'AI-powered financial wellness app with plant gamification',
      technologies: ['.NET MAUI 9', 'Azure OpenAI', 'C#', 'ASP.NET Core'],
      highlights: [
        'SA Intervarsity Hackathon 2025 · AI Category · 3rd Place',
        'Cross-platform (Android, iOS, Windows, Mac)',
        'AI Money Mentor with GPT-4',
        'Plant gamification system'
      ],
      type: 'project',
      status: 'completed',
      github: 'https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor',
      link: '/projects/financebuddy'
    },
    {
      id: 'studentlink',
      period: 'Apr 2025 - Present',
      title: 'StudentLink',
      description: 'Multi-platform career readiness platform with AI CV analysis',
      technologies: ['.NET 9', 'React', 'Azure OpenAI', '.NET MAUI', 'ML.NET'],
      highlights: [
        'AI-powered CV feedback',
        'ML job recommendations',
        'Multi-platform (Web, Mobile, API)',
        'Real-time application tracking'
      ],
      type: 'project',
      status: 'ongoing',
      link: '/projects/studentlink'
    },
    {
      id: 'callcentre-ai',
      period: 'Aug 2025 - Present',
      title: 'CallCentre AI',
      description: 'AI-assisted customer engagement with real-time supervision',
      technologies: ['.NET 8', 'React + Vite', 'SignalR', 'Azure Cognitive Services'],
      highlights: [
        'Real-time SignalR communication',
        'AI text analytics',
        'Multi-platform agent app',
        'Sentiment analysis'
      ],
      type: 'project',
      status: 'ongoing',
      link: '/projects/callcentre-ai'
    },
    {
      id: 'neural-networks',
      period: '2024',
      title: 'Neural Networks Lab',
      description: 'Comprehensive ML research and implementations',
      technologies: ['Python', 'NumPy', 'TensorFlow', 'PyTorch'],
      highlights: [
        'Neural networks from scratch',
        'Image classification (MNIST, CIFAR-10)',
        'Text classification',
        'Unsupervised learning'
      ],
      type: 'project',
      status: 'completed',
      github: 'https://github.com/DrVanHelsing/MachineLearning',
      link: '/projects/machine-learning'
    },
    {
      id: 'godseye',
      period: 'Apr 2025 - Present',
      title: 'GodsEye - Gesture Control',
      description: 'Experimental gesture-controlled gaming mouse',
      technologies: ['Python', 'OpenCV', 'Mediapipe', 'Computer Vision'],
      highlights: [
        'Facial gesture detection',
        'Eye gaze tracking',
        'Head pose estimation',
        'Low-latency processing'
      ],
      type: 'project',
      status: 'experimental',
      github: 'https://github.com/DrVanHelsing/GodsEye',
      link: '/projects/godseye'
    },
    {
      id: 'hangman',
      period: 'Apr 2025',
      title: 'Hangman',
      description: 'Classic word guessing game with configurable dictionary and difficulty',
      technologies: ['Python'],
      highlights: [
        'Completed in April 2025',
        'Clean CLI implementation'
      ],
      type: 'project',
      status: 'completed',
      github: 'https://github.com/DrVanHelsing/Hangman',
      link: '/projects/hangman'
    },
    {
      id: 'tictactoe',
      period: 'Mar 2025',
      title: 'Tic‑Tac‑Toe',
      description: 'Classic 3x3 Tic‑Tac‑Toe with optional AI',
      technologies: ['Python'],
      highlights: [
        'Completed in March 2025',
        'Educational project'
      ],
      type: 'project',
      status: 'completed',
      github: 'https://github.com/DrVanHelsing/TicTacToe',
      link: '/projects/tictactoe'
    }
  ],
  achievements: [
    {
      id: 'telkom-hackathon',
      period: '2024',
      title: 'TelkomXHackathon Winner',
      event: 'TelkomX Hackathon Competition',
      description: 'Won first place at the TelkomX Hackathon',
      type: 'achievement',
      status: 'completed'
    },
    {
      id: 'hackathon-2024',
      period: 'Jun 2024',
      title: 'Standard Bank Hackathon',
      event: 'UniHack',
      description: 'Developed transport-sector community solution prototype',
      type: 'achievement',
      status: 'completed'
    },
    {
      id: 'cyber-challenge',
      period: 'Oct 2024',
      title: 'SANReN Cyber Security Challenge',
      description: 'Capture the Flag, Pen Testing, Forensics, Reverse Engineering',
      type: 'achievement',
      status: 'completed'
    }
  ],
  skills: {
    programming: ['Python', 'Java', 'Matlab', 'C#', '.NET MAUI'],
    web: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
    tools: ['Git', 'MySQL', 'Microsoft Office Suite'],
    soft: ['Problem-solving', 'Team Collaboration', 'Communication', 'Analytical Thinking']
  }
};

/**
 * Transform resume data into timeline format for visualization
 */
export function getTimelineEntries() {
  const entries = [];
  
  // Add all experience entries
  resumeTimelineData.experience.forEach(exp => {
    entries.push({
      ...exp,
      category: exp.type,
      startDate: exp.period.split(' - ')[0],
      endDate: exp.period.includes('Present') ? 'Present' : exp.period.split(' - ')[1]
    });
  });
  
  // Add education
  resumeTimelineData.education.forEach(edu => {
    entries.push({
      ...edu,
      category: 'education',
      startDate: edu.period.split(' - ')[0],
      endDate: edu.period.split(' - ')[1]
    });
  });
  
  // Add projects
  resumeTimelineData.projects.forEach(proj => {
    entries.push({
      ...proj,
      category: 'project',
      startDate: proj.period,
      endDate: proj.period
    });
  });
  
  // Add achievements
  resumeTimelineData.achievements.forEach(ach => {
    entries.push({
      ...ach,
      category: 'achievement',
      startDate: ach.period,
      endDate: ach.period
    });
  });
  
  // Sort by start date (most recent first)
  entries.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });
  
  return entries;
}
