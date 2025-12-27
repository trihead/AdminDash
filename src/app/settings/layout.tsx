"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Clock,
  Building2,
  Plug,
  Bell,
  Shield,
  Palette,
  Globe,
  Users,
} from "lucide-react";

const settingsNavigation = [
  {
    name: "General",
    href: "/settings",
    icon: Building2,
    description: "Company and user information",
  },
  {
    name: "Time Zone",
    href: "/settings/timezone",
    icon: Clock,
    description: "Configure time zone settings",
  },
  {
    name: "Integrations",
    href: "/settings/integrations",
    icon: Plug,
    description: "Connect third-party services",
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Manage notification preferences",
  },
  {
    name: "Security",
    href: "/settings/security",
    icon: Shield,
    description: "Security and authentication",
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
    description: "Customize look and feel",
  },
  {
    name: "Localization",
    href: "/settings/localization",
    icon: Globe,
    description: "Language and regional settings",
  },
  {
    name: "Team",
    href: "/settings/team",
    icon: Users,
    description: "Manage team members",
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your admin preferences
          </p>
        </div>
        <nav className="px-3 pb-4">
          <div className="space-y-1">
            {settingsNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-start gap-3 px-3 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
