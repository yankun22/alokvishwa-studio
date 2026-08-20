import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates and downloads a high-fidelity multi-page PDF of the resume element
 */
export async function downloadResumeAsPDF(elementId: string, filename = 'Alok_Vishwakarma_Resume.pdf'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  try {
    // Clone element to a temporary container to render in clean print-ready light theme
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-99999px';
    tempContainer.style.left = '-99999px';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.color = '#0f172a';
    tempContainer.style.padding = '32px';
    tempContainer.style.boxSizing = 'border-box';
    tempContainer.style.zIndex = '-9999';

    // Clone the node
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove action bar or any interactive close/print buttons from clone
    const buttons = clone.querySelectorAll('button, .no-pdf-export, [role="button"]');
    buttons.forEach((btn) => btn.remove());

    // Apply clean print styles to clone
    clone.classList.remove('bg-[#0a0b0e]', 'text-platinum', 'text-platinum-muted', 'max-h-[90vh]', 'overflow-y-auto');
    clone.classList.add('bg-white', 'text-slate-900');
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.border = 'none';
    clone.style.boxShadow = 'none';
    clone.style.width = '100%';

    // Fix all dark theme texts in clone to dark slate/black
    const allDarkTexts = clone.querySelectorAll('.text-platinum, .text-platinum-muted, .text-slate-300, .text-slate-400');
    allDarkTexts.forEach((el) => {
      (el as HTMLElement).style.color = '#1e293b';
    });

    const allWhiteBgs = clone.querySelectorAll('.bg-white\\/\\[0\\.02\\], .bg-white\\/\\[0\\.015\\], .bg-white\\/\\[0\\.03\\]');
    allWhiteBgs.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = '#f8fafc';
      (el as HTMLElement).style.borderColor = '#e2e8f0';
    });

    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    // Render canvas with html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x high-DPI retina sharpness
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
    });

    // Remove temporary DOM container
    document.body.removeChild(tempContainer);

    // Initialize jsPDF (A4 portrait)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 10; // 10mm margin
    const contentWidth = pdfWidth - (margin * 2);

    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeightContent = pdfHeight - (margin * 2);

    let heightLeft = imgHeight;
    let position = margin;
    let page = 1;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // First page
    pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeightContent;

    // Subsequent pages if content overflows A4
    while (heightLeft > 0) {
      position = margin - (page * pageHeightContent);
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeightContent;
      page++;
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF via canvas export:', err);
    // Fallback to native window.print()
    window.print();
    return false;
  }
}
