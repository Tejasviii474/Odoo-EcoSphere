"use client";

import { useState } from "react";
import { Trophy, Medal, ArrowRight, Upload, Clock, CheckCircle2 } from "lucide-react";

export default function ChallengesPage() {
  const [notification, setNotification] = useState("");
  const [activeChallenges, setActiveChallenges] = useState([
    {
      id: 1,
      title: "Bike to Work Week",
      description: "Commute to work using a bicycle for 3 days this week. Upload a photo of your bike as proof.",
      xp: 150,
      status: "active",
      category: "Environmental",
      timeLeft: "2 days",
    },
    {
      id: 2,
      title: "Zero Waste Lunch",
      description: "Bring a lunch in 100% reusable containers. No single-use plastics.",
      xp: 50,
      status: "under_review",
      category: "Environmental",
      timeLeft: "12 hours",
    },
    {
      id: 3,
      title: "Community Cleanup Volunteer",
      description: "Participate in the local park cleanup organized by the CSR team.",
      xp: 300,
      status: "active",
      category: "Social",
      timeLeft: "5 days",
    }
  ]);

  const handleSubmitProof = (id: number, title: string) => {
    setActiveChallenges(challenges => 
      challenges.map(challenge => 
        challenge.id === id ? { ...challenge, status: "under_review" } : challenge
      )
    );
    setNotification(`Proof submitted for "${title}". Awaiting review!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const leaderboard = [
    { rank: 1, name: "Alice Smith", department: "Engineering", xp: 1250 },
    { rank: 2, name: "Jane Doe", department: "ESG", xp: 1100 },
    { rank: 3, name: "Bob Johnson", department: "Marketing", xp: 950 },
    { rank: 4, name: "Sarah Lee", department: "Sales", xp: 820 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Gamification & Challenges
          </h1>
          <p className="text-muted-foreground mt-1">Complete sustainability challenges, earn XP, and unlock rewards.</p>
        </div>
        <div className="bg-secondary px-6 py-3 rounded-xl border border-border flex items-center gap-4">
          <div className="text-sm text-muted-foreground">Your Balance</div>
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            1,100 <span className="text-sm font-medium">XP</span>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Challenges Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Active Challenges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="glass-card p-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {challenge.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                      <Medal className="w-4 h-4" />
                      +{challenge.xp} XP
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Clock className="w-4 h-4" />
                    {challenge.timeLeft} left
                  </div>
                  
                  {challenge.status === "active" ? (
                    <button 
                      onClick={() => handleSubmitProof(challenge.id, challenge.title)}
                      className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Submit Proof
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium px-4 py-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      Under Review
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Leaderboard */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Global Leaderboard</h2>
          
          <div className="glass-card p-4">
            <ul className="space-y-4">
              {leaderboard.map((user, index) => (
                <li key={index} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                      ${index === 0 ? "bg-yellow-100 text-yellow-700 border border-yellow-300" : 
                        index === 1 ? "bg-gray-200 text-gray-700 border border-gray-300" : 
                        index === 2 ? "bg-orange-100 text-orange-800 border border-orange-300" : 
                        "bg-secondary text-muted-foreground"}`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.department}</p>
                    </div>
                  </div>
                  <div className="font-bold text-sm">{user.xp} <span className="text-xs text-muted-foreground font-normal">XP</span></div>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => {
                setNotification("Full Leaderboard syncing...");
                setTimeout(() => setNotification(""), 2000);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 font-medium py-2"
            >
              View Full Rankings <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
