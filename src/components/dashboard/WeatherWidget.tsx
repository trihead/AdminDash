"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  MapPin, 
  Loader2, 
  MoreVertical, 
  ChevronDown, 
  ChevronRight,
  Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWeather } from "@/contexts/WeatherContext";

const getWeatherBackgroundImage = (condition: string): string => {
  const cond = condition.toLowerCase();
  const baseUrl = "https://assets.msn.com/weathermapdata/1/static/background/v2.0/jpg";
  
  if (cond.includes("clear") || cond.includes("sunny")) {
    return `${baseUrl}/sunny.jpg`;
  } else if (cond.includes("cloud") && !cond.includes("rain")) {
    return `${baseUrl}/cloudy.jpg`;
  } else if (cond.includes("rain") || cond.includes("drizzle")) {
    return `${baseUrl}/rainy.jpg`;
  } else if (cond.includes("snow")) {
    return `${baseUrl}/snowy.jpg`;
  } else if (cond.includes("thunder") || cond.includes("storm")) {
    return `${baseUrl}/thunderstorms.jpg`;
  } else if (cond.includes("fog") || cond.includes("mist")) {
    return `${baseUrl}/foggy.jpg`;
  }
  
  // Default to partly cloudy
  return `${baseUrl}/partlycloudy.jpg`;
};

const getWeatherBackground = (condition: string) => {
  const cond = condition.toLowerCase();
  
  if (cond.includes("clear") || cond.includes("sunny")) {
    return "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600";
  } else if (cond.includes("cloud")) {
    return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600";
  } else if (cond.includes("rain") || cond.includes("drizzle")) {
    return "bg-gradient-to-br from-blue-700 via-blue-800 to-purple-900";
  } else if (cond.includes("snow")) {
    return "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400";
  } else if (cond.includes("thunder") || cond.includes("storm")) {
    return "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900";
  }
  
  return "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800";
};

const WeatherIcon = ({ condition, className = "w-8 h-8" }: { condition: string; className?: string }) => {
  const cond = condition.toLowerCase();
  
  if (cond.includes("clear") || cond.includes("sunny")) {
    return <Sun className={`${className} text-yellow-300`} />;
  } else if (cond.includes("cloud")) {
    return <Cloud className={`${className} text-white/90`} />;
  } else if (cond.includes("rain") || cond.includes("drizzle")) {
    return <CloudRain className={`${className} text-blue-200`} />;
  }
  
  return <Sun className={`${className} text-yellow-300`} />;
};

export function WeatherWidget() {
  const { weather, loading, error, tempUnit } = useWeather();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0">
        <CardContent className="p-6 flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0">
        <CardContent className="p-6">
          <p className="text-sm text-white/80 text-center">Unable to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  const currentDay = weather.forecast[0];
  const upcomingDays = weather.forecast.slice(0, 5);
  const backgroundImage = getWeatherBackgroundImage(currentDay.condition);
  const bgClass = getWeatherBackground(currentDay.condition);

  return (
    <Card className="text-white border-0 overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 ${bgClass} opacity-60`} />
      
      {/* Content */}
      <CardContent className="p-6 relative z-10">
        {/* Header with Location */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-white/90" />
            <h3 className="text-lg font-semibold">{weather.location}</h3>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Forecast</DropdownMenuItem>
              <DropdownMenuItem>Change Location</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Current Weather - Large Display */}
        <div className="flex items-center gap-4 mb-3">
          <WeatherIcon condition={currentDay.condition} className="w-16 h-16" />
          <div className="flex-1">
            <div className="text-5xl font-light">
              {tempUnit === "F" 
                ? Math.round(currentDay.tempMaxF || currentDay.tempF || currentDay.temp) 
                : Math.round(currentDay.tempMax || currentDay.temp)}°
              <span className="text-2xl ml-1 opacity-80">{tempUnit}</span>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        {currentDay.tempMax && currentDay.tempMax > 30 && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Thermometer className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/90">
              Tomorrow&apos;s high may break the record for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <ChevronRight className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-4">
          <Button 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
          >
            Hourly
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-white/10 text-white/80 border-0"
          >
            Daily
          </Button>
        </div>

        {/* 5-Day Forecast */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {upcomingDays.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <span className="text-sm font-medium">{index === 0 ? "Today" : day.day}</span>
              <WeatherIcon condition={day.condition} className="w-10 h-10" />
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {tempUnit === "F" 
                    ? Math.round(day.tempMaxF || day.tempF || day.temp) 
                    : Math.round(day.tempMax || day.temp)}°
                </div>
                <div className="text-sm text-white/70">
                  {tempUnit === "F" 
                    ? Math.round(day.tempMinF || Math.floor((day.tempMin || day.temp * 0.8) * 9/5 + 32))
                    : Math.round(day.tempMin || Math.floor(day.temp * 0.8))}°
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-2 border-t border-white/10">
          <button className="text-sm text-white/80 hover:text-white transition-colors">
            See full forecast
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
