"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, Shield, BookOpen, Award, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export function AuthLandingPage() {
  const [activeRole, setActiveRole] = useState("student")
  const router = useRouter()

  const handleLogin = (role: string) => {
    // Simulate authentication and redirect to appropriate dashboard
    switch (role) {
      case "student":
        router.push("/student")
        break
      case "faculty":
        router.push("/faculty")
        break
      case "admin":
        router.push("/admin")
        break
    }
  }

  const roleFeatures = {
    student: [
      { icon: BookOpen, title: "Activity Management", desc: "Track and submit your extracurricular activities" },
      { icon: Award, title: "Portfolio Generation", desc: "Generate professional portfolios automatically" },
      { icon: BarChart3, title: "Progress Tracking", desc: "Monitor your academic and activity progress" },
    ],
    faculty: [
      { icon: Shield, title: "Verification System", desc: "Review and approve student submissions" },
      { icon: BarChart3, title: "Analytics Dashboard", desc: "Generate reports and track department metrics" },
      { icon: Users, title: "Student Management", desc: "Manage student activities and approvals" },
    ],
    admin: [
      { icon: Shield, title: "System Administration", desc: "Manage institutional settings and compliance" },
      { icon: BarChart3, title: "Institutional Reports", desc: "Generate NAAC/IQAC compliance reports" },
      { icon: Users, title: "Department Analytics", desc: "Compare performance across departments" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Student Activity Record</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Centralized platform for managing student activities, portfolios, and institutional compliance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Role Selection & Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Choose Your Role</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="student" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Student
                    </TabsTrigger>
                    <TabsTrigger value="faculty" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Faculty
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Admin
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(roleFeatures).map(([role, features]) => (
                    <TabsContent key={role} value={role} className="mt-6">
                      <div className="space-y-4">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                              <feature.icon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                              <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Login as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder={`Enter your ${activeRole} email`} className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="w-full" />
              </div>

              <Button onClick={() => handleLogin(activeRole)} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Login to {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Dashboard
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm text-gray-600">
                  Forgot your password?
                </Button>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Demo Credentials</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Student:</strong> student@university.edu / demo123
                  </p>
                  <p>
                    <strong>Faculty:</strong> faculty@university.edu / demo123
                  </p>
                  <p>
                    <strong>Admin:</strong> admin@university.edu / demo123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 Student Activity Record Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
