"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../../lib/supabaseBrowserClient";
import { LogOut, Shield, Users, Building2, TrendingUp, Loader2 } from "lucide-react";
import { LeadsTab } from "./LeadsTab";
import { AgentsTab } from "./AgentsTab";
import { PropertiesTab } from "./PropertiesTab";
import { AddPropertyTab } from "./AddPropertyTab";
import { verifyAdminStatus } from "../actions";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "agents" | "properties" | "add_property">("leads");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      
      if (!session?.user) {
        router.replace("/admin/login");
        return;
      }

      // Verify admin status via server action
      const isAdmin = await verifyAdminStatus(session.user.id);

      if (!isAdmin) {
        await supabaseBrowser.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setAdminEmail(session.user.email || "Admin");
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.replace("/admin/login");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-sm font-semibold text-gray-500 animate-pulse">Verifying secure access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">PGMove Owner Portal</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-400 hidden sm:block">Logged in as {adminEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "leads"
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="h-4.5 w-4.5" /> Leads & Enquiries
          </button>
          
          <button
            onClick={() => setActiveTab("agents")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "agents"
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Users className="h-4.5 w-4.5" /> Agents Monitor
          </button>
          
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "properties"
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Building2 className="h-4.5 w-4.5" /> All Properties
          </button>

          <button
            onClick={() => setActiveTab("add_property")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "add_property"
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Building2 className="h-4.5 w-4.5" /> Add Property
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px]">
          {activeTab === "leads" && <LeadsTab />}
          {activeTab === "agents" && <AgentsTab />}
          {activeTab === "properties" && <PropertiesTab />}
          {activeTab === "add_property" && <AddPropertyTab />}
        </div>
      </main>
    </div>
  );
}
