# Notion Setup Instructions for Draconic Brand

## Step 1: Create Custom Notion Theme

1. **Create a new Notion page**
2. Click the `•••` menu → "Customize page"
3. Apply these settings:

### Colors:
- **Page Background**: Use a cover image with solid color #1f1108 (you'll need to create this)
- **Text Color**: Default (we'll use custom CSS)
- **Accent Color**: Orange (closest to #FF6D00)

### Fonts:
- **Serif**: For headers (closest to Reckless)
- **Default**: For body text

## Step 2: Custom CSS (Using Notion Enhancer or Browser Extension)

If you want exact styling, install "Notion Enhancer" and add this CSS:

```css
/* Draconic Theme for Notion */
.notion-page-content {
  background-color: #1f1108 !important;
  color: #f7d9cb !important;
}

/* Headers */
.notion-header-block {
  color: #FF6D00 !important;
  font-family: serif !important;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.notion-sub_header-block {
  color: #f7d9cb !important;
  border-left: 4px solid #FF6D00;
  padding-left: 16px;
  background: linear-gradient(90deg, rgba(255, 109, 0, 0.1) 0%, transparent 50%);
}

.notion-sub_sub_header-block {
  color: #e2ab8d !important;
}

/* Text */
.notion-text-block {
  color: #f7d9cb !important;
  line-height: 1.8;
}

/* Bold text */
.notion-text-block b,
.notion-text-block strong {
  color: #FF6D00 !important;
}

/* Links */
.notion-link {
  color: #FF6D00 !important;
}

/* Code blocks */
.notion-code-block {
  background: rgba(0, 0, 0, 0.3) !important;
  border-left: 4px solid #FF6D00 !important;
}

/* Quotes */
.notion-quote-block {
  border-left: 4px solid #FF6D00 !important;
  background: rgba(255, 109, 0, 0.05) !important;
  color: #e2ab8d !important;
}
```

## Step 3: Page Structure Template

```
🔥 DRACONIC
[Small spacing]
─────────────────────────────

[YOUR CONTENT HERE]

─────────────────────────────
© 2025 Draconic AI
```

## Step 4: Import Content

1. Copy each markdown file content
2. Paste into Notion pages
3. Format using:
   - `#` → Heading 1 (Orange, uppercase)
   - `##` → Heading 2 (With orange left border)
   - `###` → Heading 3 (Lighter orange)
   - `**text**` → Bold (Orange)
   - `> quote` → Quote block
   - ` ``` ` → Code block

## Alternative: Notion Template Link

I'll create a Notion template you can duplicate with all styling pre-configured.

## Limitations vs HTML:

1. **Can't match exactly**: 
   - Font loading (Reckless Light)
   - Exact background color
   - Custom gradients

2. **Can achieve**:
   - Dark theme feel
   - Orange accents
   - Professional layout
   - Easy editing
   - Team collaboration

## Best Approach:

1. **For viewing**: Keep HTML files
2. **For editing**: Use Notion with custom theme
3. **For sharing**: Export from Notion to Markdown → Convert to branded HTML

Would you like me to create a Notion-importable version of all your documents with formatting tags that will render correctly in Notion?