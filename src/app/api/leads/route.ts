import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// A mock Google Sheets Apps Script Webhook URL.
// The user can define GOOGLE_SHEET_WEBHOOK_URL in their environment variables.
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";

const LEADS_FILE_PATH = path.join(process.cwd(), "src", "data", "leads_db.json");

export async function POST(request: Request) {
  try {
    const lead = await request.json();

    // 1. Save to Database (Local JSON file)
    let leads = [];
    try {
      const fileData = await fs.readFile(LEADS_FILE_PATH, "utf-8");
      leads = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
      leads = [];
    }

    leads.push(lead);

    // Make sure directory exists (should exist already, but safe check)
    await fs.mkdir(path.dirname(LEADS_FILE_PATH), { recursive: true });
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");

    console.log("PGMove Database: Saved lead to JSON DB:", lead);

    // 2. Forward to Google Sheets Webhook (if URL is set)
    let googleSheetStatus = "Skipped (Webhook URL not configured)";
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lead),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          googleSheetStatus = "Success";
        } else {
          googleSheetStatus = `Error (HTTP ${response.status})`;
        }
      } catch (err: any) {
        googleSheetStatus = `Failed to connect: ${err.message}`;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead successfully captured",
      savedToDb: true,
      googleSheetStatus,
    });
  } catch (error: any) {
    console.error("API Leads Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process lead capture request" },
      { status: 500 }
    );
  }
}
