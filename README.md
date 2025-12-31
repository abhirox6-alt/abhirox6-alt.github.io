# Draconic Document Generator

A branded document generator that converts structured content into professional HTML and PDF documents with consistent styling.

**Live Demo:** [https://abhirox6-alt.github.io](https://abhirox6-alt.github.io)

## Features

- **HTML Generation**: Convert plain text content into beautifully styled HTML documents
- **PDF Export**: Generate print-ready PDFs with proper page breaks and background colors
- **Brand Consistency**: Automatic application of brand colors, typography, and logo
- **Smart Page Breaks**: Intelligent page break detection that keeps content together
- **Dark Theme**: Professional dark-themed output optimized for both screen and print

## How It Works

1. **Upload Content**: Paste or upload your document content
2. **Generate HTML**: The tool converts your content into branded HTML
3. **Download PDF**: Click "Download PDF" for a print-ready document

## Architecture

```
├── index.html              # Main web application
├── api/
│   └── generate-pdf.js     # Serverless PDF generation (Vercel)
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies
```

### PDF Generation

The PDF API uses Puppeteer with Chromium to render HTML and generate PDFs with:
- Custom page dimensions (12" x 16" for optimal content layout)
- Background color preservation
- Smart page break CSS injection
- Font loading wait time for proper rendering

## Deployment

### Prerequisites

- GitHub account
- Vercel account (free tier works)

### Setup

1. **Fork this repository**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Set Framework Preset to "Other"
   - Deploy

3. **Configure Domain** (optional)
   - Add custom domain in Vercel settings
   - Or use the provided `.vercel.app` URL

## Customizing Branding

To use your own brand instead of Draconic:

### 1. Replace Logo

In `index.html`, find and replace the base64 logo:

```html
<img src="data:image/png;base64,YOUR_LOGO_BASE64_HERE" alt="Your Logo">
```

To convert your logo to base64:
```bash
base64 -i your-logo.png | pbcopy  # macOS
base64 your-logo.png | xclip      # Linux
```

### 2. Update Colors

Find the CSS variables in `index.html` and update:

```css
:root {
  --brand-dark: #1f1108;      /* Dark background */
  --brand-orange: #FF6D00;    /* Accent color */
  --brand-gold: #f5a623;      /* Secondary accent */
  --brand-cream: #FFF8E7;     /* Light text */
}
```

### 3. Update Brand Name

Search and replace "Draconic" with your brand name throughout:
- `index.html` - Page title, headers, content
- `package.json` - Project name and description

### 4. Update PDF Styling

In `api/generate-pdf.js`, update the print CSS:

```javascript
const smartPageBreakCSS = `
  <style>
    @media print {
      body {
        background: YOUR_DARK_COLOR !important;
      }
      .content th {
        background: YOUR_ACCENT_COLOR !important;
      }
    }
  </style>
`;
```

## PDF Generation Principles

The PDF generator follows these principles for optimal output:

1. **Background Colors**: Use `-webkit-print-color-adjust: exact` to preserve backgrounds
2. **Page Breaks**:
   - `page-break-before: always` on major sections (h2)
   - `page-break-inside: avoid` on tables, blockquotes, code blocks
   - `page-break-after: avoid` on headings (keep with following content)
3. **Typography**: Increase font sizes for print (1.35rem base, larger headings)
4. **Margins**: Use CSS padding instead of PDF margins for colored edges

## Local Development

```bash
# Install dependencies
npm install

# For local PDF testing, you'll need a local Puppeteer setup
# The serverless version uses @sparticuz/chromium-min for Vercel
```

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **PDF Generation**: Puppeteer + Chromium (serverless)
- **Hosting**: GitHub Pages (static) + Vercel (API)
- **Dependencies**:
  - `@sparticuz/chromium-min` - Chromium binary for serverless
  - `puppeteer-core` - PDF rendering engine

## License

MIT License - Feel free to use and modify for your own brand.

## Contributing

Contributions welcome! Please open an issue or PR.

---

Built with care by [Draconic](https://draconic.io)
