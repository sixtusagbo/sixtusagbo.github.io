// Skills data organized by categories
export const skillsData: Record<string, string[]> = {
  "Programming Languages & Frameworks": [
    "Dart",
    "Flutter",
    "Python",
    "Flask",
    "FastAPI",
    "JavaScript",
    "React",
    "NextJS",
    "NodeJS",
    "TypeScript",
    "NextAuth",
    "Redis",
    "PHP",
    "Laravel",
    "C#",
  ],
  "Development Tools & Practices": [
    "Git",
    "Testing",
    "Database Management",
    "Shell Scripting",
    "SysAdmin",
    "SRE",
    "DevOps",
  ],
  "Soft Skills & Abilities": [
    "Collaboration",
    "Teamwork",
    "Resilience",
    "Dedication",
    "Leadership",
    "Problem-solving",
    "Adaptability",
    "AI Coding tools",
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
    company: "Listacc Limited",
    position: "Industrial Training",
    period: "Jun 2024 – Nov 2024",
    type: "Hybrid",
    achievements: [
      "Built uStackSchool website with NextJS and Typescript",
      "Taught back-end development with PHP and Laravel",
      "Fixed bugs in Quickwaka mobile app codebase (Flutter)",
      "Built Lifepadi, an e-commerce and logistics app with Flutter",
    ],
  },
  {
    company: "ALX Africa",
    position: "Software Engineer Intern",
    period: "Jun 2022 – Nov 2024",
    type: "Remote",
    achievements: [
      "Fast-paced, project-based learning",
      "Built Vitrine, a brand showcase app with Python (Flask)",
      "Built Ace iT Pro, a past-questions based exam preparation mobile app",
      "Collaborated with peers on team projects",
    ],
  },
  {
    company: "Tublian",
    position: "Open Source Internship",
    period: "Apr 2024 – May 2024",
    type: "Remote",
    achievements: [
      "Contributed to open source projects including API Dash",
      "Learned open source contribution practices",
      "Worked with T3 Stack based projects",
    ],
  },
];

// Education data
export const education = [
  {
    institution: "Cyfrin Updraft",
    degree: "Web3 Development",
    period: "Nov 2024 - Present",
    description:
      "Cyfrin Updraft is a web3 education platform to learn blockchain and smart contract development. It's designed to help developers kickstart and level up their careers as blockchain engineers and security auditors.",
  },
  {
    institution: "Nnamdi Azikiwe University",
    degree: "Bachelor's Degree",
    period: "2021 - Present",
    description:
      "Focusing on algorithms, data structures, and software development methodologies. Actively pursuing knowledge in modern software development practices and maintaining excellent academic performance.",
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
