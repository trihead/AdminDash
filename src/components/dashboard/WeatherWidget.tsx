"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, MapPin, Loader2, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy" | "snow" | "windy";
  precipitation: number;
}

interface WeatherData {
  location: string;
  forecast: WeatherDay[];
  currentTemp?: number;
}

const WeatherIcon = ({ condition, className = "w-8 h-8" }: { condition: string; className?: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${className} text-yellow-400`} />;
    case "cloudy":
      return <Cloud className={`${className} text-gray-400`} />;
    case "rainy":
      return <CloudRain className={`${className} text-blue-400`} />;
    default:
      return <Sun className={`${className} text-yellow-400`} />;
  }
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
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">Unable to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  const currentDay = weather.forecast[0];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg dark:text-white">{weather.location}</h3>
              <Badge className="bg-blue-100 text-blue-700" variant="secondary">
                {currentDay.condition}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Current weather conditions
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
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

        {/* Temperature Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-300">Temperature</span>
            <span className="font-medium dark:text-white">{currentDay.temp}°</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
              style={{ width: `${Math.min((currentDay.temp / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Forecast Days and Precipitation */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {weather.forecast.slice(0, 4).map((day, index) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-white dark:border-gray-800">
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {day.day.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {weather.forecast.length > 4 && (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium dark:text-white">
                +{weather.forecast.length - 4}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <CloudRain className="w-4 h-4 inline mr-1" />
            {currentDay.precipitation}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
