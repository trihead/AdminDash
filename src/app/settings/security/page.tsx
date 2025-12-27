import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Security Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage security and authentication settings
        </p>
      </div>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>

          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="2fa-enabled">Enable 2FA</Label>
                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Enabled
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Use an authenticator app for additional security
              </p>
            </div>
            <Switch id="2fa-enabled" defaultChecked />
          </div>

          <div className="pt-2">
            <Button variant="outline">View Recovery Codes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Windows - Chrome</p>
                  <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Current
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  San Francisco, CA • Last active: Now
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">iPhone - Safari</p>
                <p className="text-xs text-gray-500">
                  San Francisco, CA • Last active: 2 hours ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>

            <div className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">MacBook - Firefox</p>
                <p className="text-xs text-gray-500">
                  Los Angeles, CA • Last active: 1 day ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>

          <Button variant="destructive" className="w-full">
            Revoke All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            View recent login attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View your account login history
            </p>
            <Button variant="outline">View History</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
          <CardDescription>
            Additional security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-xs text-gray-500">
                Get notified of new login attempts
              </p>
            </div>
            <Switch id="login-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-logout">Auto Logout</Label>
              <p className="text-xs text-gray-500">
                Automatically logout after 30 minutes of inactivity
              </p>
            </div>
            <Switch id="auto-logout" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
