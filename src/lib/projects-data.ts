// Project case study data types and structure

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  images?: string[];
  audioTrack?: string; // Path to audio file for this section
  duration?: number; // Duration in seconds
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: 'ux-design' | 'development' | 'branding' | 'research';
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
    id: 'project-1',
    title: 'E-commerce Mobile App',
    subtitle: 'UX/UI Design & Prototyping',
    description:
      'Complete mobile app redesign focusing on user journey optimization',
    thumbnail: '/images/projects/project-1/thumbnail.jpg',
    category: 'ux-design',
    tags: ['Mobile', 'E-commerce', 'User Research', 'Prototyping'],
    year: '2024',
    client: 'RetailCorp',
    duration: '3 months',
    heroImage: '/images/projects/project-1/hero.jpg',
    overview:
      'This project involved redesigning a mobile e-commerce application to improve user experience and increase conversion rates.',
    sections: [
      {
        id: 'research',
        title: 'Research & Discovery',
        content:
          'Conducted user interviews and competitive analysis to understand pain points.',
        images: [
          '/images/projects/project-1/research-1.jpg',
          '/images/projects/project-1/research-2.jpg',
        ],
        audioTrack: '/audio/project-1/research.mp3',
        duration: 30,
      },
      {
        id: 'ideation',
        title: 'Ideation & Wireframing',
        content: 'Developed multiple concepts and low-fidelity wireframes.',
        images: ['/images/projects/project-1/wireframes.jpg'],
      },
      {
        id: 'design',
        title: 'Visual Design',
        content: 'Created high-fidelity mockups and interactive prototypes.',
        images: [
          '/images/projects/project-1/mockup-1.jpg',
          '/images/projects/project-1/mockup-2.jpg',
        ],
        audioTrack: '/audio/project-1/design.mp3',
        duration: 300,
      },
      {
        id: 'testing',
        title: 'Testing & Iteration',
        content:
          'Conducted usability testing and refined the design based on feedback.',
        images: ['/images/projects/project-1/testing.jpg'],
        audioTrack: '/audio/project-1/testing.mp3',
        duration: 200,
      },
      {
        id: 'results',
        title: 'Results & Metrics',
        content:
          'Post-launch analysis showed a 40% increase in conversion rates and 25% improvement in user satisfaction scores.',
        images: ['/images/projects/project-1/results-chart.jpg'],
        // No audio for this section - just visual content
      },
      {
        id: 'learnings',
        title: 'Key Learnings',
        content:
          'This project taught us the importance of early user testing and iterative design. The mobile-first approach proved crucial for user adoption.',
        // No images or audio - just text content
      },
    ],
  },
  {
    id: 'project-2',
    title: 'Dashboard Analytics Platform',
    subtitle: 'Frontend Development & UX',
    description:
      'Real-time analytics dashboard with complex data visualizations',
    thumbnail: '/images/projects/project-2/thumbnail.jpg',
    category: 'development',
    tags: ['React', 'Data Viz', 'Dashboard', 'Frontend'],
    year: '2024',
    client: 'TechStartup',
    duration: '4 months',
    heroImage: '/images/projects/project-2/hero.jpg',
    overview:
      'Built a comprehensive analytics dashboard with real-time data visualization and user management.',
    sections: [
      {
        id: 'requirements',
        title: 'Requirements Analysis',
        content: 'Analyzed business requirements and technical specifications.',
        images: ['/images/projects/project-2/requirements.jpg'],
        audioTrack: '/audio/project-2/requirements.mp3',
        duration: 150,
      },
      {
        id: 'architecture',
        title: 'Technical Architecture',
        content: 'Designed the frontend architecture and component structure.',
        images: ['/images/projects/project-2/architecture.jpg'],
        audioTrack: '/audio/project-2/architecture.mp3',
        duration: 220,
      },
      {
        id: 'implementation',
        title: 'Development & Implementation',
        content: 'Built components using React, TypeScript, and D3.js.',
        images: [
          '/images/projects/project-2/code-1.jpg',
          '/images/projects/project-2/code-2.jpg',
        ],
        audioTrack: '/audio/project-2/implementation.mp3',
        duration: 360,
      },
    ],
  },
  {
    id: 'project-5',
    title: 'Brand Identity System',
    subtitle: 'Visual Identity & Guidelines',
    description: 'Complete brand redesign for a sustainable fashion startup',
    thumbnail: '/images/projects/project-3/thumbnail.jpg',
    category: 'branding',
    tags: ['Branding', 'Visual Identity', 'Logo Design', 'Style Guide'],
    year: '2023',
    client: 'EcoFashion Co.',
    duration: '2 months',
    heroImage: '/images/projects/project-3/hero.jpg',
    overview:
      'Created a comprehensive brand identity system including logo, color palette, typography, and brand guidelines.',
    sections: [
      {
        id: 'discovery',
        title: 'Brand Discovery',
        content:
          'Explored brand values, target audience, and market positioning.',
        images: ['/images/projects/project-3/discovery.jpg'],
        audioTrack: '/audio/project-3/discovery.mp3',
        duration: 200,
      },
      {
        id: 'concept',
        title: 'Concept Development',
        content: 'Developed multiple logo concepts and visual directions.',
        images: ['/images/projects/project-3/concepts.jpg'],
        audioTrack: '/audio/project-3/concept.mp3',
        duration: 180,
      },
      {
        id: 'execution',
        title: 'Final Execution',
        content:
          'Refined the final logo and created comprehensive brand guidelines.',
        images: [
          '/images/projects/project-3/final-logo.jpg',
          '/images/projects/project-3/guidelines.jpg',
        ],
        audioTrack: '/audio/project-3/execution.mp3',
        duration: 250,
      },
    ],
  },
  {
    id: 'project-4',
    title: 'Brand Identity System',
    subtitle: 'Visual Identity & Guidelines',
    description: 'Complete brand redesign for a sustainable fashion startup',
    thumbnail: '/images/projects/project-3/thumbnail.jpg',
    category: 'branding',
    tags: ['Branding', 'Visual Identity', 'Logo Design', 'Style Guide'],
    year: '2023',
    client: 'EcoFashion Co.',
    duration: '2 months',
    heroImage: '/images/projects/project-3/hero.jpg',
    overview:
      'Created a comprehensive brand identity system including logo, color palette, typography, and brand guidelines.',
    sections: [
      {
        id: 'discovery',
        title: 'Brand Discovery',
        content:
          'Explored brand values, target audience, and market positioning.',
        images: ['/images/projects/project-3/discovery.jpg'],
        audioTrack: '/audio/project-3/discovery.mp3',
        duration: 200,
      },
      {
        id: 'concept',
        title: 'Concept Development',
        content: 'Developed multiple logo concepts and visual directions.',
        images: ['/images/projects/project-3/concepts.jpg'],
        audioTrack: '/audio/project-3/concept.mp3',
        duration: 180,
      },
      {
        id: 'execution',
        title: 'Final Execution',
        content:
          'Refined the final logo and created comprehensive brand guidelines.',
        images: [
          '/images/projects/project-3/final-logo.jpg',
          '/images/projects/project-3/guidelines.jpg',
        ],
        audioTrack: '/audio/project-3/execution.mp3',
        duration: 250,
      },
    ],
  },
  {
    id: 'project-3',
    title: 'Brand Identity System',
    subtitle: 'Visual Identity & Guidelines',
    description: 'Complete brand redesign for a sustainable fashion startup',
    thumbnail: '/images/projects/project-3/thumbnail.jpg',
    category: 'branding',
    tags: ['Branding', 'Visual Identity', 'Logo Design', 'Style Guide'],
    year: '2023',
    client: 'EcoFashion Co.',
    duration: '2 months',
    heroImage: '/images/projects/project-3/hero.jpg',
    overview:
      'Created a comprehensive brand identity system including logo, color palette, typography, and brand guidelines.',
    sections: [
      {
        id: 'discovery',
        title: 'Brand Discovery',
        content:
          'Explored brand values, target audience, and market positioning.',
        images: ['/images/projects/project-3/discovery.jpg'],
        audioTrack: '/audio/project-3/discovery.mp3',
        duration: 200,
      },
      {
        id: 'concept',
        title: 'Concept Development',
        content: 'Developed multiple logo concepts and visual directions.',
        images: ['/images/projects/project-3/concepts.jpg'],
        audioTrack: '/audio/project-3/concept.mp3',
        duration: 180,
      },
      {
        id: 'execution',
        title: 'Final Execution',
        content:
          'Refined the final logo and created comprehensive brand guidelines.',
        images: [
          '/images/projects/project-3/final-logo.jpg',
          '/images/projects/project-3/guidelines.jpg',
        ],
        audioTrack: '/audio/project-3/execution.mp3',
        duration: 250,
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
