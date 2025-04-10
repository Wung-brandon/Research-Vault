// pages/index.js
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, Award } from 'lucide-react';
import ResearchCard from '@/components/ui/Card';
import { allResearch } from '@/data/research';
import { departments } from '@/data/departments';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  const stats = [
    { id: 1, name: 'Research Works', value: '1,000+', icon: BookOpen },
    { id: 2, name: 'Departments', value: '19+', icon: Users },
    { id: 3, name: 'Student Authors', value: '3,200+', icon: Award },
  ];
  
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/research?q=${encodeURIComponent(query)}`;
    }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Student Research Repository
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 px-4"
          >
            Discover thousands of student research papers across various academic fields.
            Browse, download, and share valuable academic knowledge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto px-4 sm:px-0"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="flex-1 min-w-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-100" aria-hidden="true" />
                </div>
                
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search by title, student name, or keywords..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-10 pr-20 sm:pr-24 py-3 sm:py-4 rounded-full bg-white/15 
                             border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-400 
                             placeholder-blue-100 text-white shadow-sm transition-all duration-200
                             text-sm sm:text-base focus:outline-none"
                />
                
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent 
                               text-sm sm:text-base font-medium rounded-full shadow-sm text-white 
                               bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                               focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section> */}
    
    <HeroSection />

      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 text-center"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Research */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Featured Research Works</h2>
            <Link href="/research" className="btn-primary flex items-center">
              View All Research
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResearch.map((research, index) => (
              <motion.div
                key={research.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ResearchCard research={research} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Departments Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Department</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...departments]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Link 
                    href={`/departments/${dept.slug}`}
                    className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center transition-colors hover:border-blue-400 h-full flex flex-col justify-between"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <span className="text-blue-600 text-xl font-bold">{dept.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.count} Research Papers</p>
                  </Link>
                </motion.div>
              ))}
          </div>

        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore Academic Research?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover insights and innovations from student researchers across multiple disciplines.
          </p>
          <Link href="/research" className="inline-block bg-white text-gray-900 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
            Start Browsing Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}



// "use client"
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Search, BookOpen, FileText, Download, Award } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Layout from '@/components/layout/Layout';
// import researchPapers from "@/assets/research-papers.jpg"
// export default function Home() {
//   const [query, setQuery] = useState('');
//   const [activeFeature, setActiveFeature] = useState(0);
  
//   const features = [
//     { icon: <BookOpen size={24} />, text: "Access to 50,000+ academic papers" },
//     { icon: <FileText size={24} />, text: "Research across 120+ disciplines" },
//     { icon: <Download size={24} />, text: "Download full-text PDFs instantly" },
//     { icon: <Award size={24} />, text: "Peer-reviewed quality content" }
//   ];
  
//   // Auto-rotate through features
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [features.length]);
  
//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Handle search functionality
//     console.log('Searching for:', query);
//   };

//   return (
//     <Layout>
//     <section className="relative bg-white overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 z-0 opacity-5">
//         <div className="absolute inset-0" style={{ 
//           backgroundImage: 'url("/pattern-bg.svg")', 
//           backgroundSize: '400px',
//           backgroundRepeat: 'repeat',
//         }}></div>
//       </div>
      
//       <div className="container mx-auto px-4 py-12 lg:py-20 z-10 relative">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
//           {/* Content Column */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex-1 max-w-2xl"
//           >
//             {/* Headline with gradient */}
//             <motion.h1 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
//             >
//               <span className="text-gray-900">Discover Academic </span>
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Excellence
//               </span>
//             </motion.h1>
            
//             <motion.p 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-xl text-gray-600 leading-relaxed mb-8"
//             >
//               Explore thousands of peer-reviewed student research papers from top universities worldwide. Find inspiration, track academic trends, and advance your knowledge.
//             </motion.p>
            
//             {/* Search form */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="mb-8"
//             >
//               <form onSubmit={handleSearch} className="flex items-center">
//                 <div className="relative flex-1">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search papers, authors, or topics..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-l-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg shadow-sm transition-colors flex items-center justify-center"
//                 >
//                   Search
//                 </button>
//               </form>
//             </motion.div>
            
//             {/* Rotating features */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="relative h-16 sm:h-12"
//             >
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ 
//                     opacity: activeFeature === index ? 1 : 0,
//                     y: activeFeature === index ? 0 : 10,
//                     display: activeFeature === index ? 'flex' : 'none',
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 flex items-center text-gray-700"
//                 >
//                   <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
//                     {feature.icon}
//                   </div>
//                   <span className="text-lg">{feature.text}</span>
//                 </motion.div>
//               ))}
//             </motion.div>
            
//             {/* CTA buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="flex flex-wrap gap-4 mt-8"
//             >
//               <Link href="/research" className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors">
//                 Browse Papers
//               </Link>
//               <Link href="/departments" className="py-3 px-8 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg shadow-sm border border-gray-300 transition-colors">
//                 View Departments
//               </Link>
//             </motion.div>
//           </motion.div>
          
//           {/* Image Column */}
//           <motion.div 
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex-1 relative"
//           >
//             <div className="relative h-[400px] lg:h-[500px] w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl">
//               {/* Main Image */}
//               <Image
//                 src={researchPapers} /* Replace with actual image path like "/images/research-papers.jpg" */
//                 alt="Collection of academic research papers and students studying"
//                 fill
//                 style={{ objectFit: "cover" }}
//                 priority
//                 className="rounded-xl"
//               />
              
//               {/* Floating Elements */}
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.7 }}
//                 className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
//               >
//                 <div className="flex items-center">
//                   <div className="text-3xl font-bold text-blue-600 mr-2">50K+</div>
//                   <div className="text-sm text-gray-700">Research<br/>Papers</div>
//                 </div>
//               </motion.div>
              
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.9 }}
//                 className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
//               >
//                 <div className="flex items-center">
//                   <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
//                     <BookOpen size={20} />
//                   </div>
//                   <div className="text-sm font-medium text-gray-800">120+ Academic Disciplines</div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
      
//       {/* Bottom Stats Bar */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 1 }}
//         className="bg-gradient-to-r from-blue-700 to-purple-700 py-6 mt-8"
//       >
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             <div className="text-white">
//               <div className="text-3xl font-bold">50,000+</div>
//               <div className="text-blue-100">Research Papers</div>
//             </div>
//             <div className="text-white">
//               <div className="text-3xl font-bold">2,500+</div>
//               <div className="text-blue-100">Universities</div>
//             </div>
//             <div className="text-white">
//               <div className="text-3xl font-bold">120+</div>
//               <div className="text-blue-100">Academic Fields</div>
//             </div>
//             <div className="text-white">
//               <div className="text-3xl font-bold">10M+</div>
//               <div className="text-blue-100">Monthly Views</div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//     </Layout>
//   );
// }