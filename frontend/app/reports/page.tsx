"use client";

import { FileBarChart, Download, Filter, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate report generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <FileBarChart className="w-8 h-8 text-indigo-500" />
            Custom Report Builder
          </h1>
          <p className="text-muted-foreground mt-1">Combine filters to generate and export custom ESG reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Report Builder Form (Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6 border-b border-border pb-3">
              <Filter className="w-5 h-5 text-indigo-500" />
              Report Parameters
            </h2>
            
            <div className="space-y-5">
              {/* Module Filter */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">ESG Module</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-secondary border border-border text-foreground text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 block p-2.5 pr-8">
                    <option>All Modules (Summary)</option>
                    <option>Environmental</option>
                    <option>Social (CSR)</option>
                    <option>Governance</option>
                    <option>Gamification</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Department Filter */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Department</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-secondary border border-border text-foreground text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 block p-2.5 pr-8">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Manufacturing</option>
                    <option>Sales & Marketing</option>
                    <option>Human Resources</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-secondary border border-border text-foreground text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 block p-2.5 pr-8">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Year to Date (YTD)</option>
                    <option>Custom Range...</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Export Format */}
              <div className="space-y-1.5 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground">Export Format</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="radio" name="format" className="text-primary focus:ring-primary/50" defaultChecked /> PDF
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="radio" name="format" className="text-primary focus:ring-primary/50" /> Excel / CSV
                  </label>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-8 bg-primary text-primary-foreground font-semibold px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? "Processing Data..." : "Generate Report"}
            </button>
          </div>
        </div>

        {/* Report Preview Area */}
        <div className="lg:col-span-2">
          {!reportReady ? (
            <div className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-dashed border-2">
              <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">No Report Generated</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Select your parameters on the left and click "Generate Report" to view the preview and export options.
              </p>
            </div>
          ) : (
            <div className="glass-card p-0 overflow-hidden flex flex-col h-full min-h-[400px] animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-secondary/50 p-6 border-b border-border flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-foreground">Comprehensive ESG Summary</h3>
                  <p className="text-xs text-muted-foreground">Generated: Just now • All Departments • Last 30 Days</p>
                </div>
                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
              
              <div className="p-8 flex-1 flex flex-col items-center justify-center bg-white dark:bg-black/20">
                {/* Mock Document Preview */}
                <div className="w-full max-w-md aspect-[1/1.4] bg-white border border-gray-200 shadow-sm p-8 flex flex-col pointer-events-none">
                  <div className="w-12 h-12 bg-primary/20 rounded-md mb-6" />
                  <div className="w-3/4 h-6 bg-gray-200 rounded mb-2" />
                  <div className="w-1/2 h-4 bg-gray-100 rounded mb-8" />
                  
                  <div className="space-y-3 mb-8">
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-4/5 h-3 bg-gray-100 rounded" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-100 rounded-md" />
                    <div className="h-24 bg-gray-100 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
