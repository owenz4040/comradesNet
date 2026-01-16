-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT,
  plan TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at 
ON contact_submissions(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert
CREATE POLICY "Allow service role to insert contact submissions"
ON contact_submissions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create policy to allow service role to read
CREATE POLICY "Allow service role to read contact submissions"
ON contact_submissions
FOR SELECT
TO service_role
USING (true);

COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';
