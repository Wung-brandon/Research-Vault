// /components/ui/DownloadButton.jsx
import { useState } from 'react';
import { Download } from 'lucide-react';
import { generateResearchPDF, generateSimpleResearchPDF } from '@/utils/pdfGenerator';

export default function DownloadButton({ 
  filename, 
  buttonVariant = 'primary',
  research = null,
  elementId = null,
  fallbackData = false
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // If research data is provided, use our PDF generator
      if (research) {
        // Use the simple version that avoids DOM capture to prevent oklch color errors
        await generateSimpleResearchPDF(research, filename);
      } 
      // Otherwise use the standard download approach (fetch the PDF)
      else if (!fallbackData) {
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
      } 
      // Use fallback sample data
      else {
        // Create a sample research object if research data not provided
        const sampleResearch = {
          title: "Sample Research Paper",
          student: "Student Name",
          supervisor: "Supervisor Name",
          department: "Sample Department",
          year: new Date().getFullYear(),
          abstract: "This is a sample abstract for demonstration purposes. The actual research content is not available for download at this time.",
          methodology: "Sample methodology section would go here, describing the research methods used.",
          findings: "Sample findings section, outlining the key discoveries of the research.",
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
  
  const buttonClass = buttonVariant === 'primary' 
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
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></div>
          Downloading...
        </>
      ) : (
        <>
          <Download size={16} className="mr-2" />
          Download PDF
        </>
      )}
    </button>
  );
}