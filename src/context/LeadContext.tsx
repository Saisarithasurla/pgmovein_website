"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  propertyId: string;
  propertyName: string;
  triggerSource: "auto-time" | "auto-scroll" | "button-click";
  timestamp: string;
}

export type PopupStep = "form" | "otp" | "thanks";

interface LeadContextType {
  isPopupOpen: boolean;
  popupStep: PopupStep | null;
  triggerSource: "auto-time" | "auto-scroll" | "button-click" | null;
  activeProperty: { id: string; name: string } | null;
  leadData: LeadData;
  setLeadData: React.Dispatch<React.SetStateAction<LeadData>>;
  openPopup: (
    source: "auto-time" | "auto-scroll" | "button-click",
    property?: { id: string; name: string }
  ) => void;
  closePopup: () => void;
  setStep: (step: PopupStep) => void;
  submitLead: (finalData: LeadData) => void;
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
  const [triggerSource, setTriggerSource] = useState<"auto-time" | "auto-scroll" | "button-click" | null>(null);
  const [activeProperty, setActiveProperty] = useState<{ id: string; name: string } | null>(null);
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
    source: "auto-time" | "auto-scroll" | "button-click",
    property?: { id: string; name: string }
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

  const submitLead = (finalData: LeadData) => {
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

    // TODO: POST /api/leads -> save to database
    // TODO: POST to Google Sheets API via Apps Script webhook

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
