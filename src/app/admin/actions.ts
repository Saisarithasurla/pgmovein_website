"use server";

import { supabaseAdmin } from "../../lib/supabaseAdmin";

export async function verifyAdminStatus(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Server Action Error verifying admin:", error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("Unexpected error in verifyAdminStatus:", err);
    return false;
  }
}
