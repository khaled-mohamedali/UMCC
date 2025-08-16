import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Megaphone, Calendar, MapPin } from "lucide-react";

interface QuickAccessPanelProps {
  onAnnouncementsClick?: () => void;
  onCalendarClick?: () => void;
  onLocationClick?: () => void;
}

const QuickAccessPanel = ({
  onAnnouncementsClick = () => {},
  onCalendarClick = () => {},
  onLocationClick = () => {},
}: QuickAccessPanelProps) => {
  return (
    <Card className="w-full p-4 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={onAnnouncementsClick}
          className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          <Megaphone className="h-5 w-5" />
          <span>Announcements</span>
        </Button>

        <Button
          onClick={onCalendarClick}
          className="w-full sm:w-auto flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
          size="lg"
        >
          <Calendar className="h-5 w-5" />
          <span>Calendar</span>
        </Button>

        <Button
          onClick={onLocationClick}
          className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <MapPin className="h-5 w-5" />
          <span>Location</span>
        </Button>
      </div>
    </Card>
  );
};

export default QuickAccessPanel;
