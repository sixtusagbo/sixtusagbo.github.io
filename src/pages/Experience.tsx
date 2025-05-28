import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import { experiences, education, certifications } from "../config/constants";
import { ExperienceCard } from "../components";

function Experience() {
  return (
    <div className="space-y-12">
      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Briefcase size={28} />
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award size={28} />
          Certifications
        </h2>
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-3">
                    <Award size={16} className="text-blue-400" />
                    <span className="font-medium">{cert.provider}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-400">{cert.date}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all inline-flex items-center gap-2 group-hover:scale-105">
                  View Certificate
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap size={28} />
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-3">
                    <GraduationCap size={16} className="text-purple-400" />
                    <span className="font-medium">{edu.degree}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-purple-400">{edu.period}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Experience;
