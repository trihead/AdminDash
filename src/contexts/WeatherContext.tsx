"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WeatherDay {
  date: string;
  day: string;
  temp: number;       // Celsius
  tempF?: number;     // Fahrenheit
  tempMin?: number;   // Celsius
  tempMinF?: number;  // Fahrenheit
  tempMax?: number;   // Celsius
  tempMaxF?: number;  // Fahrenheit
  condition: string;
  precipitation: number;
}

interface WeatherData {
  location: string;
  forecast: WeatherDay[];
  currentTemp?: number;
  currentTempF?: number;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  tempUnit: "C" | "F";
  refreshWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Detect if user's locale uses Celsius or Fahrenheit
const getTemperatureUnit = (): "C" | "F" => {
  const fahrenheitCountries = ["US", "BS", "KY", "LR", "PW", "FM", "MH"];
  
  if (typeof navigator !== "undefined") {
    const locale = navigator.language;
    const country = locale.split("-")[1]?.toUpperCase();
    
    if (country && fahrenheitCountries.includes(country)) {
      return "F";
    }
  }
  
  return "C";
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported");
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(`/api/weather/forecast?lat=${latitude}&lon=${longitude}`);

            if (!response.ok) {
              throw new Error("Failed to fetch weather data");
            }

            const data = await response.json();
            setWeather(data);
            setLoading(false);
          } catch (err) {
            console.error("Weather API error:", err);
            setError(err instanceof Error ? err.message : "Unable to fetch weather data");
            setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Weather error:", err);
      setError(err instanceof Error ? err.message : "Unable to fetch weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    const unit = getTemperatureUnit();
    setTempUnit(unit);
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        loading,
        error,
        tempUnit,
        refreshWeather: fetchWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
