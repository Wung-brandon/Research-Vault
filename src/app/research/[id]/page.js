"use client"
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Users, AlertCircle, Microscope, Lightbulb, AlertTriangle, Briefcase, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import PDFViewer from '@/components/ui/PDFViewer';
import DownloadButton from '@/components/ui/DownloadButton';
import ShareMenu from '@/components/ui/ShareMenu';
import { allResearch } from '@/data/research';
import Layout from '@/components/layout/Layout';

export default function ResearchDetail() {
  const params = useParams();
  const id = params.id;
  const [pdfExists, setPdfExists] = useState(true);

  const [currentUrl, setCurrentUrl] = useState('');
  
  // Find the research by ID
  const research = allResearch.find(item => item.id === id);
  
  // If research not found or still loading
  if (!research) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading research details...</p>
      </div>
    );
  }
  
  // Create PDF filename
  const pdfFilename = `${research.student} - ${research.title} (${research.year}).pdf`;
  
  // Get PDF URL
  const pdfUrl = `/pdfs/${research.id}.pdf`;

  // Check if PDF exists
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const checkPdfExists = async () => {
      try {
        const response = await fetch(pdfUrl, { 
          method: 'HEAD',
          cache: 'no-store'
        });
        
        console.log(`PDF check for ${pdfUrl}: Status ${response.status}`);
        setPdfExists(response.status === 200);
      } catch (error) {
        console.error('Error checking PDF existence:', error);
        setPdfExists(false);
      }
    };
    
    checkPdfExists();
  }, [pdfUrl]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/research/${research.id}`);
    }
  }, [research.id]);

  
  // Find related research from the same department
  const relatedResearch = allResearch
    .filter(item => item.department === research.department && item.id !== research.id)
    .slice(0, 3);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 overflow-hidden">
          <ol className="flex flex-wrap items-center text-sm text-gray-600">
            <li className="flex-shrink-0">
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="px-2 flex-shrink-0">/</li>
            <li className="flex-shrink-0">
              <Link href="/research" className="hover:text-blue-600">Research</Link>
            </li>
            <li className="px-2 flex-shrink-0">/</li>
            <li className="text-gray-900 font-medium truncate max-w-[calc(100%-150px)]" title={research.title}>
              {research.title}
            </li>
          </ol>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                href="/research"
                className="inline-flex items-center text-blue-600 mb-4 hover:underline"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Research List
              </Link>
              
              <h1 className="text-3xl font-bold mb-6">{research.title}</h1>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex flex-wrap gap-y-4 gap-x-8 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-2 text-blue-600" />
                    <span>{research.year}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-2 text-blue-600" />
                    <span>{research.student}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="mr-2 text-blue-600" />
                    <span>Supervisor: {research.supervisor}</span>
                  </div>
                  
                  <Link 
                    href={`/departments/${research.department.toLowerCase()}`}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                  >
                    {research.department}
                  </Link>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Abstract</h2>
                  <p className="text-gray-700 leading-relaxed">{research.abstract}</p>
                </div>
                
                {research.methodology && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Microscope size={20} className="mr-2 text-blue-600" />
                      Methodology
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{research.methodology}</p>
                  </div>
                )}
                
                {research.findings && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Lightbulb size={20} className="mr-2 text-blue-600" />
                      Key Findings
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{research.findings}</p>
                  </div>
                )}
                
                {research.limitations && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <AlertTriangle size={20} className="mr-2 text-blue-600" />
                      Limitations
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{research.limitations}</p>
                  </div>
                )}
                
                {research.implications && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Briefcase size={20} className="mr-2 text-blue-600" />
                      Implications
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{research.implications}</p>
                  </div>
                )}
                
                {research.funding && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <DollarSign size={20} className="mr-2 text-blue-600" />
                      Funding
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{research.funding}</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {research.keywords.map(keyword => (
                      <span 
                        key={keyword}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                {!pdfExists && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start">
                    <AlertCircle size={20} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-800 font-medium">PDF Preview Unavailable</p>
                      <p className="text-yellow-700 text-sm mt-1">
                        The PDF file for this research is currently unavailable. 
                        You can generate a PDF using the button below.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4">
                  {pdfExists ? (
                    <DownloadButton 
                      filename={pdfFilename}
                      buttonVariant="primary"
                    />
                  ) : (
                    <DownloadButton 
                      filename={pdfFilename}
                      buttonVariant="primary"
                      research={research}
                      // Removed elementId to avoid DOM capture that causes oklch error
                    />
                  )}
                  
                  {currentUrl && (
                    <ShareMenu
                      title={research.title}
                      url={currentUrl}
                      buttonVariant="outline"
                    />
                    )}  
                </div>
              </div>
              
              {pdfExists ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <PDFViewer 
                    title={research.title}
                    pdfUrl={pdfUrl}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="p-4 rounded-full bg-gray-100 inline-flex mb-4">
                    <AlertCircle size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">PDF Preview Unavailable</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    The PDF document for this research paper is not currently available for preview.
                    You can generate a PDF using the button above.
                  </p>
                  <button 
                    className="btn-primary cursor-pointer"
                    onClick={() => {
                      const downloadBtn = document.querySelector('[aria-label="Download PDF"]');
                      if (downloadBtn) downloadBtn.click();
                    }}
                  >
                    Generate PDF
                  </button>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Research Information</h2>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publication Date</h3>
                    <p className="text-gray-800">{research.publicationDate || `${research.year}`}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                    <p className="text-gray-800">{research.pages || '72'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Language</h3>
                    <p className="text-gray-800">{research.language || 'English'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Faculty/Department</h3>
                    <p className="text-gray-800">{research.department}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Degree</h3>
                    <p className="text-gray-800">{research.degree || 'Bachelor of Science'}</p>
                  </div>
                </div>
              </div>
              
              {relatedResearch.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Related Research</h2>
                  
                  <div className="space-y-4">
                    {relatedResearch.map(item => (
                      <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <Link 
                          href={`/research/${item.id}`}
                          className="block hover:text-blue-600"
                        >
                          <h3 className="font-medium line-clamp-2 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {item.student} • {item.year}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}