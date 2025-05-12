import { motion } from "framer-motion";

interface ExperienceCardProps {
  experience: {
    company: string;
    position: string;
    period: string;
    type: string;
    achievements: string[];
  };
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <motion.div
      className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold">{experience.company}</h3>
          <p className="text-gray-300">{experience.position}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-300">{experience.period}</p>
          <p className="text-sm text-blue-400">{experience.type}</p>
        </div>
      </div>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {experience.achievements.map((achievement, i) => (
          <li key={i}>{achievement}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ExperienceCard;
