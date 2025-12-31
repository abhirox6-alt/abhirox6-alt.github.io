const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

// Smart page break analyzer
function injectSmartPageBreaks(html) {
  // Parse and analyze the HTML structure
  let enhanced = html;

  // 1. Find all h2 elements and add page-break-before (except first one after cover)
  // We'll use a marker approach - inject CSS classes

  // Add smart page break CSS
  const smartPageBreakCSS = `
    <style>
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        html {
          background: var(--draconic-dark, #1f1108) !important;
        }

        body {
          padding: 60px 70px;
          background: var(--draconic-dark, #1f1108) !important;
          max-width: none;
          margin: 0;
        }

        .content {
          background: var(--draconic-dark, #1f1108) !important;
          box-shadow: none;
          padding: 0;
        }

        .content th {
          background: var(--draconic-orange, #FF6D00) !important;
        }

        /* Prevent ugly page breaks */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }

        p {
          orphans: 3;
          widows: 3;
        }

        table {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        tr {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        blockquote, pre, figure {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        /* Hide hr in print - use page breaks instead */
        hr {
          display: none;
        }

        .logo-container {
          page-break-after: avoid !important;
          break-after: avoid !important;
          padding-top: 40px;
        }

        /* Smart section breaks - h2 elements start new pages */
        h2:not(:first-of-type) {
          page-break-before: always !important;
          break-before: always !important;
          padding-top: 20px;
        }

        /* Keep heading with following content */
        h2 + p,
        h2 + table,
        h2 + ul,
        h2 + ol,
        h3 + p,
        h3 + table {
          page-break-before: avoid !important;
          break-before: avoid !important;
        }

        /* Larger font for print */
        .content {
          font-size: 1.35rem !important;
          line-height: 1.9 !important;
        }

        .content h1 { font-size: 2.8rem !important; }
        .content h2 { font-size: 2.2rem !important; }
        .content h3 { font-size: 1.9rem !important; }
        .content h4 { font-size: 1.6rem !important; }

        .content th, .content td {
          padding: 18px !important;
          font-size: 1.25rem !important;
        }
      }
    </style>
  `;

  // Inject the smart CSS before </head>
  if (enhanced.includes('</head>')) {
    enhanced = enhanced.replace('</head>', smartPageBreakCSS + '</head>');
  } else {
    // If no head, wrap content
    enhanced = smartPageBreakCSS + enhanced;
  }

  return enhanced;
}

// Analyze document structure and provide recommendations
function analyzeDocumentStructure(html) {
  const h2Count = (html.match(/<h2/gi) || []).length;
  const tableCount = (html.match(/<table/gi) || []).length;
  const hasLogo = html.includes('logo') || html.includes('svg');

  return {
    sections: h2Count,
    tables: tableCount,
    hasCover: hasLogo,
    estimatedPages: Math.max(1, h2Count) // Rough estimate
  };
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { html, filename = 'document' } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content required' });
    }

    // Analyze and enhance HTML with smart page breaks
    const structure = analyzeDocumentStructure(html);
    const enhancedHTML = injectSmartPageBreaks(html);

    // Launch browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Set viewport to match design width
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    // Load the HTML
    await page.setContent(enhancedHTML, {
      waitUntil: 'networkidle0',
      timeout: 15000
    });

    // Wait for fonts
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 1000));

    // Generate PDF with smart settings
    const pdf = await page.pdf({
      width: '12in',
      height: '16in',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      preferCSSPageSize: false,
      scale: 0.92
    });

    await browser.close();

    // Return PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
    res.setHeader('X-Document-Structure', JSON.stringify(structure));

    return res.send(pdf);

  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({
      error: 'PDF generation failed',
      details: error.message
    });
  }
};
