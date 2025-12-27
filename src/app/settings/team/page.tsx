import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MoreVertical } from "lucide-react";

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@admindash.com",
    role: "Owner",
    status: "active",
    avatar: null,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@admindash.com",
    role: "Admin",
    status: "active",
    avatar: null,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@admindash.com",
    role: "Member",
    status: "active",
    avatar: null,
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@admindash.com",
    role: "Member",
    status: "invited",
    avatar: null,
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Team Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage team members and their permissions
          </p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Invite Team Member */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Member</CardTitle>
          <CardDescription>
            Send an invitation to join your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
              />
            </div>
            <div className="w-48 space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select defaultValue="member">
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Send Invitation</Button>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({teamMembers.length})</CardTitle>
          <CardDescription>
            Manage existing team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      {member.status === "invited" && (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      member.role === "Owner"
                        ? "default"
                        : member.role === "Admin"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {member.role}
                  </Badge>
                  {member.role !== "Owner" && (
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>
            Understand different role capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default">Owner</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Full access to all settings and features
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Admin</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Can manage team members and most settings
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Member</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Can view and edit projects
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Viewer</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Read-only access to projects
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
