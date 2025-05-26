// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = https://hnounbapgwzqdankelde.supabase.co
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub3VuYmFwZ3d6cWRhbmtlbGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTI0MTUsImV4cCI6MjA2Mjg2ODQxNX0.eoB4N6ZE4E6b7sryblI5G903WKk_bTykQS25Pf_SARg

export const supabase = createClient(supabaseUrl, supabaseKey)
