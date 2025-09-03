"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TuitionAnalysisProps {
  data: any
  loading: boolean
}

export function TuitionAnalysis({ data, loading }: TuitionAnalysisProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Tuition vs SAT Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const tuitionData = data?.tuition_analysis || []

  if (tuitionData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Tuition vs SAT Scores</CardTitle>
          <p className="text-sm text-muted-foreground">No colleges found matching your search</p>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Try adjusting your search terms</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxTuition = Math.max(...tuitionData.map((d: any) => d.tuition))
  const minTuition = Math.min(...tuitionData.map((d: any) => d.tuition))
  const maxSAT = Math.max(...tuitionData.map((d: any) => d.sat_average))
  const minSAT = Math.min(...tuitionData.map((d: any) => d.sat_average))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Tuition vs SAT Scores</CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing {tuitionData.length} college{tuitionData.length !== 1 ? "s" : ""} - relationship between costs and
          academic standards
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
          <div className="absolute left-2 top-8 bottom-16 flex flex-col justify-between text-xs text-muted-foreground w-16">
            <span className="text-right leading-tight">${Math.round(maxTuition / 1000)}k</span>
            <span className="text-right leading-tight">${Math.round((maxTuition + minTuition) / 2000)}k</span>
            <span className="text-right leading-tight">${Math.round(minTuition / 1000)}k</span>
          </div>

          <div className="absolute bottom-6 left-20 right-8 flex justify-between text-xs text-muted-foreground">
            <span className="leading-tight">{minSAT}</span>
            <span className="leading-tight">{Math.round((maxSAT + minSAT) / 2)}</span>
            <span className="leading-tight">{maxSAT}</span>
          </div>

          <div className="relative ml-20 mr-8 mt-8 mb-16 h-full">
            {tuitionData.map((college: any, index: number) => {
              const x = ((college.sat_average - minSAT) / (maxSAT - minSAT)) * 100
              const y = ((maxTuition - college.tuition) / (maxTuition - minTuition)) * 100

              return (
                <div
                  key={index}
                  className="absolute w-3 h-3 bg-secondary rounded-full border-2 border-secondary-foreground/30 hover:scale-150 hover:bg-primary hover:border-primary transition-all duration-200 cursor-pointer group z-10"
                  style={{
                    left: `${Math.max(0, Math.min(100, x))}%`,
                    top: `${Math.max(0, Math.min(100, y))}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-1.5 py-1 bg-popover border border-border text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none max-w-32">
                    <div className="font-medium text-xs truncate mb-0.5">{college.name}</div>
                    <div className="space-y-0 text-xs">
                      <div className="truncate">💰 ${(college.tuition / 1000).toFixed(0)}k</div>
                      <div>📊 {college.sat_average}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground">
            Average SAT Score
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-foreground origin-center">
            Annual Tuition
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
