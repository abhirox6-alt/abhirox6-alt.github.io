-- Draconic Analytics Schema
-- Run this in Supabase SQL Editor (Settings > SQL Editor > New Query)

-- Viewers table: stores everyone who enters their email
CREATE TABLE viewers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  visit_count INTEGER DEFAULT 1,
  referrer TEXT
);

-- Sessions table: one row per visit
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  viewer_id UUID NOT NULL REFERENCES viewers(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  active_time_seconds INTEGER DEFAULT 0,
  max_scroll_depth REAL DEFAULT 0,
  user_agent TEXT,
  referrer TEXT
);

-- Section events: time spent per section per session
CREATE TABLE section_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  section_id TEXT NOT NULL,
  section_title TEXT,
  time_seconds REAL DEFAULT 0,
  entered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast dashboard queries
CREATE INDEX idx_sessions_viewer ON sessions(viewer_id);
CREATE INDEX idx_section_events_session ON section_events(session_id);
CREATE INDEX idx_viewers_email ON viewers(email);

-- Row Level Security
ALTER TABLE viewers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (needed for client-side tracking)
CREATE POLICY "anon_insert_viewers" ON viewers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_viewers" ON viewers FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_select_viewers" ON viewers FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_sessions" ON sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_sessions" ON sessions FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_select_sessions" ON sessions FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_section_events" ON section_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_section_events" ON section_events FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_select_section_events" ON section_events FOR SELECT TO anon USING (true);
