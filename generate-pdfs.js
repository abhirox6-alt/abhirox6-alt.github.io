const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install required packages if not already installed
try {
  require.resolve('puppeteer');
  require.resolve('markdown-it');
} catch (e) {
  console.log('Installing required packages...');
  execSync('npm install puppeteer markdown-it', { stdio: 'inherit' });
}

const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// HTML template with Draconic styling
function createHTML(markdownContent, title) {
  const htmlContent = md.render(markdownContent);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      background: #1f1108;
      color: #f7d9cb;
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 11pt;
      line-height: 1.8;
    }
    
    @page {
      size: letter;
      margin: 0;
    }
    
    .page {
      background: #1f1108;
      min-height: 100vh;
      padding: 96px 72px 120px 72px; /* More top padding and bottom space */
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 40px;
      border-bottom: 3px solid #FF6D00;
    }
    
    .logo {
      font-size: 36px;
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
      margin-top: 4px;
    }
    
    /* Content */
    .content {
      flex: 1;
      margin-bottom: 120px; /* Much more bottom margin */
      padding-bottom: 60px; /* Extra padding at bottom */
    }
    
    /* Page break handling */
    .content > *:first-child {
      margin-top: 0;
      padding-top: 20px; /* Space at top of new pages */
    }
    
    @media print {
      .page {
        page-break-after: always;
        page-break-inside: avoid;
      }
    }
    
    /* Typography */
    h1 {
      font-weight: 700;
      font-size: 28px;
      line-height: 1.2;
      color: #FF6D00;
      margin: 48px 0 24px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      page-break-after: avoid;
      page-break-before: auto;
      padding-top: 20px; /* Extra space when starting new section */
    }
    
    h1:first-child {
      margin-top: 0;
    }
    
    h2 {
      font-weight: 600;
      font-size: 22px;
      line-height: 1.3;
      color: #f7d9cb;
      margin: 36px 0 16px;
      padding: 12px 16px;
      border-left: 4px solid #FF6D00;
      background: linear-gradient(90deg, rgba(255, 109, 0, 0.1) 0%, transparent 50%);
      page-break-after: avoid;
    }
    
    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
      color: #e2ab8d;
      margin: 28px 0 12px;
      padding-left: 16px;
      position: relative;
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
      font-size: 15px;
      color: #f7d9cb;
      margin: 20px 0 8px;
      padding-left: 24px;
      page-break-after: avoid;
    }
    
    p {
      margin: 0 0 20px 0;
      text-align: justify;
      color: #f7d9cb;
      orphans: 4;
      widows: 4;
      line-height: 1.9;
    }
    
    /* Lists */
    ul, ol {
      margin: 16px 0 20px 32px;
      color: #f7d9cb;
    }
    
    li {
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    
    li > ul,
    li > ol {
      margin: 8px 0 8px 24px;
    }
    
    /* Blockquotes */
    blockquote {
      margin: 24px 0;
      padding: 20px 24px;
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
      padding: 16px;
      margin: 20px 0;
      overflow-x: auto;
      page-break-inside: avoid;
    }
    
    pre code {
      background: none;
      padding: 0;
      color: #f7d9cb;
    }
    
    /* Strong text */
    strong, b {
      font-weight: 700;
      color: #FF6D00;
    }
    
    em, i {
      color: #e2ab8d;
    }
    
    /* Links */
    a {
      color: #FF6D00;
      text-decoration: underline;
    }
    
    /* Footer */
    .footer {
      position: absolute;
      bottom: 40px; /* Higher from bottom */
      left: 72px;
      right: 72px;
      padding-top: 24px;
      border-top: 2px solid #e2ab8d;
      text-align: center;
    }
    
    /* Better page break control */
    h1, h2, h3, h4 {
      break-inside: avoid;
      break-after: avoid;
    }
    
    p, li {
      break-inside: avoid;
    }
    
    /* Ensure minimum space at bottom of pages */
    .content > *:last-child {
      margin-bottom: 60px;
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
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">draconic</div>
      <div class="header-info">
        <div class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div class="tagline">AI Trading Intelligence</div>
      </div>
    </div>
    
    <div class="content">
      ${htmlContent}
    </div>
    
    <div class="footer">
      <div class="footer-line">© ${new Date().getFullYear()} Draconic AI - Evolve into the apex trader</div>
      <div class="footer-tagline">Markets aren't fair. Neither is Draconic.</div>
    </div>
  </div>
</body>
</html>
`;
}

async function generatePDF(markdownFile, outputFile) {
  console.log(`Generating PDF for ${path.basename(markdownFile)}...`);
  
  try {
    // Read markdown file
    const markdownContent = fs.readFileSync(markdownFile, 'utf8');
    const title = path.basename(markdownFile, '.md');
    
    // Create HTML
    const html = createHTML(markdownContent, title);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set content
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Generate PDF
    await page.pdf({
      path: outputFile,
      format: 'Letter',
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      preferCSSPageSize: true
    });
    
    await browser.close();
    console.log(`✓ Generated: ${path.basename(outputFile)}`);
    
  } catch (error) {
    console.error(`Error generating PDF for ${markdownFile}:`, error);
  }
}

async function main() {
  const sourceDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/Final deliverables';
  const outputDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/draconic-pdf-generator/output';
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // List of markdown files to process
  const markdownFiles = [
    'draconic-content-strategy-v2.md',
    'draconic-firefighting-strategy.md',
    'draconic-launch-playbook.md',
    'draconic-multi-audience-strategy-agency.md',
    'draconic-readme-updated.md'
  ];
  
  console.log('Starting PDF generation with Draconic branding...\n');
  
  // Process each file
  for (const file of markdownFiles) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file.replace('.md', '.pdf'));
    
    if (fs.existsSync(inputPath)) {
      await generatePDF(inputPath, outputPath);
    } else {
      console.error(`File not found: ${inputPath}`);
    }
  }
  
  console.log('\nAll PDFs generated successfully!');
  console.log(`Output directory: ${outputDir}`);
}

// Run the script
main().catch(console.error);