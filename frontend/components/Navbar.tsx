"use client";

import { Bell, Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Mobile Menu Button & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg max-w-md w-full border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search departments, challenges, or reports..." 
            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          {/* Notification Dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
        </button>

        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-2 cursor-pointer pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm border border-primary/30">
            JD
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-foreground leading-none">Jane Doe</p>
          </div>
        </div>
      </div>

    </header>
  );
}
