// Project case study data types and structure

export interface ProjectSection {
  id: string;
  title: string;
  content: string[];
  contentType: 'paragraph' | 'bullets';
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
        content: [
          'It’s one of those projects where it’s less about the UX and designs, but more about the approach and meeting the client where they are. The client team had a vision for a streamlined internal process of data ingest and visualization. However, the existing team was having trouble translating the requirements and desires into designs that matched the clients’ wants.',
        ],
        contentType: 'paragraph',
        images: [
          '/images/projects/mastercard-1/mc_1.jpg',
          '/images/projects/mastercard-1/mc_3.png',
        ],
        audioTrack: '/audio/mastercard-1/discovery.mp3',
        duration: 200,
      },
      {
        id: 'adhoc',
        title: 'Dropping In',
        content: [
          'With the client super frustrated, it was thought I could try leading the project and bring in a fresh perspective. Instead of redoing all the workshop activities and re-interviewing all the stakeholders again, I decided to dive right in. On our virtual calls, I opened up Figma and just let them describe how they saw the project and its features. While they talked I attempted to sketch out the systems and flows they were discussing. It helped that I had a technical background and could understand database systems and ETL flows.',

          'In each discussion, we had sketches and workflows that they felt happy with. More importantly, I learned their trust to keep the talks going. As I gained more confidence that I was interpreting their vision correctly, I would work with our designers to work out screens to flesh out. Those would be shown to the client, get approved, and we would then move to the next set of screens to sketch out live. Each day would be a bit different as I would drive them toward the priority of the day, whether it was wireframes, user stories, or screens to react to.',

          'Figma prototypes doubled as slide presentations as we were already in those files so intensely every day. We could link dynamically each workflow as it matured and was worked on.',
        ],
        contentType: 'paragraph',
        images: [
          '/images/projects/mastercard-1/mc_2.png',
          '/images/projects/mastercard-1/ScreenShot2021-03-17at10.50.35AM.png.png',
        ],
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
        content: [
          'After a series of acquisitions and mergers, Worldpay was left with a multitude of technologies each with its own developer tools and portals. As a consulting team, we were brought to assess, recommend, and formulate a solution to merge all the portal experiences into a unified platform. We were a three-person team with three months to execute. I contributed to conducting research, co-facilitating workshops, and synthesis. Shared the architecture and UX work while a visual specialist extended the design system. An additional deliverable was my coding of Angular components for their development team.',
        ],
        contentType: 'paragraph',
        images: [
          '/images/projects/worldpay-1/ScreenShot2020-04-16at1.29.16PM.png',
        ],
        audioTrack: '/audio/worldpay-1/discovery.mp3',
        duration: 200,
      },
      {
        id: 'virtual',
        title: 'Working Virtually',
        content: [
          'During this project, the state of the world didn’t allow for easy travel. So we conducted everything virtually including workshops with the client. We reviewed workflows and architecture and sketched out ideas using screen sharing. Even conducting individual brainstorming and worksheets in our Miro whiteboarding space. The three of us took turns facilitating, cleaning up the boards, and taking notes to move the stakeholders from activity to activity throughout the Miro board.',
        ],
        contentType: 'paragraph',
        images: [
          '/images/projects/worldpay-1/ScreenShot2020-04-07at3.09.35PM.png',
          '/images/projects/worldpay-1/ScreenShot2020-05-19at4.01.47PM.png',
        ],
        audioTrack: '/audio/worldpay-1/concept.mp3',
        duration: 180,
      },
      {
        id: 'coding',
        title: 'Coding',
        content: [
          'It wasn’t planned but as we got closer to delivery, the client was rushed to get implementation up and running. I asked about their tech stack and since I could code in AngularJS, we offered coding up the design system and UI components for them as an add-on. When they agreed, I spent a two-week sprint coding up their front end.',
        ],
        contentType: 'paragraph',
        images: [
          '/images/projects/worldpay-1/wp_2.png',
          '/images/projects/worldpay-1/wp_3.png',
          '/images/projects/worldpay-1/wp_1.png',
          '/images/projects/worldpay-1/ScreenShot2020-06-03at10.43.12AM.png',
        ],
        audioTrack: '/audio/worldpay-1/execution.mp3',
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
