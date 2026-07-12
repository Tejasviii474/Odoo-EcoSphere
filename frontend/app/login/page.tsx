"use client";

import { Leaf, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for the demo, then redirect
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      
      {/* Left Side - Branding & Visual (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-primary to-emerald-900 p-12 text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-bold shadow-lg">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight">EcoSphere</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Make Sustainability <br /> Your Competitive <br /> Advantage.
          </h1>
          <p className="text-lg text-emerald-100 max-w-md">
            The all-in-one gamified ESG platform that integrates with your ERP to track carbon, boost employee engagement, and ensure compliance.
          </p>
        </div>

        <div className="relative z-10 text-sm text-emerald-200/80">
          &copy; 2026 EcoSphere. Odoo Hackathon Submission.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your EcoSphere account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Work Email</label>
              <input 
                type="email" 
                required
                placeholder="jane.doe@company.com" 
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold text-base px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Hackathon Demo Shortcuts */}
          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center uppercase tracking-wider font-semibold mb-4">Hackathon Quick Login</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleLogin} className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium py-2.5 rounded-lg transition-colors border border-border">
                <User className="w-4 h-4" />
                Employee
              </button>
              <button onClick={handleLogin} className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-2.5 rounded-lg transition-colors border border-primary/20">
                <Leaf className="w-4 h-4" />
                ESG Admin
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
