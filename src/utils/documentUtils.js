import { saveAs } from 'file-saver';
import { toast } from 'react-hot-toast';

/**
 * Downloads a PDF file
 * @param {string} url - The URL of the PDF to download
 * @param {string} filename - The name to save the file as
 * @param {boolean} useFallback - Whether to use fallback PDF if download fails
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadPDF = async (url, filename, useFallback = false) => {
  try {
    // Show loading toast
    const toastId = toast.loading('Preparing download...');
    
    // Check if the URL is absolute or relative
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
    
    // Fetch the PDF with appropriate headers
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      console.error(`PDF download failed with status: ${response.status}`);
      toast.error('Failed to download the PDF. Please try again later.', { id: toastId });
      
      // Return false instead of throwing an error
      return false;
    }
    
    // Convert response to blob
    const blob = await response.blob();
    
    // Ensure the blob is a PDF or at least decent size
    if (blob.type && !blob.type.includes('pdf') && blob.size < 1000) {
      console.warn('Response may not be a valid PDF:', blob.type, blob.size);
      // We'll still try to download it, but warn the user
      toast.warning('The downloaded file may not be a valid PDF.', { id: toastId });
    }
    
    // Save the file using file-saver
    saveAs(blob, filename);
    
    // Show success toast
    toast.success('Download started!', { id: toastId });
    return true;
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download the PDF. Please try again later.');
    return false; // Return false instead of re-throwing
  }
};

/**
 * Creates and downloads a fallback sample PDF
 * @param {string} filename - The name to save the file as
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadFallbackPDF = async (filename) => {
  try {
    const pdfContent = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Resources<<>>/Contents 4 0 R/Parent 2 0 R>>endobj 4 0 obj<</Length 89>>stream\nBT\n/F1 12 Tf\n100 700 Td\n(Sample PDF document - the requested PDF could not be loaded.) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000111 00000 n\n0000000212 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n350\n%%EOF";
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    saveAs(blob, filename || 'sample.pdf');
    toast.success('Sample PDF downloaded');
    return true;
  } catch (error) {
    console.error('Fallback download failed:', error);
    toast.error('Could not generate a sample PDF');
    return false;
  }
};

/**
 * Shares content through different social media platforms
 * @param {Object} options - Sharing options
 * @param {string} options.title - The title of the content to share
 * @param {string} options.url - The URL to share
 * @param {string} options.platform - The platform to share on ('twitter', 'facebook', 'linkedin', 'whatsapp', 'email', 'copy')
 * @returns {Promise<void>}
 */
export const shareContent = async ({ title, url, platform }) => {
  // Use the current URL if not provided
  const shareUrl = url || window.location.href;
  
  // Switch based on the platform
  switch (platform) {
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      break;
      
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      break;
      
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      break;
      
    case 'whatsapp':
      // For WhatsApp sharing
      const whatsappText = `${title} - ${shareUrl}`;
      // Use the appropriate URL scheme based on device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const whatsappUrl = isMobile 
        ? `whatsapp://send?text=${encodeURIComponent(whatsappText)}`
        : `https://web.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');
      break;
    
    case 'email':
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this research: ${shareUrl}`)}`;
      break;
      
    case 'copy':
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        console.error('Copy error:', error);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success('Link copied to clipboard!');
      }
      break;
      
    default:
      toast.error('Sharing option not supported');
  }
};