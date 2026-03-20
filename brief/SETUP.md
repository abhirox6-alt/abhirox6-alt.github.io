# Draconic Analytics — Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign up (free, no credit card)
2. Click "New Project"
3. Name: `draconic-analytics`
4. Set a database password (save it somewhere)
5. Region: pick closest to you
6. Wait ~2 minutes for it to provision

### Step 2: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Paste the entire contents of `schema.sql` (in this folder)
4. Click "Run"
5. You should see "Success. No rows returned" — that's correct

### Step 3: Get Your API Keys
1. Go to **Settings** → **API** (left sidebar)
2. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy the **anon public** key (the long string under "Project API keys")

### Step 4: Update the HTML Files
1. Open `brief/index.html` — search for `YOUR_SUPABASE_URL` and replace with your Project URL
2. Same file — search for `YOUR_SUPABASE_ANON_KEY` and replace with your anon key
3. Open `brief/dashboard.html` — do the same two replacements
4. In `dashboard.html` — optionally change the password (search for `draconic2026`)

### Step 5: Deploy
```bash
cd "/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/draconic-pdf-generator"
git add brief/
git commit -m "Add tracked investor brief with analytics dashboard"
git push origin main
```

### Step 6: Verify
- `https://abhirox6-alt.github.io/` → Your HTML generator (unchanged)
- `https://abhirox6-alt.github.io/brief/` → Email gate → Investor brief
- `https://abhirox6-alt.github.io/brief/dashboard.html` → Analytics (password: `draconic2026`)

## Share With Investors
Send this link: `https://abhirox6-alt.github.io/brief/`

Optional: add `?ref=fundname` to track which investor link they came from:
- `https://abhirox6-alt.github.io/brief/?ref=sequoia`
- `https://abhirox6-alt.github.io/brief/?ref=a16z`

## What Gets Tracked
- **Email** — required before viewing
- **Active time** — pauses when tab is hidden, only counts real reading time
- **Scroll depth** — how far they scrolled (0-100%)
- **Per-section time** — time spent on each section (17 sections total)
- **Visit count** — how many times they've opened the link
- **Timestamps** — first visit and last visit

## Dashboard Password
Default: `draconic2026`
To change: edit `dashboard.html` and update the password in the `checkPassword` function.
