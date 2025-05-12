import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  return (
    <motion.div
      key={index}
      className="backdrop-blur-sm bg-white/5 rounded-xl p-4 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      {skill}
    </motion.div>
  );
};

export default SkillBadge;
