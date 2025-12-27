"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plug, CheckCircle, AlertCircle, Cloud } from "lucide-react";

const integrations = [
  {
    id: "weather",
    name: "Weather API",
    description: "Display weather forecasts on your dashboard",
    logo: "🌤️",
    status: "disconnected",
    lastSync: null,
    hasConfig: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Connect your Slack workspace for notifications",
    logo: "🔔",
    status: "connected",
    lastSync: "2 hours ago",
    hasConfig: false,
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "Integrate with Gmail, Drive, and Calendar",
    logo: "📧",
    status: "connected",
    lastSync: "1 hour ago",
    hasConfig: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect repositories for project tracking",
    logo: "🐙",
    status: "disconnected",
    lastSync: null,
    hasConfig: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and invoicing",
    logo: "💳",
    status: "connected",
    lastSync: "30 minutes ago",
    hasConfig: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows with thousands of apps",
    logo: "⚡",
    status: "disconnected",
    lastSync: null,
    hasConfig: false,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM integration for customer management",
    logo: "☁️",
    status: "disconnected",
    lastSync: null,
    hasConfig: false,
  },
];

export default function IntegrationsPage() {
  const [weatherDialogOpen, setWeatherDialogOpen] = useState(false);
  const [weatherProvider, setWeatherProvider] = useState("openweathermap");
  const [apiKey, setApiKey] = useState("");
  const [weatherConnected, setWeatherConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check weather API connection status on mount
  useEffect(() => {
    checkWeatherConnection();
  }, []);

  const checkWeatherConnection = async () => {
    try {
      const response = await fetch("/api/weather/config");
      const data = await response.json();
      setWeatherConnected(data.configured && data.hasApiKey);
      if (data.configured) {
        setWeatherProvider(data.provider);
      }
    } catch (error) {
      console.error("Error checking weather connection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWeatherConnect = async () => {
    try {
      const response = await fetch("/api/weather/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: weatherProvider,
          apiKey: apiKey,
          features: {
            forecast: true,
            alerts: false,
            autoLocation: true,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Weather API connected successfully!");
        setWeatherDialogOpen(false);
        setApiKey("");
        // Update connection status
        await checkWeatherConnection();
      } else {
        alert("Failed to connect: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to save API key. Please try again.");
      console.error("Error saving weather config:", error);
    }
  };

  const handleWeatherDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect the Weather API?")) {
      return;
    }

    try {
      const response = await fetch("/api/weather/config", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Weather API disconnected successfully!");
        await checkWeatherConnection();
      } else {
        alert("Failed to disconnect. Please try again.");
      }
    } catch (error) {
      alert("Failed to disconnect. Please try again.");
      console.error("Error disconnecting weather:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Integrations
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connect third-party services to enhance your workflow
        </p>
      </div>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>
            Configure global integration preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Sync</Label>
              <p className="text-xs text-gray-500">
                Automatically sync data with connected services
              </p>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sync-notifications">Sync Notifications</Label>
              <p className="text-xs text-gray-500">
                Receive notifications when sync completes
              </p>
            </div>
            <Switch id="sync-notifications" />
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
          <CardDescription>
            Manage your connected services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => {
              // Override weather status with actual connection state
              const isConnected = integration.id === "weather" 
                ? weatherConnected 
                : integration.status === "connected";

              return (
                <div
                  key={integration.id}
                  className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{integration.logo}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {integration.name}
                        </h3>
                        {isConnected ? (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Not Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {integration.description}
                      </p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-400">
                          Last synced: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {integration.id === "weather" ? (
                      isConnected ? (
                        <>
                          <Button variant="outline" size="sm" onClick={handleWeatherDisconnect}>
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Dialog open={weatherDialogOpen} onOpenChange={setWeatherDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plug className="w-4 h-4 mr-1" />
                              Connect
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Configure Weather API</DialogTitle>
                          <DialogDescription>
                            Set up your weather API provider and credentials
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="weather-provider">Weather Provider</Label>
                            <Select value={weatherProvider} onValueChange={setWeatherProvider}>
                              <SelectTrigger id="weather-provider">
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="openweathermap">
                                  <div className="flex items-center gap-2">
                                    <Cloud className="w-4 h-4" />
                                    OpenWeatherMap
                                  </div>
                                </SelectItem>
                                <SelectItem value="weatherapi">WeatherAPI.com</SelectItem>
                                <SelectItem value="visualcrossing">Visual Crossing</SelectItem>
                                <SelectItem value="weatherstack">Weatherstack</SelectItem>
                                <SelectItem value="tomorrow">Tomorrow.io</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                              Choose your preferred weather data provider
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="api-key">API Key</Label>
                            <Input
                              id="api-key"
                              type="password"
                              placeholder="Enter your API key"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                            />
                            <p className="text-xs text-gray-500">
                              Get your API key from the provider's website
                            </p>
                          </div>

                          {weatherProvider === "openweathermap" && (
                            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
                              <p className="text-sm text-blue-900 dark:text-blue-200">
                                <strong>OpenWeatherMap:</strong> Free tier includes 1,000 API calls/day.
                                <a
                                  href="https://openweathermap.org/api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline ml-1"
                                >
                                  Get API Key
                                </a>
                              </p>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Features</Label>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Switch id="enable-forecast" defaultChecked />
                                <Label htmlFor="enable-forecast" className="font-normal">
                                  7-day forecast
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch id="enable-alerts" />
                                <Label htmlFor="enable-alerts" className="font-normal">
                                  Weather alerts
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch id="auto-location" defaultChecked />
                                <Label htmlFor="auto-location" className="font-normal">
                                  Auto-detect location
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setWeatherDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleWeatherConnect} disabled={!apiKey}>
                            Connect Weather API (Restart server after)
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                ) : isConnected ? (
                  <>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm">
                    <Plug className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          );
        })}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys for custom integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create and manage API keys for custom integrations
            </p>
            <Button variant="outline">
              Manage API Keys
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
