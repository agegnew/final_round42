"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export function SupabaseSetupChecker() {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<string | null>(null);
  const [showSetupForm, setShowSetupForm] = useState(false);

  const checkSetup = async () => {
    setChecking(true);
    setStatus('checking');
    setMessage('Checking Supabase connection and table setup...');
    setDetails(null);

    try {
      // Check Supabase connection
      let connectionResult;
      try {
        connectionResult = await supabase.from('_unused_').select('*').limit(1);
      } catch (error) {
        setStatus('error');
        setMessage('Failed to connect to Supabase. Please check your environment variables and API credentials.');
        setDetails(error instanceof Error ? error.message : 'Unknown error');
        setChecking(false);
        return;
      }
      
      const { error: connectionError } = connectionResult;
      
      if (connectionError && connectionError.message && connectionError.message.includes('does not exist')) {
        // This is expected since _unused_ table doesn't exist
        setMessage('Supabase connection successful. Checking users table...');
      } else if (connectionError) {
        setStatus('error');
        setMessage('Failed to connect to Supabase. Please check your environment variables and API credentials.');
        setDetails(JSON.stringify(connectionError, null, 2));
        setChecking(false);
        return;
      }

      // Check if users table exists
      const { error: tableError } = await supabase.from('users').select('*').limit(1);
      
      if (tableError && tableError.message && tableError.message.includes('does not exist')) {
        setStatus('error');
        setMessage('The "users" table does not exist in your Supabase database.');
        setDetails(`
You need to create a table named "users" with columns:
- id (UUID, primary key)
- email (varchar, unique)
- created_at (timestamp with timezone)

You can create it by:
1. Going to your Supabase dashboard
2. SQL Editor
3. Running the SQL from src/lib/create-table.sql
        `);
        setShowSetupForm(true);
      } else if (tableError) {
        setStatus('error');
        setMessage('Error checking users table');
        setDetails(JSON.stringify(tableError, null, 2));
      } else {
        setStatus('success');
        setMessage('Supabase connection and users table setup are correct!');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred while checking Supabase setup');
      setDetails(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setChecking(false);
    }
  };

  const createTable = async () => {
    setChecking(true);
    setStatus('checking');
    setMessage('Attempting to create users table...');
    setDetails(null);

    try {
      // Try to create the users table using SQL
      const { error } = await supabase.rpc('create_users_table', {});
      
      if (error) {
        setStatus('error');
        setMessage('Failed to create users table. You may need to create it manually in the Supabase dashboard.');
        setDetails(JSON.stringify(error, null, 2));
      } else {
        setStatus('success');
        setMessage('Users table created successfully!');
        setShowSetupForm(false);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to create users table');
      setDetails(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium mb-2">Supabase Setup Check</h3>
      
      {status === 'idle' ? (
        <Button 
          onClick={checkSetup} 
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={checking}
        >
          Check Supabase Setup
        </Button>
      ) : (
        <div className="space-y-3">
          <div className={`p-3 rounded ${
            status === 'checking' ? 'bg-blue-50 text-blue-700' :
            status === 'success' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            <p className="font-medium">{message}</p>
            {details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">Show technical details</summary>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">{details}</pre>
              </details>
            )}
          </div>
          
          {showSetupForm && (
            <div className="mt-4">
              <p className="text-sm mb-2">You can create the users table manually in the Supabase dashboard, or attempt to create it automatically:</p>
              <Button 
                onClick={createTable} 
                className="bg-[#2D9979] hover:bg-[#238b6d] text-white"
                disabled={checking}
              >
                {checking ? 'Creating...' : 'Create Users Table'}
              </Button>
            </div>
          )}
          
          {(status === 'checking' || status === 'error' || status === 'success') && !checking && (
            <Button 
              onClick={() => {
                setStatus('idle');
                setMessage('');
                setDetails(null);
                setShowSetupForm(false);
              }} 
              variant="outline"
              className="mt-2"
            >
              Reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 