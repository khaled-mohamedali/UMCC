import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import PrayerTimesGrid from "./PrayerTimesGrid";
import CountdownWidget from "./CountdownWidget";

interface PrayerDashboardProps {
  mosqueName?: string;
  prayerTimes?: {
    name: string;
    time: string;
    isNext?: boolean;
  }[];
  nextPrayer?: {
    name: string;
    timeRemaining: string;
    percentage?: number;
  };
  setHijriDate?: (date: string) => void; // <-- Add this line
}

const PrayerDashboard: React.FC<PrayerDashboardProps> = (props) => {
  const mosqueName = props.mosqueName ?? "UMCC";
  const [prayerTimes, setPrayerTimes] = useState([
    { name: "Fajr", time: "--" },
    { name: "Dhuhr", time: "--" },
    { name: "Asr", time: "--" },
    { name: "Maghrib", time: "--" },
    { name: "Isha", time: "--" },
  ]);

  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Fetch prayer times for Charlotte, NC, USA
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=Charlotte&country=USA&method=2`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.timings) {
          const timings = data.data.timings;
          setPrayerTimes([
            { name: "Fajr", time: timings.Fajr },
            { name: "Dhuhr", time: timings.Dhuhr },
            { name: "Asr", time: timings.Asr },
            { name: "Maghrib", time: timings.Maghrib },
            { name: "Isha", time: timings.Isha },
          ]);
        }
      });

    // Fetch Gregorian and Hijri dates
    fetch(`https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const g = data.data.gregorian;
          const h = data.data.hijri;
          setGregorianDate(`${g.day} ${g.month.en}, ${g.year}`);
          setHijriDate(`${h.day} ${h.month.en}, ${h.year}`);
          if (props.setHijriDate) {
            props.setHijriDate(`${h.day} ${h.month.en}, ${h.year}`);
          }
        }
      });
  }, []);

  const now = new Date();
  const prayerDateTimes = prayerTimes.map((pt) => {
    const [hour, minute] = pt.time.split(":");
    // Create a Date object for today with the prayer's hour and minute
    const dateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(hour, 10),
      parseInt(minute, 10)
    );
    return { ...pt, dateTime };
  });

  const next = prayerDateTimes.find((pt) => pt.dateTime > now);
  const previous = [...prayerDateTimes]
    .reverse()
    .find((pt) => pt.dateTime < now);

  // If all prayers have passed, use the first prayer of tomorrow
  const nextPrayerObj = next
    ? {
        name: next.name,
        time: next.time,
        timestamp: next.dateTime.getTime(),
        previousTimestamp: previous
          ? previous.dateTime.getTime()
          : now.getTime(),
      }
    : {
        name: prayerDateTimes[0].name,
        time: prayerDateTimes[0].time,
        timestamp: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          parseInt(prayerDateTimes[0].time.split(":")[0], 10),
          parseInt(prayerDateTimes[0].time.split(":")[1], 10)
        ).getTime(),
        previousTimestamp:
          prayerDateTimes[prayerDateTimes.length - 1].dateTime.getTime(),
      };

  return (
    <div className="w-full p-4 bg-white">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          {mosqueName}
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-2">
          <p className="text-gray-700">{gregorianDate || "Loading..."}</p>
          <span className="hidden md:block text-gray-500">|</span>
          <p className="text-gray-700">{hijriDate || "Loading..."}</p>
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
          <CountdownWidget nextPrayer={nextPrayerObj} hijriDate={hijriDate} />
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
