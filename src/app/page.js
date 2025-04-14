// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, Award, Check, X } from 'lucide-react';
import ResearchCard from '@/components/ui/Card';
import { allResearch } from '@/data/research';
import { departments } from '@/data/departments';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import SearchBar from '@/components/ui/SearchBarHome';
import UserSidebar from '@/components/ui/UserSidebar';

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Mock user data - in a real app, this would come from your authentication system
  const userData = {
    name: "Morfaw Bebongnkeng",
    department: "Medicine",
    email: "bebongnkeng@university.edu",
    researchTitle: "Innovative Approaches to Malaria Treatment and Prevention in Sub-Saharan A",
    supervisors: ["Dr. Jane Smith", "Prof. Robert Johnson"],
    progress: {
      proposalSubmission: true,
      preDefense: true,
      defense: false,
      finalSubmission: false
    },
    feedback: [
      {
        date: "2025-03-28",
        from: "Dr. Jane Smith",
        message: "Good progress on methodology section. Please revise literature review."
      },
      {
        date: "2025-04-05",
        from: "Prof. Robert Johnson",
        message: "Experimental results are promising. Consider additional control group."
      }
    ],
    deadlines: [
      {
        title: "Defense Presentation",
        date: "2025-05-15"
      },
      {
        title: "Final Submission",
        date: "2025-06-10"
      }
    ]
  };
  
  return (
    <Layout>
      {/* Hero and Search sections remain full-width */}
      <HeroSection />
      
      <section className="py-8 bg-white">
        <div className="container-custom">
          <SearchBar />
        </div>
      </section>
      
      {/* Main content with sidebar and featured research side by side */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Toggle (visible only on mobile) */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors w-full flex items-center justify-center"
              aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
            >
              {showSidebar ? "Hide User Dashboard" : "Show User Dashboard"}
            </button>
          </div>
          
          {/* Sidebar Column */}
          <div className={`lg:w-1/4 lg:pr-6 mt-8 transition-all duration-300 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
            <div className="relative">
              {/* Sidebar toggle for larger screens */}
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden lg:flex absolute -right-4 top-4 z-10 h-8 w-8 items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
              >
                {showSidebar ? "←" : "→"}
              </button>
              
              <UserSidebar userData={userData} />
            </div>
          </div>
          
          {/* Main Content Column - Featured Research */}
          <div className={`lg:w-${showSidebar ? '3/4' : 'full'} transition-all duration-300`}>
            <section className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Recent Research Works</h2>
                <Link href="/research" className="btn-primary flex items-center">
                  View All Research
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            </section>
          </div>
        </div>
      </div>
      
      {/* Departments Section - Full Width */}
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
      
      {/* CTA Section - Full Width */}
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