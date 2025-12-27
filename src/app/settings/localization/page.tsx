"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Timezone mapping helper
const getTimezoneFromIANA = (ianaTimezone: string): string => {
  const mapping: { [key: string]: string } = {
    "America/New_York": "america-new-york",
    "America/Chicago": "america-chicago",
    "America/Denver": "america-denver",
    "America/Los_Angeles": "america-los-angeles",
    "Europe/London": "europe-london",
    "Europe/Paris": "europe-paris",
    "Asia/Tokyo": "asia-tokyo",
    "Asia/Shanghai": "asia-shanghai",
    "Australia/Sydney": "australia-sydney",
  };
  return mapping[ianaTimezone] || "america-los-angeles";
};

export default function LocalizationPage() {
  const [autoDetect, setAutoDetect] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("america-los-angeles");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const dateString = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCurrentTime(`${timeString} (${dateString})`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAutoDetect = (enabled: boolean) => {
    setAutoDetect(enabled);
    if (enabled) {
      // Detect user's timezone using browser API
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const mappedTimezone = getTimezoneFromIANA(userTimezone);
      setSelectedTimezone(mappedTimezone);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Regional & Localization Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure language, time zone, and regional preferences
        </p>
      </div>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>
            Select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Interface Language</Label>
            <Select defaultValue="en-us">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="en-gb">English (UK)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="zh-cn">简体中文</SelectItem>
                <SelectItem value="zh-tw">繁體中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Time Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Time Zone</CardTitle>
          <CardDescription>
            Select your preferred time zone for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Time Zone</Label>
            <Select 
              value={selectedTimezone} 
              onValueChange={setSelectedTimezone}
              disabled={autoDetect}
            >
              <SelectTrigger id="timezone" className={autoDetect ? "opacity-50" : ""}>
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-new-york">(GMT-5:00) Eastern Time - New York</SelectItem>
                <SelectItem value="america-chicago">(GMT-6:00) Central Time - Chicago</SelectItem>
                <SelectItem value="america-denver">(GMT-7:00) Mountain Time - Denver</SelectItem>
                <SelectItem value="america-los-angeles">(GMT-8:00) Pacific Time - Los Angeles</SelectItem>
                <SelectItem value="europe-london">(GMT+0:00) London</SelectItem>
                <SelectItem value="europe-paris">(GMT+1:00) Paris</SelectItem>
                <SelectItem value="asia-tokyo">(GMT+9:00) Tokyo</SelectItem>
                <SelectItem value="asia-shanghai">(GMT+8:00) Shanghai</SelectItem>
                <SelectItem value="australia-sydney">(GMT+11:00) Sydney</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Current time: {currentTime}
            </p>
          </div>

          <div className="flex items-start justify-between pt-2">
            <div className="space-y-1">
              <Label htmlFor="auto-detect">Auto-detect time zone</Label>
              <p className="text-xs text-gray-500">
                Automatically update time zone based on your location
              </p>
            </div>
            <Switch 
              id="auto-detect"
              checked={autoDetect}
              onCheckedChange={handleAutoDetect}
            />
          </div>
        </CardContent>
      </Card>

      {/* Date & Time Format */}
      <Card>
        <CardHeader>
          <CardTitle>Date & Time Format</CardTitle>
          <CardDescription>
            Customize how dates and times are displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select defaultValue="mm-dd-yyyy">
              <SelectTrigger id="date-format">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (12/27/2025)</SelectItem>
                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY (27/12/2025)</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2025-12-27)</SelectItem>
                <SelectItem value="dd-mmm-yyyy">DD MMM YYYY (27 Dec 2025)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-format">Time Format</Label>
            <Select defaultValue="12-hour">
              <SelectTrigger id="time-format">
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12-hour">12-hour (2:30 PM)</SelectItem>
                <SelectItem value="24-hour">24-hour (14:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="first-day">First Day of Week</Label>
            <Select defaultValue="sunday">
              <SelectTrigger id="first-day">
                <SelectValue placeholder="Select first day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Regional Format */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Format</CardTitle>
          <CardDescription>
            Configure number, currency, and measurement formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="us">
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="cn">China</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-format">Number Format</Label>
            <Select defaultValue="1234.56">
              <SelectTrigger id="number-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234.56">1,234.56 (US)</SelectItem>
                <SelectItem value="1234,56">1.234,56 (EU)</SelectItem>
                <SelectItem value="1 234,56">1 234,56 (FR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Currency */}
      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your preferred currency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                <SelectItem value="gbp">GBP - British Pound (£)</SelectItem>
                <SelectItem value="jpy">JPY - Japanese Yen (¥)</SelectItem>
                <SelectItem value="cny">CNY - Chinese Yuan (¥)</SelectItem>
                <SelectItem value="aud">AUD - Australian Dollar (A$)</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar (C$)</SelectItem>
                <SelectItem value="chf">CHF - Swiss Franc (CHF)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-format">Currency Format</Label>
            <Select defaultValue="symbol-left">
              <SelectTrigger id="currency-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symbol-left">$1,234.56</SelectItem>
                <SelectItem value="symbol-right">1,234.56 $</SelectItem>
                <SelectItem value="code-left">USD 1,234.56</SelectItem>
                <SelectItem value="code-right">1,234.56 USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Units */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Units</CardTitle>
          <CardDescription>
            Choose your preferred measurement system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="units">Unit System</Label>
            <Select defaultValue="imperial">
              <SelectTrigger id="units">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imperial">Imperial (miles, pounds, °F)</SelectItem>
                <SelectItem value="metric">Metric (km, kg, °C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
