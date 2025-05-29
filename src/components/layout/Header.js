"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Book } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path, mobile = false) =>
    `${mobile ? 'block py-3 border-b border-gray-100 last:border-0' : 'py-2 px-4'} font-medium transition-colors ${
      pathname === path
        ? 'text-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="text-blue-600"
              >
                <Book size={28} />
              </motion.div>
              <motion.span 
                className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ResearchVault
              </motion.span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Right Aligned */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className={linkClass('/')}>Home</Link>
            <Link href="/departments" className={linkClass('/departments')}>Find Theses</Link>
            <Link href="/research" className={linkClass('/research')}>Find Publication</Link>
            <Link href="/about" className={linkClass('/about')}>About</Link>
            <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white shadow-lg absolute w-full border-t border-gray-100"
        >
          <div className="container-custom py-2">
            <nav className="flex flex-col">
              <Link href="/" className={linkClass('/', true)} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/departments" className={linkClass('/departments', true)} onClick={() => setIsMenuOpen(false)}>Find Theses</Link>
              <Link href="/research" className={linkClass('/research', true)} onClick={() => setIsMenuOpen(false)}>Find Publication</Link>
              <Link href="/about" className={linkClass('/about', true)} onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" className={linkClass('/contact', true)} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}