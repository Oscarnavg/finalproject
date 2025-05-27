import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hnounbapgwzqdankelde.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub3VuYmFwZ3d6cWRhbmtlbGRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzI5MjQxNSwiZXhwIjoyMDYyODY4NDE1fQ.ROzc3dCmLYqbYO5Hx-CJIrKoNnuwwvYATt75Bz-5idw"

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) console.error("Error obteniendo usuarios:", error);
  return data;
}

export async function addUser(name, email) {
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  if (error) console.error("Error insertando usuario:", error);
  return data;
}
