import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PageLinkInfo {
  url: string;
  x: number; // in mm
  y: number; // in mm
  w: number; // in mm
  h: number; // in mm
}

interface PageRenderResult {
  canvas: HTMLCanvasElement;
  links: PageLinkInfo[];
}

/**
 * Generates and downloads a perfectly divided 2-page PDF of the resume
 * with all interactive hyperlinks mapped into the PDF annotations.
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
    return false;
  }

  try {
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 8; // 8mm margin
    const contentWidth = pdfWidth - (margin * 2);
    const contentHeight = pdfHeight - (margin * 2);

    // Helper to render a page to canvas and extract link bounding boxes
    const renderPage = async (sourceElement: HTMLElement): Promise<PageRenderResult> => {
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
      
      // Exclude screen-only buttons
      const excluded = clone.querySelectorAll('.no-pdf-export, button');
      excluded.forEach((el) => el.remove());

      // Force clean light styling
      clone.classList.remove('text-platinum', 'text-platinum-muted', 'bg-[#0a0b0e]');
      clone.classList.add('bg-white', 'text-slate-900');
      clone.style.width = '100%';
      clone.style.height = 'auto';

      container.appendChild(clone);
      document.body.appendChild(container);

      // Extract all anchor links and their exact positions relative to container
      const containerRect = container.getBoundingClientRect();
      const anchorNodes = container.querySelectorAll<HTMLAnchorElement>('a[href]');
      const rawLinks: { url: string; relX: number; relY: number; relW: number; relH: number }[] = [];

      anchorNodes.forEach((a) => {
        const href = a.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          const rect = a.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            rawLinks.push({
              url: a.href,
              relX: (rect.left - containerRect.left) / containerRect.width,
              relY: (rect.top - containerRect.top) / containerRect.height,
              relW: rect.width / containerRect.width,
              relH: rect.height / containerRect.height,
            });
          }
        }
      });

      // Render high-res retina canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
      });

      document.body.removeChild(container);

      // Convert relative coordinates to PDF mm coordinates
      const imgHeight = Math.min((canvas.height * contentWidth) / canvas.width, contentHeight);
      const links: PageLinkInfo[] = rawLinks.map((link) => ({
        url: link.url,
        x: margin + link.relX * contentWidth,
        y: margin + link.relY * imgHeight,
        w: link.relW * contentWidth,
        h: link.relH * imgHeight,
      }));

      return { canvas, links };
    };

    // Render Page 1 and Page 2 in parallel
    const [page1Result, page2Result] = await Promise.all([
      renderPage(page1El),
      renderPage(page2El),
    ]);

    // Create jsPDF A4 Document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // ----------------- PAGE 1 -----------------
    const imgData1 = page1Result.canvas.toDataURL('image/jpeg', 0.98);
    const imgHeight1 = Math.min((page1Result.canvas.height * contentWidth) / page1Result.canvas.width, contentHeight);
    pdf.addImage(imgData1, 'JPEG', margin, margin, contentWidth, imgHeight1, undefined, 'FAST');

    // Add clickable link annotations for Page 1
    page1Result.links.forEach((link) => {
      pdf.link(link.x, link.y, link.w, link.h, { url: link.url });
    });

    // ----------------- PAGE 2 -----------------
    pdf.addPage();
    const imgData2 = page2Result.canvas.toDataURL('image/jpeg', 0.98);
    const imgHeight2 = Math.min((page2Result.canvas.height * contentWidth) / page2Result.canvas.width, contentHeight);
    pdf.addImage(imgData2, 'JPEG', margin, margin, contentWidth, imgHeight2, undefined, 'FAST');

    // Add clickable link annotations for Page 2
    page2Result.links.forEach((link) => {
      pdf.link(link.x, link.y, link.w, link.h, { url: link.url });
    });

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to generate 2-page PDF with links:', err);
    return false;
  }
}
