"use client";

import {
  Bell,
  Menu,
  Search,
  Maximize,
  ShoppingCart,
  Moon,
  Sun,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { SearchDialog } from "@/components/shared/SearchDialog";
import { WeatherDialog } from "@/components/shared/WeatherDialog";
import { useWeather } from "@/contexts/WeatherContext";
import ReactCountryFlag from "react-country-flag";
import { PanelLeft, PanelLeftClose } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export function Header({ onMenuClick, sidebarOpen, onSidebarToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { weather, tempUnit } = useWeather();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentTemp = weather?.forecast?.[0] 
    ? (tempUnit === "F" ? (weather.forecast[0].tempMaxF || weather.forecast[0].tempF || weather.forecast[0].temp) : weather.forecast[0].temp)
    : null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="hidden md:flex h-9 w-9 text-gray-700 dark:text-gray-200"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeft className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden h-9 w-9 text-gray-700 dark:text-gray-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Temperature */}
          <WeatherDialog>
            <button className="flex items-center gap-2 text-sm px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg py-2 transition-colors">
              <Thermometer className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {currentTemp !== null ? Math.round(currentTemp) : "--"}
              </span>
              <span className="text-gray-500 dark:text-gray-400">°{tempUnit}</span>
            </button>
          </WeatherDialog>
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                <div className="h-7 w-7 rounded-full overflow-hidden flex items-center justify-center">
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: "28px",
                      height: "28px",
                    }}
                  />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-3">
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-3">
                  <ReactCountryFlag
                    countryCode="ES"
                    svg
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <span>Español</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-3">
                  <ReactCountryFlag
                    countryCode="FR"
                    svg
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <span>Français</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-3">
                  <ReactCountryFlag
                    countryCode="DE"
                    svg
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <span>Deutsch</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <SearchDialog>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-700 dark:text-gray-200">
              <Search className="h-5 w-5" />
            </Button>
          </SearchDialog>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-700 dark:text-gray-200"
            onClick={toggleFullscreen}
          >
            <Maximize className="h-5 w-5" />
          </Button>

          {/* Shopping Cart */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative text-gray-700 dark:text-gray-200">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-purple-600 hover:bg-purple-700 border-0">
              4
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-700 dark:text-gray-200"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative text-gray-700 dark:text-gray-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-2 h-2 w-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium dark:text-white">New project assigned</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium dark:text-white">Meeting reminder</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium dark:text-white">Task completed</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Andrew Stevens</span>
                  <span className="text-xs text-gray-500 font-normal">
                    admin@iworx.pro
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
