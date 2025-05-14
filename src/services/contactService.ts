
import { submitContactForm as supabaseSubmit } from './supabaseService';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean }> => {
  try {
    return await supabaseSubmit(data);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

