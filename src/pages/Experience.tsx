import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { experiences, education, certifications } from "../config/constants";
import { ExperienceCard } from "../components";

function Experience() {
  return (
    <div className="space-y-12">
      {/* Experience Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Briefcase size={28} />
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award size={28} />
          Certifications
        </h2>
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold">{cert.name}</h3>
                <p className="text-blue-400">{cert.date}</p>
              </div>
              <p className="text-gray-300 mt-1">Provider: {cert.provider}</p>
              <p className="text-gray-400 mt-4">{cert.description}</p>
              <div className="mt-4">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                  View Certificate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap size={28} />
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-2xl font-semibold">{edu.institution}</h3>
              <p className="text-gray-300">
                {edu.degree} • {edu.period}
              </p>
              <p className="text-gray-400 mt-4">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Experience;
