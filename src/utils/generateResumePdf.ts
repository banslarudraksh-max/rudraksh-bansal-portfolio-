import { jsPDF } from 'jspdf';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  SKILL_CATEGORIES,
  PROJECTS,
} from '../data/portfolioData';

interface ContactLinks {
  github: string;
  linkedin: string;
  email: string;
}

/**
 * Generates and downloads a clean, professional A4 PDF of Rudraksh Bansal's resume.
 */
export function generateResumePDF(links: ContactLinks = PERSONAL_INFO.links): void {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
    orientation: 'portrait',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  let currentY = 16;

  // Helper to check page break threshold
  const checkPageBreak = (neededSpace: number): boolean => {
    if (currentY + neededSpace > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
      return true;
    }
    return false;
  };

  // Helper to draw section headers
  const drawSectionHeader = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(5, 150, 105); // emerald-600
    doc.text(title.toUpperCase(), marginX, currentY);
    currentY += 1.6;
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(0.35);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 4.5;
  };

  // 1. Header Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(PERSONAL_INFO.name, marginX, currentY);
  currentY += 6.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text(PERSONAL_INFO.role, marginX, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`${PERSONAL_INFO.location}  •  ${EDUCATION_DATA.institution}`, marginX, currentY);
  currentY += 4.5;

  // Contact Links Row with clickable hyperlinks
  const linkY = currentY;
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);

  // Email
  const emailText = `Email: ${links.email}`;
  doc.textWithLink(emailText, marginX, linkY, { url: `mailto:${links.email}` });
  const emailWidth = doc.getTextWidth(emailText);

  // GitHub
  const ghX = marginX + emailWidth + 6;
  const ghText = 'GitHub Profile';
  doc.textWithLink(ghText, ghX, linkY, { url: links.github });
  const ghWidth = doc.getTextWidth(ghText);

  // LinkedIn
  const inX = ghX + ghWidth + 6;
  const inText = 'LinkedIn Profile';
  doc.textWithLink(inText, inX, linkY, { url: links.linkedin });

  currentY += 4;

  // Subtle Header Divider
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 6;

  // 2. Professional Summary
  drawSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // slate-700
  const bioLines = doc.splitTextToSize(PERSONAL_INFO.bio, contentWidth);
  doc.text(bioLines, marginX, currentY);
  currentY += bioLines.length * 4.2 + 2.5;

  // 3. Education
  drawSectionHeader('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${EDUCATION_DATA.degree} – ${EDUCATION_DATA.specialization}`, marginX, currentY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);
  doc.text(EDUCATION_DATA.currentSemester, marginX + contentWidth, currentY, { align: 'right' });
  currentY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`${EDUCATION_DATA.institution}  •  ${EDUCATION_DATA.period}`, marginX, currentY);
  currentY += 4.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Relevant Academic Coursework: ', marginX, currentY);
  const cwLabelWidth = doc.getTextWidth('Relevant Academic Coursework: ');

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const courseworkStr = EDUCATION_DATA.coursework.join(', ');
  const cwLines = doc.splitTextToSize(courseworkStr, contentWidth - cwLabelWidth);
  doc.text(cwLines[0], marginX + cwLabelWidth, currentY);
  if (cwLines.length > 1) {
    currentY += 4;
    doc.text(cwLines.slice(1), marginX + 4, currentY);
    currentY += (cwLines.length - 1) * 4;
  } else {
    currentY += 4.5;
  }
  currentY += 2;

  // 4. Skills Breakdown
  drawSectionHeader('Technical & Professional Skills');
  SKILL_CATEGORIES.forEach((cat) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    const catTitle = `${cat.title}: `;
    doc.text(catTitle, marginX, currentY);
    const titleWidth = doc.getTextWidth(catTitle);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const skillsStr = cat.skills.map((s) => s.name).join(', ');
    const skillLines = doc.splitTextToSize(skillsStr, contentWidth - titleWidth);
    doc.text(skillLines[0], marginX + titleWidth, currentY);
    if (skillLines.length > 1) {
      currentY += 4;
      doc.text(skillLines.slice(1), marginX + 8, currentY);
      currentY += (skillLines.length - 1) * 4;
    }
    currentY += 4.5;
  });
  currentY += 2;

  // 5. Academic & Practical Projects
  drawSectionHeader('Academic & Practical Projects');
  PROJECTS.forEach((proj) => {
    checkPageBreak(28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, marginX, currentY);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(proj.category, marginX + contentWidth, currentY, { align: 'right' });
    currentY += 4.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(descLines, marginX, currentY);
    currentY += descLines.length * 4 + 1;

    // Key Features
    proj.keyFeatures.forEach((feat) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const featLines = doc.splitTextToSize(`•  ${feat}`, contentWidth - 4);
      doc.text(featLines, marginX + 3, currentY);
      currentY += featLines.length * 3.8;
    });

    // Tech Stack
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(5, 150, 105);
    doc.text('Technologies: ', marginX + 3, currentY);
    const techLabelW = doc.getTextWidth('Technologies: ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(proj.technologies.join(', '), marginX + 3 + techLabelW, currentY);
    currentY += 5.5;
  });

  // Footers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Rudraksh Bansal — Professional Portfolio Resume', marginX, pageHeight - 8);
    doc.text(`Page ${p} of ${totalPages}`, marginX + contentWidth, pageHeight - 8, {
      align: 'right',
    });
  }

  // Trigger browser download with exact requested filename
  doc.save('Rudraksh_Bansal_Resume.pdf');
}
