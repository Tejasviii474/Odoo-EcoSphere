"use client";

import { Leaf, Users, ShieldCheck, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardPage() {
  // Mock data representing what we'd fetch from the FastAPI backend
  const scores = {
    overall: 82,
    environmental: 78,
    social: 85,
    governance: 84,
  };

  const aiInsights = [
    "Carbon emissions in Manufacturing increased by 12% this week. Consider prioritizing the 'Green Supply Chain' challenge.",
    "Social score is exceptionally high! 40 new employees participated in CSR activities this month.",
    "2 Governance audits are pending review. Assigning owners will improve your score."
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here is your company's real-time ESG performance.</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold border border-primary/20">
          Overall ESG Score: {scores.overall}/100
        </div>
      </div>

      {/* Metric Cards (Env, Soc, Gov) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Environmental Card */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Environmental</h3>
            </div>
            <span className="text-2xl font-bold">{scores.environmental}</span>
          </div>
          <div className="flex items-center text-sm text-red-500 font-medium">
            <TrendingDown className="w-4 h-4 mr-1" />
            -2 points this month
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scores.environmental}%` }} />
          </div>
        </div>

        {/* Social Card */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Social (CSR)</h3>
            </div>
            <span className="text-2xl font-bold">{scores.social}</span>
          </div>
          <div className="flex items-center text-sm text-emerald-500 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5 points this month
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${scores.social}%` }} />
          </div>
        </div>

        {/* Governance Card */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Governance</h3>
            </div>
            <span className="text-2xl font-bold">{scores.governance}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground font-medium">
            Stable
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${scores.governance}%` }} />
          </div>
        </div>
      </div>

      {/* Eco-Advisor AI Insights Section */}
      <div className="glass-card p-6 border-l-4 border-l-primary relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Eco-Advisor AI Insights</h2>
        </div>
        <ul className="space-y-3">
          {aiInsights.map((insight, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>{insight}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
