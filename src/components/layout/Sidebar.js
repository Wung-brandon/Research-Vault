"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { departments } from '@/data/departments';

export default function Sidebar({ activeDepartment, onFilterChange }) {
  const [isYearExpanded, setIsYearExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
  
  const handleFilterChange = (type, value) => {
    const filterIndex = activeFilters.findIndex(f => f.value === value && f.type === type);
    
    if (filterIndex > -1) {
      // Remove filter if already exists
      const newFilters = [...activeFilters];
      newFilters.splice(filterIndex, 1);
      setActiveFilters(newFilters);
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, { type, value }]);
    }
    
    // Call parent handler if provided
    if (onFilterChange) {
      onFilterChange(type, value);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 lg:sticky lg:top-24">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter size={18} className="text-blue-600 mr-2" />
            <h3 className="font-bold text-lg">Filters</h3>
          </div>
          
          {activeFilters.length > 0 && (
            <button 
              onClick={() => setActiveFilters([])}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Departments</h4>
          <div className="max-h-60 overflow-y-auto pr-2 space-y-1">
            <div>
              <Link 
                href="/research"
                className={`block px-3 py-2 rounded-md transition-colors ${!activeDepartment ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'}`}
              >
                All Departments
              </Link>
            </div>
            {departments.map((dept) => (
              <div key={dept.id}>
                <Link 
                  href={`/departments/${dept.slug}`}
                  className={`block px-3 py-2 rounded-md transition-colors ${activeDepartment === dept.slug ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'}`}
                >
                  {dept.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <button 
            className="flex items-center justify-between w-full font-medium mb-2 text-left"
            onClick={() => setIsYearExpanded(!isYearExpanded)}
          >
            <span>Publication Year</span>
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${isYearExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isYearExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="space-y-2 mt-2 pl-1">
                {years.map(year => (
                  <li key={year}>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        checked={activeFilters.some(f => f.type === 'year' && f.value === year)}
                        onChange={() => handleFilterChange('year', year)}
                      />
                      <span className="ml-2 text-gray-800">{year}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Active filters badges */}
      {activeFilters.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm text-gray-600">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, idx) => (
              <div 
                key={idx}
                className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-md flex items-center"
              >
                <span>{filter.type === 'year' ? filter.value : filter.value}</span>
                <button 
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => handleFilterChange(filter.type, filter.value)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}