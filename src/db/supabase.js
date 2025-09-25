import { createClient } from "@supabase/supabase-js";

// ✅ Make sure your .env file has:
// VITE_SUPABASE_URL=https://xyzcompany.supabase.co
// VITE_SUPABASE_KEY=your-anon-key

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// // Optional: Debug logs to confirm values are loaded correctly
// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey ? "Loaded ✅" : "Missing ❌");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
