import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'anyphbett9@gmail.com',
      href: 'mailto:anyphbett9@gmail.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 799 655 757',
      href: 'tel:0799655757',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+254 799 655 757',
      href: 'https://wa.me/254799655757',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS (replace with your public key)
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE');

      // Send email
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'anyphbett9@gmail.com',
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
          <p className="text-xl text-slate-300 mb-6">
            Let's connect! Reach out through any of these channels.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto" />
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="contents"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  target={method.label === 'WhatsApp' ? '_blank' : '_self'}
                  rel={method.label === 'WhatsApp' ? 'noopener noreferrer' : ''}
                  className="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700 p-8 hover:border-blue-500 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10 text-center">
                    <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${method.color} mb-4`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{method.label}</h3>
                    <p className="text-slate-300 font-medium">{method.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">Send Me a Message</h3>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center"
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center"
            >
              ✗ Failed to send message. Please try again.
            </motion.div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                placeholder="john@example.com"
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send size={20} />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
