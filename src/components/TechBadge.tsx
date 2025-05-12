import { motion } from "framer-motion";

interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
}

function TechBadge({ icon, name }: TechBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}>
      {icon}
      <span className="text-sm">{name}</span>
    </motion.div>
  );
}

export default TechBadge;
