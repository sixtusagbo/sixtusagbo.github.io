"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, ArrowUpRight, Download, MapPin, Calendar } from "lucide-react";
import { experiences, education, certifications } from "@/config/constants";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-24">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-4">
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Resume</span>
                <h1 className="text-4xl md:text-6xl font-bold">Experience & Education</h1>
                <p className="text-lg text-neutral-400 max-w-2xl">
                  My professional journey, educational background, and certifications that have shaped my career as a developer.
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1B65GzErr4ZqwvoLXkIa7oBYU5AjCp97W/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-all w-fit">
                <Download size={18} />
                Download PDF
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Experience Section - Timeline */}
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <Briefcase size={24} />
              </div>
              <h2 className="text-3xl font-bold">Professional Experience</h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-neutral-800" />

              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 md:pl-24">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-white border-4 border-neutral-950" />

                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors">
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">{experience.company}</h3>
                            <p className="text-lg text-neutral-300">{experience.position}</p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full text-sm text-neutral-300">
                              <Calendar size={14} />
                              {experience.period}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full text-sm text-neutral-300">
                              <MapPin size={14} />
                              {experience.type}
                            </div>
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">Key Achievements</h4>
                          <ul className="space-y-3">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-3 text-neutral-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <Award size={24} />
              </div>
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-neutral-400">{cert.provider}</p>
                      </div>
                      <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400 whitespace-nowrap">
                        {cert.date}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {cert.description}
                    </p>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                      View Certificate
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-3xl font-bold">Education</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors">
                          {edu.institution}
                        </h3>
                        <p className="text-neutral-400">{edu.degree}</p>
                      </div>
                      <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400 whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Interested in working together?</h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                I&apos;m always open to discussing new projects and opportunities. Let&apos;s connect and see how we can collaborate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:hi@sixtusagbo.dev"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-all">
                  Get in Touch
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1B65GzErr4ZqwvoLXkIa7oBYU5AjCp97W/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-full font-semibold hover:border-neutral-500 hover:bg-neutral-900 transition-all">
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
