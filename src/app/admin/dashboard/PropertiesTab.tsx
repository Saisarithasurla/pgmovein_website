"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Building2, Search, MapPin, Eye, Loader2, ExternalLink } from "lucide-react";

interface Property {
  id: string;
  name: string;
  area: string;
  city: string;
  type: string;
  starting_rent: number;
  owner_name: string;
  owner_number?: string;
  agent_id: string;
  created_at: string;
  verified: boolean;
}

interface Agent {
  id: string;
  email: string;
}

export function PropertiesTab() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch properties
        const { data: propsData, error: propsError } = await supabase
          .from("properties")
          .select("id, name, area, city, type, starting_rent, owner_name, owner_number, agent_id, created_at, verified")
          .order("created_at", { ascending: false });

        if (propsError) throw propsError;
        setProperties(propsData || []);

        // Fetch agents to map agent_id to email
        const token = localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") 
          ? JSON.parse(localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") || "{}").access_token 
          : "";
          
        if (token) {
          const res = await fetch("/api/admin/agents", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            const agentMap: Record<string, string> = {};
            data.agents?.forEach((a: Agent) => {
              agentMap[a.id] = a.email;
            });
            setAgents(agentMap);
          }
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") 
        ? JSON.parse(localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") || "{}").access_token 
        : "";
        
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/admin/properties/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: id })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to approve");
      }

      setProperties(prev => prev.map(p => p.id === id ? { ...p, verified: true } : p));
    } catch (err) {
      console.error("Error approving property:", err);
      alert("Failed to approve property. Please try again.");
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.owner_number && p.owner_number.includes(searchQuery));

    const matchesAgent = selectedAgentId === "ALL" || p.agent_id === selectedAgentId;

    return matchesSearch && matchesAgent;
  });

  return (
    <div className="bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Properties Listed</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and view all properties added by agents.</p>
          </div>
          <div className="bg-purple-50 text-purple-700 px-4 py-2.5 rounded-xl border border-purple-100 font-bold text-sm flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Total Properties: {properties.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Controls Bar */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by name, area, owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full md:w-64 text-sm font-bold text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
              >
                <option value="ALL">Filter by Agent (All)</option>
                {Object.entries(agents).map(([id, email]) => (
                  <option key={id} value={id}>{email}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20 text-purple-600">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20 text-gray-400 font-medium">No properties found matching criteria.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100 text-sm font-semibold text-gray-800">
                <thead className="bg-gray-50/70 text-gray-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4 text-left">Property Name & Area</th>
                    <th className="px-6 py-4 text-left">Type & Rent</th>
                    <th className="px-6 py-4 text-left">Added By (Agent)</th>
                    <th className="px-6 py-4 text-left">Owner Details</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Added On</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block text-gray-900 font-bold text-base">{prop.name}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 font-medium mt-0.5">
                          <MapPin className="h-3 w-3" /> {prop.area}, {prop.city}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          prop.type === "PG" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-teal-50 text-teal-600 border border-teal-100"
                        }`}>
                          {prop.type}
                        </span>
                        <span className="block text-gray-900 font-bold mt-1">₹{prop.starting_rent}/mo</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {agents[prop.agent_id] ? (
                          <span className="text-purple-600 font-bold bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 text-xs">
                            {agents[prop.agent_id]}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs font-mono">{prop.agent_id.substring(0, 8)}...</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        <span className="block font-bold">{prop.owner_name}</span>
                        {prop.owner_number && (
                          <span className="block text-xs text-gray-500 mt-0.5">{prop.owner_number}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                          prop.verified 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {prop.verified ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-500">
                        {new Date(prop.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {!prop.verified && (
                          <button
                            onClick={() => handleApprove(prop.id)}
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800 transition-colors px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
