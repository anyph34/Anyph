import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Target } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React.js', level: 95 },
    { name: 'Supabase', level: 90 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'JavaScript', level: 93 },
  ];

  const expertise = [
    {
      icon: Code2,
      title: 'SaaS Development',
      description: 'Specializing in multi-tenant systems designed to solve real-world problems with scalability at their core.',
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Building fast, responsive applications using modern React patterns and best practices.',
    },
    {
      icon: Target,
      title: 'Value-Driven',
      description: 'Driven by the goal of creating software that provides genuine value to users and businesses.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto" />
        </motion.div>

        {/* About Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-16 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm a dedicated software developer passionate about building marketable, scalable applications that solve real-world problems. My journey in tech is driven by a deep commitment to creating software that makes a genuine impact.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              My current focus is on <span className="text-blue-400 font-semibold">SaaS development</span>, specifically designing and building <span className="text-cyan-400 font-semibold">multi-tenant systems</span> that can grow with user demands. I leverage modern web technologies to ensure every project is performant, maintainable, and user-centric.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              With strong expertise in <span className="text-blue-400 font-semibold">React.js</span> and <span className="text-cyan-400 font-semibold">Supabase</span>, I build applications that are not just functional but truly delightful to use. I believe in clean code, thoughtful design, and the power of modern development practices.
            </p>
          </motion.div>

          {/* Expertise Cards */}
          <motion.div variants={itemVariants} className="grid gap-6">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Icon className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">Technical Skills</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
