#!/bin/bash

# Quick GitHub Pages deployment script
echo "🔥 Deploying Draconic Documents to GitHub Pages..."

# Initialize git if not already
git init

# Create .nojekyll file to preserve underscores
touch .nojekyll

# Add all files
git add .

# Commit
git commit -m "Deploy Draconic documents with beautiful HTML"

# Create gh-pages branch
git branch -M gh-pages

# Add your GitHub repo (you'll need to create one first)
echo "
1. Create a new repo on GitHub.com
2. Run: git remote add origin YOUR_REPO_URL
3. Run: git push -u origin gh-pages
4. Enable GitHub Pages from gh-pages branch in Settings
5. Your site will be at: https://YOUR_USERNAME.github.io/REPO_NAME/

Then in Notion:
- Type /embed
- Paste your GitHub Pages URL
- You'll have perfect HTML inside Notion!
"