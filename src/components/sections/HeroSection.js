import React from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import heroImg from "@/assets/research-papers.jpg"
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    // <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16 md:py-24">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="max-w-3xl mx-auto text-center">
    //       <motion.h1
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5 }}
    //         className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
    //       >
    //         Student Research Repository
    //       </motion.h1>

    //       <motion.p
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, delay: 0.2 }}
    //         className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 px-4"
    //       >
    //         Discover thousands of student research papers across various academic fields.
    //         Browse, download, and share valuable academic knowledge.
    //       </motion.p>

    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, delay: 0.4 }}
    //         className="max-w-xl mx-auto px-4 sm:px-0"
    //       >
    //         <form onSubmit={handleSearch} className="relative">
    //           <div className="flex-1 min-w-0 relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //               <Search className="h-5 w-5 text-blue-100" aria-hidden="true" />
    //             </div>
                
    //             <input
    //               type="text"
    //               name="search"
    //               id="search"
    //               placeholder="Search by title, student name, or keywords..."
    //               value={query}
    //               onChange={(e) => setQuery(e.target.value)}
    //               className="block w-full pl-10 pr-20 sm:pr-24 py-3 sm:py-4 rounded-full bg-white/15 
    //                          border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-400 
    //                          placeholder-blue-100 text-white shadow-sm transition-all duration-200
    //                          text-sm sm:text-base focus:outline-none"
    //             />
                
    //             <div className="absolute inset-y-0 right-0 flex items-center pr-2">
    //               <button
    //                 type="submit"
    //                 className="inline-flex items-center px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent 
    //                            text-sm sm:text-base font-medium rounded-full shadow-sm text-white 
    //                            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
    //                            focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
    //               >
    //                 Search
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </motion.div>
    //     </div>
    //   </div>
    // </section>
    <div className="relative h-120 w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image 
          src={heroImg} 
          alt="research papers" 
          layout='fill'// Use fill to cover the entire container
          className="object-cover w-full" // Maintain aspect ratio
          priority // Load the image with high priority
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="text-white">Discover Academic </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h1>
        
        <motion.div 
          className="w-20 h-1 bg-blue-600 mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-100 leading-relaxed mb-8"
            >
              Explore thousands of peer-reviewed student research papers from top universities worldwide. Find inspiration, track academic trends, and advance your knowledge.
        </motion.p>
        
      </div>
      
      {/* Scroll indicator */}
      {/* <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center items-start p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </motion.div> */}
    </div>
  )
}

export default HeroSection