import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plug, CheckCircle, AlertCircle } from "lucide-react";

const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Connect your Slack workspace for notifications",
    logo: "🔔",
    status: "connected",
    lastSync: "2 hours ago",
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "Integrate with Gmail, Drive, and Calendar",
    logo: "📧",
    status: "connected",
    lastSync: "1 hour ago",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect repositories for project tracking",
    logo: "🐙",
    status: "disconnected",
    lastSync: null,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and invoicing",
    logo: "💳",
    status: "connected",
    lastSync: "30 minutes ago",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows with thousands of apps",
    logo: "⚡",
    status: "disconnected",
    lastSync: null,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM integration for customer management",
    logo: "☁️",
    status: "disconnected",
    lastSync: null,
  },
];

export default function IntegrationsPage() {
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
            {integrations.map((integration) => (
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
                      {integration.status === "connected" ? (
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
                  {integration.status === "connected" ? (
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
            ))}
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
