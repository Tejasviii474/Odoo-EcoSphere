"use client";

import { ShieldCheck, AlertTriangle, FileText, CheckCircle, Clock } from "lucide-react";

export default function GovernancePage() {
  // Mock data for the demo
  const complianceIssues = [
    {
      id: "ISS-092",
      title: "Supplier Code of Conduct Audit Pending",
      description: "The annual audit for Tier 1 suppliers needs to be completed and signed off.",
      severity: "High",
      status: "Open",
      owner: "Jane Doe",
      dueDate: "Jul 15, 2026",
    },
    {
      id: "ISS-091",
      title: "Data Privacy Policy Update",
      description: "Employee handbook needs to be updated with the new GDPR data handling clauses.",
      severity: "Medium",
      status: "In Progress",
      owner: "HR Team",
      dueDate: "Jul 20, 2026",
    },
    {
      id: "ISS-090",
      title: "Quarterly Board Report Submission",
      description: "Finalize the ESG metrics for the Q2 stakeholder meeting.",
      severity: "Critical",
      status: "Open",
      owner: "Executive Admin",
      dueDate: "Jul 12, 2026",
    },
  ];

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-700 dark:bg-red-900/30 border-red-200";
      case "High": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-purple-500" />
            Governance & Compliance
          </h1>
          <p className="text-muted-foreground mt-1">Track policies, audits, and compliance issues across the organization.</p>
        </div>
        
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
          <AlertTriangle className="w-4 h-4" />
          Report Issue
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Compliance Issues List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-xl font-semibold text-foreground">Active Compliance Issues</h2>
            <div className="text-sm font-medium text-muted-foreground">3 Action Items</div>
          </div>
          
          <div className="space-y-4">
            {complianceIssues.map((issue) => (
              <div key={issue.id} className="glass-card p-5 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground">{issue.id}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getSeverityStyle(issue.severity)}`}>
                      {issue.severity} Priority
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {issue.status === "Open" ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    {issue.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mt-3 mb-1">{issue.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{issue.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                      {issue.owner.charAt(0)}
                    </div>
                    <span className="font-medium">{issue.owner}</span>
                  </div>
                  <div className="text-sm font-medium text-red-500 flex items-center gap-1">
                    Due: {issue.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Policies & Audits Overview */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Policy Acknowledgements
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Code of Conduct</span>
                  <span className="text-emerald-500 font-bold">92%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Anti-Bribery Policy</span>
                  <span className="text-yellow-500 font-bold">65%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 rounded-lg transition-colors text-sm">
              Send Reminders
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
