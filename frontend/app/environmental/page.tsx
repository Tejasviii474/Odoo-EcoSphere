"use client";

import { useState } from "react";
import { Leaf, PlusCircle, Factory, Car, Package, FileText, CheckCircle2 } from "lucide-react";

export default function EnvironmentalPage() {
  const [notification, setNotification] = useState("");
  const [co2Total, setCo2Total] = useState(6185);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: "TX-1042", type: "Fleet Operations", amount: "500 L Fuel", co2: 1190, date: "Today, 10:00 AM", status: "Auto-Calculated", icon: Car },
    { id: "TX-1041", type: "Manufacturing", amount: "12,000 kWh", co2: 4600, date: "Yesterday, 3:30 PM", status: "Auto-Calculated", icon: Factory },
    { id: "TX-1040", type: "Supply Chain", amount: "Freight (200 miles)", co2: 350, date: "Jul 10, 2026", status: "Auto-Calculated", icon: Package },
    { id: "TX-1039", type: "Office Operations", amount: "Paper/Supplies", co2: 45, date: "Jul 09, 2026", status: "Manual Entry", icon: FileText },
  ]);

  const handleSimulateERP = () => {
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Logistics Sync",
      amount: "Freight (120 miles)",
      co2: 240,
      date: "Just now",
      status: "Auto-Calculated",
      icon: Package
    };
    setRecentTransactions([newTx, ...recentTransactions].slice(0, 5));
    setCo2Total(prev => prev + 240);
    setNotification("Successfully imported new logistics data from ERP!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-500" />
            Environmental Tracking
          </h1>
          <p className="text-muted-foreground mt-1">Monitor carbon emissions and manage sustainability goals.</p>
        </div>
        
        {/* Simulate ERP Data Button - Crucial for the Hackathon Demo */}
        <button 
          onClick={handleSimulateERP} 
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Simulate ERP Data
        </button>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Summary Widget */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total CO2e This Month</h3>
            <div className="text-4xl font-extrabold text-foreground mb-1">
              {co2Total.toLocaleString()} <span className="text-lg font-medium text-muted-foreground">kg</span>
            </div>
            <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
              ↓ 12% compared to last month
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3 mb-4">Top Emission Sources</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Manufacturing</span>
                  <span className="text-muted-foreground">74%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: "74%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Fleet & Transport</span>
                  <span className="text-muted-foreground">19%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: "19%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Office Operations</span>
                  <span className="text-muted-foreground">7%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "7%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="lg:col-span-2">
          <div className="glass-card p-0 overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Recent Carbon Transactions</h2>
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Auto-Sync Enabled</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Activity Source</th>
                    <th className="px-6 py-4 font-semibold">Input Amount</th>
                    <th className="px-6 py-4 font-semibold">Calculated CO2e</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentTransactions.map((tx) => {
                    const Icon = tx.icon;
                    return (
                      <tr key={tx.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{tx.type}</div>
                              <div className="text-xs text-muted-foreground">{tx.date}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{tx.amount}</td>
                        <td className="px-6 py-4 font-bold text-foreground">{tx.co2.toLocaleString()} kg</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            tx.status === "Auto-Calculated" 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800"
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
