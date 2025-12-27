"use client";

import { useEffect, useState } from "react";
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

interface WeatherDay {
  date: string;
  day: string;
  temp: number;
  tempMin?: number;
  tempMax?: number;
  condition: string;
  precipitation: number;
}

interface WeatherData {
  location: string;
  forecast: WeatherDay[];
  currentTemp?: number;
}

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
  
  // Default blue gradient
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
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRealWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const response = await fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error("Weather API request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  };

  const generateMockWeather = (lat: number, lon: number): WeatherData => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const conditions: Array<"sunny" | "cloudy" | "rainy" | "partly-cloudy"> = [
      "rainy", "partly-cloudy", "sunny", "sunny", "sunny", "sunny", "sunny"
    ];
    
    // Determine location name based on coordinates (simplified)
    let location = "Your Location";
    if (Math.abs(lat - 37.7749) < 1 && Math.abs(lon - -122.4194) < 1) {
      location = "San Francisco, CA";
    }

    const today = new Date();

    return {
      location,
      forecast: days.map((day, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        
        return {
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          day,
          temp: Math.round(18 + Math.random() * 10),
          condition: conditions[index] || "sunny",
          precipitation: Math.round(Math.random() * 30)
        };
      })
    };
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Try to fetch real weather data
              try {
                const weatherData = await fetchRealWeatherData(latitude, longitude);
                setWeather(weatherData);
                setLoading(false);
              } catch (apiError) {
                // Fallback to mock data if API fails
                console.log("Using mock weather data");
                const mockWeather = generateMockWeather(latitude, longitude);
                setWeather(mockWeather);
                setLoading(false);
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              // Fallback to default location
              const defaultWeather = generateMockWeather(37.7749, -122.4194); // San Francisco
              setWeather(defaultWeather);
              setLoading(false);
            }
          );
        } else {
          // Geolocation not available, use default
          const defaultWeather = generateMockWeather(37.7749, -122.4194);
          setWeather(defaultWeather);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

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
  const bgClass = getWeatherBackground(currentDay.condition);

  return (
    <Card className={`${bgClass} text-white border-0 overflow-hidden`}>
      <CardContent className="p-6">
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
              {weather.currentTemp || currentDay.temp}°
              <span className="text-2xl ml-1 opacity-80">F</span>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        {currentDay.tempMax && currentDay.tempMax > 80 && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Thermometer className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/90">
              Tomorrow's high may break the record for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                <div className="text-lg font-semibold">{day.tempMax || day.temp}°</div>
                <div className="text-sm text-white/70">{day.tempMin || Math.floor(day.temp * 0.8)}°</div>
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
