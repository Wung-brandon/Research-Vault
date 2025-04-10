"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { departments } from '@/data/departments';
import Layout from '@/components/layout/Layout';

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'count'

  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort departments based on sort selection
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'count') {
      return b.count - a.count;
    }
    return 0;
  });

  // Animation variants for staggered list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Academic Departments</h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8">
              Explore research across our academic disciplines and discover breakthrough innovations
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search departments or research areas..."
                className="block w-full pl-10 pr-3 py-3 rounded-lg bg-blue-800 bg-opacity-50 border border-blue-600 placeholder-blue-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Departments</h2>
            <p className="text-gray-600">
              {filteredDepartments.length} {filteredDepartments.length === 1 ? 'department' : 'departments'} found
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="count">Sort by Research Count</option>
            </select>
          </div>
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center bg-blue-100 rounded-full w-16 h-16 mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No departments found</h3>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t find any departments matching &quot;{searchTerm}&quot;.
            </p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {sortedDepartments.map((dept) => (
              <motion.div 
                key={dept.id}
                variants={item}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{dept.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <BookOpen size={18} className="text-blue-600 mr-2" />
                      <span className="text-gray-700">{dept.count} Papers</span>
                    </div>
                    
                    {dept.students && (
                      <div className="flex items-center">
                        <Users size={18} className="text-blue-600 mr-2" />
                        <span className="text-gray-700">{dept.students} Students</span>
                      </div>
                    )}
                    
                    {dept.faculty && (
                      <div className="flex items-center">
                        <Award size={18} className="text-blue-600 mr-2" />
                        <span className="text-gray-700">{dept.faculty} Faculty</span>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    href={`/departments/${dept.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Explore Research <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
    </Layout>
  );
}