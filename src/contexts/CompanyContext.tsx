"use client";

import React, { createContext, useContext } from "react";

interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
}

interface CompanyContextType {
  company: CompanySettings;
  updateCompany: (settings: Partial<CompanySettings>) => Promise<void>;
}

const defaultCompany: CompanySettings = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "AdminDash",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "admin@admindash.com",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (555) 123-4567",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "123 Business Street, Suite 100, San Francisco, CA 94105",
  website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://admindash.com",
  logo: process.env.NEXT_PUBLIC_COMPANY_LOGO || "",
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const updateCompany = async (settings: Partial<CompanySettings>) => {
    try {
      const response = await fetch("/api/company/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update company settings");
      }

      // Reload the page to pick up new environment variables
      window.location.reload();
    } catch (error) {
      console.error("Failed to update company settings:", error);
      throw error;
    }
  };

  return (
    <CompanyContext.Provider value={{ company: defaultCompany, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
