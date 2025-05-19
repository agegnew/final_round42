const { createClient } = require('@supabase/supabase-js');
const pg = require('pg');

// Supabase and DB connection details
const dbUrl = 'postgresql://postgres:Compete@42@db.senbmfhlnzzjhgsletqk.supabase.co:5432/postgres';

async function createUsersTable() {
  try {
    console.log('Connecting to database directly...');
    const client = new pg.Client(dbUrl);
    await client.connect();
    
    // Create the users table
    console.log('Creating users table...');
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      
      -- Set up Row Level Security (RLS)
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      
      -- Create policies
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow anonymous inserts'
        ) THEN
          CREATE POLICY "Allow anonymous inserts" ON users FOR INSERT WITH CHECK (true);
        END IF;
        
        IF NOT EXISTS (
          SELECT FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow anonymous reads'
        ) THEN
          CREATE POLICY "Allow anonymous reads" ON users FOR SELECT USING (true);
        END IF;
      END
      $$;
    `;
    
    await client.query(createTableSQL);
    console.log('Table created successfully!');
    
    // Verify the table
    const verifyResult = await client.query('SELECT COUNT(*) FROM users');
    console.log('Table verification:', verifyResult.rows[0]);
    
    await client.end();
    console.log('Database connection closed.');
    
  } catch (error) {
    console.error('Error:', error);
    console.log('\nIMPORTANT: You need to create the users table manually in the Supabase dashboard.');
    console.log('Go to https://supabase.com/dashboard, select your project, then:');
    console.log('1. Click "Table Editor" in the sidebar');
    console.log('2. Click "New Table"');
    console.log('3. Enter "users" as the Name');
    console.log('4. Add these columns:');
    console.log('   - id: UUID (primary key, default: uuid_generate_v4())');
    console.log('   - email: varchar (not null, unique)');
    console.log('   - created_at: timestamptz (not null, default: now())');
    console.log('5. Click "Save"');
    console.log('6. Set up RLS (Row Level Security) policies for the table');
  }
}

createUsersTable(); 