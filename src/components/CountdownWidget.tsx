import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, AlarmClock } from "lucide-react";

interface CountdownWidgetProps {
  nextPrayer?: {
    name: string;
    time: string;
    timestamp: number;
  };
  currentTime?: number;
}

const CountdownWidget = ({
  nextPrayer = {
    name: "Dhuhr",
    time: "1:30 PM",
    timestamp: Date.now() + 3600000, // 1 hour from now
  },
  currentTime = Date.now(),
}: CountdownWidgetProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    progress: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progress: 0,
  });

  useEffect(() => {
    // Calculate initial time difference
    const calculateTimeRemaining = () => {
      const diff = Math.max(0, nextPrayer.timestamp - Date.now());
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      // Assuming a 5-hour max interval between prayers for progress calculation
      const maxInterval = 5 * 60 * 60; // 5 hours in seconds
      const progress = 100 - Math.min(100, (totalSeconds / maxInterval) * 100);

      return { hours, minutes, seconds, totalSeconds, progress };
    };

    // Set initial values
    setTimeRemaining(calculateTimeRemaining());

    // Update countdown every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // Stop the timer when countdown reaches zero
      if (remaining.totalSeconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer.timestamp]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <Card className="w-full h-full bg-white shadow-md overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-gray-600 mb-1">
            Next Prayer
          </h2>
          <h3 className="text-3xl font-bold text-[#4CAF50]">
            {nextPrayer.name}
          </h3>
          <p className="text-lg text-gray-500 mt-1">{nextPrayer.time}</p>
        </div>

        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="block text-4xl font-bold text-gray-800">
                {formatNumber(timeRemaining.hours)}:
                {formatNumber(timeRemaining.minutes)}:
                {formatNumber(timeRemaining.seconds)}
              </span>
              <span className="text-sm text-gray-500">Remaining</span>
            </div>
          </div>
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="12"
              strokeDasharray="552.9"
              strokeDashoffset={552.9 - (552.9 * timeRemaining.progress) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Clock size={18} />
          <span>Time until {nextPrayer.name}</span>
        </div>

        {/* <Progress
          value={timeRemaining.progress}
          className="w-full mt-4 h-2 bg-gray-100"
        /> */}
      </CardContent>
    </Card>
  );
};

export default CountdownWidget;
