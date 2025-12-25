"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectStatus {
  id: number;
  name: string;
  leader: { name: string; avatar?: string };
  status: "On Track" | "At Risk" | "Delayed" | "Completed";
  progress: number;
  deadline: string;
  budget: string;
}

const projects: ProjectStatus[] = [
  {
    id: 1,
    name: "Mobile App Redesign",
    leader: { name: "Sarah Chen" },
    status: "On Track",
    progress: 75,
    deadline: "Jan 15, 2026",
    budget: "$45,000",
  },
  {
    id: 2,
    name: "API Integration",
    leader: { name: "Mike Johnson" },
    status: "At Risk",
    progress: 45,
    deadline: "Jan 10, 2026",
    budget: "$32,000",
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    leader: { name: "Emma Wilson" },
    status: "On Track",
    progress: 90,
    deadline: "Dec 28, 2025",
    budget: "$28,000",
  },
  {
    id: 4,
    name: "User Authentication",
    leader: { name: "James Smith" },
    status: "Completed",
    progress: 100,
    deadline: "Dec 20, 2025",
    budget: "$15,000",
  },
  {
    id: 5,
    name: "Payment Gateway",
    leader: { name: "Lisa Anderson" },
    status: "Delayed",
    progress: 30,
    deadline: "Jan 5, 2026",
    budget: "$55,000",
  },
];

export function ProjectStatusTable() {
  const statusColors = {
    "On Track": "bg-green-100 text-green-700",
    "At Risk": "bg-yellow-100 text-yellow-700",
    Delayed: "bg-red-100 text-red-700",
    Completed: "bg-blue-100 text-blue-700",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.leader.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {project.leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{project.leader.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[project.status]}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{project.deadline}</TableCell>
                  <TableCell className="text-right font-medium">
                    {project.budget}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">12</span> projects
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
