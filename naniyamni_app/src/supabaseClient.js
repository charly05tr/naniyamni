import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://whveygkzqvppdkvpjvei.supabase.co";
const supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodmV5Z2t6cXZwcGRrdnBqdmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTgwODYsImV4cCI6MjA3NDU3NDA4Nn0.n7alnNGvsmtt1X_lumcTmHXGrojHSoa7QVjaEYrn5_8"

export const supabase = createClient(supabaseURL, supabase_anon_key);