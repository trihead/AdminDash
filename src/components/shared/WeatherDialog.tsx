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

interface WeatherDialogProps {
  children: React.ReactNode;
  onWeatherUpdate?: (temp: number, unit: string) => void;
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

export function WeatherDialog({ children, onWeatherUpdate }: WeatherDialogProps) {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Detect temperature unit based on user's locale
    const unit = getTemperatureUnit();
    setTempUnit(unit);
    fetchWeatherData(unit);
  }, []);

  const fetchWeatherData = async (unit: "C" | "F") => {
    try {
      setLoading(true);
      setError(null);

      // Get user's geolocation
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported");
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch weather data from API
            const response = await fetch(
              `/api/weather/forecast?lat=${latitude}&lon=${longitude}&units=${unit === "F" ? "imperial" : "metric"}`
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Failed to fetch weather data");
            }

            const data = await response.json();

            if (data.error) {
              throw new Error(data.error);
            }

            // Transform API data to WeatherDay format
            const forecast: WeatherDay[] = data.forecast.map((item: any, index: number) => {
              const temperature = unit === "F" ? item.tempF : item.temp;
              
              return {
                day: index === 0 ? "Today" : item.day,
                temp: `${temperature}°${unit}`,
                icon: <WeatherIcon condition={item.condition} />,
                precipitation: item.precipitation ? `${item.precipitation}%` : "0%",
              };
            });

            setWeatherData(forecast);
            setLocation(data.location || "");

            // Update header temperature
            if (onWeatherUpdate && forecast.length > 0) {
              const currentTemp = unit === "F" ? data.forecast[0].tempF : data.forecast[0].temp;
              onWeatherUpdate(currentTemp, unit);
            }

            setLoading(false);
          } catch (err) {
            console.error("Weather API error:", err);
            setError(err instanceof Error ? err.message : "Unable to fetch weather data");
            setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Please enable location access in your browser.");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Unable to load weather");
      setLoading(false);
    }
  };

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
            <button
              onClick={() => fetchWeatherData(tempUnit)}
              className="text-xs underline opacity-75 hover:opacity-100"
            >
              Try again
            </button>
          </div>
        ) : (
          <div>
            {location && (
              <div className="px-6 py-4 border-b border-purple-400/30">
                <p className="text-sm font-medium opacity-90 text-center">
                  {location}
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
