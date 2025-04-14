// components/ui/SearchBar.js
"use client"
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Using window.location.href for navigation
      window.location.href = `/research?q=${encodeURIComponent(query)}&type=${searchType}`;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search Research Repository</h2>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for research papers..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-row gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Fields</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="supervisor">Supervisor</option>
            <option value="department">Department</option>
          </select>
          
          <button
            type="submit"
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* <div className="mt-3 text-sm text-gray-500">
        <p>Popular searches: Machine Learning, Climate Change, Quantum Computing</p>
      </div> */}
    </div>
  );
}