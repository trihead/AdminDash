import { TotalHoursCard } from "@/components/dashboard/TotalHoursCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { TimeTracker } from "@/components/dashboard/TimeTracker";
import { ProjectStatusTable } from "@/components/dashboard/ProjectStatusTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

const projects = [
  {
    title: "Mobile App",
    description: "iOS and Android app development",
    progress: 75,
    team: [
      { name: "Sarah Chen" },
      { name: "Mike Johnson" },
      { name: "Emma Wilson" },
    ],
    status: "active" as const,
    dueDate: "Jan 15, 2026",
  },
  {
    title: "Web Development",
    description: "E-commerce platform redesign",
    progress: 60,
    team: [
      { name: "James Smith" },
      { name: "Lisa Anderson" },
      { name: "Tom Brown" },
      { name: "Kate Davis" },
    ],
    status: "active" as const,
    dueDate: "Feb 1, 2026",
  },
  {
    title: "Project Beta",
    description: "Internal tools and automation",
    progress: 40,
    team: [{ name: "Alex Kim" }, { name: "Nina Patel" }],
    status: "pending" as const,
    dueDate: "Jan 30, 2026",
  },
  {
    title: "Core Team",
    description: "Infrastructure improvements",
    progress: 90,
    team: [
      { name: "David Lee" },
      { name: "Rachel Green" },
      { name: "Chris Martin" },
    ],
    status: "active" as const,
    dueDate: "Dec 31, 2025",
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
      </div>

      {/* Total Hours Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <TotalHoursCard />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.slice(3).map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Time Tracker */}
      <TimeTracker />

      {/* Project Status Table */}
      <ProjectStatusTable />
    </div>
  );
}
