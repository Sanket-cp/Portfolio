
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.');
}

// Create the Supabase client - use empty strings as fallbacks to prevent runtime errors
// This will prevent the immediate error but the client won't work until proper credentials are provided
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseKey || 'placeholder-key'
);

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export const submitContactForm = async (data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<{ success: boolean }> => {
  // Check if we have valid Supabase credentials before attempting to use the client
  if (!supabaseUrl || !supabaseKey) {
    console.error('Cannot submit form: Missing Supabase credentials');
    throw new Error('Supabase configuration is missing. Please set up your environment variables.');
  }

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ ...data }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    throw error;
  }
};
