import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if admin
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("id", userData.user.id)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json({ error: "Missing propertyId" }, { status: 400 });
    }

    const { error: updateError } = await supabaseAdmin
      .from("properties")
      .update({ verified: true })
      .eq("id", propertyId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error approving property:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
