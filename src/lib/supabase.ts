import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type Teacher = Tables['teachers']['Row'];
export type Group = Tables['groups']['Row'];
export type Student = Tables['students']['Row'];
export type Attendance = Tables['attendance']['Row'];