import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

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
      className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Briefcase size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">
              {experience.company}
            </h3>
          </div>
          <p className="text-xl text-gray-300 font-medium mb-2">
            {experience.position}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-400" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-purple-400" />
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-xs font-medium">
                {experience.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">
          Key Achievements
        </h4>
        <ul className="space-y-3">
          {experience.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}>
              <CheckCircle
                size={16}
                className="text-green-400 mt-1 flex-shrink-0"
              />
              <span className="group-hover:text-gray-200 transition-colors">
                {achievement}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
