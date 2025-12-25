"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";

interface WeatherDialogProps {
  children: React.ReactNode;
}

interface WeatherDay {
  day: string;
  temp: string;
  icon: React.ReactNode;
  precipitation: string;
}

const weatherForecast: WeatherDay[] = [
  {
    day: "Mon",
    temp: "+29°C",
    icon: <CloudRain className="h-8 w-8" />,
    precipitation: "2%",
  },
  {
    day: "Tue",
    temp: "+29°C",
    icon: <CloudSun className="h-8 w-8" />,
    precipitation: "2%",
  },
  {
    day: "Wed",
    temp: "+20°C",
    icon: <Sun className="h-8 w-8" />,
    precipitation: "1%",
  },
  {
    day: "Thu",
    temp: "+17°C",
    icon: <Sun className="h-8 w-8" />,
    precipitation: "1%",
  },
  {
    day: "Fri",
    temp: "+18°C",
    icon: <Sun className="h-8 w-8" />,
    precipitation: "1%",
  },
  {
    day: "Sat",
    temp: "+16°C",
    icon: <Sun className="h-8 w-8" />,
    precipitation: "1%",
  },
  {
    day: "Sun",
    temp: "+29°C",
    icon: <Sun className="h-8 w-8" />,
    precipitation: "1%",
  },
];

export function WeatherDialog({ children }: WeatherDialogProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-[600px] p-0 bg-gradient-to-br from-purple-500 to-purple-900 border-0 text-white"
        align="start"
        sideOffset={8}
      >
        <div className="flex divide-x divide-purple-400/30">
          {weatherForecast.map((day, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center py-6 px-2"
            >
              <p className="text-sm font-medium mb-3 opacity-90">{day.day}</p>
              <p className="text-xl font-bold mb-4">{day.temp}</p>
              <div className="mb-4 opacity-90">{day.icon}</div>
              <div className="flex items-center gap-1 text-sm opacity-75">
                <CloudRain className="h-4 w-4" />
                <span>{day.precipitation}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
