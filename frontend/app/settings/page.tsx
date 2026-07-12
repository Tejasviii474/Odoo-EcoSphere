"use client";

import { Settings as SettingsIcon, Bell, Shield, Zap, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  // Mock state for our configuration toggles (as per the PDF rules)
  const [config, setConfig] = useState({
    autoEmissionCalc: true,
    evidenceRequired: true,
    badgeAutoAward: true,
    emailNotifications: true,
    inAppNotifications: true,
  });

  const toggleConfig = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-gray-500" />
            Platform Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage global business rules, notifications, and automation.</p>
        </div>
        
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Core Automation Rules */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6 border-b border-border pb-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            Core Automation & Business Rules
          </h2>
          
          <div className="space-y-6">
            {/* Setting Item */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">Auto Emission Calculation</h3>
                <p className="text-sm text-muted-foreground">Automatically calculate carbon footprints from simulated ERP operations (Purchase, Fleet, Manufacturing) using Emission Factors.</p>
              </div>
              <button 
                onClick={() => toggleConfig("autoEmissionCalc")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.autoEmissionCalc ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.autoEmissionCalc ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            {/* Setting Item */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">Strict Evidence Requirement</h3>
                <p className="text-sm text-muted-foreground">Prevent CSR Activities and Challenges from being marked as 'Approved' without an attached proof file.</p>
              </div>
              <button 
                onClick={() => toggleConfig("evidenceRequired")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.evidenceRequired ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.evidenceRequired ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            {/* Setting Item */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">Badge Auto-Awarding</h3>
                <p className="text-sm text-muted-foreground">Automatically assign badges to employees the moment their XP or challenge count satisfies the unlock rule.</p>
              </div>
              <button 
                onClick={() => toggleConfig("badgeAutoAward")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.badgeAutoAward ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.badgeAutoAward ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6 border-b border-border pb-3">
            <Bell className="w-5 h-5 text-blue-500" />
            Notification Preferences
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">In-App Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive alerts for badge unlocks, compliance issues, and approval decisions within the platform.</p>
              </div>
              <button 
                onClick={() => toggleConfig("inAppNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.inAppNotifications ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.inAppNotifications ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive daily summaries and critical compliance alerts via email.</p>
              </div>
              <button 
                onClick={() => toggleConfig("emailNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.emailNotifications ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.emailNotifications ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
