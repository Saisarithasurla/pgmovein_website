"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../../lib/supabaseBrowserClient";
import { BANGALORE_AREAS, BANGALORE_AREA_GROUPS } from "../../../data/mockData";
import {
  LogOut,
  Plus,
  Loader2,
  Building2,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  X,
  Home,
  ImageIcon,
  MapPin,
  Star,
  ListPlus,
  Upload,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

// ────────────────────────────── Types ────────────────────────────────
interface SupabaseProperty {
  id: string;
  name: string;
  area: string;
  city: string;
  gender: string;
  type: string;
  sharing_single: number | null;
  sharing_double: number | null;
  sharing_triple: number | null;
  starting_rent: number;
  security_deposit: number;
  amenities: string[];
  food_available: boolean;
  food_type: string;
  food_meals: string[];
  house_rules: string[];
  images: string[];
  rating: number;
  reviews: number;
  available_from: string;
  availability: string;
  featured: boolean;
  nearby_companies: string[];
  nearby_colleges: string[];
  nearby_metro: string[];
  latitude: number;
  longitude: number;
  address?: string;
  owner_name: string;
  verified: boolean;
  highlights: string[];
  agent_id: string;
  created_at: string;
}

type FormData = {
  name: string;
  area: string;
  city: string;
  gender: "Male" | "Female" | "Unisex" | "1BHK" | "2BHK" | "3BHK";
  type: "PG" | "Flat";
  sharing_single: string;
  sharing_double: string;
  sharing_triple: string;
  security_deposit: string;
  amenities: string[];
  food_available: boolean;
  food_type: "Veg" | "NonVeg" | "Both";
  food_meals: string[];
  house_rules: string[];
  images: string[];
  available_from: string;
  availability: "Available" | "Limited" | "Full";
  featured: boolean;
  nearby_companies: string[];
  nearby_colleges: string[];
  nearby_metro: string[];
  latitude: string;
  longitude: string;
  address: string;
  owner_name: string;
  highlights: string[];
};

const INITIAL_FORM: FormData = {
  name: "",
  area: "",
  city: "Bangalore",
  gender: "Male",
  type: "PG",
  sharing_single: "",
  sharing_double: "",
  sharing_triple: "",
  security_deposit: "5000",
  amenities: [],
  food_available: false,
  food_type: "Veg",
  food_meals: [],
  house_rules: [],
  images: [],
  available_from: new Date().toISOString().split("T")[0],
  availability: "Available",
  featured: false,
  nearby_companies: [],
  nearby_colleges: [],
  nearby_metro: [],
  latitude: "12.9716",
  longitude: "77.5946",
  address: "",
  owner_name: "",
  highlights: [],
};

const ALL_AMENITIES = [
  "Wifi", "AC", "Food", "Parking", "Gym", "CCTV",
  "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater",
];

const MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner"];

// ────────────────────────────── Component ────────────────────────────
export default function AgentDashboardPage() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [selectedMainArea, setSelectedMainArea] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>("basic");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Properties list
  const [properties, setProperties] = useState<SupabaseProperty[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  // Dynamic field inputs
  const [ruleInput, setRuleInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [collegeInput, setCollegeInput] = useState("");
  const [metroInput, setMetroInput] = useState("");

  // ───── Auth Check ─────
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser();
      if (!user) {
        router.replace("/agent/login");
        return;
      }
      setUser(user);
      setCheckingAuth(false);
    };
    check();
  }, [router]);

  // ───── Fetch Properties ─────
  const fetchProperties = useCallback(async () => {
    if (!user) return;
    setLoadingProperties(true);
    const { data, error } = await supabaseBrowser
      .from("properties")
      .select("*")
      .eq("agent_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProperties(data);
    }
    setLoadingProperties(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchProperties();
  }, [user, fetchProperties]);

  // ───── Toast auto-dismiss ─────
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // ───── Dropdown Outside Click handler ─────
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const container = document.getElementById("main-area-dropdown-container");
      const menu = document.getElementById("main-area-dropdown-menu");
      if (container && menu && !container.contains(e.target as Node)) {
        menu.classList.add("hidden");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ───── Logout ─────
  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.replace("/agent/login");
  };

  // ───── Form Helpers ─────
  const toggleArrayItem = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const addToList = (field: keyof FormData, value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value.trim()],
    }));
    setter("");
  };

  const removeFromList = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  // ───── Submit Form ─────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!formData.name.trim()) {
      setToast({ type: "error", message: "Property name is required." });
      return;
    }
    if (!formData.owner_name.trim()) {
      setToast({ type: "error", message: "Owner name is required." });
      return;
    }

    const prices = [
      formData.sharing_single ? parseInt(formData.sharing_single) : null,
      formData.sharing_double ? parseInt(formData.sharing_double) : null,
      formData.sharing_triple ? parseInt(formData.sharing_triple) : null,
    ].filter((p): p is number => p !== null && !isNaN(p));

    if (prices.length === 0) {
      setToast({ type: "error", message: "At least one sharing price is required." });
      return;
    }

    if (formData.images.length + imageFiles.length > 5) {
      setToast({ type: "error", message: "Maximum 5 images allowed per property." });
      return;
    }

    const startingRent = Math.min(...prices);

    setSubmitting(true);

    let finalImageUrls = [...formData.images];

    // Upload new files
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        try {
          // Compress
          const options = {
            maxSizeMB: 5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);
          
          const fileExt = compressedFile.name.split('.').pop();
          const fileName = `${user.id}/${uuidv4()}.${fileExt}`;

          const { error: uploadError } = await supabaseBrowser.storage
            .from("property-images")
            .upload(fileName, compressedFile);
            
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabaseBrowser.storage
            .from("property-images")
            .getPublicUrl(fileName);
            
          finalImageUrls.push(publicUrl);
        } catch (error: any) {
          setToast({ type: "error", message: `Failed to upload image: ${error.message}` });
          setSubmitting(false);
          return;
        }
      }
    }

    const payload = {
      name: formData.name.trim(),
      area: formData.area,
      city: formData.city,
      gender: formData.gender,
      type: formData.type,
      sharing_single: formData.sharing_single ? parseInt(formData.sharing_single) : null,
      sharing_double: formData.sharing_double ? parseInt(formData.sharing_double) : null,
      sharing_triple: formData.sharing_triple ? parseInt(formData.sharing_triple) : null,
      starting_rent: startingRent,
      security_deposit: parseInt(formData.security_deposit) || 0,
      amenities: formData.amenities,
      food_available: formData.food_available,
      food_type: formData.food_type,
      food_meals: formData.food_meals,
      house_rules: formData.house_rules,
      images: finalImageUrls.length > 0 ? finalImageUrls : ["https://picsum.photos/800/500?random=" + Date.now()],
      available_from: formData.available_from,
      availability: formData.availability,
      featured: formData.featured,
      nearby_companies: formData.nearby_companies,
      nearby_colleges: formData.nearby_colleges,
      nearby_metro: formData.nearby_metro,
      latitude: parseFloat(formData.latitude) || 12.9716,
      longitude: parseFloat(formData.longitude) || 77.5946,
      address: formData.address.trim(),
      owner_name: formData.owner_name.trim(),
      highlights: formData.highlights,
    };

    let resultError;
    if (editingId) {
      const { error } = await supabaseBrowser.from("properties").update(payload).eq("id", editingId);
      resultError = error;
    } else {
      const { error } = await supabaseBrowser.from("properties").insert({ ...payload, agent_id: user.id });
      resultError = error;
    }

    setSubmitting(false);

    if (resultError) {
      setToast({ type: "error", message: resultError.message });
    } else {
      setToast({ type: "success", message: editingId ? "Property updated successfully!" : "Property added successfully!" });
      setFormData(INITIAL_FORM);
      setSelectedMainArea("");
      setImageFiles([]);
      setEditingId(null);
      setShowForm(false);
      fetchProperties();
    }
  };

  // ───── Delete Property ─────
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    const propToDelete = properties.find(p => p.id === id);

    const { error } = await supabaseBrowser.from("properties").delete().eq("id", id);
    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    if (propToDelete && propToDelete.images && propToDelete.images.length > 0) {
      const pathsToRemove = propToDelete.images.map(url => {
        try {
          const urlObj = new URL(url);
          const match = urlObj.pathname.match(/\/property-images\/(.+)$/);
          return match ? match[1] : "";
        } catch(e) { return ""; }
      }).filter(p => p !== "");
      
      if (pathsToRemove.length > 0) {
        await supabaseBrowser.storage.from("property-images").remove(pathsToRemove);
      }
    }

    setToast({ type: "success", message: "Property deleted." });
    fetchProperties();
  };

  const handleEdit = (prop: SupabaseProperty) => {
    setEditingId(prop.id);
    const mainAreaGroup = BANGALORE_AREA_GROUPS.find(
      (g) => g.name === prop.area || g.subAreas.includes(prop.area)
    );
    setSelectedMainArea(mainAreaGroup ? mainAreaGroup.name : prop.area);
    setFormData({
       name: prop.name,
       area: prop.area,
       city: prop.city,
       gender: prop.gender as any,
       type: prop.type as any,
       sharing_single: prop.sharing_single?.toString() || "",
       sharing_double: prop.sharing_double?.toString() || "",
       sharing_triple: prop.sharing_triple?.toString() || "",
       security_deposit: prop.security_deposit?.toString() || "0",
       amenities: prop.amenities || [],
       food_available: prop.food_available,
       food_type: prop.food_type as any,
       food_meals: prop.food_meals || [],
       house_rules: prop.house_rules || [],
       images: prop.images || [],
       available_from: prop.available_from,
       availability: prop.availability as any,
       featured: prop.featured,
       nearby_companies: prop.nearby_companies || [],
       nearby_colleges: prop.nearby_colleges || [],
       nearby_metro: prop.nearby_metro || [],
       latitude: prop.latitude?.toString() || "12.9716",
       longitude: prop.longitude?.toString() || "77.5946",
       address: (prop as any).address || "",
       owner_name: prop.owner_name,
       highlights: prop.highlights || [],
    });
    setImageFiles([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validFiles = newFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        setToast({ type: "error", message: `File type not allowed: ${file.name}` });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setToast({ type: "error", message: `File too large (Max 5MB): ${file.name}` });
        return false;
      }
      return true;
    });

    if (formData.images.length + imageFiles.length + validFiles.length > 5) {
      setToast({ type: "error", message: "Maximum 5 images allowed per property." });
      return;
    }

    setImageFiles(prev => [...prev, ...validFiles]);
  };

  // ───── Section Toggle ─────
  const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: React.ElementType }) => (
    <button
      type="button"
      onClick={() => setExpandedSection(expandedSection === id ? "" : id)}
      className="w-full flex items-center justify-between py-4 px-1 text-left group"
    >
      <span className="flex items-center gap-3 text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
        <Icon className="h-4.5 w-4.5 text-purple-500" />
        {title}
      </span>
      {expandedSection === id ? (
        <ChevronUp className="h-4 w-4 text-gray-400" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );

  // ───── Loading State ─────
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ════════════════ Toast ════════════════ */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border text-sm font-semibold animate-fade-in ${
          toast.type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          {toast.message}
          <button onClick={() => setToast(null)} className="ml-2 p-0.5 hover:bg-black/5 rounded">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ════════════════ Header ════════════════ */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-sm font-black text-white">
              P
            </span>
            <div>
              <span className="text-sm font-bold text-gray-900 tracking-tight">PGMove</span>
              <span className="text-xs text-gray-400 block -mt-0.5">Agent Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-500 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════ Main Content ════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Properties</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {properties.length} {properties.length === 1 ? "property" : "properties"} listed
            </p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setFormData(INITIAL_FORM); setImageFiles([]); setEditingId(null); }}
            className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
              showForm
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none hover:shadow-none"
                : "bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-purple-200/50"
            }`}
          >
            {showForm ? (
              <><X className="h-4 w-4" /> Cancel</>
            ) : (
              <><Plus className="h-4 w-4" /> Add New Property</>
            )}
          </button>
        </div>

        {/* ════════════════ Add Property Form ════════════════ */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-lg mb-10 overflow-hidden animate-fade-in">
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50/50 to-violet-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ListPlus className="h-5 w-5 text-purple-600" />
                {editingId ? "Edit PG Property" : "Add New PG Property"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Fill in the property details below. Fields marked with * are required.</p>
            </div>

            <div className="divide-y divide-gray-100">

              {/* ─── Section: Basic Info ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="basic" title="Basic Information *" icon={Home} />
                {expandedSection === "basic" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Property Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Sunshine PG for Men"
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Owner / Manager Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.owner_name}
                          onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                          placeholder="e.g., Mr. Ramesh"
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Consolidated Area Selector */}
                      <div className="relative" id="main-area-dropdown-container">
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Area *</label>
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById("main-area-dropdown-menu");
                            if (el) el.classList.toggle("hidden");
                          }}
                          className="w-full text-left text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span className={selectedMainArea ? "text-gray-900" : "text-gray-400 font-normal"}>
                            {selectedMainArea || "Select Area / Location"}
                          </span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                        <div
                          id="main-area-dropdown-menu"
                          className="hidden absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMainArea("");
                              setFormData({ ...formData, area: "" });
                              document.getElementById("main-area-dropdown-menu")?.classList.add("hidden");
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 transition-colors"
                          >
                            Select Area / Location
                          </button>
                          {BANGALORE_AREA_GROUPS.map((group) => (
                            <button
                              key={group.name}
                              type="button"
                              onClick={() => {
                                setSelectedMainArea(group.name);
                                setFormData({ ...formData, area: group.name });
                                document.getElementById("main-area-dropdown-menu")?.classList.add("hidden");
                              }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-purple-50 font-medium ${
                                selectedMainArea === group.name ? "text-purple-650 bg-purple-50/30" : "text-gray-700"
                              }`}
                            >
                              {group.name}
                            </button>
                          ))}
                        </div>

                      </div>
                      {/* Expandable subareas directly below the selection row */}
                      {(() => {
                        const currentGroup = BANGALORE_AREA_GROUPS.find((g) => g.name === selectedMainArea);
                        if (!currentGroup || currentGroup.subAreas.length === 0) return null;

                        return (
                          <div className="sm:col-span-3 mt-1 p-4 bg-purple-50/30 rounded-2xl border border-purple-100/60 space-y-3 animate-fade-in">
                            <span className="block text-[10px] font-extrabold text-purple-750 uppercase tracking-widest">Select Sub-Area:</span>
                            <div className="flex flex-wrap gap-2.5">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, area: selectedMainArea })}
                                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs ${
                                  formData.area === selectedMainArea
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:text-purple-650"
                                }`}
                              >
                                <span className={`h-4.5 w-4.5 shrink-0 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                                  formData.area === selectedMainArea ? "bg-white text-purple-600 border-white font-black" : "border-gray-200 bg-gray-50"
                                }`}>
                                  {formData.area === selectedMainArea ? "✓" : ""}
                                </span>
                                <span>{selectedMainArea} (All)</span>
                              </button>

                              {currentGroup.subAreas.map((sub) => {
                                const isSelected = formData.area === sub;
                                return (
                                  <button
                                    key={sub}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, area: sub })}
                                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs ${
                                      isSelected
                                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:text-purple-650"
                                    }`}
                                  >
                                    <span className={`h-4.5 w-4.5 shrink-0 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                                      isSelected ? "bg-white text-purple-600 border-white font-black" : "border-gray-200 bg-gray-50"
                                    }`}>
                                      {isSelected ? "✓" : ""}
                                    </span>
                                    <span>{sub}</span>
                                  </button>
                                );
                              })}
                            </div>
                            </div>
                          );
                        })()}
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          {formData.type === "PG" ? "Gender Preference" : "BHK Configuration"}
                        </label>
                        <div className="flex gap-2">
                          {formData.type === "PG" ? (
                            ([
                              { label: "Boys", value: "Male" },
                              { label: "Girls", value: "Female" },
                              { label: "Coliving", value: "Unisex" }
                            ] as const).map((g) => (
                              <button
                                key={g.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: g.value })}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                  formData.gender === g.value
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                {g.label}
                              </button>
                            ))
                          ) : (
                            ([
                              { label: "1 BHK", value: "1BHK" },
                              { label: "2 BHK", value: "2BHK" },
                              { label: "3 BHK", value: "3BHK" }
                            ] as const).map((b) => (
                              <button
                                key={b.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: b.value })}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                  formData.gender === b.value
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                {b.label}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Type</label>
                        <div className="flex gap-2">
                          {(["PG", "Flat"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({ 
                                ...formData, 
                                type: t,
                                gender: t === "PG" ? "Male" : "1BHK"
                              })}
                              className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                formData.type === t
                                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Pricing ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="pricing" title={formData.type === "PG" ? "Pricing & Sharing *" : "Pricing & Configurations *"} icon={Building2} />
                {expandedSection === "pricing" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <p className="text-xs text-gray-500 font-medium">
                      {formData.type === "PG" 
                        ? "Enter rent per month for each sharing type. At least one is required."
                        : "Enter rent per month for BHK configurations. At least one is required."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          {formData.type === "PG" ? "Single (₹/month)" : "1 BHK Rent (₹/month)"}
                        </label>
                        <input
                          type="number"
                          value={formData.sharing_single}
                          onChange={(e) => setFormData({ ...formData, sharing_single: e.target.value })}
                          placeholder="e.g., 15000"
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          {formData.type === "PG" ? "Double (₹/month)" : "2 BHK Rent (₹/month)"}
                        </label>
                        <input
                          type="number"
                          value={formData.sharing_double}
                          onChange={(e) => setFormData({ ...formData, sharing_double: e.target.value })}
                          placeholder="e.g., 8000"
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          {formData.type === "PG" ? "Triple (₹/month)" : "3 BHK Rent (₹/month)"}
                        </label>
                        <input
                          type="number"
                          value={formData.sharing_triple}
                          onChange={(e) => setFormData({ ...formData, sharing_triple: e.target.value })}
                          placeholder="e.g., 5500"
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Security Deposit (₹)</label>
                        <input
                          type="number"
                          value={formData.security_deposit}
                          onChange={(e) => setFormData({ ...formData, security_deposit: e.target.value })}
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Availability</label>
                        <select
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                          className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 cursor-pointer"
                        >
                          <option value="Available">Available</option>
                          <option value="Limited">Limited</option>
                          <option value="Full">Full</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Available From</label>
                      <input
                        type="date"
                        value={formData.available_from}
                        onChange={(e) => setFormData({ ...formData, available_from: e.target.value })}
                        className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors sm:max-w-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Amenities ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="amenities" title="Amenities" icon={CheckCircle} />
                {expandedSection === "amenities" && (
                  <div className="pb-6 animate-fade-in space-y-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const allSelected = ALL_AMENITIES.every((a) => formData.amenities.includes(a));
                          setFormData({
                            ...formData,
                            amenities: allSelected ? [] : [...ALL_AMENITIES]
                          });
                        }}
                        className="py-1 px-3 text-xs font-bold rounded-lg border border-purple-200 text-purple-650 hover:bg-purple-50 transition-colors"
                      >
                        {ALL_AMENITIES.every((a) => formData.amenities.includes(a)) ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {ALL_AMENITIES.map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleArrayItem("amenities", amenity)}
                          className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                            formData.amenities.includes(amenity)
                              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Food ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="food" title="Food Details" icon={Building2} />
                {expandedSection === "food" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.food_available}
                        onChange={(e) => setFormData({ ...formData, food_available: e.target.checked })}
                        className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-gray-700">Food Available</span>
                    </label>
                    {formData.food_available && (
                      <div className="space-y-4 pl-7">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5">Food Type</label>
                          <div className="flex gap-2">
                            {(["Veg", "NonVeg", "Both"] as const).map((ft) => (
                              <button
                                key={ft}
                                type="button"
                                onClick={() => setFormData({ ...formData, food_type: ft })}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                  formData.food_type === ft
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                {ft === "NonVeg" ? "Non-Veg" : ft}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5">Meals Included</label>
                          <div className="flex gap-2">
                            {MEAL_OPTIONS.map((meal) => (
                              <button
                                key={meal}
                                type="button"
                                onClick={() => toggleArrayItem("food_meals", meal)}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                  formData.food_meals.includes(meal)
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                {meal}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── Section: House Rules ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="rules" title="House Rules" icon={AlertCircle} />
                {expandedSection === "rules" && (
                  <div className="pb-6 space-y-3 animate-fade-in">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ruleInput}
                        onChange={(e) => setRuleInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("house_rules", ruleInput, setRuleInput))}
                        placeholder="e.g., Gate closes at 11 PM"
                        className="flex-1 text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => addToList("house_rules", ruleInput, setRuleInput)}
                        className="px-4 py-3 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.house_rules.map((rule, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 rounded-lg text-xs font-semibold text-gray-700">
                          <span>• {rule}</span>
                          <button type="button" onClick={() => removeFromList("house_rules", i)} className="text-red-400 hover:text-red-600 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Images ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="images" title="Images" icon={ImageIcon} />
                {expandedSection === "images" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <p className="text-xs text-gray-500 font-medium">Upload up to 5 images (JPG, PNG, WEBP, max 5MB each).</p>
                    
                    <div className="flex items-center gap-4">
                      <label className="flex-shrink-0 cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-purple-500 transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-xs font-semibold text-gray-500">Upload</span>
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg, image/png, image/webp"
                          className="hidden"
                          onChange={handleImageChange}
                          disabled={formData.images.length + imageFiles.length >= 5}
                        />
                      </label>
                      
                      <div className="flex-1 flex gap-3 overflow-x-auto pb-2">
                        {/* Existing Images */}
                        {formData.images.map((img, i) => (
                          <div key={`existing-${i}`} className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={async () => {
                                 try {
                                   const urlObj = new URL(img);
                                   const match = urlObj.pathname.match(/\/property-images\/(.+)$/);
                                   if (match && match[1]) {
                                     await supabaseBrowser.storage.from("property-images").remove([match[1]]);
                                   }
                                 } catch (e) {
                                   console.error("Error parsing URL to remove image", e);
                                 }
                                 removeFromList("images", i);
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}

                        {/* New Image Files */}
                        {imageFiles.map((file, i) => (
                          <div key={`new-${i}`} className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setImageFiles(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">New</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Location ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="location" title="Location & Nearby Places" icon={MapPin} />
                {expandedSection === "location" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Property Address / Landmark *</label>
                      <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g., 1st Cross, HSR Layout Sector 3, near BDA Complex, Bangalore"
                        className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors resize-none"
                      />
                    </div>

                    {/* Nearby Companies */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Nearby Companies / Tech Parks</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={companyInput}
                          onChange={(e) => setCompanyInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("nearby_companies", companyInput, setCompanyInput))}
                          placeholder="e.g., Infosys (1.2 km)"
                          className="flex-1 text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                        <button type="button" onClick={() => addToList("nearby_companies", companyInput, setCompanyInput)} className="px-4 py-3 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.nearby_companies.map((c, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">
                            {c}
                            <button type="button" onClick={() => removeFromList("nearby_companies", i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nearby Colleges */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Nearby Colleges</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={collegeInput}
                          onChange={(e) => setCollegeInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("nearby_colleges", collegeInput, setCollegeInput))}
                          placeholder="e.g., IIIT Bangalore (1.5 km)"
                          className="flex-1 text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                        <button type="button" onClick={() => addToList("nearby_colleges", collegeInput, setCollegeInput)} className="px-4 py-3 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.nearby_colleges.map((c, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">
                            {c}
                            <button type="button" onClick={() => removeFromList("nearby_colleges", i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nearby Metro */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Nearby Metro Stations</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={metroInput}
                          onChange={(e) => setMetroInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("nearby_metro", metroInput, setMetroInput))}
                          placeholder="e.g., Silk Board Metro (0.5 km)"
                          className="flex-1 text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                        <button type="button" onClick={() => addToList("nearby_metro", metroInput, setMetroInput)} className="px-4 py-3 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.nearby_metro.map((m, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">
                            {m}
                            <button type="button" onClick={() => removeFromList("nearby_metro", i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section: Highlights ─── */}
              <div className="px-6 sm:px-8">
                <SectionHeader id="highlights" title="Highlights & Extras" icon={Star} />
                {expandedSection === "highlights" && (
                  <div className="pb-6 space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Property Highlights</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={highlightInput}
                          onChange={(e) => setHighlightInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("highlights", highlightInput, setHighlightInput))}
                          placeholder="e.g., 5 mins walk to Metro"
                          className="flex-1 text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 hover:bg-white transition-colors"
                        />
                        <button type="button" onClick={() => addToList("highlights", highlightInput, setHighlightInput)} className="px-4 py-3 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.highlights.map((h, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-100 rounded-lg text-xs font-semibold text-purple-700">
                            {h}
                            <button type="button" onClick={() => removeFromList("highlights", i)} className="text-purple-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-gray-700">Mark as Featured Property</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); setFormData(INITIAL_FORM); setImageFiles([]); setEditingId(null); }}
                className="px-6 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 text-sm font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> {editingId ? "Updating..." : "Saving..."}</>
                ) : (
                  <><Plus className="h-4 w-4" /> {editingId ? "Update Property" : "Add Property"}</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ════════════════ Properties List ════════════════ */}
        {loadingProperties ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <Building2 className="h-16 w-16 text-purple-200 mx-auto" />
            <h3 className="mt-4 text-lg font-bold text-gray-900">No properties yet</h3>
            <p className="text-sm text-gray-500 mt-2">Click "Add New Property" to list your first PG.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={prop.images?.[0] || "https://picsum.photos/800/500?random=99"}
                    alt={prop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-purple-700 px-2 py-0.5 rounded shadow-sm">
                      {prop.type === "PG"
                        ? ({ Male: "Boys", Female: "Girls", Unisex: "Coliving" } as Record<string, string>)[prop.gender] ?? prop.gender
                        : ({ "1BHK": "1 BHK", "2BHK": "2 BHK", "3BHK": "3 BHK" } as Record<string, string>)[prop.gender] ?? prop.gender}
                    </span>
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5 rounded shadow-sm">
                      {prop.type}
                    </span>
                  </div>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                    prop.availability === "Available" ? "bg-green-500 text-white" : prop.availability === "Limited" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {prop.availability}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1">{prop.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{prop.area}, {prop.city}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Starting</span>
                      <span className="text-base font-extrabold text-purple-700 ml-1">₹{prop.starting_rent?.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-gray-400">/mo</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      {new Date(prop.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => handleEdit(prop)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition-colors"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
