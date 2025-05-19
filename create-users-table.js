const { createClient } = require('@supabase/supabase-js');

// Supabase connection details - replace with your actual values
const supabaseUrl = 'https://senbmfhlnzzjhgsletqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmJtZmhsbnp6amhnc2xldHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxOTY2ODAsImV4cCI6MjAzMTc3MjY4MH0.PNqE7-35vgQNLlkjJqSJK0YVoFz-JWHmYVCnA8NGe6Y';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function createUsersTable() {
  try {
    // Check if table exists
    const { error: checkError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') {
      console.log('Users table does not exist. Creating now...');
      
      // Execute SQL to create the table using rpc
      const { error } = await supabase.rpc('create_users_table');
      
      if (error) {
        console.error('Error creating table via RPC:', error);
        console.log('Trying alternate method...');
        
        // The RPC function might not exist, so try direct SQL
        console.log('Please go to the Supabase SQL Editor and run the SQL from src/lib/create-table.sql manually');
        console.log('Or follow the steps in the README to set up your database');
      } else {
        console.log('Users table created successfully!');
      }
    } else if (checkError) {
      console.error('Error checking table:', checkError);
    } else {
      console.log('Users table already exists!');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createUsersTable(); 