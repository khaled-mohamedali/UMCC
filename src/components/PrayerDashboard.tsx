import React from "react";
import { Card } from "@/components/ui/card";
import PrayerTimesGrid from "./PrayerTimesGrid";
import CountdownWidget from "./CountdownWidget";

interface PrayerDashboardProps {
  mosqueName?: string;
  gregorianDate?: string;
  hijriDate?: string;
  prayerTimes?: {
    name: string;
    time: string;
    isNext?: boolean;
  }[];
  nextPrayer?: {
    name: string;
    timeRemaining: string;
    percentage: number;
  };
}

const PrayerDashboard: React.FC<PrayerDashboardProps> = ({
  mosqueName = "Masjid Al-Noor",
  gregorianDate = "May 15, 2023",
  hijriDate = "24 Shawwal, 1444",
  prayerTimes = [
    { name: "Fajr", time: "4:35 AM" },
    { name: "Dhuhr", time: "12:15 PM" },
    { name: "Asr", time: "3:45 PM" },
    { name: "Maghrib", time: "7:23 PM", isNext: true },
    { name: "Isha", time: "8:45 PM" },
  ],
  nextPrayer = {
    name: "Maghrib",
    timeRemaining: "1:23:45",
    percentage: 65,
  },
}) => {
  return (
    <div className="w-full p-4 bg-white">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          {mosqueName}
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-2">
          <p className="text-gray-700">{gregorianDate}</p>
          <span className="hidden md:block text-gray-500">|</span>
          <p className="text-gray-700">{hijriDate}</p>
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Prayer Times Grid */}
        <div className="w-full lg:w-1/2">
          <PrayerTimesGrid prayerTimes={prayerTimes} />
        </div>

        {/* Countdown Widget */}
        <div className="w-full lg:w-1/2">
          <CountdownWidget
             nextPrayer={{
             name: nextPrayer.name,
             time: nextPrayer.timeRemaining, // Replace with actual time string from backend, e.g. "7:23 PM"
             timestamp: Date.now() + 16600000 // Replace with actual timestamp from backend
  }}
          />
        </div>
      </div>

      {/* Additional Information Card */}
      <Card className="mt-6 p-4 border-t-4 border-green-500">
        <h3 className="text-lg font-medium text-green-700">Today's Reminder</h3>
        <p className="text-gray-600 mt-2">
          "The five daily prayers erase the sins committed between them as long
          as major sins are avoided."
          <span className="block mt-1 italic">- Sahih Muslim</span>
        </p>
      </Card>
    </div>
  );
};

export default PrayerDashboard;
