"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Mail, MapPin, Phone, Send, MessageSquare, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 * i },
    }),
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: true, 
        error: null 
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: "info@fhsresearchlibrary.edu",
      description: "For general inquiries and information"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "(+237) 676325938",
      description: "Monday to Friday, 9am to 5pm EST"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: "University of Buea, Faculty Of Health Sciences",
      description: "Our main office location"
    },
  ];

  const faqs = [
    {
      question: "How can I submit my research paper?",
      answer: "To submit your research, please use the submission form available on our website. Your paper will be reviewed by our academic committee before being published on ResearchVault."
    },
    {
      question: "Is there a cost to access the research papers?",
      answer: "No, ResearchVault is completely free to use. Our mission is to make academic research accessible to everyone."
    },
    {
      question: "Can I cite research papers from FHS ResearchVault?",
      answer: "Yes, all papers on ResearchVault can be cited according to standard academic citation formats. Each paper includes a recommended citation format."
    },
    {
      question: "Do you accept research from all academic disciplines?",
      answer: "Yes, we welcome research from all academic disciplines. Our goal is to create a diverse repository of knowledge across various fields of study."
    },
  ];

  return (
    <Layout>
        <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        >
        {/* Hero Section */}
        <motion.div 
            variants={itemVariants}
            className="text-center mb-16 py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
        >
            
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl  max-w-3xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you. Reach out to our team using any of the methods below.
            </p>
        </motion.div>

        <section className='container-custom'>
            {/* Contact Information Cards */}
            <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
                {contactInfo.map((info, index) => (
                <motion.div
                    key={info.title}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                    <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600">
                    {info.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                    <p className="text-blue-600 font-medium mb-2">{info.details}</p>
                    <p className="text-gray-600">{info.description}</p>
                </motion.div>
                ))}
            </motion.div>
            
            {/* Contact Form and Office Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Contact Form */}
                <motion.div 
                variants={itemVariants}
                className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm"
                >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageSquare size={24} className="mr-2 text-blue-600" />
                    Send Us a Message
                </h2>
                
                {formStatus.isSubmitted ? (
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6"
                    >
                    <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                    <p>Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Your Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="John Doe"
                        />
                        </div>
                        <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="john@example.com"
                        />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Department
                        </label>
                        <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="How can we help you?"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Message
                        </label>
                        <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your message here..."
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={formStatus.isSubmitting}
                        className="btn-primary flex items-center"
                    >
                        {formStatus.isSubmitting ? (
                        <>Processing...</>
                        ) : (
                        <>
                            <Send size={18} className="mr-2" />
                            Send Message
                        </>
                        )}
                    </button>
                    </form>
                )}
                </motion.div>
                
                {/* Office Hours */}
                <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl"
                >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Clock size={24} className="mr-2 text-blue-600" />
                    Office Hours
                </h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-8">
                    <h3 className="font-bold text-lg mb-2">Response Time</h3>
                    <p className="text-gray-600">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                    </p>
                </div>
                
                <div>
                    <h3 className="font-bold text-lg mb-3">Urgent Matters</h3>
                    <p className="text-gray-600 mb-4">
                    For urgent inquiries, please contact our support team directly:
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                    <Phone size={18} className="mr-2" />
                    (+237) 676325938
                    </div>
                </div>
                </motion.div>
            </div>
            
            {/* FAQ Section */}
            <motion.div
            variants={fagVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  className="py-4"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="text-blue-600" />
                    ) : (
                      <ChevronDown className="text-blue-600" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.p
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-600 mt-2 overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
            {/* Newsletter Sign Up */}
            <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center"
            >
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive updates on new research papers, academic events, and FHS Research Library news.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input 
                    type="email" 
                    placeholder="Your email address"
                    className="px-4 py-3 rounded-lg w-full border-1 border-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn-white cursor-pointer border-2 border-white p-3 rounded-xl whitespace-nowrap">
                    Subscribe Now
                </button>
                </div>
            </motion.div>
        
        </motion.div>
    </Layout>
  );
}