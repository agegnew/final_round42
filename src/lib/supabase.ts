import { createClient } from '@supabase/supabase-js';

// These environment variables will need to be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log if URL is not set (debug purpose)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or key is missing. Check your environment variables.');
  console.log('URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('Key:', supabaseAnonKey ? 'Set (starts with: ' + supabaseAnonKey.substring(0, 5) + '...)' : 'Missing');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for our users
export type User = {
  id: string;
  email: string;
  created_at: string;
}

// Type for subjects
export type Subject = {
  id: string;
  name: string;
  description: string;
  code: string;
  created_at: string;
}

// Function to add a user to the database
export async function addUser(email: string) {
  try {
    // First check if the table exists by trying to select one record
    const { error: tableCheckError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      console.error('Table check error:', tableCheckError);
      return { 
        success: false, 
        error: {
          message: 'Users table might not exist. Please check your Supabase setup.',
          details: tableCheckError
        }
      };
    }
    
    // Proceed with insertion if table exists
    const { data, error } = await supabase
      .from('users')
      .insert([{ email }])
      .select();
    
    if (error) {
      console.error('Insert error:', error);
      return { 
        success: false, 
        error: {
          message: error.message || 'Error adding user',
          code: error.code,
          details: error
        }
      };
    }
    
    return { success: true, data };
  } catch (error) {
    // Log the full error for debugging
    console.error('Error adding user:', error);
    if (error instanceof Error) {
      return { 
        success: false, 
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack
        }
      };
    }
    return { success: false, error: { message: 'Unknown error occurred' } };
  }
}

// Function to get all users
export async function getUsers() {
  try {
    // First check if the table exists
    const { error: tableCheckError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      console.error('Table check error:', tableCheckError);
      return { 
        success: false, 
        error: {
          message: 'Users table might not exist. Please check your Supabase setup.',
          details: tableCheckError
        }
      };
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Select error:', error);
      return { 
        success: false, 
        error: {
          message: error.message || 'Error fetching users',
          code: error.code,
          details: error
        }
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error instanceof Error) {
      return { 
        success: false, 
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack
        }
      };
    }
    return { success: false, error: { message: 'Unknown error occurred' } };
  }
}

// Function to get all subjects
export async function getSubjects() {
  try {
    // First check if the table exists
    const { error: tableCheckError } = await supabase
      .from('subjects')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      console.error('Table check error:', tableCheckError);
      return { 
        success: false, 
        error: {
          message: 'Subjects table might not exist. Please check your Supabase setup.',
          details: tableCheckError
        }
      };
    }
    
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Select error:', error);
      return { 
        success: false, 
        error: {
          message: error.message || 'Error fetching subjects',
          code: error.code,
          details: error
        }
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching subjects:', error);
    if (error instanceof Error) {
      return { 
        success: false, 
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack
        }
      };
    }
    return { success: false, error: { message: 'Unknown error occurred' } };
  }
}

// Function to add sample subjects if none exist
export async function addSampleSubjects() {
  try {
    // Check if subjects already exist
    const { data: existingSubjects, error: checkError } = await supabase
      .from('subjects')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking subjects:', checkError);
      return { success: false, error: checkError };
    }
    
    // If subjects already exist, don't add samples
    if (existingSubjects && existingSubjects.length > 0) {
      return { success: true, message: 'Subjects already exist' };
    }
    
    // Sample subjects
    const sampleSubjects = [
      { name: 'Mathematics', description: 'Study of numbers, quantities, and shapes', code: 'MATH101' },
      { name: 'Computer Science', description: 'Study of computation, automation, and information', code: 'CS101' },
      { name: 'Physics', description: 'Study of matter, energy, and the interaction between them', code: 'PHYS101' },
      { name: 'English Literature', description: 'Study of literature written in the English language', code: 'ENGL101' },
      { name: 'Biology', description: 'Study of living organisms and their interactions', code: 'BIO101' },
      { name: 'Chemistry', description: 'Study of substances, their properties, and reactions', code: 'CHEM101' },
      { name: 'History', description: 'Study of past events, particularly human affairs', code: 'HIST101' },
      { name: 'Art', description: 'Study of visual arts, including painting, sculpture, and architecture', code: 'ART101' }
    ];
    
    // Insert sample subjects
    const { data, error } = await supabase
      .from('subjects')
      .insert(sampleSubjects)
      .select();
    
    if (error) {
      console.error('Error adding sample subjects:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in addSampleSubjects:', error);
    return { success: false, error };
  }
} 