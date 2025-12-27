import { NextResponse } from "next/server";

interface ForecastItem {
  date: string;
  day: string;
  temp: number;
  tempF: number;
  tempMin?: number;
  tempMinF?: number;
  tempMax?: number;
  tempMaxF?: number;
  condition: string;
  precipitation: number;
}

interface WeatherResponse {
  location: string;
  forecast: ForecastItem[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const units = searchParams.get("units") || "metric"; // metric or imperial

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    // Read from environment variables
    const provider = process.env.WEATHER_PROVIDER;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: "Weather API not configured" },
        { status: 404 }
      );
    }

    // Fetch weather data based on provider
    if (provider === "openweathermap") {
      return await fetchOpenWeatherMap(lat, lon, apiKey, units);
    } else if (provider === "weatherapi") {
      return await fetchWeatherAPI(lat, lon, apiKey, units);
    }

    return NextResponse.json(
      { error: "Unsupported weather provider" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

async function fetchOpenWeatherMap(
  lat: string,
  lon: string,
  apiKey: string,
  units: string
): Promise<NextResponse<WeatherResponse>> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from OpenWeatherMap");
  }

  const data = await response.json();

  // Process forecast - get one entry per day
  const processedForecasts = new Map<string, any>();

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split("T")[0];

    // Keep the midday forecast or first entry for each day
    if (!processedForecasts.has(dateStr) || date.getHours() === 12) {
      processedForecasts.set(dateStr, item);
    }
  });

  const forecast: ForecastItem[] = Array.from(processedForecasts.values())
    .slice(0, 7)
    .map((item: any) => {
      const tempC = Math.round(item.main.temp);
      const tempF = Math.round((tempC * 9) / 5 + 32);
      const tempMinC = Math.round(item.main.temp_min);
      const tempMinF = Math.round((tempMinC * 9) / 5 + 32);
      const tempMaxC = Math.round(item.main.temp_max);
      const tempMaxF = Math.round((tempMaxC * 9) / 5 + 32);
      
      return {
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: tempC,
        tempF: tempF,
        tempMin: tempMinC,
        tempMinF: tempMinF,
        tempMax: tempMaxC,
        tempMaxF: tempMaxF,
        condition: mapCondition(item.weather[0].main),
        precipitation: Math.round((item.pop || 0) * 100),
      };
    });

  return NextResponse.json({
    location: `${data.city.name}, ${data.city.country}`,
    forecast,
  });
}

async function fetchWeatherAPI(
  lat: string,
  lon: string,
  apiKey: string,
  units: string
): Promise<NextResponse<WeatherResponse>> {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from WeatherAPI");
  }

  const data = await response.json();

  const forecast: ForecastItem[] = data.forecast.forecastday.map((day: any) => {
    const date = new Date(day.date);
    const tempC = Math.round(day.day.avgtemp_c);
    const tempF = Math.round(day.day.avgtemp_f);

    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      temp: tempC,
      tempF: tempF,
      condition: mapCondition(day.day.condition.text),
      precipitation: day.day.daily_chance_of_rain || 0,
    };
  });

  return NextResponse.json({
    location: `${data.location.name}, ${data.location.country}`,
    forecast,
  });
}

function mapCondition(weatherText: string): string {
  const text = weatherText.toLowerCase();

  if (text.includes("rain")) return "rain";
  if (text.includes("drizzle")) return "drizzle";
  if (text.includes("snow")) return "snow";
  if (text.includes("thunder") || text.includes("storm")) return "thunderstorm";
  if (text.includes("cloud")) return "clouds";
  if (text.includes("clear") || text.includes("sunny")) return "clear";

  return "clouds";
}
