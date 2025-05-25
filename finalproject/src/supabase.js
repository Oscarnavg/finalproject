// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://TU_PROYECTO.supabase.co'
const supabaseKey = 'TU_API_KEY_PUBLICA' // nunca uses la secreta en el frontend

export const supabase = createClient(supabaseUrl, supabaseKey)
