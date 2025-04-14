import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, TrendingUp } from 'lucide-react'
import heroImg from "@/assets/fhs.jpg"
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search handling logic here
  };
  
  return (
    <div className="relative h-130 w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image 
          src={heroImg} 
          alt="University of Buea Faculty of Health Sciences" 
          fill
          className="object-cover w-full" 
          priority 
        />
      </div>
      
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 max-w-6xl mx-auto">
        {/* UB Logo or Badge (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-white/90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            University of Buea • Faculty of Health Sciences
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">Improve your </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Research Experience
          </span>
        </motion.h1>
    
        <motion.div 
          className="w-20 h-1 bg-blue-500 mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-100 leading-relaxed mb-4 max-w-3xl"
        >
          View thousands of theses and published articles from the Faculty of Health Sciences - University of Buea.
        </motion.p>
        
        {/* Search Bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto mb-6"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex-1 min-w-0 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-300" aria-hidden="true" />
              </div>
              
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search by title, author, or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-12 pr-20 py-3 rounded-full bg-white/15 
                           border border-blue-400/30 focus:border-blue-300 focus:ring-2 focus:ring-blue-400 
                           placeholder-blue-200 text-white shadow-lg
                           text-base focus:outline-none"
              />
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent 
                             text-base font-medium rounded-full shadow-sm text-white 
                             bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </motion.div> */}
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-4 justify-center"
        >
          <Link 
            href="/research" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                      text-white font-medium rounded-full shadow-lg transition-all duration-300
                      transform hover:scale-105"
          >
            Browse Repository
          </Link>
          <Link href='/departments' 
            onClick={() => window.scrollTo({top: document.getElementById('publications')?.offsetTop || 0, behavior: 'smooth'})}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm
                      text-white border border-white/30 font-medium rounded-full shadow-lg
                      transition-all duration-300 transform hover:scale-105"
          >
            Explore Theses
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection