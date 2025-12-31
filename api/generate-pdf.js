const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

// Smart page break CSS injection
function injectSmartPageBreaks(html) {
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

        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }

        p { orphans: 3; widows: 3; }

        table, tr, blockquote, pre, figure {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        hr { display: none; }

        .logo-container {
          page-break-after: avoid !important;
          break-after: avoid !important;
          padding-top: 40px;
        }

        h2:not(:first-of-type) {
          page-break-before: always !important;
          break-before: always !important;
          padding-top: 20px;
        }

        h2 + p, h2 + table, h2 + ul, h2 + ol, h3 + p, h3 + table {
          page-break-before: avoid !important;
          break-before: avoid !important;
        }

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

  if (html.includes('</head>')) {
    return html.replace('</head>', smartPageBreakCSS + '</head>');
  }
  return smartPageBreakCSS + html;
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let browser = null;

  try {
    const { html, filename = 'document' } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content required' });
    }

    const enhancedHTML = injectSmartPageBreaks(html);

    // Use remote chromium binary for Vercel serverless
    // Using Sparticuz official release - more reliable
    const executablePath = await chromium.executablePath(
      'https://github.com/nicholaschiang/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar'
    );

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process',
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: 'new',
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    await page.setContent(enhancedHTML, {
      waitUntil: 'networkidle0',
      timeout: 15000
    });

    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 1000));

    const pdf = await page.pdf({
      width: '12in',
      height: '16in',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: false,
      scale: 0.92
    });

    await browser.close();
    browser = null;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);

    return res.send(pdf);

  } catch (error) {
    console.error('PDF generation error:', error);
    if (browser) await browser.close();
    return res.status(500).json({
      error: 'PDF generation failed',
      details: error.message
    });
  }
};
