// "use client"

// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import Sidebar from '@/components/layout/Sidebar';
// import ResearchCard from '@/components/ui/Card';
// import FilterDropdown from '@/components/ui/FilterDropdown';
// import { allResearch } from '@/data/research';
// import { departments } from '@/data/departments';
// import { useState, useEffect } from 'react';

// export default function DepartmentPage() {
//   const params = useParams();
//   const department = params.department;
  
//   const [sortOrder, setSortOrder] = useState('newest');
//   const [isLoading, setIsLoading] = useState(true);
//   const [departmentInfo, setDepartmentInfo] = useState(null);
//   const [departmentResearch, setDepartmentResearch] = useState([]);
  
//   useEffect(() => {
//     if (department) {
//       const deptInfo = departments.find(d => d.slug === department);
//       setDepartmentInfo(deptInfo);
      
//       if (deptInfo) {
//         const filteredResearch = allResearch.filter(
//           r => r.department.toLowerCase() === deptInfo.name.toLowerCase()
//         );
        
//         // Sort research papers based on sortOrder
//         const sortedResearch = [...filteredResearch].sort((a, b) => {
//           if (sortOrder === 'newest') {
//             return new Date(b.date) - new Date(a.date);
//           } else {
//             return new Date(a.date) - new Date(b.date);
//           }
//         });
        
//         setDepartmentResearch(sortedResearch);
//       }
      
//       setIsLoading(false);
//     }
//   }, [department, sortOrder]);

//   const handleSortChange = (value) => {
//     setSortOrder(value);
//   };
  
//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//         <p className="text-gray-600 mt-4">Loading department information...</p>
//       </div>
//     );
//   }
  
//   // Department not found
//   if (!departmentInfo) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold text-red-500 mb-4">Department Not Found</h2>
//         <p className="text-gray-600 mb-8">The department you're looking for doesn't exist or has been moved.</p>
//         <Link href="/research" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
//           View All Research
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto px-4 py-8 lg:py-12">
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{departmentInfo.name} Research</h1>
//             <p className="text-gray-600">
//               Browse through research papers from the {departmentInfo.name} department.
//             </p>
//           </div>
//           <Link 
//             href="/research" 
//             className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//           >
//             ← Back to All Research
//           </Link>
//         </div>
//       </div>
      
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Sidebar */}
//         <div className="w-full lg:w-1/4 order-2 lg:order-1">
//           <Sidebar activeDepartment={department} onFilterChange={(type, value) => console.log(type, value)} />
//         </div>
        
//         {/* Main Content */}
//         <div className="w-full lg:w-3/4 order-1 lg:order-2">
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-3">About {departmentInfo.name}</h2>
//             <p className="text-gray-700 mb-6">{departmentInfo.description}</p>
            
//             <div className="flex flex-wrap gap-4">
//               <div className="px-4 py-2 bg-blue-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Research Papers</p>
//                 <p className="text-xl font-bold text-blue-600">{departmentResearch.length}</p>
//               </div>
              
//               <div className="px-4 py-2 bg-blue-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Students</p>
//                 <p className="text-xl font-bold text-blue-600">{departmentInfo.students || '120+'}</p>
//               </div>
              
//               <div className="px-4 py-2 bg-blue-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Faculty Members</p>
//                 <p className="text-xl font-bold text-blue-600">{departmentInfo.faculty || '18'}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <h2 className="text-xl font-semibold">Research Papers ({departmentResearch.length})</h2>
//             <div className="w-full sm:w-48">
//               <FilterDropdown
//                 title="Sort By"
//                 options={[
//                   { value: 'newest', label: 'Newest First' },
//                   { value: 'oldest', label: 'Oldest First' },
//                 ]}
//                 value={sortOrder}
//                 onChange={handleSortChange}
//               />
//             </div>
//           </div>
          
//           {departmentResearch.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {departmentResearch.map((research, index) => (
//                 <motion.div
//                   key={research.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <ResearchCard research={research} />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
//               <p className="text-gray-600 mb-4">No research papers found for this department.</p>
//               <Link href="/research" className="text-blue-600 hover:text-blue-800 font-medium">
//                 View all research
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Users, Award, Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import { departments } from '@/data/departments';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';

// Example research data structure (you'll need to replace with your actual data)
const exampleResearch = [
  {
    id: 'res-1',
    title: 'Machine Learning Applications in Healthcare Diagnostics',
    authors: ['Sarah Johnson', 'David Chen'],
    date: '2023-08-15',
    tags: ['machine learning', 'healthcare', 'diagnostics'],
    abstract: 'This research explores how machine learning algorithms can improve early detection of diseases through pattern recognition in medical imaging.',
    citations: 42,
    department: 'Computer Science'
  },
  {
    id: 'res-2',
    title: 'Ethical Implications of AI in Clinical Decision Making',
    authors: ['Michael Williams', 'Jennifer Lee'],
    date: '2023-06-22',
    tags: ['ethics', 'artificial intelligence', 'clinical decision making'],
    abstract: 'This paper examines the ethical considerations when implementing AI systems to assist healthcare professionals in making clinical decisions.',
    citations: 28,
    department: 'Computer Science'
  },
  {
    id: 'res-3',
    title: 'Secure Cloud Computing for Health Records Management',
    authors: ['Robert Smith', 'Lisa Wong'],
    date: '2023-04-10',
    tags: ['cloud computing', 'security', 'health records'],
    abstract: 'This study investigates secure methods for storing and processing sensitive health records in cloud environments while maintaining HIPAA compliance.',
    citations: 35,
    department: 'Computer Science'
  }
];

// Placeholder function to get research papers by department
const getResearchByDepartment = (departmentName) => {
  // In a real app, this would fetch from an API or database
  // For now, we'll return example data for Computer Science and empty arrays for others
  if (departmentName === 'Computer Science') {
    return exampleResearch;
  }
  return [];
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
        // Get research papers
        const papers = getResearchByDepartment(deptInfo.name);
        setResearchPapers(papers);
      }
      
      setIsLoading(false);
    }
  }, [departmentSlug]);

  // Get all unique tags from research papers
  const allTags = [...new Set(researchPapers.flatMap(paper => paper.tags))];
  
  // Filter papers based on search and tags
  const filteredPapers = researchPapers.filter(paper => {
    const matchesSearch = searchTerm === '' || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => paper.tags.includes(tag));
      
    return matchesSearch && matchesTags;
  });
  
  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'citations') {
      return b.citations - a.citations;
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
              We couldn't find the department you're looking for. It may have been moved or deleted.
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
                <div className="text-2xl font-bold">{departmentInfo.count}</div>
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
                  <option value="citations">Most Cited</option>
                </select>
              </div>
              
              {/* Tags */}
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
              
              {filteredPapers.length > 0 && (
                <Link 
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Export Results
                </Link>
              )}
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
                          {new Date(paper.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        
                        <div className="flex items-center">
                          <Award size={16} className="text-blue-600 mr-1" />
                          {paper.citations} Citations
                        </div>
                        
                        <div>
                          {paper.authors.join(', ')}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {paper.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.tags.map(tag => (
                          <span 
                            key={tag}
                            className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                              selectedTags.includes(tag) 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
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
                        
                        <Link 
                          href="#"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Download size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination */}
            {sortedPapers.length > 0 && (
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