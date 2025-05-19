const { createClient } = require('@supabase/supabase-js');

// Supabase connection details
const supabaseUrl = 'https://senbmfhlnzzjhgsletqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmJtZmhsbnp6amhnc2xldHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxOTY2ODAsImV4cCI6MjAzMTc3MjY4MH0.PNqE7-35vgQNLlkjJqSJK0YVoFz-JWHmYVCnA8NGe6Y';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

async function createTable() {
  try {
    console.log('Attempting to create users table directly...');
    
    // Execute raw SQL to create the table
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR NOT NULL UNIQUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow anonymous inserts" ON users
          FOR INSERT WITH CHECK (true);
          
        CREATE POLICY "Allow anonymous reads" ON users
          FOR SELECT USING (true);
      `
    });
    
    if (error) {
      console.error('Error creating table:', error);
      return;
    }
    
    console.log('Table created successfully!');
    
    // Verify the table exists
    const { data: checkData, error: checkError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
      
    if (checkError) {
      console.error('Error verifying table:', checkError);
    } else {
      console.log('Users table exists and is accessible!');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTable(); 