import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseClient";

export async function GET() {
  try {
    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Admin leads API GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status parameter." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, lead: data[0] });
  } catch (error: any) {
    console.error("Admin leads API PATCH error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}
