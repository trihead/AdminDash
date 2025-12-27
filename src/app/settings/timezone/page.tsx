import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TimeZonePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Time Zone Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure time zone and date/time format preferences
        </p>
      </div>

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
            <Select defaultValue="america-los-angeles">
              <SelectTrigger id="timezone">
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
              Current time: 2:30 PM PST (December 25, 2025)
            </p>
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
                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (12/25/2025)</SelectItem>
                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY (25/12/2025)</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2025-12-25)</SelectItem>
                <SelectItem value="dd-mmm-yyyy">DD MMM YYYY (25 Dec 2025)</SelectItem>
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

      {/* Auto Time Zone Detection */}
      <Card>
        <CardHeader>
          <CardTitle>Automatic Detection</CardTitle>
          <CardDescription>
            Automatically detect and adjust time zone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Auto-detect time zone</p>
              <p className="text-xs text-gray-500">
                Automatically update time zone based on your location
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
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
