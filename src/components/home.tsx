import React, { useState } from "react";
import PrayerDashboard from "./PrayerDashboard";
import QuickAccessPanel from "./QuickAccessPanel";

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [hijriDate, setHijriDate] = useState("");
  const gregorianDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col gap-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=200&q=80"
              alt="Mosque Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">UMCC</h1>
            <p className="text-sm text-muted-foreground">
              University Masjid Community Center
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-card rounded-lg p-3 shadow-sm border">
            <p className="text-sm text-muted-foreground">Gregorian</p>
            <p className="font-medium">{gregorianDate}</p>
          </div>
          <div className="bg-card rounded-lg p-3 shadow-sm border">
            <p className="text-sm text-muted-foreground">Hijri</p>
            <p className="font-medium">{hijriDate || "Loading..."}</p>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <PrayerDashboard setHijriDate={setHijriDate} />
      </main>

      <footer className="mt-6">
        <QuickAccessPanel />
      </footer>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>© Dev Circuit {currentYear}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
