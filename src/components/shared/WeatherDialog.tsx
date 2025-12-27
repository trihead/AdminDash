"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSun,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  Loader2
} from "lucide-react";
import { useWeather } from "@/contexts/WeatherContext";

interface WeatherDialogProps {
  children: React.ReactNode;
}

interface WeatherDay {
  day: string;
  temp: string;
  icon: React.ReactNode;
  precipitation: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconClass = "h-8 w-8";
  
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className={iconClass} />;
    case "clouds":
    case "cloudy":
      return <CloudSun className={iconClass} />;
    case "rain":
      return <CloudRain className={iconClass} />;
    case "drizzle":
      return <CloudDrizzle className={iconClass} />;
    case "snow":
      return <CloudSnow className={iconClass} />;
    case "thunderstorm":
      return <CloudLightning className={iconClass} />;
    default:
      return <Cloud className={iconClass} />;
  }
};

// Detect if user's locale uses Celsius or Fahrenheit
const getTemperatureUnit = (): "C" | "F" => {
  // Countries that use Fahrenheit
  const fahrenheitCountries = ["US", "BS", "KY", "LR", "PW", "FM", "MH"];
  
  // Try to get locale from navigator
  const locale = navigator.language;
  const country = locale.split("-")[1]?.toUpperCase();
  
  // Check if country uses Fahrenheit
  if (country && fahrenheitCountries.includes(country)) {
    return "F";
  }
  
  return "C";
};

export function WeatherDialog({ children }: WeatherDialogProps) {
  const { weather, loading, error, tempUnit } = useWeather();
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);

  useEffect(() => {
    if (weather?.forecast) {
      const forecast: WeatherDay[] = weather.forecast.map((item: any, index: number) => {
        const temperature = tempUnit === "F" ? (item.tempF || item.temp) : item.temp;
        
        return {
          day: index === 0 ? "Today" : item.day,
          temp: `${Math.round(temperature)}°${tempUnit}`,
          icon: <WeatherIcon condition={item.condition} />,
          precipitation: item.precipitation ? `${item.precipitation}%` : "0%",
        };
      });
      setWeatherData(forecast);
    }
  }, [weather, tempUnit]);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-[600px] p-0 bg-gradient-to-br from-purple-500 to-purple-900 border-0 text-white"
        align="start"
        sideOffset={8}
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <p className="text-sm opacity-90 mb-3">{error}</p>
          </div>
        ) : (
          <div>
            {weather?.location && (
              <div className="px-6 py-4 border-b border-purple-400/30">
                <p className="text-sm font-medium opacity-90 text-center">
                  {weather.location}
                </p>
              </div>
            )}
            <div className="flex divide-x divide-purple-400/30">
              {weatherData.map((day, index) => (
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
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
