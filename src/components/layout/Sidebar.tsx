"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Grid,
  Box,
  Package,
  Sparkles,
  Smile,
  MoreHorizontal,
  Map,
  BarChart,
  Table,
  ChevronRight,
  X,
  ChevronDown,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useCompany } from "@/contexts/CompanyContext";

interface SubNavItem {
  name: string;
  href: string;
  badge?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  expandable?: boolean;
  subItems?: SubNavItem[];
}

interface NavSection {
  section?: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    section: "Main",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        badge: "4",
      },
    ],
  },
  {
    section: "Component",
    items: [
      { name: "Project", href: "/project" },
      { name: "Ecommerce", href: "/ecommerce" },
      {
        name: "Apps",
        icon: Grid,
        href: "/apps",
        expandable: true,
        subItems: [
          { name: "Calendar", href: "/apps/calendar" },
          { name: "Chat", href: "/apps/chat" },
          { name: "Email", href: "/apps/email" },
          { name: "File Manager", href: "/apps/files" },
        ],
      },
      {
        name: "Widgets",
        icon: Box,
        href: "/widgets",
        expandable: true,
        subItems: [
          { name: "Statistics", href: "/widgets/stats" },
          { name: "Data", href: "/widgets/data" },
          { name: "Chart", href: "/widgets/chart" },
        ],
      },
      {
        name: "UI Kits",
        icon: Package,
        href: "/ui-kits",
        expandable: true,
        subItems: [
          { name: "Buttons", href: "/ui-kits/buttons" },
          { name: "Forms", href: "/ui-kits/forms" },
          { name: "Cards", href: "/ui-kits/cards" },
          { name: "Modals", href: "/ui-kits/modals" },
        ],
      },
      {
        name: "Advanced UI",
        icon: Sparkles,
        href: "/advanced-ui",
        badge: "12+",
      },
    ],
  },
  {
    section: "Map & Charts",
    items: [
      { name: "Map", icon: Map, href: "/map" },
      { name: "Chart", icon: BarChart, href: "/chart" },
      { name: "Table & forms", icon: Table, href: "/tables", badge: "4.2" },
      { name: "Spreadsheet", icon: Table, href: "/spreadsheet" },
    ],
  },
  {
    section: "System",
    items: [
      { name: "Settings", icon: Settings, href: "/settings" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isOpen, onClose, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const { company } = useCompany();

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const showExpanded = isOpen || (isHovered && !isMobile);

  return (
    <aside
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 font-[family-name:var(--font-montserrat)]",
        showExpanded ? "w-64" : "w-0 md:w-16",
        isMobile && !isOpen && "hidden",
        !isOpen && isHovered && "shadow-xl z-50"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        {showExpanded && (
          <>
            <Link href="/" className="flex items-center gap-2">
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center p-1">
                  <span className="text-white font-bold text-sm">
                    {company.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {company.name}
              </span>
            </Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </>
        )}
        {!showExpanded && !isMobile && (
          <div className="w-full flex justify-center">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {company.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navigation.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-1">
              {section.section && showExpanded && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.section}
                </h3>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isExpanded = expandedItems.includes(item.name);

                return (
                  <div key={item.name}>
                    {/* Main Item */}
                    {item.expandable && item.subItems ? (
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                          !showExpanded && "justify-center"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        {showExpanded && (
                          <>
                            <span className="flex-1 text-left">{item.name}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1.5 py-0.5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 transition-transform text-gray-400",
                                isExpanded && "rotate-90"
                              )}
                            />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                          !showExpanded && "justify-center"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        {showExpanded && (
                          <>
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1.5 py-0.5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    )}

                    {/* Sub Items */}
                    {item.subItems && isExpanded && showExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                isSubActive
                                  ? "text-blue-600 dark:text-blue-400 font-medium"
                                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                              )}
                            >
                              <span className="flex-1">{subItem.name}</span>
                              {subItem.badge && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer - Collapse Button */}
      {isOpen && !isMobile && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
            <span>© 2025 iWorx.Pro</span>
          </div>
        </div>
      )}
    </aside>
  );
}
