// Project case study data types and structure

export interface ProjectSection {
  id: string;
  title: string;
  contentFile: string; // Path to the React component file for this section
  audioTrack?: string; // Path to audio file for this section
  duration?: number; // Duration in seconds
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: 'ux-design' | 'development' | 'technologist' | 'research';
  tags: string[];
  year: string;
  client?: string;
  duration: string;
  sections: ProjectSection[];
  heroImage?: string;
  overview: string;
}

export interface AudioTrack {
  id: string;
  projectId: string;
  sectionId: string;
  title: string;
  audioUrl: string;
  duration: number;
}

// Placeholder project data - you can populate this with real content
export const projects: Project[] = [
  {
    id: 'obviously-1',
    title: "Obviously's First Design System",
    subtitle:
      'Highly collaborative sessions to help stakeholders articulate their vision',
    description: '',
    thumbnail: '/images/projects/obviously-1/thumbnail.jpg',
    category: 'ux-design',
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2021',
    client: 'Obviously',
    duration: '1 Year',
    heroImage: '/images/projects/obviously-1/IMG_2624.png',
    overview:
      'Building a design system from the ground up requires patience not just for the design, but to also educate the stakeholders on the process and goals.',
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'obviously-1/context',
        audioTrack: '/audio/obviously-1/discovery.mp3',
        duration: 200,
      },
    ],
  },
  {
    id: 'obviously-2',
    title: "Obviously's Tech Debt",
    subtitle:
      "If the backlog of tech debt isn't sexy: augment the system so it unlocks new value. ",
    description: '',
    thumbnail: '/images/projects/obviously-2/thumbnail.jpg',
    category: 'ux-design',
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2022',
    client: 'Obviously',
    duration: '6 months',
    heroImage: '/images/projects/obviously-2/fillout.png',
    overview:
      'Tech debt will eventually strangle velocity on both code and design. Builiding a smart system on top of it can unlock speed, but also innovate new products.',
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'obviously-2/context',
        audioTrack: '/audio/obviously-2/discovery.mp3',
        duration: 200,
      },
    ],
  },
  {
    id: 'obviously-3',
    title: 'Obviously & AI (2023)',
    subtitle:
      "2023 AI wouldn't move the needle, but it inspired a lot of useful non-AI ideas.",
    description: '',
    thumbnail: '/images/projects/obviously-3/thumbnail.jpg',
    category: 'ux-design',
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2023',
    client: 'Obviously',
    duration: '10 months',
    heroImage: '/images/projects/obviously-3/miroboard.jpg',
    overview:
      'AI has evolved incredibly since 2023. Back then, the conclusions were nascent, but in brainstorming--we developed novel ideas with conventional tech that would still unlock value.',
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'obviously-3/context',
        audioTrack: '/audio/obviously-3/discovery.mp3',
        duration: 200,
      },
    ],
  },
  {
    id: 'mastercard-1',
    title: 'mastercard: Rapid Iterations',
    subtitle:
      'Highly collaborative sessions to help stakeholders articulate their vision',
    description: '',
    thumbnail: '/images/projects/mastercard-1/thumbnail.jpg',
    category: 'ux-design',
    tags: ['Workshops', 'Facilitation', 'Design Thinking'],
    year: '2021',
    client: 'mastercard',
    duration: '2 months',
    heroImage: '/images/projects/mastercard-1/mc_2.png',
    overview:
      "Sometimes you go faster by going slower but upping the frequency of iterations. Setting up frequent virtual sessions while live sketching and prototyping stakeholder's ideas.",
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'mastercard-1/context',
        audioTrack: '/audio/mastercard-1/discovery.mp3',
        duration: 200,
      },
      {
        id: 'adhoc',
        title: 'Dropping In',
        contentFile: 'mastercard-1/adhoc',
        audioTrack: '/audio/mastercard-1/concept.mp3',
        duration: 180,
      },
    ],
  },
  {
    id: 'worldpay-1',
    title: 'Worldpay Workshops: Asset Consolidation',
    subtitle: 'Design Thinking to Plan for Streamlining',
    description: '',
    thumbnail: '/images/projects/worldpay-1/thumbnail.jpg',
    category: 'technologist',
    tags: ['Front-end', 'Workshops', 'Facilitation', 'Design Thinking'],
    year: '2021',
    client: 'Worldpay (FIS)',
    duration: '3 months',
    heroImage: '/images/projects/worldpay-1/slides2.jpeg',
    overview:
      'Rapidly facititating workshops to reach alignment and consensus, and then coding the initial deliverables to jump start the transition.',
    sections: [
      {
        id: 'context',
        title: 'Context',
        contentFile: 'worldpay-1/context',
        audioTrack: '/audio/worldpay-1/discovery.mp3',
        duration: 200,
      },
      {
        id: 'virtual',
        title: 'Working Virtually',
        contentFile: 'worldpay-1/virtual',
        audioTrack: '/audio/worldpay-1/concept.mp3',
        duration: 180,
      },
      {
        id: 'coding',
        title: 'Coding',
        contentFile: 'worldpay-1/coding',
        audioTrack: '/audio/worldpay-1/execution.mp3',
        duration: 250,
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        contentFile: 'worldpay-1/gallery',
      },
    ],
  },
];

// Generate audio tracks from project data
export const audioTracks: AudioTrack[] = projects.flatMap(project =>
  project.sections
    .filter(section => section.audioTrack)
    .map(section => ({
      id: `${project.id}-${section.id}`,
      projectId: project.id,
      sectionId: section.id,
      title: `${project.title} - ${section.title}`,
      audioUrl: section.audioTrack!,
      duration: section.duration || 0,
    }))
);

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(
  category: Project['category']
): Project[] {
  return projects.filter(project => project.category === category);
}

export function getAudioTrackByIds(
  projectId: string,
  sectionId: string
): AudioTrack | undefined {
  return audioTracks.find(
    track => track.projectId === projectId && track.sectionId === sectionId
  );
}
