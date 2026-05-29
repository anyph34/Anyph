import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Building Scalable SaaS Solutions',
      subtitle: 'Crafting multi-tenant systems that solve real-world problems',
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'React & Supabase Expert',
      subtitle: 'Modern web technologies for marketable applications',
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      title: 'Software Developer',
      subtitle: 'Passionate about creating value through code',
      gradient: 'from-emerald-600 to-teal-500',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Hero Slider */}
      <div className="relative w-full max-w-4xl mx-auto px-4 z-10">
        <div className="relative h-96 overflow-hidden rounded-2xl">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className={`bg-gradient-to-br ${slide.gradient} absolute inset-0 opacity-10`} />
              <div className="relative z-10 text-center px-8">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-300 font-light"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevSlide}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Previous
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                animate={{
                  scale: index === currentSlide ? 1.3 : 1,
                  backgroundColor: index === currentSlide ? '#3b82f6' : '#64748b',
                }}
                className="w-3 h-3 rounded-full transition-all"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSlide}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Next →
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-blue-400" size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
