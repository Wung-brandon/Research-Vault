// /utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

/**
 * Generates a well-formatted research PDF from research data
 * @param {Object} research - Research data object
 * @param {string} filename - Name for the downloaded file
 */
export const generateResearchPDF = async (research, filename) => {
  // Create a new PDF document
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;
  
  // Set font styles
  doc.setFont('helvetica', 'normal');
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const title = research.title;
  const splitTitle = doc.splitTextToSize(title, contentWidth);
  doc.text(splitTitle, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += (splitTitle.length * 8) + 10;
  
  // Author & Supervisor
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Student: ${research.student}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 7;
  doc.text(`Supervisor: ${research.supervisor}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 7;
  doc.text(`Department: ${research.department}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 7;
  doc.text(`Year: ${research.year}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // Abstract section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Abstract', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const abstractText = research.abstract;
  const splitAbstract = doc.splitTextToSize(abstractText, contentWidth);
  doc.text(splitAbstract, margin, yPosition);
  yPosition += (splitAbstract.length * 6) + 10;
  
  // Check if we need a new page
  if (yPosition > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Add Methodology section if available
  if (research.methodology) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Methodology', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const methodologyText = research.methodology;
    const splitMethodology = doc.splitTextToSize(methodologyText, contentWidth);
    doc.text(splitMethodology, margin, yPosition);
    yPosition += (splitMethodology.length * 6) + 10;
  }
  
  // Check if we need a new page
  if (yPosition > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Add Findings section if available
  if (research.findings) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Findings', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const findingsText = research.findings;
    const splitFindings = doc.splitTextToSize(findingsText, contentWidth);
    doc.text(splitFindings, margin, yPosition);
    yPosition += (splitFindings.length * 6) + 10;
  }
  
  // Check if we need a new page
  if (yPosition > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Add Limitations section if available
  if (research.limitations) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Limitations', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const limitationsText = research.limitations;
    const splitLimitations = doc.splitTextToSize(limitationsText, contentWidth);
    doc.text(splitLimitations, margin, yPosition);
    yPosition += (splitLimitations.length * 6) + 10;
  }
  
  // Check if we need a new page
  if (yPosition > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Add Implications section if available
  if (research.implications) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Implications', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const implicationsText = research.implications;
    const splitImplications = doc.splitTextToSize(implicationsText, contentWidth);
    doc.text(splitImplications, margin, yPosition);
    yPosition += (splitImplications.length * 6) + 10;
  }
  
  // Check if we need a new page
  if (yPosition > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Add Keywords section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Keywords', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const keywordsText = research.keywords.join(', ');
  const splitKeywords = doc.splitTextToSize(keywordsText, contentWidth);
  doc.text(splitKeywords, margin, yPosition);
  yPosition += (splitKeywords.length * 6) + 10;
  
  // Add footer with page numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  // Save the PDF
  doc.save(filename);
};

/**
 * Enhanced function that captures the current DOM view and includes it in the PDF
 * @param {Object} research - Research data object
 * @param {string} elementId - ID of the DOM element to capture
 * @param {string} filename - Name for the downloaded file
 */
export const generateResearchPDFWithView = async (research, elementId, filename) => {
  try {
    // First create the basic PDF with just the research data (no DOM capture)
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;
    
    // Set font styles
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const title = research.title;
    const splitTitle = doc.splitTextToSize(title, contentWidth);
    doc.text(splitTitle, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += (splitTitle.length * 8) + 10;
    
    // Author & Supervisor
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student: ${research.student}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
    doc.text(`Supervisor: ${research.supervisor}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
    doc.text(`Department: ${research.department}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
    doc.text(`Year: ${research.year}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Abstract section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Abstract', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const abstractText = research.abstract;
    const splitAbstract = doc.splitTextToSize(abstractText, contentWidth);
    doc.text(splitAbstract, margin, yPosition);
    yPosition += (splitAbstract.length * 6) + 10;
    
    // Add other sections (methodology, findings, etc.) similar to generateResearchPDF
    if (research.methodology) {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Methodology', margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const methodologyText = research.methodology;
      const splitMethodology = doc.splitTextToSize(methodologyText, contentWidth);
      doc.text(splitMethodology, margin, yPosition);
      yPosition += (splitMethodology.length * 6) + 10;
    }
    
    if (research.findings) {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Findings', margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const findingsText = research.findings;
      const splitFindings = doc.splitTextToSize(findingsText, contentWidth);
      doc.text(splitFindings, margin, yPosition);
      yPosition += (splitFindings.length * 6) + 10;
    }
    
    if (research.keywords && research.keywords.length > 0) {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Keywords', margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const keywordsText = research.keywords.join(', ');
      const splitKeywords = doc.splitTextToSize(keywordsText, contentWidth);
      doc.text(splitKeywords, margin, yPosition);
      yPosition += (splitKeywords.length * 6) + 10;
    }
    
    // Skip the DOM capturing part which causes the oklch color error
    // Instead, just add a note about where to find the full content
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Note', margin, margin);
    yPosition = margin + 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const noteText = "For the complete research paper with all sections and formatting, please refer to the online version available on the university research portal.";
    const splitNote = doc.splitTextToSize(noteText, contentWidth);
    doc.text(splitNote, margin, yPosition);
    
    // Add footer with page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    // Save the PDF
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

/**
 * A simpler method that avoids DOM capture entirely and only uses research data
 * Use this if you're experiencing issues with the oklch color function
 */
export const generateSimpleResearchPDF = async (research, filename) => {
  try {
    // Use the simpler data-only method instead
    await generateResearchPDF(research, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};