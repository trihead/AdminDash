"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Settings, User, BarChart3, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchDialogProps {
  children: React.ReactNode;
}

interface SearchItem {
  title: string;
  code: string;
  icon: React.ReactNode;
  bgColor: string;
}

const recentSearches: SearchItem[] = [
  {
    title: "user management",
    code: "#RA789",
    icon: <User className="h-5 w-5" />,
    bgColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "data visualization",
    code: "#RY810",
    icon: <BarChart3 className="h-5 w-5" />,
    bgColor: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "security protocols",
    code: "#ATR56",
    icon: <Shield className="h-5 w-5" />,
    bgColor: "bg-pink-100 text-pink-600",
  },
  {
    title: "authentication methods",
    code: "#YE615",
    icon: <Key className="h-5 w-5" />,
    bgColor: "bg-blue-100 text-blue-600",
  },
];

export function SearchDialog({ children }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[440px] p-6" align="end" sideOffset={8}>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12 text-base border-gray-200 rounded-full"
              autoFocus
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Recently Searched Data:
          </h3>
          <div className="space-y-2">
            {recentSearches.map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                onClick={() => {
                  setSearchQuery(item.title);
                }}
              >
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${item.bgColor}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.code}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
