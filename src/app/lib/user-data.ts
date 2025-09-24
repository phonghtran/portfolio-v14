/**
 * @fileOverview This file contains the user's personal and professional data.
 * The chatbot will use this information to provide personalized feedback and suggestions.
 *
 * It is pre-filled with placeholder data. Please replace it with your own information.
 */

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

export const userProjects = [
  {
    title: 'Obviously and their first design system',
    client: 'Obviously',
    description: [
      "Starting in 2020, I was Obviously's first UX designer hire. The nine-year startup focused on influencer marketing campaigns and supporting its custom SASS platform to facilitate these campaigns. The company executes campaigns by finding influencers, managing the content creation process, and collecting analytics on the collective performance of those social media posts. Before I joined, they relied on the Engineering team and occasional freelancers to fulfill design needs.",
      "Years of engineer-led design decisions led to hundreds of inconsistencies on the component, page, and architecture levels. Also, half-hearted do-overs of the CSS meant it wasn't an easy fix.To tackle this, I initiated a series of phases and activities.A complete UI audit of every page. Interviews with the Director of Engineering to get the history the UI and CSS front-end stack. Building a brand new Design System with new typography, colors, layouts, and components based the existing Bootstrap framework. Working with Product on where we could implement this safely. Overhauling an isolated part of the system to completely redo the CSS architecture under the new Design System Progressively enhancing sub-system by sub-system until the transformation was complete.",
      'As the solo designer, I facilitated over 20 workshops. Not just for design but for executive leadership decision making, internal processes, and restructuring departmental teams. I would leverage Miro (virtual white boarding) since we were a remote-first company. But would get to use traditional post-it notes and sharpies for when we met in-person. Outcomes included quarterly roadmaps, new service workflows, and new products for the sales team to promote. Sometimes it would be as simple as getting alignment and consensus around a business problem.',
      'Complete Rework of Design Research Part of the rebuilding process was to refresh everything that the company thought it knew about its users and customers. This involved dozens and dozens of interviews with internal users, influencers and clients. Moving forward, we would institute: User Personas Buyer Personas Prototype-based testing Design Sprints',
      'Efficient Workflows with AI & Automation In efforts to scale up to ever bigger campaigns, I worked with Product to do a complete audit of the entire execution process from pre-sales to campaign reporting. This led to assessing over a dozen tools and vendor calls. Experimenting with tools and blending it with our data, I was able to spin up a rapid brainstorming process for campaign concepts. The main project would be to iterate our software platform for better notifications and automated reporting to reduce the amount of micro-management our teams were doing.',
      'Design Ops Working with Engineering, we instituted several changes to the Design-Engineering hand-off to include looms and sample front-end code. For every JIRA ticketing involving designs, I inserted a Design QA step to make sure every design was implemented correctly and was mobile-responsive. Separate tickets would be filed as low or high priority to not block the overall sprint, but still catch the errors. As overall internal visual design needs grew with client-facing materials, I built up a JIRA-based design request flow to manage the demands.',
      "Marketing for Us Historically, Obviously only leveraged PR interviews and paid SEO for marketing. Later on, when UX and software efforts were under control, an internal team was ramped up to handle more extensive marketing efforts. I updated our buyer personas, oversaw our team's analysis on our corporate site and leads generation, and helped organize a marketing plan based on specific products we sold as opposed.",
      "Acquisition Transition While I was at Obviously, we were acquired by a global advertising conglomerate. This transition required a rapid expansion of our visual language to account for our new partnership and ways of working. In addition, working out how we interfaced with our parent companies' clients via their various forms of relationships.",
    ],
    role: 'Director of Design ',
    technologies: ['Figma', 'Miro'],
    link: 'https://your-portfolio.com/project-alpha',
  },
  {
    title: 'Obviously and adapting tech debt',
    client: 'Obviously',
    description: [
      'Flexibility into a Rigid System I like this project because solved many business problems while avoiding things that businesses tend to have no appetite for.',
      'Problems Campaigns were getting increasingly diverse and deviating from the standard campaign workflow. Team members were secretly resorting to spreadsheets to track all the unique aspects of the campaign. The software was built so rigidly that adding any new aspects to the workflow was slow and costly. The selfish design solution would be to build a flexible modular architecture that could scale infinitely into whatever the client wanted. But the cost and risk of that would be unacceptable to the business.',
      ' Solution Enter "attributes." At the heart of every software is the data structure. Which means every concept or object in the system is a glorified table with columns and rows. By building a simple UI for users to effectively just add a column for any given object in a campaign, we unlocked a magnitude of flexibility without corrupting the underlying functionality.',
      'Each attribute is composed of a few elements:',
      'A name A label that the end user would see The component type (this could be a simple text box, a dropdown or even a media uploader) Permissions of who could view or edit this attribute A "short code", this code could be recognized by the system anywhere and output the value e.g. #payment# would render your payment.',
      'Outcomes Examples MVP: Eliminate 3rd-Party Vendors The first MVP was to add attributes to the "campaign application process." This was powerful as we could eliminate the use of SurveyMonkey while integrating the survey directly into the campaign itself. We could now directly ask the creators about their preferences and needs to be hired.',
      'This was immediately extended into asking creators for their concepts for consideration. Clients found this so appealing that this is now standard practice within the campaign flow. Both capabilities were unlocked by just adding this attribute concept to one object in the system without major refactoring of anything technological.',
      'Scaling 100x in Volume As we added attributes to each object in the system, this unlocked new categories of services we could sell and scale up.',
      'When we added attributes to the hired creators themselves, we could now track specific creative briefs per user and not just per campaign. This means it was trivial to scale up from tens of pieces of content to thousands of pieces of content per user. An example is before we could request videos about travel tips from our creators. But with attributes, we could assign every creator a city and a topic (two attributes), and the system could filter and sort track travel tip videos down to "The Bronx Zoo in NYC."',
      'Linear to Non-Linear At the limits of attributes is unlocking more complex and non-linear workflows. As stated before, each campaign is rigidly coded in a linear flow and never anticipated the need to repeat a phase or even revert to a previous phase.',
      'A new need that came in was for multiple people to approve the same piece of content. A certain class of clients wanted no mistakes and 100% oversight over every piece of content. This meant before we may have spot-checked a handful or had one person check, now we needed upwards of 5-6 people to approve.',
      "This would be difficult in any system and let's understand that attributes are still inadequate for a full-fledged audited workflow. But using attributes, we could spin up an MVP working skeleton of tracking people's approval status. The final approver would then have to manually check these statuses, but could then move it forward within the same overall linear workflow.",
      'In Short Often the least sexy solution from a UI or even grand architecture POV can have far-reaching benefits. Here a humble idea in both tech and design has unlocked millions of dollars for the business.',
    ],
    role: 'Director of Design ',
    technologies: ['Figma', 'Miro'],
    link: 'https://your-portfolio.com/project-alpha',
  },
  {
    title: 'Obviously and AI (2023)',
    client: 'Obviously',
    description: [
      'Need for Efficiency About a decade into Obviously existence, they sold themselves to an advertising conglomerate (WPP via VML, a daughter company of WPP.) Enthusiasm was optimistic until the realities of integration became real. ',
      'The shift in our client base during the acquisition fundamentally changed the philosophy of the company. Before it was a larger diversity of smaller companies that had fairly light demands on our services. The standard workflow of our software could handle the linear timelines of the campaigns. ',
      'However, the shift to mega multi-national corporations necessitated a more non-linear and dynamic workflow. This additional burden scales disproportionately on both the human labor and software flexibility needed. Meaning our new edict was now urgently about increasing efficiency. ',
      '"Can AI fix this?" The natural question from leadership was could AI replace all the things? To answer this, the PM and I embarked on a discovery project that involved cycles of: ',
      'Auditing existing processes. All team members were mapped to the flow of tasks as we understood them today. Auditing existing time sinks. Where were our colleagues spending the most time on their day-to-day? Interviewing all job roles. They outlined their day-to-day, their meetings, their worries and anxieties, and their goals. Taking vendor calls. Any-and-all AI vendors were vetted to see what services could be leveraged. Competitor audits. What was in their marketing, what did they promise and what could they deliver? Synthesis The conclusion of all of that research was "Not really, AI isn\'t there yet." ',
      'However, what we could outline was a three-phase campaign to increase efficiency via AI precursors of algorithms and machine learning. ',
      'Phase 1: Breaking the Anxiety Loop Phase 2: Automate the Repetition Phase 3: A Smarter "First Pass" with AI & Contractors status board of tasks to deadlines Retrofitting the old admin UI to display alerts and deadlines automated by the platform. ',
      'Phase 1: Breaking the Anxiety Loop The most glaring discovery was that none of our software tasks took that much time, but it was hidden in both the workflow and time tracking: keeping everyone on the team and the client informed of updates. As clients got bigger, they were increasingly anxious that things were progressing well. This meant each of our team members down the chain was investigating all big and little issues to allay that anxiety. ',
      'Also, ironically time tracking and status tracking internally became a time suck in itself. ',
      'So phase 1 was to realize that since everything ultimately has to be done within our software, we could easily use heuristics to determine how the campaign was doing and tracked against the timelines. We could even time track automatically because we could determine which clicks happened when and by whom. ',
      'By applying the thresholds that the team intuited we could program that logic into warnings and notifications. For example, "I know my client gets worried if only 80% of people are hired within 24 hours of the deadline." ',
      "We refactored everyone's homepage and every detail page of every campaign and contract to show its progress and thresholds. Eliminating the dozens of spreadsheet trackers the teams had built and the number of daily meetings and slack messages to update each other. ",
      'mockups of advanced search Updating the basic search with automations, sorting by attributes, and batch actions. ',
      'Phase 2: Automate the Repetition Through interviews, we uncovered many "hacks" our team was doing to accomplish their tasks. An example would be that they often had to do multiple rounds of looking for creators to sign up. Each search could often result in the same people appearing over and over because they match the criteria of each search. ',
      'Our software historically assumed one search was adequate because the client would maintain more static list of creators they liked to work with. But today, clients want a fresh pool of creators each time to reach new audiences. ',
      'Our software historically assumed one search was adequate because the client would maintain a more static list of creators they liked to work with. But today, clients want a fresh pool of creators each time to reach new audiences. ',
      "This and dozens of other automations were implemented to remove all the repetitive tasks that computers have always done better than humans. This isn't AI but can be incredibly effective. ",
      'Fancier tricks do require fancier tech, however, as our backlog included machine learning. Often, our team has an intuition of a good creator for a client and adds special parameters to their searches. If we could convert them into tags and crunch the data that we have exclusively such as their performance metrics and history--we could apply those profiles to the overall creator network that we have. This would enrich every search moving forward. ',
      'Then collecting data from phase 1, we could even optimize how we construct more contracts and set up the timelines to better scale the business. This could be applied to the programmed business logic of warnings and notifications to better hone those parameters dynamically over time. ',
      'mockup of new vetting card Quick mockup of new functionality to stakeholders. The key is the central checklist which can receive tasks from humans or any AI automations being run. ',
      'Phase 3: A Smarter "First Pass" with AI & Contractors Finally, AI comes into play. A huge gap with LLMs, the main engine that powers AI today, is that it has little bearing on our specialized workflows and campaigns. ',
      "We don't need asset generation because our entire business is to collect novel content from social media influencers and creators. We don't need prompts because that's the role of our strategists with our clients. Also, it's hard to automate the communication channels because often the client-team comms are about the specific campaign itself that only lasts 3-6 months. ",
      'So even an AI trained on our data and platform would have to be able to delineate each client, contract, and campaign without contamination. ',
      'However, we realized we could lightly apply AI to specific tasks. The AI would do the "first pass." It would never make any official changes or official communications to the client, but rather draft the first pass of suggestions or findings for a team member to verify. ',
      'For example, we could let it parse all the captions in the system and build a list of suggestions like a spell checker. Or digest a creative brief and suggest starter ideas for the creators hired for the campaign. ',
      "Very small admittedly but that's the state of AI when we looked into during the summer of 2023. I'm sure if we invested in RAGs and federated the data we were fed by clients, we could formulate more ambitious AI automations. ",
      'Conclusion The general adage for this project is less about the cutting edge but by distilling older principles and technologies -- you achieve what the cutting edge promises. Old-school algorithms, automations, and workflow modifications are less sexy but can add up to the efficiencies that a business needs. ',
    ],
    role: 'Director of Design ',
    technologies: ['Figma', 'Miro'],
    link: 'https://your-portfolio.com/project-alpha',
  },
  {
    title: 'mastercard and turning the amorophous into the specific',
    client: 'mastercard',
    description: [
      "It's one of those projects where it's less about the UX and designs, but more about the approach and meeting the client where they are. The client team had a vision for a streamlined internal process of data ingest and visualization. However, the existing team was having trouble translating the requirements and desires into designs that matched the clients' wants.",
      'With the client super frustrated, it was thought I could try leading the project and bring in a fresh perspective. Instead of redoing all the workshop activities and re-interviewing all the stakeholders again, I decided to dive right in. On our virtual calls, I opened up Figma and just let them describe how they saw the project and its features. While they talked I attempted to sketch out the systems and flows they were discussing. It helped that I had a technical background and could understand database systems and ETL flows.',
      'In each discussion, we had sketches and workflows that they felt happy with. More importantly, I learned their trust to keep the talks going. As I gained more confidence that I was interpreting their vision correctly, I would work with our designers to work out screens to flesh out. Those would be shown to the client, get approved, and we would then move to the next set of screens to sketch out live. Each day would be a bit different as I would drive them toward the priority of the day, whether it was wireframes, user stories, or screens to react to.',
      'Figma prototypes doubled as slide presentations as we were already in those files so intensely every day. We could link dynamically each workflow as it matured and was worked on.',
    ],
    role: 'Lead UX Designer',
    technologies: ['Figma', 'Miro'],
    link: 'https://your-portfolio.com/project-alpha',
  },
  {
    title: 'Consolidating redundant developer portals at Worldpay (FIS)',
    client: 'Worldpay (FIS)',
    description: [
      'After a series of acquisitions and mergers, Worldpay was left with a multitude of technologies each with its own developer tools and portals. As a consulting team, we were brought to assess, recommend, and formulate a solution to merge all the portal experiences into a unified platform. We were a three-person team with three months to execute. I contributed to conducting research, co-facilitating workshops, and synthesis. Shared the architecture and UX work while a visual specialist extended the design system. An additional deliverable was my coding of Angular components for their development team.',
      "During this project, the state of the world didn't allow for easy travel. So we conducted everything virtually including workshops with the client. We reviewed workflows and architecture and sketched out ideas using screen sharing. Even conducting individual brainstorming and worksheets in our Miro whiteboarding space. The three of us took turns facilitating, cleaning up the boards, and taking notes to move the stakeholders from activity to activity throughout the Miro board.",
      "It wasn't planned but as we got closer to delivery, the client was rushed to get implementation up and running. I asked about their tech stack and since I could code in AngularJS, we offered coding up the design system and UI components for them as an add-on. When they agreed, I spent a two-week sprint coding up their front end.",
    ],

    role: 'UX, Design Technologist, Front End Developer',
    technologies: ['Miro', 'Figma', 'AngularJS'],
    link: 'https://your-portfolio.com/project-beta',
  },
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
**Link:** ${p.link}
`
  )
  .join('')}

## Resume
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
