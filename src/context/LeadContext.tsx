"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getVisitorMetadata } from "../utils/leadCapture";
import { supabase } from "../lib/supabaseClient";

export interface LeadData {
  name: string;
  mobile: string;
  email?: string;
  preferredArea: string;
  budget: string;
  moveInDate: string;
  companyOrCollege?: string;
}

export interface SavedLead extends LeadData {
  propertyId: string | null;
  propertyName: string;
  triggerSource: "auto-time" | "auto-scroll" | "button-click" | "get-best-price";
  timestamp: string;
}

export type PopupStep = "form" | "otp" | "thanks";

interface LeadContextType {
  isPopupOpen: boolean;
  popupStep: PopupStep | null;
  triggerSource: "auto-time" | "auto-scroll" | "button-click" | "get-best-price" | null;
  activeProperty: { id: string | null; name: string } | null;
  leadData: LeadData;
  setLeadData: React.Dispatch<React.SetStateAction<LeadData>>;
  openPopup: (
    source: "auto-time" | "auto-scroll" | "button-click" | "get-best-price",
    property?: { id: string | null; name: string }
  ) => void;
  closePopup: () => void;
  setStep: (step: PopupStep) => void;
  submitLead: (finalData: LeadData) => void | Promise<void>;
  isSubmitted: boolean;
}

const defaultLeadData: LeadData = {
  name: "",
  mobile: "",
  email: "",
  preferredArea: "Koramangala",
  budget: "5000-8000",
  moveInDate: "",
  companyOrCollege: "",
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep | null>(null);
  const [triggerSource, setTriggerSource] = useState<"auto-time" | "auto-scroll" | "button-click" | "get-best-price" | null>(null);
  const [activeProperty, setActiveProperty] = useState<{ id: string | null; name: string } | null>(null);
  const [leadData, setLeadData] = useState<LeadData>(defaultLeadData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Sync isSubmitted flag from sessionStorage to prevent auto-popups if already done in this session
    if (typeof window !== "undefined") {
      const submitted = sessionStorage.getItem("leadSubmitted") === "true";
      setIsSubmitted(submitted);
    }
  }, []);

  const openPopup = (
    source: "auto-time" | "auto-scroll" | "button-click" | "get-best-price",
    property?: { id: string | null; name: string }
  ) => {
    // If it's an auto-trigger (time or scroll) and they've already submitted a lead in this session, skip
    if ((source === "auto-time" || source === "auto-scroll")) {
      const alreadyShown = sessionStorage.getItem("leadPopupShown") === "true";
      const alreadySubmitted = sessionStorage.getItem("leadSubmitted") === "true";
      if (alreadyShown || alreadySubmitted) return;
    }

    if (source === "auto-time" || source === "auto-scroll") {
      sessionStorage.setItem("leadPopupShown", "true");
    }

    setTriggerSource(source);
    if (property) {
      setActiveProperty(property);
    }
    setIsPopupOpen(true);
    setPopupStep("form");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupStep(null);
  };

  const setStep = (step: PopupStep) => {
    setPopupStep(step);
  };

  const submitLead = async (finalData: LeadData) => {
    const fullLead: SavedLead = {
      ...finalData,
      propertyId: activeProperty?.id || "general-enquiry",
      propertyName: activeProperty?.name || "General Bangalore PG Search",
      triggerSource: triggerSource || "button-click",
      timestamp: new Date().toISOString(),
    };

    // Save to Context state
    setLeadData(finalData);

    // Save to LocalStorage
    if (typeof window !== "undefined") {
      try {
        const existingLeadsStr = localStorage.getItem("pgmove_leads");
        const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
        existingLeads.push(fullLead);
        localStorage.setItem("pgmove_leads", JSON.stringify(existingLeads));
      } catch (e) {
        console.error("Failed to save lead to localStorage:", e);
      }

      // Set session flag to prevent auto-triggering again
      sessionStorage.setItem("leadSubmitted", "true");
    }

    const visitorMeta = getVisitorMetadata();

    // Direct client-side insert to Supabase database (bypasses server runtime)
    try {
      const isValidUUID = (str: string) => {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(str);
      };
      const dbPropertyId = activeProperty?.id && isValidUUID(activeProperty.id) ? activeProperty.id : null;

      const { error: dbError } = await supabase.from("leads").insert([
        {
          property_id: dbPropertyId,
          name: finalData.name,
          phone: finalData.mobile.replace(/\D/g, ""), // clean non-digits
          email: finalData.email || null,
          company_name: finalData.companyOrCollege || null,
          city: finalData.preferredArea || "Bangalore",
          message: `Budget: ${finalData.budget}, Move-In: ${finalData.moveInDate}`,
          lead_source: activeProperty?.name || "General Bangalore PG Search",
          // Visitor metadata
          landing_page_url: visitorMeta.landingPageUrl || null,
          referrer_url: visitorMeta.referrerUrl || null,
          device_type: visitorMeta.deviceType || null,
          browser: visitorMeta.browser || null,
          os: visitorMeta.os || null,
          screen_resolution: visitorMeta.screenResolution || null,
          timezone: visitorMeta.timezone || null,
          // UTM parameters
          utm_source: visitorMeta.utmSource || null,
          utm_medium: visitorMeta.utmMedium || null,
          utm_campaign: visitorMeta.utmCampaign || null,
        },
      ]);
      
      if (dbError) {
        throw dbError;
      }
    } catch (e) {
      console.error("Failed to save lead directly to Supabase:", e);
    }

    setIsSubmitted(true);
    setPopupStep("thanks");
  };

  return (
    <LeadContext.Provider
      value={{
        isPopupOpen,
        popupStep,
        triggerSource,
        activeProperty,
        leadData,
        setLeadData,
        openPopup,
        closePopup,
        setStep,
        submitLead,
        isSubmitted,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
};
