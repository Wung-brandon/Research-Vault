// /components/ui/DownloadButton.jsx
import { useState } from 'react';
import { Download } from 'lucide-react';
import { generateResearchPDF, generateSimpleResearchPDF } from '@/utils/pdfGenerator';

export default function DownloadButton({ 
  filename, 
  buttonVariant = 'primary',
  research = null,
  elementId = null,
  fallbackData = false,
  iconOnly = false  // 👈 New prop
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      if (research) {
        await generateSimpleResearchPDF(research, filename);
      } else if (!fallbackData) {
        const response = await fetch(`/pdfs/${filename}`);
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          throw new Error('PDF not found');
        }
      } else {
        const sampleResearch = {
          title: "Sample Research Paper",
          student: "Student Name",
          supervisor: "Supervisor Name",
          department: "Sample Department",
          year: new Date().getFullYear(),
          abstract: "This is a sample abstract for demonstration purposes.",
          methodology: "Sample methodology section.",
          findings: "Sample findings section.",
          keywords: ["sample", "research", "demonstration"]
        };

        await generateResearchPDF(fallbackData === true ? research || sampleResearch : fallbackData, filename);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download the file. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  const buttonClass = iconOnly
    ? 'p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50'
    : buttonVariant === 'primary'
      ? 'btn-primary cursor-pointer flex items-center'
      : 'btn-outline cursor-pointer flex items-center';
  
  return (
    <button 
      className={buttonClass}
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label="Download PDF"
    >
      {isDownloading ? (
        iconOnly ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></div>
            Downloading...
          </>
        )
      ) : (
        iconOnly ? (
          <Download size={18} />
        ) : (
          <>
            <Download size={16} className="mr-2" />
            Download PDF
          </>
        )
      )}
    </button>
  );
}
