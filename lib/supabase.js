import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mujxnzazkqqxpjbftvtb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11anhuemF6a3FxeHBqYmZ0dnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNzgwNDQsImV4cCI6MjEwMDc1NDA0NH0.O6BC30u96lq3uNKInCigyaAYetqhSo4z6CoX1ukkdKE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
