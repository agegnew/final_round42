-- Create the subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description TEXT,
  code VARCHAR(10) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow anonymous reads on subjects" 
  ON subjects 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow anonymous inserts on subjects" 
  ON subjects 
  FOR INSERT 
  WITH CHECK (true); 