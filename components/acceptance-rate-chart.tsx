"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AcceptanceRateChartProps {
  data: any
  loading: boolean
}

export function AcceptanceRateChart({ data, loading }: AcceptanceRateChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Acceptance Rates by College</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const acceptanceData = data?.acceptance_rates || []
  const maxRate = Math.max(...acceptanceData.map((d: any) => d.acceptance_rate))

  if (acceptanceData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Acceptance Rates by College</CardTitle>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Acceptance Rates by College</CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing {acceptanceData.length} college{acceptanceData.length !== 1 ? "s" : ""} with acceptance rates
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 h-80 overflow-y-auto">
          {acceptanceData.map((college: any, index: number) => (
            <div key={index} className="space-y-1 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="flex justify-between items-start text-sm">
                <div className="flex-1 pr-2">
                  <div className="font-medium truncate">{college.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {college.location} • {college.type}
                  </div>
                  <div className="text-xs text-muted-foreground">{college.enrollment.toLocaleString()} students</div>
                </div>
                <span className="text-primary font-semibold text-lg">{college.acceptance_rate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-700 ease-out hover:from-primary/80 hover:to-primary"
                  style={{ width: `${(college.acceptance_rate / maxRate) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
