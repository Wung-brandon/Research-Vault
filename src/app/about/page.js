"use client"
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Book, BookOpen, GraduationCap, Lightbulb, Scale, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const values = [
    {
      icon: <BookOpen size={24} />,
      title: "Academic Excellence",
      description: "We maintain high standards for the research we accept and showcase, ensuring quality academic contributions."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovation",
      description: "We celebrate innovative thinking and novel approaches to research questions across disciplines."
    },
    {
      icon: <Scale size={24} />,
      title: "Integrity",
      description: "We uphold the principles of academic integrity and ethical research practices."
    },
    {
      icon: <Users size={24} />,
      title: "Collaboration",
      description: "We believe in the power of collaborative research and knowledge sharing across academic boundaries."
    }
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
        
        <h1 className="text-4xl font-bold mb-4">About Faculty of Health Sciences(FHS) Research Library</h1>
        <p className="text-xl max-w-3xl mx-auto">
          A centralized platform dedicated to showcasing and preserving exceptional student research across diverse academic disciplines.
        </p>
      </motion.div>
      

      {/* Mission Statement */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-16"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            To democratize access to knowledge by creating a platform where outstanding student research 
            is preserved, celebrated, and made accessible to the broader academic community and beyond.
          </p>
          <div className="flex justify-center">
            <Link href="/research" className="btn-primary">
              Explore Research
            </Link>
          </div>
        </div>
      </motion.div>
      
      <section className="container-custom">
        {/* Our Story */}
        <motion.div 
            variants={itemVariants}
            className="mb-16"
        >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <p className="text-lg text-gray-700 mb-4">
                Faculty of Health Sciences(FHS) Research Library was founded in 1993 with a vision to address a critical gap in academia: 
                the lack of visibility for exceptional student research. Too often, brilliant undergraduate and 
                graduate research papers would be submitted, graded, and then forgotten.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                Our founders, a group of passionate professors and former students, believed that these works 
                represented not just academic exercises, but valuable contributions to human knowledge that 
                deserved broader recognition and preservation.
                </p>
                <p className="text-lg text-gray-700">
                Today, FHS Research Library serves as a growing repository of outstanding student research from 
                institutions worldwide, spanning diverse fields from humanities to hard sciences, making this 
                knowledge accessible to students, educators, and curious minds everywhere.
                </p>
            </div>
            <motion.div 
                className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex justify-center mb-6">
                <GraduationCap size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Our Growth</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-3xl font-bold text-blue-600">100+</p>
                    <p className="text-gray-600">Institutions</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-purple-600">5,000+</p>
                    <p className="text-gray-600">Research Papers</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-blue-600">15+</p>
                    <p className="text-gray-600">Academic Fields</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-purple-600">50k+</p>
                    <p className="text-gray-600">Monthly Readers</p>
                </div>
                </div>
            </motion.div>
            </div>
        </motion.div>
        
        {/* Our Values */}
        <motion.div 
            variants={itemVariants}
            className="mb-16"
        >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
                <motion.div 
                key={value.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                //   transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600">
                    {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
                </motion.div>
            ))}
            </div>
        </motion.div>
      </section>
      {/* Call to Action */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Whether you&apos;re a student looking to showcase your research, an educator seeking to inspire your students, 
          or simply a curious mind exploring new ideas, FHS Research Library welcomes you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/research" className="btn-white border-1 border-white p-3 rounded-xl">
            Explore Research
          </Link>
          <Link href="/contact" className="btn-outline-white border-1 border-white p-3 rounded-xl">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </motion.div>
    </Layout>
  );
}