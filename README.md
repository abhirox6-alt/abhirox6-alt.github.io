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

## Customizing Branding (No Code Required!)

The app includes a built-in **Customize Brand** settings panel. No coding needed!

### Using the Settings Panel

1. Click the **"Customize Brand"** button (top right corner)
2. **Upload your logo** - drag & drop or click to browse (PNG, JPG, SVG)
3. **Enter your brand name**
4. **Choose a color theme**:
   - Draconic (Default) - Dark brown/orange
   - Corporate Blue - Professional blue theme
   - Elegant Gold - Black/gold luxury theme
   - Forest Green - Nature-inspired green
   - Midnight Purple - Modern purple theme
   - **Custom** - Pick your own colors with color pickers
5. Click **Save Changes**

Your settings are saved in your browser and persist across sessions. All generated HTML and PDF documents will use your custom branding.

### For Developers

If you prefer to customize via code:

#### Replace Logo (in index.html)
```html
<img src="data:image/png;base64,YOUR_LOGO_BASE64_HERE" alt="Your Logo">
```

#### Update Colors (CSS variables in index.html)
```css
:root {
  --draconic-dark: #1f1108;      /* Background */
  --draconic-orange: #FF6D00;    /* Accent */
  --draconic-light: #f7d9cb;     /* Text */
}
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
