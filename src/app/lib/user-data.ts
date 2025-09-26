/**
 * @fileOverview This file contains the user's personal and professional data.
 * The chatbot will use this information to provide personalized feedback and suggestions.
 *
 * It is pre-filled with placeholder data. Please replace it with your own information.
 */

import { projects, type Project } from '../../lib/projects-data';

export const userProfile = {
  name: 'Phong Tran',
  headline:
    'UX Designer | Interaction Designer | Product Designer | Front End Coder | Researcher',
  summary:
    "I'm a systems-based thinker who solves problems with design and Design Thinking. The majority of my career is working with large enterprise clients helping scale up their SaaS platforms and applications. I believe in collaboration and getting to rapid conclusions with workshops and moderated conversations. I leverage the tools of design (sketching, prototyping, whiteboarding) to translate business needs into UX design and code.",
  skills: [
    'Figma',
    'Miro',
    'Design Thinking',
    'interactive prototypes',
    'front end CSS and Javascript',
    'CSS frameworks e.g. Bootstrap & Tailwind',
    'Adobe Illustrator',
    'Photoshop',
    'Sketch',
    'user research & interviews',
    'Vue',
    'React',
    'Angular',
    'SQL',
  ],
};

// Type definition for user project format
interface UserProject {
  title: string;
  client: string;
  description: string[];
  role: string;
  technologies: string[];
  year: string;
  duration: string;
}

// Transform projects from projects-data.ts to match user-data format
function transformProjectToUserFormat(project: Project): UserProject {
  return {
    title: project.title,
    client: project.client || 'Portfolio Project',
    description: [project.subtitle, project.overview], // Using overview as main description
    role: project.role, // Default role, can be customized per project
    technologies: project.technologies || [],
    year: project.year,
    duration: project.duration,
  };
}

// Legacy project data for projects not in the case studies system
const legacyProjects: UserProject[] = [
  // Keep any additional projects here that aren't in the case studies system
];

// Generate userProjects by combining transformed projects-data and legacy projects
export const userProjects = [
  ...projects.map(transformProjectToUserFormat),
  ...legacyProjects,
];

export const userExperience = [
  {
    company: 'Fannie Mae',
    role: 'Lead Associate - UX Designer',
    duration: 'April 2024 - Present',
    responsibilities: [
      'Fannie Mae is a financial institution specializing in the mortgage loan industry. I worked within the Pricing software teams within Capital Markets as both a UX specialist and organizational change coach. Fannie Mae wanted smaller squads that would create more impact with faster pacing. I coached on new ceremonies and processes across Product, Design and Tech to move away from traditional SAFE and Agile.',
    ],
  },
  {
    company: 'Obviously',
    role: 'Director of Design (was Lead Designer)',
    duration: 'April 2021 - February 2024',
    responsibilities: [
      'Obviously is a social media agency (acquired by VMLY&R of WPP in 2022.) I built up their design practice end-to-end as their first design hire. From a leadership POV, I mentored PMs and designers and implemented new company-wide processes for efficiency and scaling. Individual contributions include qualitative research, workshop facilitation, user journey mapping, mock-ups, high-fidelity Figma designs, and usability testing.',
      'Overhauled both of their user-facing portals to streamline the content creation process. CSAT up 10% with redesign.',
      'Internal UX re-architecture saved 120+ hours (36% reduction) of time spent for the team.',
      'Designed a new configuration process that scaled up campaigns 100x without having to rebuild the base technology.',
      'Led the effort to build their first Design System (in Figma.)',
      'Conducted over 30 user interviews and mentored juniors in their research efforts.',
      'Planned and facilitated over 15 workshops (virtual and in-person.)',
      'Implemented Heap Analytics to track workflow patterns.',
      'Created wireframes and prototypes for over 60 features.',
      '4.4% increased sign-ups after form redesign (32.7% to 37.1%).',
    ],
  },
  {
    company: 'Designit',
    role: 'Senior Design Technologist',
    duration: 'June 2018 - March 2021',
    responsibilities: [
      'Designit is a global design consultancy with a roster of Fortune 500 companies. My key clients were PNC Bank, Mastercard, GSK, and FedEx.',
      'Led or helped facilitate numerous workshops for alignment or getting to rapid solutions.',
      'Executed UX mockups and prototypes across 8+ clients projects;',
      'Learned AngularJS to accelerate live demos for GSK prototype.',
      'Helping PNC Bank with their high wealth customer segment, they extended my contract 3x to continue my services;',
      "Researched FedEx\'s logistics model to map out the mainframe transition to the cloud.",
    ],
  },
  {
    company: 'Cornerstone OnDemand',
    role: ' Senior Product Designer',
    duration: 'November 2015 - January 2018 ',
    responsibilities: [
      'Cornerstone OnDemand is a cloud based SASS suite of HR enterprise software. I executed major features for their Learning, Performance, and Data Reporting apps. Helping PMs with discovery and creating mockups and high fidelity screens.',
    ],
  },
  {
    company: 'HR Cloud (NEOGOV)',
    role: 'Lead UX Manager',
    duration: ' May 2015 - November 2015 ',
    responsibilities: [
      "Managed a team of three UX designers to deliver on HR Cloud\'s suite of SASS software applications and NEOGOV\'s suite of software specialized to government clients. Collaborated with the Marketing Design Lead to direct the overall team of seven designers.",
    ],
  },
  {
    company: 'IBM',
    role: 'UX Designer ',
    duration: 'December 2013 - April 2015 ',
    responsibilities: [
      "Primarily owned the design of IBM\'s cloud based database software, DashDB. Co led the research, wire framing, mapping, and UX in the US arm of DashDB\'s international distributed team. Cross org with other designers, we worked to advocate Design Thinking to all of IBM.",
    ],
  },
  {
    company: 'Catalyst Studios',
    role: 'Product Designer & Front-End Developer',
    duration: ' March 2012 - December 2012 ',
    responsibilities: [
      "A 8-person boutique agency specializing in delivering design and platforms. Contributed to NBA\'s Timberwolves in stadium interactive prototype connecting fans digitally to the physical.",
    ],
  },
  {
    company: 'dblthink',
    role: 'Creative Lead / Co-Founder',
    duration: ' July 2010 - March 2012 ',
    responsibilities: [
      'Co-founded a creative agency focused on leveraging social media apis to build custom audience interactions and activations.',
    ],
  },
  {
    company: 'phonghtran LLC',
    role: 'Freelance Designer & Developer ',
    duration: 'August 2009 - Present ',
    responsibilities: [
      'Worked on various design and development projects for clients, focusing on user experience and interface design.',
    ],
  },
  {
    company: 'MLT Vacations',
    role: 'Internet Production Designer',
    duration: ' May 2008 - August 2009  ',
    responsibilities: [
      'Created and produced banner ads and other interactive marketing materials.',
    ],
  },
];

export const portfolioContent = `
# Portfolio of ${userProfile.name}

## About Me
${userProfile.summary}

## Headline 
  Strategic UX Designer | Cross-Functional Facilitator | Emerging Design Leader

## Summary Statement:
  Senior UX designer with 20+ years of experience guiding teams through discovery, alignment, and execution. Known for cross-functional fluency, resonant storytelling, and strategic facilitation. Currently evolving leadership capacity to support mentorship, team planning, and sustained impact.


## Strengths to Highlight
### Strategic Discovery & Facilitation
* Leads early-stage discovery with cross-functional teams to surface high-potential opportunities and align divergent perspectives.
###  Cross-Functional Fluency
  * Uses Figma and Miro as facilitation tools to synthesize input, visualize strategy, and guide teams toward actionable outcomes.
###  Cross-Functional Fluency
* Bridges technical and non-technical teams with ease, translating strategic goals into design opportunities and vice versa.”

 * Known for building trust across engineering, product, and business stakeholders.
###  Presentation & Engagement
* Delivers resonant presentations that spark alignment and momentum; uses humor and analogy to make complex ideas accessible.
###  Strategic Alignment
* Excels at guiding teams back to strategic goals, ensuring design decisions ladder up to business impact.

---

## 🌱 Growth Areas (Framed as Leadership Development)
###  Selling Ideas Repeatedly
  * You thrive in the initial pitch but lose steam in repetition. This suggests a need for **advocacy systems**—tools, allies, or rituals that help carry the message forward without burning you out.
  * Seeking to build scalable advocacy frameworks to sustain momentum and stakeholder buy-in across phases.
 ### Ambiguity Without Anchors
  * You're energized by constraints and strategic direction. This is a strength in environments that value **goal-driven creativity
  * Thrives when strategic goals are defined; skilled at translating them into design direction. Actively developing tools to navigate ambiguity with greater ease.
*###  Leadership Anxiety
  * You've led teams before and are aware of the emotional labor involved. That self-awareness is a leadership asset.
  * Experienced in team leadership; currently deepening capacity for mentorship, pipeline planning, and sustainable team dynamics.

## Skills
${userProfile.skills.join(', ')}

## Projects
${userProjects
  .map(
    p => `
### ${p.title}
**Client:** ${p.client}
**Role:** ${p.role}
**Description:** ${p.description.join(', ')}
**Technologies:** ${p.technologies.join(', ')}
**Year:** ${p.year}
**Duration:** ${p.duration}
`
  )
  .join('')}

## Resume / CV Link
https://drive.google.com/file/d/1mV6YmcOtbtGZBgOERzwr5SmDBpGyNkNU/view

## Contact Info
**Email:** phong@phonghtran.com
**Phong:** 612-481-4203

## Experience
${userExperience
  .map(
    e => `
### ${e.role} at ${e.company} (${e.duration})
**Responsibilities:**
${e.responsibilities.map(r => `- ${r}`).join('\n')}
`
  )
  .join('')}
`;
