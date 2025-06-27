const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Simple, clean HTML template
function createHTML(markdownContent, title) {
  const htmlContent = md.render(markdownContent);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
    
    @page {
      size: letter;
      margin: 1in;
    }
    
    body {
      background: #1f1108;
      color: #f7d9cb;
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      margin: 0;
      padding: 40px;
    }
    
    h1 {
      color: #FF6D00;
      font-size: 24pt;
      margin: 40px 0 20px;
      text-transform: uppercase;
    }
    
    h2 {
      color: #f7d9cb;
      font-size: 18pt;
      margin: 30px 0 15px;
      padding-left: 10px;
      border-left: 4px solid #FF6D00;
    }
    
    h3 {
      color: #e2ab8d;
      font-size: 14pt;
      margin: 20px 0 10px;
    }
    
    p {
      margin: 0 0 15px 0;
    }
    
    ul, ol {
      margin: 15px 0 15px 30px;
    }
    
    li {
      margin-bottom: 5px;
    }
    
    strong {
      color: #FF6D00;
    }
    
    blockquote {
      border-left: 4px solid #FF6D00;
      padding-left: 20px;
      color: #e2ab8d;
      font-style: italic;
    }
    
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 5px;
      color: #FF6D00;
    }
    
    pre {
      background: rgba(0, 0, 0, 0.3);
      padding: 15px;
      border-left: 4px solid #FF6D00;
      overflow-x: auto;
    }
    
    pre code {
      background: none;
      color: #f7d9cb;
    }
  </style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #FF6D00;">
    <div style="font-size: 36pt; font-weight: 800; color: #FF6D00;">draconic</div>
    <div style="color: #e2ab8d; margin-top: 10px;">AI Trading Intelligence</div>
  </div>
  
  ${htmlContent}
  
  <div style="margin-top: 60px; padding-top: 20px; border-top: 2px solid #e2ab8d; text-align: center; color: #e2ab8d;">
    <div>© ${new Date().getFullYear()} Draconic AI - Evolve into the apex trader</div>
    <div style="font-style: italic; color: #876959; margin-top: 5px;">Markets aren't fair. Neither is Draconic.</div>
  </div>
</body>
</html>
`;
}

async function generatePDF(markdownFile, outputFile) {
  console.log(`Generating: ${path.basename(outputFile)}`);
  
  const markdownContent = fs.readFileSync(markdownFile, 'utf8');
  const html = createHTML(markdownContent, path.basename(markdownFile, '.md'));
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  
  await page.pdf({
    path: outputFile,
    format: 'Letter',
    printBackground: true,
    margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' }
  });
  
  await browser.close();
}

async function main() {
  const sourceDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/Final deliverables';
  const outputDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/draconic-pdf-generator/output-simple';
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = [
    'draconic-content-strategy-v2.md',
    'draconic-firefighting-strategy.md',
    'draconic-launch-playbook.md',
    'draconic-multi-audience-strategy-agency.md',
    'draconic-readme-updated.md'
  ];
  
  for (const file of files) {
    await generatePDF(
      path.join(sourceDir, file),
      path.join(outputDir, file.replace('.md', '.pdf'))
    );
  }
  
  console.log(`\nDone! Files in: ${outputDir}`);
}

main().catch(console.error);