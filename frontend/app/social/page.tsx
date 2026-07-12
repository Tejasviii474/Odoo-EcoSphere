"use client";

import { useState } from "react";
import { Users, HeartHandshake, MapPin, Calendar, Star, CheckCircle2 } from "lucide-react";

export default function SocialPage() {
  const [notification, setNotification] = useState("");
  const [csrActivities, setCsrActivities] = useState([
    {
      id: 1,
      title: "Local Beach Cleanup",
      description: "Join our company-wide initiative to clean up the coastal area. Family members are welcome!",
      date: "Jul 18, 2026",
      location: "Sunny Side Beach",
      spotsLeft: 12,
      totalSpots: 50,
      image: "bg-blue-100 dark:bg-blue-900/30",
      registered: false,
    },
    {
      id: 2,
      title: "Tech Mentorship Bootcamp",
      description: "Volunteer to teach basic coding skills to underprivileged high school students.",
      date: "Aug 05, 2026",
      location: "Downtown Community Center",
      spotsLeft: 4,
      totalSpots: 20,
      image: "bg-purple-100 dark:bg-purple-900/30",
      registered: false,
    },
    {
      id: 3,
      title: "Tree Planting Drive",
      description: "Partnering with the City Parks Dept to plant 500 saplings in the northern district.",
      date: "Aug 12, 2026",
      location: "Northside Reserve",
      spotsLeft: 0,
      totalSpots: 100,
      image: "bg-emerald-100 dark:bg-emerald-900/30",
      registered: false,
    }
  ]);

  const handleRegister = (id: number, title: string) => {
    setCsrActivities(activities => 
      activities.map(activity => {
        if (activity.id === id && activity.spotsLeft > 0 && !activity.registered) {
          return { ...activity, spotsLeft: activity.spotsLeft - 1, registered: true };
        }
        return activity;
      })
    );
    setNotification(`Successfully registered for: ${title}`);
    setTimeout(() => setNotification(""), 3000);
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Social & CSR Initiatives
          </h1>
          <p className="text-muted-foreground mt-1">Engage with the community and track corporate social responsibility.</p>
        </div>
        
        <div className="bg-secondary px-6 py-3 rounded-xl border border-border flex flex-col justify-center">
          <div className="text-sm text-muted-foreground text-center mb-1">Company Engagement</div>
          <div className="flex items-center gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            ))}
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

      {/* CSR Activities Grid */}
      <div>
        <div className="flex items-center justify-between border-b border-border pb-2 mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-blue-500" />
            Upcoming Opportunities
          </h2>
          <button 
            onClick={() => {
              setNotification("Fetching archived events...");
              setTimeout(() => setNotification("No past events found in the current period."), 1500);
              setTimeout(() => setNotification(""), 4500);
            }} 
            className="text-sm text-primary font-medium hover:underline"
          >
            View Past Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csrActivities.map((activity) => (
            <div key={activity.id} className="glass-card flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              {/* Image Placeholder */}
              <div className={`h-32 w-full ${activity.image} flex items-center justify-center`}>
                 <HeartHandshake className="w-12 h-12 text-foreground/20" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-2">{activity.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                  {activity.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {activity.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="text-sm font-medium">
                    {activity.spotsLeft === 0 ? (
                      <span className="text-red-500">Fully Booked</span>
                    ) : (
                      <span className="text-emerald-600">{activity.spotsLeft} spots left</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleRegister(activity.id, activity.title)}
                    disabled={activity.spotsLeft === 0 || activity.registered}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activity.registered
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 cursor-default"
                        : activity.spotsLeft === 0 
                          ? "bg-secondary text-muted-foreground cursor-not-allowed" 
                          : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {activity.registered ? "Registered" : activity.spotsLeft === 0 ? "Waitlist" : "Register Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mini Widget: Diversity Metrics Placeholder */}
      <div className="mt-8 glass-card p-6 border-l-4 border-l-blue-500">
        <h3 className="text-lg font-bold text-foreground mb-2">Diversity & Inclusion Training</h3>
        <p className="text-sm text-muted-foreground mb-4">The company-wide completion rate for the Q3 Diversity Training is currently at 78%. Reminders will be sent out automatically next week.</p>
        <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: "78%" }} />
        </div>
      </div>

    </div>
  );
}
