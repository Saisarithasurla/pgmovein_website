"use client";

import React, { useState, useEffect } from "react";
import { Users, Clock, Loader2, Building } from "lucide-react";

interface Agent {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export function AgentsTab() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/admin/agents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") ? JSON.parse(localStorage.getItem("sb-uvcaspmvqtxwazibtkaa-auth-token") || "{}").access_token : ""}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch agents data.");
      }
      
      const data = await response.json();
      setAgents(data.agents || []);
      setLastUpdated(new Date());
      setError("");
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching agents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    
    // Auto-update every 1 minute
    const interval = setInterval(() => {
      fetchAgents();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Helper to format date
  const formatTimeAgo = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Agents Monitor</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time view of agent logins and system activity.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
            <Clock className="h-4 w-4 text-purple-600" />
            Last updated: {lastUpdated.toLocaleTimeString("en-IN")}
            <span className="ml-2 flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-bold text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20 text-purple-600">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : agents.length === 0 ? (
              <div className="text-center py-20 text-gray-400 font-medium">No agents found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100 text-sm font-semibold text-gray-800">
                <thead className="bg-gray-50/70 text-gray-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4 text-left">Agent ID</th>
                    <th className="px-6 py-4 text-left">Email Address</th>
                    <th className="px-6 py-4 text-left">Registered Date</th>
                    <th className="px-6 py-4 text-center">Last Login Time</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {agents.map((agent) => {
                    const timeAgo = formatTimeAgo(agent.last_sign_in_at);
                    const isOnline = timeAgo === "Just now" || (timeAgo.includes("m ago") && parseInt(timeAgo) < 15);
                    
                    return (
                      <tr key={agent.id} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono">
                          {agent.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          {agent.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(agent.created_at).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-bold">
                          {agent.last_sign_in_at ? (
                            <>
                              <span className="block">{new Date(agent.last_sign_in_at).toLocaleString("en-IN")}</span>
                              <span className="block text-xs text-gray-400 font-medium mt-0.5">{timeAgo}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">Never</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isOnline ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-500 border border-gray-200"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                            {isOnline ? "Online" : "Offline"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
