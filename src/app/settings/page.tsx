import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          General Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your company and user information
        </p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Update your company details and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter company name"
              defaultValue="AdminDash Inc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-email">Company Email</Label>
            <Input
              id="company-email"
              type="email"
              placeholder="contact@company.com"
              defaultValue="admin@admindash.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-phone">Phone Number</Label>
            <Input
              id="company-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              defaultValue="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-address">Address</Label>
            <Textarea
              id="company-address"
              placeholder="Enter company address"
              defaultValue="123 Business Street, Suite 100, San Francisco, CA 94105"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-website">Website</Label>
            <Input
              id="company-website"
              type="url"
              placeholder="https://company.com"
              defaultValue="https://admindash.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="Enter first name"
                defaultValue="John"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter last name"
                defaultValue="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">Email Address</Label>
            <Input
              id="user-email"
              type="email"
              placeholder="your@email.com"
              defaultValue="john.doe@admindash.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-role">Role</Label>
            <Input
              id="user-role"
              placeholder="Your role"
              defaultValue="System Administrator"
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>
            Additional business information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tax-id">Tax ID / EIN</Label>
            <Input
              id="tax-id"
              placeholder="XX-XXXXXXX"
              defaultValue="12-3456789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="Enter industry"
              defaultValue="Software & Technology"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-size">Company Size</Label>
            <Input
              id="company-size"
              placeholder="Number of employees"
              defaultValue="50-100 employees"
            />
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
