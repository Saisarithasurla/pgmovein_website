import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase browser client: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables."
  );
}

// Client-side Supabase client using the anon (public) key.
// Used for agent authentication (login/logout) and RLS-protected operations.
// NEVER use the service_role key on the client side.
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
