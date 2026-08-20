import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates and downloads a perfectly divided 2-page PDF of the resume
 */
export async function downloadResumeAsPDF(
  page1Id = 'resume-page-1',
  page2Id = 'resume-page-2',
  filename = 'Alok_Vishwakarma_Resume.pdf'
): Promise<boolean> {
  const page1El = document.getElementById(page1Id);
  const page2El = document.getElementById(page2Id);

  if (!page1El || !page2El) {
    console.error('Resume page elements not found for PDF export.');
    window.print();
    return false;
  }

  try {
    // Helper function to render a page cleanly onto a canvas
    const renderPageToCanvas = async (sourceElement: HTMLElement): Promise<HTMLCanvasElement> => {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-99999px';
      container.style.left = '-99999px';
      container.style.width = '794px'; // Standard A4 width in px at 96 DPI
      container.style.backgroundColor = '#ffffff';
      container.style.color = '#000000';
      container.style.padding = '36px 40px 30px 40px';
      container.style.boxSizing = 'border-box';
      container.style.zIndex = '-9999';

      const clone = sourceElement.cloneNode(true) as HTMLElement;
      
      // Remove interactive buttons or excluded items
      const excluded = clone.querySelectorAll('.no-pdf-export, button');
      excluded.forEach((el) => el.remove());

      // Force clean white theme styles for print fidelity
      clone.classList.remove('text-platinum', 'text-platinum-muted', 'bg-[#0a0b0e]');
      clone.classList.add('bg-white', 'text-slate-900');
      clone.style.width = '100%';
      clone.style.height = 'auto';

      container.appendChild(clone);
      document.body.appendChild(container);

      const canvas = await html2canvas(clone, {
        scale: 2, // 2x retina sharpness
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
      });

      document.body.removeChild(container);
      return canvas;
    };

    // Render Page 1 and Page 2 separately
    const canvas1 = await renderPageToCanvas(page1El);
    const canvas2 = await renderPageToCanvas(page2El);

    // Initialize A4 Portrait jsPDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 mm
    const pdfHeight = 297; // A4 mm
    const margin = 8; // 8mm margin
    const contentWidth = pdfWidth - (margin * 2);
    const contentHeight = pdfHeight - (margin * 2);

    // Add Page 1
    const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
    const imgHeight1 = Math.min((canvas1.height * contentWidth) / canvas1.width, contentHeight);
    pdf.addImage(imgData1, 'JPEG', margin, margin, contentWidth, imgHeight1, undefined, 'FAST');

    // Add Page 2
    pdf.addPage();
    const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);
    const imgHeight2 = Math.min((canvas2.height * contentWidth) / canvas2.width, contentHeight);
    pdf.addImage(imgData2, 'JPEG', margin, margin, contentWidth, imgHeight2, undefined, 'FAST');

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to generate 2-page PDF:', err);
    window.print();
    return false;
  }
}
