import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Appearance Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Customize how the dashboard looks and feels
        </p>
      </div>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose your preferred color theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="system">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="font-normal cursor-pointer">
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="font-normal cursor-pointer">
                Dark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="font-normal cursor-pointer">
                System (Auto)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>
            Customize the primary color
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-3">
            {[
              { name: "Blue", color: "bg-blue-500" },
              { name: "Purple", color: "bg-purple-500" },
              { name: "Green", color: "bg-green-500" },
              { name: "Orange", color: "bg-orange-500" },
              { name: "Red", color: "bg-red-500" },
              { name: "Pink", color: "bg-pink-500" },
            ].map((scheme) => (
              <button
                key={scheme.name}
                className={`${scheme.color} h-12 rounded-lg ring-2 ring-offset-2 ring-transparent hover:ring-gray-400 dark:ring-offset-gray-900 transition-all`}
                title={scheme.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>
            Configure sidebar behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sidebar-collapsed">Collapsed by Default</Label>
              <p className="text-xs text-gray-500">
                Start with sidebar collapsed
              </p>
            </div>
            <Switch id="sidebar-collapsed" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sidebar-hover">Expand on Hover</Label>
              <p className="text-xs text-gray-500">
                Automatically expand when hovering
              </p>
            </div>
            <Switch id="sidebar-hover" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>
            Customize layout preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <p className="text-xs text-gray-500">
                Use smaller spacing and font sizes
              </p>
            </div>
            <Switch id="compact-mode" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="fluid-layout">Fluid Layout</Label>
              <p className="text-xs text-gray-500">
                Use full width for content area
              </p>
            </div>
            <Switch id="fluid-layout" />
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Font size and style preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="medium">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="font-small" />
              <Label htmlFor="font-small" className="font-normal cursor-pointer">
                Small
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="font-medium" />
              <Label htmlFor="font-medium" className="font-normal cursor-pointer">
                Medium (Default)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="font-large" />
              <Label htmlFor="font-large" className="font-normal cursor-pointer">
                Large
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Animations */}
      <Card>
        <CardHeader>
          <CardTitle>Animations</CardTitle>
          <CardDescription>
            Control interface animations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Enable Animations</Label>
              <p className="text-xs text-gray-500">
                Show animations and transitions
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduce-motion">Reduce Motion</Label>
              <p className="text-xs text-gray-500">
                Minimize animations for accessibility
              </p>
            </div>
            <Switch id="reduce-motion" />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
