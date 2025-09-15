"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DashboardNavigation } from "@/components/dashboard-navigation"
import {
  Search,
  Bell,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  BarChart3,
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
} from "lucide-react"

const mockSubmissions = [
  {
    id: 1,
    student: "John Smith",
    program: "Computer Science",
    category: "NSS/NCC",
    title: "Blood Donation Camp",
    hours: 8,
    submittedOn: "2024-01-15",
    evidence: "certificate.pdf",
    flags: ["verified"],
    status: "pending",
  },
  {
    id: 2,
    student: "Sarah Johnson",
    program: "Electronics",
    category: "Hackathons",
    title: "TechFest 2024",
    hours: 24,
    submittedOn: "2024-01-14",
    evidence: "participation_cert.pdf",
    flags: ["duplicate"],
    status: "pending",
  },
  {
    id: 3,
    student: "Mike Wilson",
    program: "Mechanical",
    category: "Volunteering",
    title: "Community Teaching",
    hours: 16,
    submittedOn: "2024-01-13",
    evidence: "completion_letter.pdf",
    flags: ["missing_evidence"],
    status: "pending",
  },
  {
    id: 4,
    student: "Emily Davis",
    program: "Computer Science",
    category: "Internships",
    title: "Software Development Intern",
    hours: 160,
    submittedOn: "2024-01-12",
    evidence: "internship_cert.pdf",
    flags: [],
    status: "pending",
  },
]

const mockNotifications = [
  {
    id: 1,
    type: "sla_breach",
    message: "5 submissions pending for more than 3 days",
    priority: "high",
    timestamp: "1 hour ago",
  },
  {
    id: 2,
    type: "new_submission",
    message: "3 new submissions received today",
    priority: "medium",
    timestamp: "2 hours ago",
  },
  {
    id: 3,
    type: "backlog_alert",
    message: "Approval queue has 15+ pending items",
    priority: "medium",
    timestamp: "4 hours ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getFlagColor = (flag: string) => {
  switch (flag) {
    case "duplicate":
      return "bg-red-100 text-red-800"
    case "missing_evidence":
      return "bg-orange-100 text-orange-800"
    case "verified":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function FacultyDashboard() {
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [comment, setComment] = useState("")

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const programMatch = selectedProgram === "all" || submission.program === selectedProgram
    const categoryMatch = selectedCategory === "all" || submission.category === selectedCategory
    return programMatch && categoryMatch
  })

  const handleApprove = (submissionId: number) => {
    console.log(`Approved submission ${submissionId} with comment: ${comment}`)
    setComment("")
  }

  const handleReject = (submissionId: number) => {
    console.log(`Rejected submission ${submissionId} with comment: ${comment}`)
    setComment("")
  }

  const handleRequestRework = (submissionId: number) => {
    console.log(`Requested rework for submission ${submissionId} with comment: ${comment}`)
    setComment("")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Top Bar */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-foreground">Faculty / Verifier</h1>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search submissions..." className="w-64 pl-10" />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>3 urgent notifications</p>
                </TooltipContent>
              </Tooltip>

              <DashboardNavigation currentRole="faculty" />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">15</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-xs text-muted-foreground">New submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg TAT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-foreground">2.3</div>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">Days (-0.5)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Reports Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">12</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Approval Queue */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Approval Queue</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="NSS/NCC">NSS/NCC</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Hackathons">Hackathons</SelectItem>
                          <SelectItem value="Volunteering">Volunteering</SelectItem>
                          <SelectItem value="Internships">Internships</SelectItem>
                        </SelectContent>
                      </Select>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Bulk Actions
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Bulk Actions</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Button className="w-full bg-transparent" variant="outline">
                              Approve Selected
                            </Button>
                            <Button className="w-full bg-transparent" variant="outline">
                              Request Rework for Selected
                            </Button>
                            <Button className="w-full" variant="destructive">
                              Reject Selected
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input type="checkbox" className="rounded" />
                          <div className="flex flex-col">
                            <div className="font-medium">{submission.student}</div>
                            <div className="text-sm text-muted-foreground">{submission.program}</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="font-medium">{submission.title}</div>
                            <div className="text-sm text-muted-foreground">{submission.category}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-sm font-medium">{submission.hours}h</div>
                          <div className="text-sm text-muted-foreground">{submission.submittedOn}</div>

                          <div className="flex gap-1">
                            {submission.flags.map((flag) => (
                              <Badge key={flag} className={`text-xs ${getFlagColor(flag)}`}>
                                {flag.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>

                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(submission)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-96">
                              <SheetHeader>
                                <SheetTitle>Verification Details</SheetTitle>
                              </SheetHeader>
                              {selectedSubmission && (
                                <div className="space-y-6 mt-6">
                                  <div>
                                    <h4 className="font-medium mb-2">Student Information</h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <span className="font-medium">Name:</span> {selectedSubmission.student}
                                      </p>
                                      <p>
                                        <span className="font-medium">Program:</span> {selectedSubmission.program}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Activity Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <span className="font-medium">Title:</span> {selectedSubmission.title}
                                      </p>
                                      <p>
                                        <span className="font-medium">Category:</span> {selectedSubmission.category}
                                      </p>
                                      <p>
                                        <span className="font-medium">Hours:</span> {selectedSubmission.hours}
                                      </p>
                                      <p>
                                        <span className="font-medium">Submitted:</span> {selectedSubmission.submittedOn}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Evidence</h4>
                                    <div className="p-3 bg-muted rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span className="text-sm">{selectedSubmission.evidence}</span>
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Add Comment</h4>
                                    <Textarea
                                      placeholder="Add your verification comments..."
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                      className="min-h-20"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Button className="w-full" onClick={() => handleApprove(selectedSubmission.id)}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      className="w-full bg-transparent"
                                      variant="outline"
                                      onClick={() => handleRequestRework(selectedSubmission.id)}
                                    >
                                      <AlertTriangle className="h-4 w-4 mr-2" />
                                      Request Rework
                                    </Button>
                                    <Button
                                      className="w-full"
                                      variant="destructive"
                                      onClick={() => handleReject(selectedSubmission.id)}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </SheetContent>
                          </Sheet>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApprove(submission.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReject(submission.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
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
              {/* Reporting Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle>Reporting Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mini Charts Placeholder */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-xs text-muted-foreground">Submissions by Category</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-xs text-muted-foreground">Approvals Over Time</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Export Preset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="naac-aqar">NAAC AQAR</SelectItem>
                          <SelectItem value="naac-ssr">NAAC SSR</SelectItem>
                          <SelectItem value="aicte">AICTE</SelectItem>
                          <SelectItem value="nirf">NIRF</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button className="w-full bg-transparent" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Open Full Reports
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications & Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications & Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div
                          className={`p-1 rounded-full ${
                            notification.priority === "high"
                              ? "bg-red-100"
                              : notification.priority === "medium"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                          }`}
                        >
                          {notification.priority === "high" ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : notification.priority === "medium" ? (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <Bell className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button className="w-full bg-transparent" variant="outline">
                      Reassign Queue
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations & Policies */}
              <Card>
                <CardHeader>
                  <CardTitle>Integrations & Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">LMS/ERP Sync</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Taxonomy Manager</span>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Verification Rules</span>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground mt-4">Last sync: 30 minutes ago</div>
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
