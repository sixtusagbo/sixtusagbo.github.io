// Canonical site origin, used for SEO metadata, feeds, and structured data
export const SITE_URL = "https://sixtusagbo.dev";

// Resume PDF link
export const resumePdfUrl =
  "https://drive.google.com/file/d/16JVqzwxFutGlaTas9wwn_SMum7jbDP6u/view?usp=sharing";

// Skills data organized by categories
export const skillsData: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "Dart", "PHP", "C#"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  Mobile: ["Flutter", "Firebase", "iOS/Android"],
  Backend: ["Laravel", "FastAPI", "Flask", "Node.js", "NextAuth", "REST APIs"],
  "Data & Cloud": [
    "PostgreSQL",
    "MySQL",
    "Supabase",
    "Firebase",
    "Redis",
    "Cloudinary",
  ],
  DevOps: [
    "Git",
    "Docker",
    "Shell Scripting",
    "Linux/SysAdmin",
    "CI/CD",
    "Testing",
  ],
};

// Flattened skills array for backward compatibility
export const skills = Object.values(skillsData).flat();

// Social links used in multiple components
export const socialLinks = {
  twitter: {
    url: "https://twitter.com/sixtusagbo",
    label: "Twitter",
  },
  linkedin: {
    url: "https://linkedin.com/in/sixtusagbo",
    label: "LinkedIn",
  },
  github: {
    url: "https://github.com/sixtusagbo",
    label: "GitHub",
  },
  email: {
    url: "mailto:hi@sixtusagbo.dev",
    label: "Email",
  },
  blog: {
    url: "/blog",
    label: "Blog",
  },
};

// Navigation items used in the app
export const navigation = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Resume", path: "/resume" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
];

// Experience data
export const experiences = [
  {
    company: "NexSolve Technologies",
    position: "Full-Stack Developer",
    period: "May 2025 – Feb 2026",
    type: "Remote",
    achievements: [
      "Architected and developed full-stack web applications for a startup building solutions targeting real-world challenges in European markets",
      "Designed RESTful APIs, database schemas, and responsive frontend interfaces as a core member of a cross-functional technical team",
      "Collaborated with business and strategy teams to align technical deliverables with grant applications and EU incubation program requirements",
      "Contributed to system architecture decisions, code reviews, and technical documentation across the product development lifecycle",
    ],
  },
  {
    company: "Listacc Limited",
    position: "Software Developer",
    period: "Jun 2024 – Nov 2024",
    type: "Hybrid",
    achievements: [
      "Built the uStackSchool platform using Next.js and TypeScript, delivering pixel-perfect implementation from Figma designs",
      "Developed Lifepadi, a full-featured e-commerce and logistics mobile app using Flutter",
      "Resolved critical bugs in the Quickwaka mobile app codebase (Flutter), improving app stability",
      "Mentored peers in backend development with PHP and Laravel, conducting hands-on workshops",
      "Created a bookshop mobile app for law students enabling in-app reading of law books without local downloads, enforcing copyright protection",
    ],
  },
  {
    company: "ALX Africa",
    position: "Software Engineer Intern",
    period: "Jun 2022 – Nov 2024",
    type: "Remote",
    achievements: [
      "Completed an intensive, project-driven program covering full-stack development, system design, and DevOps",
      "Built Vitrine, a brand showcase platform with Python (Flask), MySQL, and a RESTful API with unit test coverage",
      "Developed Ace iT Pro, a cross-platform exam preparation app for Android and iOS using Flutter",
    ],
  },
];

// Education data
export const education = [
  {
    institution: "Nnamdi Azikiwe University",
    degree: "Bachelor of Science in Computer Science",
    period: "2021 - 2025",
    description:
      "Studied algorithms, data structures, and software development methodologies with a focus on modern software development practices.",
  },
];

// Certifications data
export const certifications = [
  {
    name: "Certified Open Source Developer",
    provider: "Tublian",
    date: "May 2024",
    description:
      "4 weeks of intense learning about open source. Introduction to Open Source contribution with firstcontributions/firstcontributions repo. Contributed to an open source project - API Dash. Contributed to a T3 Stack based open source project. Used Tublian 8020 to learn some concepts.",
    link: "https://drive.google.com/file/d/1bEhcGP39ySbfkAuPewiM5_jFj6qfD5m8/view?usp=sharing",
  },
  {
    name: "Certified Software Engineer",
    provider: "ALX Africa",
    date: "November 2024",
    description:
      "Successfully completed the ALX Software Engineering Program, a highly intensive and immersive training. The program emphasizes mastery of fundamental and advanced concepts in software development through a blend of theory and hands-on projects. During this program, I honed my skills in critical areas such as data structures, algorithms, and low-level programming, while also gaining practical experience with full-stack development.",
    link: "https://intranet.alxswe.com/certificates/5SfnBmr2h8",
  },
];
