import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function GET(request: Request) {
  try {
    // 1. Verify that the request is coming from an authenticated admin
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if they are in admin_users table
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("id", userData.user.id)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
    }

    // 2. Fetch all users from Supabase Auth
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
      throw usersError;
    }

    // 3. Format the users data to return only what is needed
    const agents = usersData.users.map((u) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));

    return NextResponse.json({ agents });
  } catch (error: any) {
    console.error("Error fetching agents:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
