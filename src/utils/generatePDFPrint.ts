import MarkdownIt from 'markdown-it';

export async function generatePDF(markdownContent: string) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  
  const htmlContent = md.render(markdownContent);
  
  // Create a full-page dark themed PDF with better formatting
  const pdfHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Draconic Document</title>
  <style>
    /* Import Bricolage Grotesque */
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
    
    /* Print-specific color adjustment */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
    
    /* Base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      background-color: #1f1108;
      color: #f7d9cb;
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 12pt;
      line-height: 1.8;
      width: 100%;
      height: 100%;
    }
    
    /* Page setup */
    @page {
      size: letter;
      margin: 0.75in;
      background: #1f1108;
    }
    
    @page:first {
      margin-top: 0.5in;
    }
    
    /* Container */
    .pdf-container {
      background-color: #1f1108;
      min-height: 100vh;
      padding: 20px;
    }
    
    /* Header */
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      margin-bottom: 30px;
      border-bottom: 3px solid #FF6D00;
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    
    .logo {
      font-size: 32pt;
      font-weight: 800;
      color: #FF6D00;
      letter-spacing: -0.02em;
    }
    
    .header-info {
      text-align: right;
      color: #e2ab8d;
      font-size: 10pt;
    }
    
    .header-info .date {
      font-weight: 400;
    }
    
    .header-info .tagline {
      font-weight: 200;
      opacity: 0.8;
      margin-top: 2px;
    }
    
    /* Content */
    .pdf-content {
      margin-bottom: 50px;
    }
    
    /* Headers with controlled sizing */
    h1 {
      font-weight: 700;
      font-size: 24pt;
      line-height: 1.2;
      color: #FF6D00;
      margin: 40px 0 20px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      page-break-inside: avoid;
      page-break-after: avoid;
      orphans: 3;
      widows: 3;
    }
    
    h1:first-child {
      margin-top: 0;
    }
    
    /* Keep headers with content */
    h1 + *,
    h2 + *,
    h3 + *,
    h4 + * {
      page-break-before: avoid;
    }
    
    h2 {
      font-weight: 600;
      font-size: 18pt;
      line-height: 1.3;
      color: #f7d9cb;
      margin: 30px 0 15px;
      padding: 10px 15px;
      border-left: 4px solid #FF6D00;
      background: linear-gradient(90deg, rgba(255, 109, 0, 0.1) 0%, transparent 50%);
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    
    h3 {
      font-weight: 500;
      font-size: 14pt;
      line-height: 1.4;
      color: #e2ab8d;
      margin: 25px 0 12px;
      padding-left: 15px;
      position: relative;
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    
    h3:before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #FF6D00;
    }
    
    h4 {
      font-weight: 500;
      font-size: 12pt;
      color: #f7d9cb;
      margin: 20px 0 8px;
      padding-left: 20px;
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    
    /* Paragraphs */
    p {
      margin: 0 0 15px 0;
      text-align: justify;
      color: #f7d9cb;
      orphans: 3;
      widows: 3;
      page-break-inside: avoid;
    }
    
    /* Keep short paragraphs together */
    p + p {
      page-break-before: avoid;
    }
    
    /* Lists */
    ul, ol {
      margin: 15px 0 20px 30px;
      color: #f7d9cb;
      page-break-inside: avoid;
    }
    
    li {
      margin-bottom: 8px;
      orphans: 2;
      widows: 2;
      page-break-inside: avoid;
    }
    
    /* Keep list items together */
    li + li {
      page-break-before: avoid;
    }
    
    /* Nested lists */
    li > ul,
    li > ol {
      margin: 8px 0 8px 25px;
    }
    
    /* Blockquotes */
    blockquote {
      margin: 20px 0;
      padding: 20px 25px;
      border-left: 4px solid #FF6D00;
      background: rgba(255, 109, 0, 0.05);
      color: #e2ab8d;
      font-style: italic;
      page-break-inside: avoid;
    }
    
    /* Code */
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 0.9em;
      color: #FF6D00;
    }
    
    pre {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 109, 0, 0.2);
      border-left: 4px solid #FF6D00;
      padding: 15px;
      margin: 20px 0;
      overflow-x: auto;
      page-break-inside: avoid;
    }
    
    pre code {
      background: none;
      padding: 0;
      color: #f7d9cb;
    }
    
    /* Tables */
    table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
      page-break-inside: avoid;
    }
    
    th {
      background: rgba(255, 109, 0, 0.15);
      color: #f7d9cb;
      font-weight: 600;
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #FF6D00;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: #f7d9cb;
    }
    
    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }
    
    /* Links */
    a {
      color: #FF6D00;
      text-decoration: underline;
    }
    
    /* Strong text */
    strong, b {
      font-weight: 700;
      color: #FF6D00;
    }
    
    em, i {
      color: #e2ab8d;
    }
    
    /* Footer */
    .pdf-footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e2ab8d;
      text-align: center;
      page-break-inside: avoid;
    }
    
    .footer-line {
      color: #e2ab8d;
      font-size: 10pt;
      font-weight: 400;
    }
    
    .footer-tagline {
      color: #876959;
      font-size: 9pt;
      font-weight: 200;
      font-style: italic;
      margin-top: 3px;
    }
    
    /* Page break utilities */
    .page-break {
      page-break-before: always;
    }
    
    .keep-together {
      page-break-inside: avoid;
    }
    
    /* Section grouping */
    section {
      page-break-inside: avoid;
    }
    
    /* Ensure sections don't break awkwardly */
    section > h1:first-child,
    section > h2:first-child,
    section > h3:first-child {
      page-break-before: auto;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <div class="pdf-header">
      <div class="logo">draconic</div>
      <div class="header-info">
        <div class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div class="tagline">AI Trading Intelligence</div>
      </div>
    </div>
    
    <div class="pdf-content">
      ${htmlContent}
    </div>
    
    <div class="pdf-footer">
      <div class="footer-line">© ${new Date().getFullYear()} Draconic AI - Evolve into the apex trader</div>
      <div class="footer-tagline">Markets aren't fair. Neither is Draconic.</div>
    </div>
  </div>
</body>
</html>
`;

  // Create a hidden iframe for printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  // Write content to iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    throw new Error('Could not access iframe document');
  }
  
  iframeDoc.open();
  iframeDoc.write(pdfHTML);
  iframeDoc.close();

  // Wait for content to load
  await new Promise(resolve => {
    iframe.onload = () => resolve(true);
    // Fallback timeout
    setTimeout(() => resolve(true), 1000);
  });

  // Trigger print dialog
  iframe.contentWindow?.print();

  // Clean up after a delay
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
}