"use client"

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// Generate mock data for the heatmap
const generateHeatmapData = () => {
  const data = []
  const startDate = new Date(2024, 0, 1) // January 1, 2024
  const endDate = new Date(2024, 11, 31) // December 31, 2024

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const intensity = Math.floor(Math.random() * 5) // 0-4 intensity levels
    data.push({
      date: new Date(d),
      count: intensity,
      level: intensity,
    })
  }

  return data
}

const getIntensityColor = (level: number) => {
  const colors = [
    "bg-gray-100", // 0 - no activity
    "bg-indigo-200", // 1 - low activity
    "bg-indigo-400", // 2 - medium activity
    "bg-indigo-600", // 3 - high activity
    "bg-indigo-800", // 4 - very high activity
  ]
  return colors[level] || colors[0]
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function CalendarHeatmap() {
  const data = generateHeatmapData()

  // Group data by weeks
  const weeks = []
  let currentWeek = []

  data.forEach((day, index) => {
    if (index === 0) {
      // Add empty cells for the first week if it doesn't start on Sunday
      const dayOfWeek = day.date.getDay()
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null)
      }
    }

    currentWeek.push(day)

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  // Add the last week if it's not complete
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    weeks.push(currentWeek)
  }

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="grid grid-cols-53 gap-1">
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <Tooltip key={`${weekIndex}-${dayIndex}`}>
                <TooltipTrigger asChild>
                  <div
                    className={`w-3 h-3 rounded-sm ${
                      day ? getIntensityColor(day.level) : "bg-transparent"
                    } hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer`}
                  />
                </TooltipTrigger>
                {day && (
                  <TooltipContent>
                    <p>{day.date.toLocaleDateString()}</p>
                    <p>{day.count} events attended</p>
                  </TooltipContent>
                )}
              </Tooltip>
            )),
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  )
}
