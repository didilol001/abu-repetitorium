import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fchhganpywvppeazsceq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjaGhnYW5weXd2cHBlYXpzY2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTQ1OTAsImV4cCI6MjA5NTI3MDU5MH0.vx83Vj_TVUrXnc6NU426-YgXDzRyBHICQMh_g5tXWow'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
