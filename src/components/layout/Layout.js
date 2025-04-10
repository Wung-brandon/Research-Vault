// components/layout/Layout.js
"use client"
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
      <Footer />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#166534', // green-800
            },
          },
          error: {
            style: {
              background: '#991b1b', // red-800
            },
          },
        }}
      />
    </div>
  );
}