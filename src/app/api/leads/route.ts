import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabaseAdmin } from "../../../lib/supabaseClient";

const LEADS_FILE_PATH = path.join(process.cwd(), "src", "data", "leads_db.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      companyName,
      city,
      message,
      leadSource,
      // Honeypot field for spam prevention
      website_url,
      // Metadata fields from client
      landingPageUrl,
      referrerUrl,
      deviceType,
      browser,
      os,
      screenResolution,
      timezone,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // 1. Honeypot check: If the hidden honeypot field is filled, reject silently as spam
    if (website_url) {
      console.warn("Spam detected via honeypot. Rejecting request.");
      return NextResponse.json({
        success: false,
        error: "Spam detected.",
      }, { status: 400 });
    }

    // 2. Server-side validation
    if (!name || !phone || !city || !leadSource) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields (name, phone, city, leadSource).",
      }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json({
        success: false,
        error: "Invalid phone number. Must be exactly 10 digits.",
      }, { status: 400 });
    }

    // 3. Duplicate check in Supabase (check within last 24 hours)
    let duplicateFlag = "CLEAN";
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: existingLeads, error: checkError } = await supabaseAdmin
        .from("leads")
        .select("id")
        .or(`phone.eq.${cleanPhone},email.eq.${email || "none"}`)
        .gt("created_at", oneDayAgo);

      if (!checkError && existingLeads && existingLeads.length > 0) {
        duplicateFlag = "DUPLICATE";
      }
    } catch (err) {
      console.error("Failed to perform duplicate check:", err);
    }

    // 4. Save to Supabase (Primary Database)
    let savedToSupabase = false;
    let supabaseErrorMsg = "";

    try {
      const { error: insertError } = await supabaseAdmin.from("leads").insert([
        {
          name,
          phone: cleanPhone,
          email: email || null,
          company_name: companyName || null,
          city,
          message: message || null,
          lead_source: leadSource,
          status: "New",
          duplicate_flag: duplicateFlag,
          landing_page_url: landingPageUrl || null,
          referrer_url: referrerUrl || null,
          device_type: deviceType || null,
          browser: browser || null,
          os: os || null,
          screen_resolution: screenResolution || null,
          timezone: timezone || null,
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }
      savedToSupabase = true;
    } catch (err: any) {
      console.error("Supabase Save Error:", err);
      supabaseErrorMsg = err.message || "Failed to insert lead into Supabase";
    }

    // 5. Save to local JSON backup (Secondary storage)
    let savedToDb = false;
    try {
      let leads = [];
      try {
        const fileData = await fs.readFile(LEADS_FILE_PATH, "utf-8");
        leads = JSON.parse(fileData);
      } catch (error) {
        leads = [];
      }

      leads.push({
        id: Math.random().toString(36).substr(2, 9),
        name,
        phone: cleanPhone,
        email,
        companyName,
        city,
        message,
        leadSource,
        duplicateFlag,
        createdDate: new Date().toISOString(),
      });

      await fs.mkdir(path.dirname(LEADS_FILE_PATH), { recursive: true });
      await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
      savedToDb = true;
    } catch (err) {
      console.error("Failed to save local JSON backup:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Lead processed successfully",
      savedToSupabase,
      savedToDb,
      duplicate: duplicateFlag === "DUPLICATE",
      error: supabaseErrorMsg || undefined,
    });
  } catch (error: any) {
    console.error("API Leads Exception:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
