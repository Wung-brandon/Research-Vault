// components/ui/FilterDropdown.js
"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ title, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span>{title}: {value || 'All'}</span>
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-10 mt-1 w-full bg-white rounded-md shadow-lg"
          >
            <div className="py-1 overflow-auto max-h-60">
              <button
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${!value ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                All
              </button>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${value === option.value ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}