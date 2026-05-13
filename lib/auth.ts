import { supabase } from './supabase';
import { BatchYear } from '../types';

export interface SignupParams {
  email: string;
  password: string;
  fullName: string;
  collegeName: string;
  batchYear: BatchYear;
}

/**
 * Sign up a new user.
 * The handle_new_user() trigger in Supabase auto-creates a row in `users`.
 */
export async function signUp({
  email,
  password,
  fullName,
  collegeName,
  batchYear,
}: SignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        college_name: collegeName,
        batch_year: batchYear,
      },
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

/**
 * Fetch the current user's profile from our `users` table.
 */
export async function getMyProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: null };

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  return { data, error };
}
