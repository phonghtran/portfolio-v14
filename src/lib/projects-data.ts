// Project case study data types and structure

export interface ProjectSection {
  id: string;
  title: string;
  contentFile: string; // Path to the React component file for this section
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  technologies: string[];
  tags: string[];
  year: string;
  client?: string;
  duration: string;
  sections: ProjectSection[];
  heroImage?: string;
  overview: string;
  audioTrack?: string; // Path to audio file for entire project
  audioDuration?: number; // Duration in seconds for the entire project
}

export interface AudioTrack {
  id: string;
  projectId: string;
  title: string;
  audioUrl: string;
  duration: number;
}

// Placeholder project data - you can populate this with real content
export const projects: Project[] = [
  {
    id: 'fanniemae-1',
    title: "Fannie Mae\'s Stealth Refactor",
    subtitle: 'Turning a feature request into a flexible backend.',
    role: 'Lead Associate - UX Designer',
    technologies: ['Miro', 'Figma'],
    tags: [
      'UX Design',
      'UI Design',
      'Workshops',
      'Facilitation',
      'Design Thinking',
      'Product Management',
    ],
    year: '2024',
    client: 'Fannie Mae',
    duration: '4 Months',
    heroImage:
      '/images/projects/fanniemae-1/Screenshot_2025-03-21_at_10.11.51_342_200_257AM-job_24.jpg',
    overview:
      "Doing just enough discovery to realize that there's opportunity to set up future success while getting value now.",
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'fanniemae-1/context',
      },
      {
        id: 'culture',
        title: 'Culture Change',
        contentFile: 'fanniemae-1/culture',
      },
      {
        id: 'value',
        title: 'Value Add',
        contentFile: 'fanniemae-1/value',
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        contentFile: 'fanniemae-1/conclusion',
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'fanniemae-1/gallery',
      },
    ],
  },
  {
    id: 'obviously-1',
    title: "Obviously's First Design System",
    subtitle:
      'Highly collaborative sessions to help stakeholders articulate their vision',
    role: 'Director of Design (was Lead Designer)',
    technologies: ['Miro', 'Figma', 'Visual Code'],
    tags: [
      'UX Design',
      'UI Design',
      'User Research',
      'Workshops',
      'Facilitation',
      'Design Thinking',
    ],
    year: '2021',
    client: 'Obviously',
    duration: '1 Year',
    heroImage: '/images/projects/obviously-1/IMG_2624.png',
    overview:
      'Building a design system from the ground up requires patience not just for the design, but to also educate the stakeholders on the process and goals.',
    audioTrack: '/audio/project-1/research.mp3',
    audioDuration: 420, // 7 minutes total project narration
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'obviously-1/context',
      },
      {
        id: 'workshops',
        title: 'Design Workshops',
        contentFile: 'obviously-1/workshops',
      },
      {
        id: 'research',
        title: 'Restart Research',
        contentFile: 'obviously-1/research',
      },
      {
        id: 'outcomes',
        title: 'Bearing Fruit',
        contentFile: 'obviously-1/outcomes',
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'obviously-1/gallery',
      },
    ],
  },
  {
    id: 'obviously-2',
    title: "Obviously's Tech Debt",
    subtitle:
      "If the backlog of tech debt isn't sexy: augment the system so it unlocks new value. ",
    role: 'Director of Design (was Lead Designer)',
    technologies: ['Miro', 'Figma'],
    tags: ['UX Design', 'Workshops', 'Facilitation', 'Design Thinking'],
    year: '2022',
    client: 'Obviously',
    duration: '6 months',
    heroImage: '/images/projects/obviously-2/fillout.png',
    overview:
      'Tech debt will eventually strangle velocity on both code and design. Builiding a smart system on top of it can unlock speed, but also innovate new products.',
    audioTrack: '/audio/project-2/research.mp3',
    audioDuration: 240, // 4 minutes total project narration
    sections: [
      {
        id: 'context',
        title: 'Existing Problems',
        contentFile: 'obviously-2/context',
      },
      {
        id: 'solution',
        title: 'Solution: Attributes',
        contentFile: 'obviously-2/solution',
      },
      {
        id: 'outcomes',
        title: 'Outcomes',
        contentFile: 'obviously-2/outcomes',
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'obviously-2/gallery',
      },
    ],
  },
  {
    id: 'obviously-3',
    title: 'Obviously & AI (2023)',
    subtitle:
      "2023 AI wouldn't move the needle, but it inspired a lot of useful non-AI ideas.",
    role: 'Director of Design (was Lead Designer)',
    technologies: ['Miro', 'Figma', 'ChatGPT'],
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2023',
    client: 'Obviously',
    duration: '10 months',
    heroImage: '/images/projects/obviously-3/miroboard.jpg',
    overview:
      'AI has evolved incredibly since 2023. Back then, the conclusions were nascent, but in brainstorming--we developed novel ideas with conventional tech that would still unlock value.',
    audioTrack: '/audio/project-3/research.mp3',
    audioDuration: 360, // 6 minutes total project narration
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'obviously-3/context',
      },
      {
        id: 'phase-1',
        title: 'Phase 1: Anxiety Loop',
        contentFile: 'obviously-3/phase-1',
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Automation',
        contentFile: 'obviously-3/phase-2',
      },
      {
        id: 'phase-3',
        title: 'Phase 3: Smart Plug-ins',
        contentFile: 'obviously-3/phase-3',
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        contentFile: 'obviously-3/conclusion',
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'obviously-3/gallery',
      },
    ],
  },
  {
    id: 'mastercard-1',
    title: 'mastercard: Rapid Iterations',
    subtitle:
      'Highly collaborative sessions to help stakeholders articulate their vision',
    role: 'Senior Design Technologist',
    technologies: ['Miro', 'Figma'],
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2021',
    client: 'mastercard',
    duration: '2 months',
    heroImage: '/images/projects/mastercard-1/mc_2.png',
    overview:
      "Sometimes you go faster by going slower but upping the frequency of iterations. Setting up frequent virtual sessions while live sketching and prototyping stakeholder's ideas.",
    audioTrack: '/audio/project-4/research.mp3',
    audioDuration: 180, // 3 minutes total project narration
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'mastercard-1/context',
      },
      {
        id: 'adhoc',
        title: 'Dropping In',
        contentFile: 'mastercard-1/adhoc',
      },
    ],
  },
  {
    id: 'worldpay-1',
    title: 'Worldpay Workshops: Asset Consolidation',
    subtitle: 'Design Thinking to Plan for Streamlining',
    role: 'Senior Design Technologist',
    technologies: ['Miro', 'Figma', 'AngularJS'],
    tags: [
      'UX Design',
      'Front-End Development',
      'Workshops',
      'Facilitation',
      'Design Thinking',
    ],
    year: '2021',
    client: 'Worldpay (FIS)',
    duration: '3 months',
    heroImage: '/images/projects/worldpay-1/slides2.jpeg',
    overview:
      'Rapidly facititating workshops to reach alignment and consensus, and then coding the initial deliverables to jump start the transition.',
    audioTrack: '/audio/project-5/research.mp3',
    audioDuration: 120, // 2 minutes total project narration
    sections: [
      {
        id: 'context',
        title: 'Summary',
        contentFile: 'worldpay-1/context',
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'worldpay-1/gallery',
      },
    ],
  },
];

// Generate audio tracks from project data (one per project)
export const audioTracks: AudioTrack[] = projects
  .filter(project => project.audioTrack)
  .map(project => ({
    id: project.id,
    projectId: project.id,
    title: `${project.title} - Full Project Narration`,
    audioUrl: project.audioTrack!,
    duration: project.audioDuration || 0,
  }));

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getAudioTrackByProjectId(
  projectId: string
): AudioTrack | undefined {
  return audioTracks.find(track => track.projectId === projectId);
}
