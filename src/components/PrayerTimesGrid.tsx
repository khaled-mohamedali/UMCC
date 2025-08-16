import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PrayerTime {
  name: string;
  time: string;
  isNext?: boolean;
}

interface PrayerTimesGridProps {
  prayerTimes?: PrayerTime[];
}

const PrayerTimesGrid = ({
  prayerTimes = defaultPrayerTimes,
}: PrayerTimesGridProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Today's Prayer Times
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prayerTimes.map((prayer) => (
          <Card
            key={prayer.name}
            className={`${prayer.isNext ? "border-2 border-[#4CAF50]" : ""}`}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <h3 className="text-xl font-medium mb-2">{prayer.name}</h3>
              <p className="text-3xl font-bold text-gray-700">{prayer.time}</p>
              {prayer.isNext && (
                <Badge className="mt-2 bg-[#4CAF50] hover:bg-[#3d8b40]">
                  Next Prayer
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const defaultPrayerTimes: PrayerTime[] = [
  { name: "Fajr", time: "5:23 AM" },
  { name: "Dhuhr", time: "12:30 PM" },
  { name: "Asr", time: "3:45 PM", isNext: true },
  { name: "Maghrib", time: "6:58 PM" },
  { name: "Isha", time: "8:15 PM" },
];

export default PrayerTimesGrid;
