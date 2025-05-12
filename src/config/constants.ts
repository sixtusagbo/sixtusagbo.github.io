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
    url: "mailto:miracleagbosixtus@gmail.com",
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
  { name: "Portfolio", path: "/portfolio" },
  { name: "Resume", path: "/resume" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

// Featured projects data used in multiple components
export const projects = [
  {
    title: "uStackSchool",
    description: "Educational platform built with NextJS and TypeScript",
    image: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
    tech: ["NextJS", "TypeScript", "TailwindCSS"],
    links: {
      live: "https://ustackschool.com",
      github: "https://github.com/sixtusagbo/ustackschool",
    },
  },
  {
    title: "Lifepadi",
    description: "E-commerce and logistics mobile app",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    tech: ["Flutter", "Dart", "Firebase"],
    links: {
      playstore: "https://play.google.com/store/apps/details?id=com.lifepadi",
      appstore: "https://apps.apple.com/app/lifepadi",
    },
  },
  {
    title: "Ace iT Pro",
    description: "Exam preparation mobile app",
    image: "https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg",
    tech: ["Flutter", "Dart", "SQLite"],
    links: {
      playstore: "https://play.google.com/store/apps/details?id=com.aceitpro",
    },
  },
  {
    title: "Vitrine",
    description: "Brand showcase application",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
    tech: ["Python", "Flask", "PostgreSQL"],
    links: {
      live: "https://vitrine-demo.com",
      github: "https://github.com/sixtusagbo/vitrine",
    },
  },
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
  },
  {
    title: "Flutter vs React Native: A Developer's Perspective",
    excerpt:
      "A detailed comparison of Flutter and React Native for mobile app development...",
    image:
      "https://images.pexels.com/photos/12883026/pexels-photo-12883026.jpeg",
    link: "https://sixtusagbo.medium.com/flutter-vs-react-native",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring upcoming trends and technologies shaping the future of web development...",
    image: "https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg",
    link: "https://sixtusagbo.medium.com/future-of-web-development",
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

// Skills data
export const skills = [
  "Flutter & Dart",
  "React & NextJS",
  "Python & Flask",
  "TypeScript",
  "PHP & Laravel",
  "Git & DevOps",
  "Database Management",
  "System Administration",
];

// Education data
export const education = [
  {
    institution: "Nnamdi Azikiwe University",
    degree: "Bachelor's Degree",
    period: "2021 - Present",
    description:
      "Focusing on algorithms, data structures, and software development methodologies. Actively pursuing knowledge in modern software development practices and maintaining excellent academic performance.",
  },
];
