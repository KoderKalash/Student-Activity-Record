"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Shield, Settings, LogOut, ChevronDown } from "lucide-react"

const dashboardRoutes = [
  {
    title: "Student Dashboard",
    href: "/",
    icon: User,
    description: "Manage activities and view progress",
    role: "student",
  },
  {
    title: "Faculty Dashboard",
    href: "/faculty",
    icon: GraduationCap,
    description: "Review and approve submissions",
    role: "faculty",
  },
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: Shield,
    description: "Institution-wide management",
    role: "admin",
  },
]

interface DashboardNavigationProps {
  currentRole?: "student" | "faculty" | "admin"
}

export function DashboardNavigation({ currentRole = "student" }: DashboardNavigationProps) {
  const pathname = usePathname()
  const [selectedRole, setSelectedRole] = useState(currentRole)

  const getCurrentDashboard = () => {
    return dashboardRoutes.find((route) => route.href === pathname) || dashboardRoutes[0]
  }

  const currentDashboard = getCurrentDashboard()

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "faculty":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvatarImage = (role: string) => {
    switch (role) {
      case "student":
        return "/diverse-students-studying.png"
      case "faculty":
        return "/faculty-avatar.png"
      case "admin":
        return "/admin-avatar.png"
      default:
        return "/diverse-students-studying.png"
    }
  }

  const getAvatarFallback = (role: string) => {
    switch (role) {
      case "student":
        return "ST"
      case "faculty":
        return "FC"
      case "admin":
        return "AD"
      default:
        return "U"
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Dashboard Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
            <currentDashboard.icon className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">{currentDashboard.title}</span>
              <span className="text-xs text-muted-foreground">{currentDashboard.description}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Switch Dashboard</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dashboardRoutes.map((route) => (
            <DropdownMenuItem key={route.href} asChild>
              <Link href={route.href} className="flex items-center gap-3 p-3">
                <route.icon className="h-5 w-5" />
                <div className="flex flex-col">
                  <span className="font-medium">{route.title}</span>
                  <span className="text-xs text-muted-foreground">{route.description}</span>
                </div>
                <Badge className={`ml-auto ${getRoleColor(route.role)}`}>{route.role}</Badge>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Badge */}
      <Badge className={getRoleColor(selectedRole)}>{selectedRole.toUpperCase()}</Badge>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={getAvatarImage(selectedRole) || "/placeholder.svg"} />
              <AvatarFallback>{getAvatarFallback(selectedRole)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {selectedRole === "student"
                  ? "John Smith"
                  : selectedRole === "faculty"
                    ? "Dr. Sarah Wilson"
                    : "Admin User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {selectedRole === "student"
                  ? "john.smith@university.edu"
                  : selectedRole === "faculty"
                    ? "s.wilson@university.edu"
                    : "admin@university.edu"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
