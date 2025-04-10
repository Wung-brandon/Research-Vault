// // components/ui/PDFViewer.js
// "use client"
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Download, Share2, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
// import Image from 'next/image';

// export default function PDFViewer({ pdfUrl, title }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
  
//   // This would be used with an actual PDF viewer library in production
  
//   return (
//     <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
//       <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
//         <h3 className="font-medium truncate">{title}</h3>
        
//         <div className="flex items-center space-x-2">
//           <button className="p-2 rounded-full hover:bg-gray-200" title="Download">
//             <Download size={18} />
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-200" title="Share">
//             <Share2 size={18} />
//           </button>
//           <button 
//             className="p-2 rounded-full hover:bg-gray-200" 
//             title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//             onClick={() => setIsFullscreen(!isFullscreen)}
//           >
//             {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
//           </button>
//         </div>
//       </div>
      
//       <div className="h-[60vh] bg-gray-900 flex items-center justify-center">
//         <Image 
//           width={200}
//           height={200}
//           src="/api/placeholder/600/800" 
//           alt="PDF Preview" 
//           className="h-full object-contain"
//         />
//       </div>
      
//       <div className="p-3 border-t flex items-center justify-between">
//         <div className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </div>
        
//         <div className="flex items-center space-x-1">
//           <button 
//             className="p-1 rounded hover:bg-gray-100"
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft size={18} className={currentPage === 1 ? "text-gray-300" : "text-gray-600"} />
//           </button>
          
//           <button 
//             className="p-1 rounded hover:bg-gray-100"
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//           >
//             <ChevronRight size={18} className={currentPage === totalPages ? "text-gray-300" : "text-gray-600"} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function PDFViewer({ title, pdfUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Check if PDF exists
    const checkPdf = async () => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (!response.ok) {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    checkPdf();
  }, [pdfUrl]);
  
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center bg-gray-50">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">PDF Preview Unavailable</h3>
        <p className="text-gray-600 max-w-md text-center">
          The PDF document could not be loaded for preview. 
          You may download a sample document instead.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="font-medium">{title || 'PDF Preview'}</h2>
      </div>
      <div className="w-full" style={{ height: '800px' }}>
        <iframe 
          src={`${pdfUrl}#toolbar=0`}
          title={title || 'PDF Viewer'}
          className="w-full h-full"
          data-testid="pdf-iframe"
        >
          Your browser does not support iframes.
        </iframe>
      </div>
    </div>
  );
}