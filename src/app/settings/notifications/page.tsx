import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Notification Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage how you receive notifications
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure email notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-project-updates">Project Updates</Label>
              <p className="text-xs text-gray-500">
                Receive updates about project changes
              </p>
            </div>
            <Switch id="email-project-updates" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-team-mentions">Team Mentions</Label>
              <p className="text-xs text-gray-500">
                Get notified when someone mentions you
              </p>
            </div>
            <Switch id="email-team-mentions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-task-assigned">Task Assignments</Label>
              <p className="text-xs text-gray-500">
                Notifications when tasks are assigned to you
              </p>
            </div>
            <Switch id="email-task-assigned" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-comments">Comments</Label>
              <p className="text-xs text-gray-500">
                Get notified about new comments
              </p>
            </div>
            <Switch id="email-comments" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-security">Security Alerts</Label>
              <p className="text-xs text-gray-500">
                Important security notifications
              </p>
            </div>
            <Switch id="email-security" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Browser and mobile push notification settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-enabled">Enable Push Notifications</Label>
              <p className="text-xs text-gray-500">
                Receive notifications in your browser
              </p>
            </div>
            <Switch id="push-enabled" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-urgent">Urgent Only</Label>
              <p className="text-xs text-gray-500">
                Only send push notifications for urgent items
              </p>
            </div>
            <Switch id="push-urgent" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-sound">Sound</Label>
              <p className="text-xs text-gray-500">
                Play sound with notifications
              </p>
            </div>
            <Switch id="push-sound" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Slack Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Slack Notifications</CardTitle>
          <CardDescription>
            Receive notifications in your Slack workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="slack-enabled">Enable Slack Notifications</Label>
              <p className="text-xs text-gray-500">
                Send notifications to Slack channels
              </p>
            </div>
            <Switch id="slack-enabled" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="slack-direct">Direct Messages</Label>
              <p className="text-xs text-gray-500">
                Receive DMs for important updates
              </p>
            </div>
            <Switch id="slack-direct" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Summary</CardTitle>
          <CardDescription>
            Receive a daily or weekly digest
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-digest">Daily Digest</Label>
              <p className="text-xs text-gray-500">
                Receive a daily summary at 9:00 AM
              </p>
            </div>
            <Switch id="daily-digest" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-report">Weekly Report</Label>
              <p className="text-xs text-gray-500">
                Get a weekly report every Monday
              </p>
            </div>
            <Switch id="weekly-report" />
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
