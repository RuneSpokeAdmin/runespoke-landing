-- Create waitlist table for RuneSpoke Hub Beta signups
-- Run this in your Supabase SQL editor

-- Drop table if exists (be careful in production!)
-- DROP TABLE IF EXISTS waitlist;

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed BOOLEAN DEFAULT FALSE,
  metadata JSONB,

  -- Add indexes for performance
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_unsubscribed ON waitlist(unsubscribed);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows insert from authenticated and anon users
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that only allows service role to read
CREATE POLICY "Service role can read all" ON waitlist
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Create a policy that allows updates for unsubscribe
CREATE POLICY "Allow unsubscribe updates" ON waitlist
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create a view for quick stats
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT
  COUNT(*) as total_signups,
  COUNT(*) FILTER (WHERE unsubscribed = false) as active_signups,
  COUNT(*) FILTER (WHERE unsubscribed = true) as unsubscribed_count,
  MIN(created_at) as first_signup,
  MAX(created_at) as last_signup
FROM waitlist;

-- Grant permissions (adjust based on your needs)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON waitlist TO service_role;
GRANT INSERT ON waitlist TO anon, authenticated;
GRANT SELECT ON waitlist_stats TO anon, authenticated;

-- Sample query to test
-- INSERT INTO waitlist (email, metadata) VALUES ('test@example.com', '{"source": "beta_landing"}');
-- SELECT * FROM waitlist;
-- SELECT * FROM waitlist_stats;