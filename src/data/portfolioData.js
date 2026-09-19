export const personalInfo = {
  name: "Muralitharan",
  title: "Full Stack & Software Engineer",
  tagline: "I build fast, scalable applications using Java, Spring Boot, MERN Stack, and Python.",
  bio: "Passionate software engineer with expertise in building scalable web applications, sleek user interfaces, and robust backend systems. Focused on clean code, performance optimization, and delightful user experience.",
  location: "Tamil Nadu, India",
  email: "muralitharandev@gmail.com",
  github: "https://github.com/muralimdev07",
  linkedin: "https://www.linkedin.com/in/muralitharandev",
  twitter: "https://x.com",
  instagram: "https://www.instagram.com/_murali.m__/?hl=en",
  availability: "Available for freelance & full-time roles",
  stats: [
    { label: "Years Learning", value: "3+" },
    { label: "Projects Built", value: "10+" },
    { label: "Certifications", value: "5+" },
    { label: "Passion", value: "100%" },
  ]
};

export const skillsData = [
  {
    category: "Full Stack & Core",
    skills: [
      { name: "Java / Spring Boot", level: 92, icon: "☕" },
      { name: "React / MERN Stack", level: 95, icon: "⚡" },
      { name: "Python / FastAPI", level: 88, icon: "🐍" },
      { name: "JavaScript / TypeScript", level: 94, icon: "🟨" },
      { name: "HTML5 / Modern CSS", level: 98, icon: "🌐" },
    ]
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Node.js / Express", level: 90, icon: "🚀" },
      { name: "PostgreSQL / MongoDB", level: 88, icon: "🗄️" },
      { name: "RESTful APIs / GraphQL", level: 92, icon: "🔌" },
      { name: "Redis Caching", level: 84, icon: "⚡" },
      { name: "Docker & AWS Cloud", level: 80, icon: "☁️" },
    ]
  },
  {
    category: "Tools & Engineering",
    skills: [
      { name: "Git / GitHub / CI/CD", level: 95, icon: "📦" },
      { name: "Vite / Webpack", level: 90, icon: "⚙️" },
      { name: "Oxlint / ESLint", level: 95, icon: "✨" },
      { name: "Figma / UI Design", level: 82, icon: "📐" },
      { name: "Agile & Microservices", level: 90, icon: "👥" },
    ]
  }
];

export const projectsData = [
  {
    id: "developer-portfolio",
    title: "Interactive Developer Portfolio",
    shortDescription: "A high-performance developer portfolio built with React, Vite, and modern CSS featuring rich micro-interactions, responsive design, and dark/light themes.",
    longDescription: "A state-of-the-art interactive developer portfolio designed to showcase technical skills, verified certifications, learning journey milestones, and contact inquiries. Features a custom theme engine (Dark & Light modes), responsive sticky editorial showcases, smooth interactive timeline, and direct resume access.",
    category: "Full Stack & Web",
    tags: ["React", "Vite", "JavaScript", "Modern CSS", "Responsive UI", "Dark / Light Theme"],
    image: "/portfolio_showcase.jpg",
    demoUrl: "#hero",
    githubUrl: "https://github.com/muralimdev07",
    featured: true,
    highlights: [
      "Custom Dark & Light theme engine with persistent state storage",
      "Interactive horizontal swipe & scroll editorial certificate showcase",
      "Interactive timeline journey with milestone progress tracking",
      "One-click verified resume download & direct contact integrations"
    ]
  }
];

export const experienceData = [
  {
    period: "2023 - Present",
    role: "Senior Full Stack Engineer",
    company: "Apex Tech Solutions",
    description: "Leading core software development with Java, Spring Boot, React, and Python microservices.",
    achievements: [
      "Built enterprise Spring Boot APIs handling over 1M+ requests daily with 99.99% uptime.",
      "Optimized MERN & React frontends, reducing initial page load times by 45%.",
      "Mentored engineering teams on modern microservices design patterns."
    ]
  },
  {
    period: "2021 - 2023",
    role: "Software Developer",
    company: "Innovate Digital Labs",
    description: "Architected scalable backend services and responsive client web applications.",
    achievements: [
      "Developed 15+ microservices integrated with PostgreSQL and MongoDB.",
      "Designed real-time notification engine using WebSockets and Redis.",
      "Automated CI/CD pipelines with GitHub Actions & Docker."
    ]
  },
  {
    period: "2020 - 2021",
    role: "Junior Web Developer",
    company: "ByteCraft Studio",
    description: "Built interactive web applications, client portals, and REST API integrations.",
    achievements: [
      "Created reusable UI component libraries.",
      "Collaborated with cross-functional product teams to release 5+ major client features."
    ]
  }
];

export const achievementsData = [
  {
    id: "nscet-official-website",
    badge: "OFFICIAL STAGE LAUNCH • PRODUCTION SYSTEM",
    title: "College Website",
    highlightTitle: "Re-Architecture",
    institution: "Nadar Saraswathi College of Engineering & Technology (NSCET)",
    collegeUrl: "https://www.nscet.org/",
    launchDate: "September 9, 2026",
    launchEvent: "17th Induction & Freshers Day Official Launch",
    teamSize: "6-Member Student Engineering Team",
    myRole: "Backend Architecture & Database Engineering",
    shortDescription: "Complete full-stack modernization of the official Nadar Saraswathi College of Engineering & Technology website, transitioning from legacy PHP to a high-performance React, Node.js & MySQL architecture launched live on stage.",
    summary: "Re-engineered the official college website for Nadar Saraswathi College of Engineering & Technology as part of a 6-member student developer team. Migrated the legacy PHP system to a modern decoupled stack using React for the client interface, Node.js for backend APIs, and MySQL for the database. Officially unveiled and launched live on stage during the Freshers Day ceremony in front of the Chief Guests and college dignitaries.",
    tags: ["Node.js", "MySQL", "React", "REST APIs", "PHP Migration", "Full Stack", "Live Production"],
    metrics: [
      { label: "Institution", value: "NSCET", highlight: "TNEA CODE 5865" },
      { label: "Architecture", value: "React + Node.js", highlight: "PHP Migrated" },
      { label: "My Contribution", value: "Backend & Database", highlight: "Node.js & MySQL" },
      { label: "Milestone Event", value: "Freshers Day Launch", highlight: "09.09.2026" }
    ],
    highlights: [
      "Transformed legacy PHP architecture into a modular React frontend & Node.js backend.",
      "Designed and structured the relational MySQL database schema for optimal query speed.",
      "Engineered robust RESTful backend APIs to serve dynamic college announcements and department data.",
      "Officially recognized and launched on stage during the college Induction/Freshers Day."
    ]
  }
];

export const achievementShowcaseItems = [
  {
    id: "stage-launch",
    tabLabel: "Stage Handover & Launch",
    iconType: "stage",
    categoryBadge: "OFFICIAL STAGE LAUNCH",
    title: "Official Stage Handover & Launch",
    description: "Re-architected the official Nadar Saraswathi College of Engineering & Technology website from legacy PHP to a decoupled React, Node.js, and MySQL stack. Officially launched on stage during the 17th Induction & Freshers Day ceremony in the presence of chief guests, college dignitaries, and students. Personally engineered the backend APIs, database integration, and core server-side functionality.",
    techStack: ["Node.js", "Express", "MySQL", "React", "REST APIs", "Production"],
    image: "/achievements/nscet_stage_handover.jpg",
    badgeTopRight: "NSCET • TNEA CODE 5865",
    actionText: "Visit Live Website",
    actionUrl: "https://www.nscet.org/",
    isExternal: true
  },
  {
    id: "live-screen",
    tabLabel: "Live Production Website",
    iconType: "screen",
    categoryBadge: "PRODUCTION RELEASE",
    title: "Website Goes Live on Stage",
    description: "The modernized NSCET college website was deployed as a live production platform at nscet.org. Rebuilt with React and Node.js, the platform replaces legacy workflows with a structured backend and relational database architecture, providing a faster and more scalable experience for announcements, academic information, and department portals.",
    techStack: ["React", "Node.js", "MySQL", "Modern CSS", "Decoupled Architecture"],
    image: "/achievements/nscet_live_screen.jpg",
    badgeTopRight: "PRODUCTION SYSTEM",
    actionText: "Visit Live Website",
    actionUrl: "https://www.nscet.org/",
    isExternal: true
  },
  {
    id: "team-launch",
    tabLabel: "Core Engineering Team",
    iconType: "team",
    categoryBadge: "ENGINEERING LEADERSHIP",
    title: "6-Member Student Engineering Team",
    description: "Collaborated with a student development team to design and build the college web platform. As the Backend & Database Lead, I worked on the Node.js backend, MySQL database architecture, REST APIs, and secure administrative endpoints while coordinating development tasks and maintaining a structured workflow throughout the project.",
    techStack: ["Database Design", "Node.js", "MySQL", "Team Leadership", "Git"],
    image: "/achievements/nscet_team_launch.jpg",
    badgeTopRight: "STUDENT DEVELOPERS",
    actionText: "Visit Live Website",
    actionUrl: "https://www.nscet.org/",
    isExternal: true
  }
];
