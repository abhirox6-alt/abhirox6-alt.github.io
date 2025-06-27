const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Beautiful HTML template matching the React preview exactly
function createHTML(markdownContent, title) {
  const htmlContent = md.render(markdownContent);
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title} - Draconic</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,700&display=swap');
    
    @font-face {
      font-family: 'Reckless';
      src: url('assets/fonts/Reckless-Light.woff2') format('woff2'),
           url('assets/fonts/Reckless-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
    }

    :root {
      --draconic-orange: #FF6D00;
      --draconic-dark: #1f1108;
      --draconic-brown-1: #54301e;
      --draconic-brown-2: #825037;
      --draconic-brown-3: #876959;
      --draconic-light: #f7d9cb;
      --draconic-accent: #e2ab8d;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Bricolage Grotesque', sans-serif;
      background: #1f1108;
      color: var(--draconic-light);
      line-height: 1.6;
      font-weight: 400;
      padding: 40px;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid var(--draconic-orange);
    }

    .logo {
      font-size: 48px;
      font-weight: 800;
      color: var(--draconic-orange);
      letter-spacing: -0.02em;
    }

    .tagline {
      color: var(--draconic-accent);
      margin-top: 10px;
    }

    .preview {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2rem;
      margin: 0 auto 40px;
      max-width: 1200px;
    }

    .preview h1, .preview h2, .preview h3 {
      font-family: 'Reckless', serif;
      font-weight: 300;
      color: var(--draconic-orange);
      margin: 1.5rem 0 1rem;
    }

    .preview h1 { 
      font-size: 1.8rem; 
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    
    .preview h2 { 
      font-size: 2rem; 
      border-left: 4px solid var(--draconic-orange);
      padding-left: 1rem;
      background: linear-gradient(90deg, rgba(255, 109, 0, 0.1) 0%, transparent 50%);
    }
    
    .preview h3 { 
      font-size: 1.5rem;
      color: var(--draconic-accent);
    }

    .preview h4 {
      font-size: 1.2rem;
      color: var(--draconic-light);
      margin: 1rem 0 0.5rem;
    }

    .preview p {
      margin-bottom: 1rem;
      color: var(--draconic-light);
    }

    .preview code {
      background: rgba(0, 0, 0, 0.3);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Monaco', 'Consolas', monospace;
      color: var(--draconic-orange);
    }

    .preview pre {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1rem 0;
      border-left: 4px solid var(--draconic-orange);
    }

    .preview pre code {
      background: none;
      padding: 0;
      color: var(--draconic-light);
    }

    .preview blockquote {
      border-left: 4px solid var(--draconic-orange);
      padding-left: 1rem;
      margin: 1rem 0;
      color: var(--draconic-accent);
      font-style: italic;
      background: rgba(255, 109, 0, 0.05);
      padding: 1rem;
    }

    .preview ul, .preview ol {
      margin: 1rem 0 1rem 2rem;
    }

    .preview li {
      margin-bottom: 0.5rem;
    }

    .preview strong, .preview b {
      color: var(--draconic-orange);
      font-weight: 700;
    }

    .preview em, .preview i {
      color: var(--draconic-accent);
    }

    .preview hr {
      border: none;
      height: 2px;
      background: var(--draconic-orange);
      margin: 2rem 0;
      opacity: 0.3;
    }

    .footer {
      text-align: center;
      padding-top: 40px;
      margin-top: 60px;
      border-top: 2px solid var(--draconic-accent);
      color: var(--draconic-accent);
    }

    .footer-tagline {
      font-style: italic;
      color: var(--draconic-brown-3);
      margin-top: 10px;
    }

  </style>
</head>
<body>
  <div class="header">
    <img src="assets/Draconic Logo - Thin (1).svg" alt="Draconic" style="height: 40px; width: auto;">
  </div>


  <div class="preview">
    ${htmlContent}
  </div>

  <div class="footer">
    <div>© ${new Date().getFullYear()} Draconic AI</div>
  </div>
</body>
</html>`;
}

async function main() {
  const sourceDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/Final deliverables';
  const outputDir = '/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/draconic-pdf-generator/html-versions';
  
  // Create output directory
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
  
  console.log('Generating beautiful HTML versions...\n');
  
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file.replace('.md', '.html'));
    
    if (fs.existsSync(inputPath)) {
      const markdown = fs.readFileSync(inputPath, 'utf8');
      const html = createHTML(markdown, file.replace('.md', ''));
      fs.writeFileSync(outputPath, html);
      console.log(`✓ Generated: ${file.replace('.md', '.html')}`);
    }
  }
  
  console.log(`\nDone! Open the HTML files in: ${outputDir}`);
  console.log('Use your browser\'s print function to save as PDF with dark theme.');
}

main().catch(console.error);