// Resume PDF link
export const resumePdfUrl =
  "https://drive.google.com/file/d/1e955wQOSm-nC5xyreAWx6Ts30MJEAOY2/view?usp=drivesdk";

// Skills data organized by categories
export const skillsData: Record<string, string[]> = {
  Languages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Dart",
    "PHP",
    "C#",
  ],
  Frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML/CSS",
  ],
  Mobile: [
    "Flutter",
    "Firebase",
    "iOS/Android",
  ],
  Backend: [
    "Laravel",
    "FastAPI",
    "Flask",
    "Node.js",
    "NextAuth",
    "REST APIs",
  ],
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
    url: "https://sixtusagbo.medium.com/",
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

// Blog posts data
export const blogPosts = [
  {
    title: "Building Scalable Applications with NextJS",
    excerpt:
      "Learn how to build and deploy scalable applications using NextJS and modern web technologies...",
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
    link: "https://sixtusagbo.medium.com/building-scalable-applications",
    date: "2024-05-10",
    tags: ["NextJS", "React", "Web Development", "Frontend"],
    readTime: "6 min read",
  },
  {
    title: "Flutter vs React Native: A Developer's Perspective",
    excerpt:
      "A detailed comparison of Flutter and React Native for mobile app development...",
    image:
      "https://images.pexels.com/photos/12883026/pexels-photo-12883026.jpeg",
    link: "https://sixtusagbo.medium.com/flutter-vs-react-native",
    date: "2024-04-22",
    tags: ["Flutter", "React Native", "Mobile Development", "Comparison"],
    readTime: "8 min read",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring upcoming trends and technologies shaping the future of web development...",
    image: "https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg",
    link: "https://sixtusagbo.medium.com/future-of-web-development",
    date: "2024-03-15",
    tags: ["Web Development", "Trends", "Future Tech"],
    readTime: "5 min read",
  },
  {
    title: "Mastering TypeScript: Advanced Patterns",
    excerpt:
      "Dive into advanced TypeScript patterns that will elevate your code quality and developer experience...",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    link: "https://sixtusagbo.medium.com/mastering-typescript",
    date: "2024-02-28",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    readTime: "10 min read",
  },
  {
    title: "Building a CI/CD Pipeline for Your Projects",
    excerpt:
      "Learn how to set up a robust CI/CD pipeline to automate your development workflow and improve code quality...",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    link: "https://sixtusagbo.medium.com/ci-cd-pipeline",
    date: "2024-01-15",
    tags: ["DevOps", "CI/CD", "Automation", "Git"],
    readTime: "7 min read",
  },
  {
    title: "Getting Started with Blockchain Development",
    excerpt:
      "A beginner's guide to understanding blockchain technology and starting your journey as a blockchain developer...",
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
    link: "https://sixtusagbo.medium.com/blockchain-development",
    date: "2023-12-05",
    tags: ["Blockchain", "Web3", "Cryptocurrency", "Smart Contracts"],
    readTime: "9 min read",
  },
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
