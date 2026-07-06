"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import {
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Info,
  Clock,
  Eye,
  ChevronDown,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company_name: string | null;
  city: string;
  message: string | null;
  lead_source: string;
  status: string;
  duplicate_flag: string;
  created_at: string;
  landing_page_url: string | null;
  referrer_url: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  screen_resolution: string | null;
  timezone: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedFlag, setSelectedFlag] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setLeads(data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 1. Calculations for metrics
  const totalLeads = leads.length;
  
  const leadsToday = leads.filter((lead) => {
    const today = new Date().toISOString().split("T")[0];
    const leadDate = new Date(lead.created_at).toISOString().split("T")[0];
    return today === leadDate;
  }).length;

  const duplicateLeads = leads.filter((lead) => lead.duplicate_flag === "DUPLICATE").length;
  
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  // 2. Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "ALL" || lead.status === selectedStatus;
    const matchesFlag = selectedFlag === "ALL" || lead.duplicate_flag === selectedFlag;

    return matchesSearch && matchesStatus && matchesFlag;
  });

  // 3. Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Timestamp",
      "Name",
      "Phone",
      "Email",
      "City",
      "Company",
      "Source Page",
      "Status",
      "Flag",
      "Browser",
      "OS",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.created_at,
      lead.name,
      lead.phone,
      lead.email || "",
      lead.city,
      lead.company_name || "",
      lead.lead_source,
      lead.status,
      lead.duplicate_flag,
      lead.browser || "",
      lead.os || "",
      lead.utm_source || "",
      lead.utm_medium || "",
      lead.utm_campaign || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leads Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage, verify, and view real-time visitor enquiry insights.</p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl shadow-md transition-all self-start md:self-center"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Leads</span>
              <span className="text-2xl font-black text-gray-900">{loading ? "..." : totalLeads}</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Leads Today</span>
              <span className="text-2xl font-black text-gray-900">{loading ? "..." : leadsToday}</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Duplicates</span>
              <span className="text-2xl font-black text-gray-900">{loading ? "..." : duplicateLeads}</span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Conversion Rate</span>
              <span className="text-2xl font-black text-gray-900">{loading ? "..." : `${conversionRate}%`}</span>
            </div>
          </div>
        </div>

        {/* Filters and List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, phone, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                <Filter className="h-3.5 w-3.5 text-gray-400" />
                <span>Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer text-purple-600"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Duplicate Flag Filter */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                <AlertTriangle className="h-3.5 w-3.5 text-gray-400" />
                <span>Type:</span>
                <select
                  value={selectedFlag}
                  onChange={(e) => setSelectedFlag(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer text-purple-600"
                >
                  <option value="ALL">All Types</option>
                  <option value="CLEAN">Clean Leads</option>
                  <option value="DUPLICATE">Duplicates</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-20 text-gray-500 font-medium">Loading leads data...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-20 text-gray-400 font-medium">No matching leads found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100 text-sm font-semibold text-gray-800">
                <thead className="bg-gray-50/70 text-gray-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4 text-left">Submitted Date</th>
                    <th className="px-6 py-4 text-left">Visitor Name</th>
                    <th className="px-6 py-4 text-left">Contact Info</th>
                    <th className="px-6 py-4 text-left">Location / Source</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Flag</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                        {new Date(lead.created_at).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">
                        {lead.name}
                        {lead.company_name && (
                          <span className="block text-xs text-gray-400 font-medium">{lead.company_name}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block">{lead.phone}</span>
                        <span className="block text-xs text-gray-400 font-medium">{lead.email || "No Email"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block">{lead.city}</span>
                        <span className="block text-[10px] text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded truncate max-w-[180px] font-bold">
                          {lead.lead_source}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                            lead.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : lead.status === "Contacted"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : lead.status === "Converted"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-500 border-gray-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            lead.duplicate_flag === "DUPLICATE"
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : "bg-green-50 text-green-600 border border-green-100"
                          }`}
                        >
                          {lead.duplicate_flag}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-all inline-flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" /> <span className="text-xs font-bold">Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative border border-gray-100 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedLead.name}</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">Lead ID: {selectedLead.id}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600 font-extrabold text-lg p-1.5 hover:bg-gray-50 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Phone Number</span>
                  <span className="font-bold text-gray-950">{selectedLead.phone}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Email</span>
                  <span className="font-bold text-gray-950">{selectedLead.email || "N/A"}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Message / Requirements</span>
                  <p className="font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedLead.message || "No requirements message left."}</p>
                </div>

                <div className="col-span-2 border-t border-gray-100 my-2 pt-4">
                  <h4 className="font-bold text-purple-650 text-xs mb-3">Visitor Auto-Captured Metadata</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-purple-50/20 p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">Device / OS</span>
                      <span className="font-bold text-gray-800">{selectedLead.device_type} • {selectedLead.os}</span>
                    </div>
                    <div className="bg-purple-50/20 p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">Browser / Screen</span>
                      <span className="font-bold text-gray-800">{selectedLead.browser} • {selectedLead.screen_resolution}</span>
                    </div>
                    <div className="bg-purple-50/20 p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">Timezone</span>
                      <span className="font-bold text-gray-800">{selectedLead.timezone || "N/A"}</span>
                    </div>
                    <div className="bg-purple-50/20 p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">UTM Source</span>
                      <span className="font-bold text-gray-800">{selectedLead.utm_source || "None"}</span>
                    </div>
                    <div className="bg-purple-50/20 p-2.5 rounded-lg col-span-2">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">Landing Page URL</span>
                      <span className="font-bold text-gray-700 truncate block">{selectedLead.landing_page_url || "N/A"}</span>
                    </div>
                    <div className="bg-purple-50/20 p-2.5 rounded-lg col-span-2">
                      <span className="text-[9px] uppercase font-bold text-purple-400 block">Referer Path</span>
                      <span className="font-bold text-gray-700 truncate block">{selectedLead.referrer_url || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer inside modal */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-500">Update Lead Stage:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="text-xs font-bold px-3 py-2 border rounded-xl bg-white shadow-sm focus:outline-none cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
