import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

function Experience() {
  const experiences = [
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

  return (
    <div className="space-y-12">
      {/* Experience Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Briefcase size={28} />
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.company}</h3>
                  <p className="text-gray-300">{exp.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300">{exp.period}</p>
                  <p className="text-sm text-blue-400">{exp.type}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
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
        <motion.div
          className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-2xl font-semibold">Nnamdi Azikiwe University</h3>
          <p className="text-gray-300">Bachelor's Degree • 2021 - Present</p>
          <p className="text-gray-400 mt-4">
            Focusing on algorithms, data structures, and software development
            methodologies. Actively pursuing knowledge in modern software
            development practices and maintaining excellent academic
            performance.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default Experience;
