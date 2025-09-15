"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DashboardNavigation } from "@/components/dashboard-navigation"
import {
  Search,
  Bell,
  Download,
  FileText,
  BarChart3,
  Users,
  CheckCircle,
  Settings,
  Database,
  Calendar,
} from "lucide-react"

const mockDepartmentData = [
  {
    department: "Computer Science",
    students: 120,
    participation: 85,
    approvals: 92,
    avgTAT: 2.1,
  },
  {
    department: "Electronics",
    students: 95,
    participation: 78,
    approvals: 88,
    avgTAT: 2.4,
  },
  {
    department: "Mechanical",
    students: 110,
    participation: 72,
    approvals: 85,
    avgTAT: 2.8,
  },
  {
    department: "Civil",
    students: 85,
    participation: 80,
    approvals: 90,
    avgTAT: 2.2,
  },
]

const mockStudents = [
  {
    id: 1,
    name: "John Smith",
    program: "Computer Science",
    activities: 12,
    hours: 248,
    approvals: 10,
    portfolio: "Available",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    program: "Electronics",
    activities: 8,
    hours: 156,
    approvals: 7,
    portfolio: "Available",
  },
  {
    id: 3,
    name: "Mike Wilson",
    program: "Mechanical",
    activities: 15,
    hours: 320,
    approvals: 13,
    portfolio: "Available",
  },
]

const mockAnnouncements = [
  {
    id: 1,
    type: "audit",
    message: "NAAC audit scheduled for March 2024",
    priority: "high",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    type: "export",
    message: "NIRF data export completed successfully",
    priority: "medium",
    timestamp: "1 week ago",
  },
  {
    id: 3,
    type: "system",
    message: "LMS integration maintenance scheduled",
    priority: "low",
    timestamp: "2 weeks ago",
  },
]

export function InstitutionAdminDashboard() {
  const [selectedCampus, setSelectedCampus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedCohort, setSelectedCohort] = useState("2024")

  const filteredDepartments = mockDepartmentData.filter((dept) => {
    return selectedDepartment === "all" || dept.department === selectedDepartment
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Top Bar */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-foreground">Institution Admin</h1>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campus</SelectItem>
                  <SelectItem value="main">Main Campus</SelectItem>
                  <SelectItem value="north">North Campus</SelectItem>
                  <SelectItem value="south">South Campus</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="w-48 pl-10" />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>2 new announcements</p>
                </TooltipContent>
              </Tooltip>

              <DashboardNavigation currentRole="admin" />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <p className="text-xs text-muted-foreground">All submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">89</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">1,058</div>
                <p className="text-xs text-muted-foreground">Verified activities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">18,456</div>
                <p className="text-xs text-muted-foreground">Total credits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg TAT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.4</div>
                <p className="text-xs text-muted-foreground">Days institution</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Participation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">78%</div>
                <p className="text-xs text-muted-foreground">Active students</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Compliance & Exports */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance & Exports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button className="h-auto flex-col gap-2 p-4">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">NAAC AQAR</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">NAAC SSR</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">AICTE</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">NIRF</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Whole-College Report
                    </Button>

                    <div className="flex items-center justify-between text-sm">
                      <span>Last NAAC export:</span>
                      <Badge className="bg-green-100 text-green-800">Jan 15, 2024</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Evidence Room:</span>
                      <Button variant="ghost" size="sm">
                        <Database className="h-4 w-4 mr-1" />
                        Access
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Student Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Search/Select Student" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStudents.map((student) => (
                            <SelectItem key={student.id} value={student.name}>
                              {student.name} - {student.program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button>Generate</Button>
                    </div>

                    {selectedStudent && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Preview: {selectedStudent.name}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Activities: {selectedStudent.activities}</div>
                          <div>Hours: {selectedStudent.hours}</div>
                          <div>Approvals: {selectedStudent.approvals}</div>
                          <div>Portfolio: {selectedStudent.portfolio}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Department/Cohort Snapshot */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Department/Cohort Snapshot</CardTitle>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Normalize per 100
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDepartments.map((dept) => (
                      <div key={dept.department} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dept.department}</span>
                          <span className="text-xs text-muted-foreground">{dept.students} students</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">Participation</span>
                              <span className="text-xs font-medium">{dept.participation}%</span>
                            </div>
                            <Progress value={dept.participation} className="h-2" />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">Approvals</span>
                              <span className="text-xs font-medium">{dept.approvals}%</span>
                            </div>
                            <Progress value={dept.approvals} className="h-2" />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">Avg TAT</span>
                              <span className="text-xs font-medium">{dept.avgTAT}d</span>
                            </div>
                            <Progress value={100 - (dept.avgTAT / 5) * 100} className="h-2" />
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
              {/* Verification Operations */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">89</div>
                        <div className="text-xs text-muted-foreground">Queue Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <div className="text-xs text-muted-foreground">SLA Compliance</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Workload Distribution</span>
                        <span className="text-sm font-medium">Balanced</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Reassign Queues
                      </Button>
                      <Button className="w-full bg-transparent" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Balance Queues
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">LMS/ERP Connection</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Sync</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Taxonomy
                      </Button>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Policy Rules
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground">No integration issues detected</div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications & Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications & Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div
                          className={`p-1 rounded-full ${
                            announcement.priority === "high"
                              ? "bg-red-100"
                              : announcement.priority === "medium"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                          }`}
                        >
                          {announcement.type === "audit" ? (
                            <Calendar className="h-4 w-4 text-red-600" />
                          ) : announcement.type === "export" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Settings className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{announcement.message}</p>
                          <p className="text-xs text-muted-foreground">{announcement.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audit & Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle>Audit & Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">2,847</div>
                        <div className="text-xs text-muted-foreground">Evidence Files</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <div className="text-xs text-muted-foreground">Storage Health</div>
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Open Evidence Room
                    </Button>

                    <div className="text-xs text-muted-foreground">Last backup: Jan 14, 2024</div>
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
