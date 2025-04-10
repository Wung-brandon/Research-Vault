"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import ResearchCard from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import FilterDropdown from '@/components/ui/FilterDropdown';
import { allResearch } from '@/data/research';
import Layout from '@/components/layout/Layout';

export default function ResearchIndex() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  const deptParam = searchParams.get('department');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    years: [],
    department: deptParam || ''
  });
  
  const [filteredResearch, setFilteredResearch] = useState([]);
  
  // Update search query when URL param changes
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);
  
  // Update department filter when URL param changes
  useEffect(() => {
    if (deptParam) {
      setFilters(prev => ({ ...prev, department: deptParam }));
    }
  }, [deptParam]);
  
  // Apply filters
  useEffect(() => {
    let results = [...allResearch];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.student.toLowerCase().includes(query) ||
        item.abstract.toLowerCase().includes(query)
      );
    }
    
    // Apply department filter
    if (filters.department) {
      results = results.filter(item => 
        item.department.toLowerCase() === filters.department.toLowerCase()
      );
    }
    
    // Apply year filters
    if (filters.years.length > 0) {
      results = results.filter(item => filters.years.includes(item.year));
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      results.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'oldest') {
      results.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'title_asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title_desc') {
      results.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredResearch(results);
  }, [searchQuery, filters, sortBy]);
  
  const handleFilterChange = (type, value) => {
    if (type === 'year') {
      setFilters(prev => {
        const years = prev.years.includes(value)
          ? prev.years.filter(y => y !== value)
          : [...prev.years, value];
        return { ...prev, years };
      });
    }
  };
  
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.department) params.set('department', filters.department);
    router.push(`/research?${params.toString()}`);
  };
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title_asc', label: 'Title (A-Z)' },
    { value: 'title_desc', label: 'Title (Z-A)' },
  ];
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Research Repository</h1>
          <p className="text-gray-600">
            Browse through our collection of student research papers from various academic disciplines.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Sidebar 
              activeDepartment={filters.department}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="mb-4">
                <SearchBar onSubmit={handleSearchSubmit} initialValue={searchQuery} />
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredResearch.length}</span> results
                  {searchQuery && (
                    <span> for &quot;<span className="font-semibold">{searchQuery}</span>&quot;</span>
                  )}
                </div>
                
                <div className="w-48">
                  <FilterDropdown
                    title="Sort By"
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                  />
                </div>
              </div>
            </div>
            
            {/* Research Cards */}
            {filteredResearch.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResearch.map((research, index) => (
                  <motion.div
                    key={research.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ResearchCard research={research} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn&apos;t find any research that matches your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ years: [], department: '' });
                    router.push('/research');
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}