"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GitHubStyleHeatmap } from "@/components/github-style-heatmap"
import { FileUpload } from "@/components/file-upload"
import { useRouter } from "next/navigation"
import {
  Search,
  Bell,
  Plus,
  Upload,
  FileText,
  Link2,
  Eye,
  Edit,
  X,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Home,
} from "lucide-react"

const mockActivities = [
  {
    id: 1,
    category: "NSS/NCC",
    title: "Blood Donation Camp",
    hours: 8,
    status: "Approved",
    verifier: "Dr. Smith",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    category: "Hackathons",
    title: "TechFest 2024",
    hours: 24,
    status: "Pending",
    verifier: "Prof. Johnson",
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    category: "Volunteering",
    title: "Community Teaching",
    hours: 16,
    status: "Draft",
    verifier: "-",
    lastUpdated: "2024-01-08",
  },
  {
    id: 4,
    category: "Internships",
    title: "Software Development Intern",
    hours: 160,
    status: "Rejected",
    verifier: "Dr. Wilson",
    lastUpdated: "2024-01-05",
  },
]

const mockNotifications = [
  {
    id: 1,
    type: "approval",
    message: "Blood Donation Camp activity approved",
    timestamp: "2 hours ago",
    status: "approved",
  },
  {
    id: 2,
    type: "submission",
    message: "TechFest 2024 submitted for review",
    timestamp: "1 day ago",
    status: "pending",
  },
  {
    id: 3,
    type: "comment",
    message: "Verifier requested additional evidence for Software Development Intern",
    timestamp: "3 days ago",
    status: "rejected",
  },
]

const mockEvidenceFiles = [
  { name: "certificate.pdf", size: "2.4 MB", activity: "Blood Donation Camp" },
  { name: "participation_photo.jpg", size: "1.8 MB", activity: "TechFest 2024" },
  { name: "completion_letter.pdf", size: "856 KB", activity: "Community Teaching" },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return <CheckCircle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "draft":
      return <Edit className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export function StudentDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const router = useRouter()

  const filteredActivities = mockActivities.filter((activity) => {
    const categoryMatch = selectedCategory === "all" || activity.category === selectedCategory
    const statusMatch = selectedStatus === "all" || activity.status.toLowerCase() === selectedStatus
    return categoryMatch && statusMatch
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Top Bar */}
        <header className="border-b bg-card px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="sm:hidden">
                <Home className="h-5 w-5" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Student Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search activities..." className="w-48 lg:w-64 pl-10" />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>3 new notifications</p>
                </TooltipContent>
              </Tooltip>

              <Button variant="outline" size="sm" onClick={() => router.push("/")} className="hidden sm:flex">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-xs text-muted-foreground">Activities under review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">12</div>
                <p className="text-xs text-muted-foreground">Verified activities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">248</div>
                <p className="text-xs text-muted-foreground">Total credits earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">Jan 10</div>
                <p className="text-xs text-muted-foreground">Last generated</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <Button className="h-auto flex-col gap-2 p-4">
                      <Plus className="h-5 w-5" />
                      <span className="text-sm">Add Activity</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto flex-col gap-2 p-4 bg-transparent"
                      onClick={() => setShowUploadModal(true)}
                    >
                      <Upload className="h-5 w-5" />
                      <span className="text-sm">Upload Evidence</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">Generate Portfolio</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <Link2 className="h-5 w-5" />
                      <span className="text-sm">Connect LMS</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm">View Attendance</span>
                    </Button>
                  </div>

                  <div className="mt-6">
                    <GitHubStyleHeatmap totalClasses={134} totalActiveDays={76} />
                  </div>
                </CardContent>
              </Card>

              {/* My Activities Table */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>My Activities</CardTitle>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="NSS/NCC">NSS/NCC</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Hackathons">Hackathons</SelectItem>
                          <SelectItem value="Volunteering">Volunteering</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Internships">Internships</SelectItem>
                          <SelectItem value="MOOCs">MOOCs</SelectItem>
                          <SelectItem value="Certifications">Certifications</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="flex flex-col min-w-0">
                            <div className="font-medium truncate">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">{activity.category}</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="text-sm font-medium">{activity.hours}h</div>
                          <Badge className={`${getStatusColor(activity.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(activity.status)}
                            {activity.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground hidden lg:block">{activity.verifier}</div>
                          <div className="text-sm text-muted-foreground hidden lg:block">{activity.lastUpdated}</div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {showUploadModal ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Upload Evidence</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowUploadModal(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <FileUpload />
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center mb-4">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
                      <Button
                        variant="outline"
                        className="mt-2 bg-transparent"
                        onClick={() => setShowUploadModal(true)}
                      >
                        Upload Files
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {mockEvidenceFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {file.size} • {file.activity}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Live Status & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Status & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div
                          className={`p-1 rounded-full ${
                            notification.status === "approved"
                              ? "bg-green-100"
                              : notification.status === "pending"
                                ? "bg-yellow-100"
                                : "bg-red-100"
                          }`}
                        >
                          {getStatusIcon(notification.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Viewer */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Viewer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-6 text-center mb-4">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Portfolio Preview</p>
                    <p className="text-xs text-muted-foreground mt-1">Only approved items included</p>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Link2 className="h-4 w-4 mr-2" />
                      Copy Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Academics Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Academics Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Credits Earned</span>
                        <span className="text-sm font-medium">248/300</span>
                      </div>
                      <Progress value={82.7} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Term Progress</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LMS Integration */}
              <Card>
                <CardHeader>
                  <CardTitle>LMS Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      <Link2 className="h-4 w-4 mr-2" />
                      Sync MOOCs/Internships
                    </Button>

                    <div className="text-xs text-muted-foreground">Last sync: 2 hours ago</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
