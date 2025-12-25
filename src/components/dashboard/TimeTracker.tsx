"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, StopCircle } from "lucide-react";
import { useState } from "react";

interface TimeSession {
  id: number;
  project: string;
  task: string;
  duration: string;
  status: "active" | "paused" | "stopped";
}

const initialSessions: TimeSession[] = [
  {
    id: 1,
    project: "Mobile App",
    task: "UI Design Review",
    duration: "2h 34m",
    status: "active",
  },
  {
    id: 2,
    project: "Web Development",
    task: "API Integration",
    duration: "1h 45m",
    status: "paused",
  },
  {
    id: 3,
    project: "Core Team",
    task: "Team Meeting",
    duration: "45m",
    status: "stopped",
  },
];

export function TimeTracker() {
  const [sessions, setSessions] = useState<TimeSession[]>(initialSessions);

  const handleStatusChange = (id: number, newStatus: TimeSession["status"]) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, status: newStatus } : session
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Time Tracker</CardTitle>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            + New Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{session.project}</h4>
                  <Badge
                    variant="secondary"
                    className={
                      session.status === "active"
                        ? "bg-green-100 text-green-700"
                        : session.status === "paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                    }
                  >
                    {session.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{session.task}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-mono font-semibold">
                  {session.duration}
                </span>
                <div className="flex items-center gap-1">
                  {session.status !== "active" ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleStatusChange(session.id, "active")}
                    >
                      <Play className="h-4 w-4 text-green-600" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleStatusChange(session.id, "paused")}
                    >
                      <Pause className="h-4 w-4 text-yellow-600" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleStatusChange(session.id, "stopped")}
                  >
                    <StopCircle className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
