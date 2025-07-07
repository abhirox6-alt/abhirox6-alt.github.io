#!/bin/bash

echo "🚀 Deploying Draconic Brand Generator to GitHub Pages..."

# Create gh-pages branch
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy the HTML file to index.html for GitHub Pages
cp draconic-brand-generator.html index.html

# Add and commit
git add .
git commit -m "Deploy Draconic Brand Generator"

# Push to GitHub
echo "
Next steps:
1. Create a new repo on GitHub.com (e.g., 'draconic-generator')
2. Run these commands:

   git remote add origin https://github.com/YOUR_USERNAME/draconic-generator.git
   git push -u origin gh-pages

3. Go to Settings → Pages → Select 'gh-pages' branch
4. Your app will be live at: https://YOUR_USERNAME.github.io/draconic-generator/

That's it! No server needed, just a simple HTML file hosted for free.
"