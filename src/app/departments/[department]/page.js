"use client"

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Users, Award, Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import { departments } from '@/data/departments';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { allResearch } from '@/data/research'; // Import the full research list

// Function to get research papers by department
const getResearchByDepartment = (departmentName) => {
  // Filter the allResearch array to find papers matching the department
  return allResearch.filter(paper => paper.department === departmentName);
};

export default function DepartmentDetailPage() {
  const params = useParams();
  const departmentSlug = params.department;
  
  const [isLoading, setIsLoading] = useState(true);
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const [researchPapers, setResearchPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTags, setSelectedTags] = useState([]);
  
  useEffect(() => {
    if (departmentSlug) {
      // Find department info
      const deptInfo = departments.find(d => d.slug === departmentSlug);
      setDepartmentInfo(deptInfo);
      
      if (deptInfo) {
        // Get research papers for this department
        const papers = getResearchByDepartment(deptInfo.name);
        setResearchPapers(papers);
      }
      
      setIsLoading(false);
    }
  }, [departmentSlug]);

  // Extract all unique keywords/tags from research papers
  const allTags = [...new Set(researchPapers.flatMap(paper => paper.keywords || []))];
  
  // Filter papers based on search and tags
  const filteredPapers = researchPapers.filter(paper => {
    const matchesSearch = searchTerm === '' || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (paper.student && paper.student.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (paper.supervisor && paper.supervisor.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesTags = selectedTags.length === 0 || 
      (paper.keywords && selectedTags.every(tag => paper.keywords.includes(tag)));
      
    return matchesSearch && matchesTags;
  });
  
  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.year - a.year; // Sort by year (newest first)
    } else if (sortBy === 'oldest') {
      return a.year - b.year; // Sort by year (oldest first)
    } else if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title); // Alphabetical by title
    }
    return 0;
  });

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading department information...</p>
        </div>
      </div>
    );
  }
  
  // Department not found
  if (!departmentInfo) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Department Not Found</h2>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t find the department you&apos;re looking for. It may have been moved or deleted.
            </p>
            <Link 
              href="/departments" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Departments
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Layout>
    <div className="bg-gray-50 min-h-screen">
      {/* Department Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <Link 
              href="/departments" 
              className="inline-flex items-center text-blue-200 hover:text-white mb-4"
            >
              <ChevronLeft size={16} className="mr-1" />
              All Departments
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {departmentInfo.name}
            </h1>
            
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              {departmentInfo.description}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="bg-blue-800 bg-opacity-50 rounded-lg px-5 py-3">
                <div className="text-blue-200 text-sm mb-1">Research Papers</div>
                <div className="text-2xl font-bold">{researchPapers.length}</div>
              </div>
              
              {departmentInfo.faculty && (
                <div className="bg-blue-800 bg-opacity-50 rounded-lg px-5 py-3">
                  <div className="text-blue-200 text-sm mb-1">Faculty Members</div>
                  <div className="text-2xl font-bold">{departmentInfo.faculty}</div>
                </div>
              )}
              
              {departmentInfo.students && (
                <div className="bg-blue-800 bg-opacity-50 rounded-lg px-5 py-3">
                  <div className="text-blue-200 text-sm mb-1">Students</div>
                  <div className="text-2xl font-bold">{departmentInfo.students}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Research Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-6">
              <div className="flex items-center mb-6">
                <Filter size={18} className="text-blue-600 mr-2" />
                <h3 className="font-bold text-lg">Filter Research</h3>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search papers..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              
              {/* Research Areas/Keywords */}
              {allTags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Areas
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          id={`tag-${tag}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                        />
                        <label
                          htmlFor={`tag-${tag}`}
                          className="ml-2 block text-sm text-gray-700 capitalize"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Research Papers
                {filteredPapers.length > 0 && (
                  <span className="ml-2 text-lg font-normal text-gray-500">
                    ({filteredPapers.length})
                  </span>
                )}
              </h2>
              
              {/* {filteredPapers.length > 0 && (
                <Link 
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Export Results
                </Link>
              )} */}
            </div>
            
            {/* Research Papers List */}
            {sortedPapers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="inline-flex items-center justify-center bg-blue-100 rounded-full w-16 h-16 mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No papers found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedTags.length > 0 ? 
                    "We couldn't find any papers matching your search criteria." :
                    "No research papers are available for this department yet."
                  }
                </p>
                {(searchTerm || selectedTags.length > 0) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                    }} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {sortedPapers.map((paper, index) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        <Link href={`/research/${paper.id}`} className="hover:text-blue-600">
                          {paper.title}
                        </Link>
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-3 text-sm text-gray-600">
                        <div>
                          {paper.year}
                        </div>
                        
                        <div className="flex items-center">
                          <Users size={16} className="text-blue-600 mr-1" />
                          {paper.student}
                        </div>
                        
                        <div className="flex items-center">
                          <Award size={16} className="text-blue-600 mr-1" />
                          {paper.supervisor}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {paper.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords && paper.keywords.map(keyword => (
                          <span 
                            key={keyword}
                            className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                              selectedTags.includes(keyword) 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                            }`}
                            onClick={() => toggleTag(keyword)}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/research/${paper.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Read More <ChevronRight size={16} className="ml-1" />
                        </Link>
                        
                        {/* <Link 
                          href="#"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Download size={16} />
                        </Link> */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination - only show if papers exceed a certain amount */}
            {sortedPapers.length > 10 && (
              <div className="mt-8 flex items-center justify-center space-x-1">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-600 text-white">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}