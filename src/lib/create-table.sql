-- Function to create the users table
-- You need to execute this SQL in your Supabase SQL Editor

-- Create the function that creates the users table
CREATE OR REPLACE FUNCTION create_users_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'users'
  ) THEN
    -- Create the users table
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    
    -- Set up Row Level Security (RLS)
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Allow anonymous inserts" ON users
      FOR INSERT WITH CHECK (true);
      
    CREATE POLICY "Allow anonymous reads" ON users
      FOR SELECT USING (true);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- To execute, run:
-- SELECT create_users_table(); 