/**
 * @fileOverview This file contains the user's personal and professional data.
 * The chatbot will use this information to provide personalized feedback and suggestions.
 *
 * It is pre-filled with placeholder data. Please replace it with your own information.
 */

export const userProfile = {
  name: "Phong Tran",
  headline: "UX Designer | Interaction Designer | Product Designer",
  summary: "A passionate and creative UX designer with a knack for solving complex user problems. I specialize in creating intuitive and engaging digital experiences. I am currently looking for a full-time position in a fast-paced and collaborative environment.",
  skills: ["User Research", "Wireframing", "Prototyping", "Interaction Design", "Visual Design", "Usability Testing", "Figma", "Sketch", "Adobe XD"]
};

export const userProjects = [
  {
    title: "Project Alpha",
    description: "A mobile app for a fictional company that helps users find and book local services. I was responsible for the entire design process, from user research to high-fidelity prototyping.",
    role: "Lead UX Designer",
    technologies: ["Figma", "Miro", "Jira"],
    link: "https://your-portfolio.com/project-alpha"
  },
  {
    title: "Project Beta",
    description: "A website redesign for a non-profit organization. My goal was to improve the user experience and increase donations. I conducted user interviews, created wireframes, and designed a new visual identity.",
    role: "UX/UI Designer",
    technologies: ["Sketch", "InVision", "Google Analytics"],
    link: "https://your-portfolio.com/project-beta"
  }
];

export const userExperience = [
  {
    company: "Tech Solutions Inc.",
    role: "UX Designer",
    duration: "Jan 2022 - Present",
    responsibilities: [
      "Led the design of a new feature for a SaaS product, resulting in a 20% increase in user engagement.",
      "Conducted user research and usability testing to inform design decisions.",
      "Collaborated with product managers and engineers to deliver a high-quality product."
    ]
  },
  {
    company: "Creative Agency",
    role: "Junior UX Designer",
    duration: "Jun 2020 - Dec 2021",
    responsibilities: [
      "Assisted senior designers with various projects, including wireframing, prototyping, and visual design.",
      "Created design assets for web and mobile applications.",
      "Participated in brainstorming sessions and design critiques."
    ]
  }
];

export const portfolioContent = `
# Portfolio of ${userProfile.name}

## About Me
${userProfile.summary}

## Skills
${userProfile.skills.join(', ')}

## Projects
${userProjects.map(p => `
### ${p.title}
**Role:** ${p.role}
**Description:** ${p.description}
**Link:** ${p.link}
`).join('')}

## Experience
${userExperience.map(e => `
### ${e.role} at ${e.company} (${e.duration})
**Responsibilities:**
${e.responsibilities.map(r => `- ${r}`).join('\n')}
`).join('')}
`;
