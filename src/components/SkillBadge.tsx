import { motion } from "framer-motion";
import {
  Code,
  Database,
  Server,
  GitBranch,
  Terminal,
  PenTool,
  Layers,
  Globe,
  Box,
  Settings,
  Users,
  Brain,
} from "lucide-react";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

// Map skill names to appropriate icons
const skillIconMap: Record<string, JSX.Element> = {
  // Programming Languages
  Dart: <Box size={16} />,
  Flutter: <Layers size={16} />,
  Python: <Code size={16} />,
  JavaScript: <Code size={16} />,
  TypeScript: <Code size={16} />,
  PHP: <Code size={16} />,
  "C#": <Code size={16} />,

  // Frameworks
  React: <Code size={16} />,
  NextJS: <Globe size={16} />,
  NodeJS: <Server size={16} />,
  NextAuth: <Settings size={16} />,
  Laravel: <PenTool size={16} />,
  Flask: <Server size={16} />,
  FastAPI: <Server size={16} />,

  // Databases
  Redis: <Database size={16} />,
  "Database Management": <Database size={16} />,

  // Development Tools
  Git: <GitBranch size={16} />,
  Testing: <Settings size={16} />,
  "Shell Scripting": <Terminal size={16} />,
  SysAdmin: <Server size={16} />,
  SRE: <Settings size={16} />,
  DevOps: <Settings size={16} />,

  // Soft Skills
  Collaboration: <Users size={16} />,
  Teamwork: <Users size={16} />,
  Leadership: <Users size={16} />,
  "Problem-solving": <Brain size={16} />,
  Adaptability: <Settings size={16} />,
  Resilience: <Settings size={16} />,
  Dedication: <Settings size={16} />,
  "AI Coding tools": <Brain size={16} />,
};

// Get random background gradient for each skill
const getSkillGradient = (index: number) => {
  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-red-500 to-orange-500",
    "from-yellow-500 to-orange-500",
    "from-teal-500 to-green-500",
  ];

  return gradients[index % gradients.length];
};

const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  const gradientClass = getSkillGradient(index);

  return (
    <motion.div
      className="backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}>
      <div
        className={`bg-gradient-to-r ${gradientClass} p-2 rounded-md text-white`}>
        {skillIconMap[skill] || <Code size={16} />}
      </div>
      <span className="text-sm font-medium group-hover:text-white transition-colors">
        {skill}
      </span>
    </motion.div>
  );
};

export default SkillBadge;
