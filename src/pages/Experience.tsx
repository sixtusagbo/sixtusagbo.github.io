import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences, education } from "../config/constants";
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

      {/* Education Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap size={28} />
          Education
        </h2>
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
      </section>
    </div>
  );
}

export default Experience;
