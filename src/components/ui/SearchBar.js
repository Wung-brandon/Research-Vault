// components/ui/SearchBar.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/research?q=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search research works..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 cursor-pointer" size={18} />
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
}