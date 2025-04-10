// components/ui/Card.js
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, FileText } from 'lucide-react';

export default function ResearchCard({ research }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    }
  };
  
  return (
    <motion.div
      className="card h-full flex flex-col"
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 flex-grow">
        <div className="mb-3 flex items-start justify-between">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
            {research.department}
          </span>
          <span className="text-sm text-gray-500">{research.year}</span>
        </div>
        
        <Link href={`/research/${research.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {research.title}
          </h3>
        </Link>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600">By: <span className="font-medium text-gray-800">{research.student}</span></p>
          <p className="text-sm text-gray-600">Supervisor: <span className="font-medium">{research.supervisor}</span></p>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {research.abstract}
        </p>
      </div>
      
      <div className="border-t p-3 flex items-center justify-between mt-auto">
        <Link 
          href={`/research/${research.id}`}
          className="text-blue-600 font-medium text-sm hover:underline flex items-center"
        >
          <FileText size={16} className="mr-1" />
          View Details
        </Link>
        
        <div className="flex space-x-2">
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100"
            variants={iconVariants}
            whileHover="hover"
            title="Download PDF"
          >
            <Download size={16} className="text-gray-600" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100"
            variants={iconVariants}
            whileHover="hover"
            title="Share"
          >
            <Share2 size={16} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


