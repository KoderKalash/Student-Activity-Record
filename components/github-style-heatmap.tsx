"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HeatmapData {
  date: string
  count: number
  level: number
}

interface GitHubStyleHeatmapProps {
  data?: HeatmapData[]
  totalClasses?: number
  totalActiveDays?: number
  className?: string
}

export function GitHubStyleHeatmap({
  data = [],
  totalClasses = 134,
  totalActiveDays = 76,
  className = "",
}: GitHubStyleHeatmapProps) {
  // Generate mock data for the past year
  const generateMockData = (): HeatmapData[] => {
    const mockData: HeatmapData[] = []
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const randomCount = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4) + 1
      const level = randomCount === 0 ? 0 : Math.min(Math.floor(randomCount / 1) + 1, 4)

      mockData.push({
        date: d.toISOString().split("T")[0],
        count: randomCount,
        level: level,
      })
    }
    return mockData
  }

  const heatmapData = data.length > 0 ? data : generateMockData()

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-gray-800"
      case 1:
        return "bg-green-200 dark:bg-green-900"
      case 2:
        return "bg-green-300 dark:bg-green-700"
      case 3:
        return "bg-green-500 dark:bg-green-600"
      case 4:
        return "bg-green-700 dark:bg-green-500"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  const getMonthLabels = () => {
    const today = new Date()
    const months = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push(date.toLocaleDateString("en-US", { month: "short" }))
    }
    return months
  }

  const getDayLabels = () => {
    return ["", "Mon", "", "Wed", "", "Fri", ""]
  }

  // Group data by weeks
  const groupByWeeks = () => {
    const weeks: HeatmapData[][] = []
    let currentWeek: HeatmapData[] = []

    heatmapData.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay()

      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, level: 0 })
        }
      }

      currentWeek.push(day)

      if (dayOfWeek === 6 || index === heatmapData.length - 1) {
        // Fill empty days at the end of the last week
        while (currentWeek.length < 7) {
          currentWeek.push({ date: "", count: 0, level: 0 })
        }
        weeks.push(currentWeek)
        currentWeek = []
      }
    })

    return weeks
  }

  const weeks = groupByWeeks()

  return (
    <TooltipProvider>
      <div className={`space-y-3 ${className}`}>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">Attendance Tracker</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-6 text-sm">
              <span className="font-medium text-foreground">{totalClasses} classes attended in the past one year</span>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>
                  Total active days: <strong className="text-foreground">{totalActiveDays}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex flex-col gap-1 min-w-max">
            {/* Month labels */}
            <div className="flex gap-1 ml-10 mb-1">
              {getMonthLabels().map((month, index) => (
                <div key={index} className="w-3 text-xs text-muted-foreground text-left">
                  {index % 4 === 0 ? month : ""}
                </div>
              ))}
            </div>

            {/* Days and heatmap grid */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-1">
                {getDayLabels().map((day, index) => (
                  <div
                    key={index}
                    className="h-3 w-8 text-xs text-muted-foreground text-right pr-2 flex items-center justify-end"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={`${weekIndex}-${dayIndex}`}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-600 ${
                              day.date ? getLevelColor(day.level) : "bg-transparent border-transparent"
                            } hover:ring-1 hover:ring-gray-400 transition-all cursor-pointer`}
                          />
                        </TooltipTrigger>
                        {day.date && (
                          <TooltipContent>
                            <p className="text-sm">
                              {day.count} classes attended on{" "}
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-600 ${getLevelColor(level)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
