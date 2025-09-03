"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DemographicsChartProps {
  data: any
  loading: boolean
}

export function DemographicsChart({ data, loading }: DemographicsChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Demographics by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const demographicsData = data?.demographics || []

  const colors = {
    white: "hsl(var(--chart-1))",
    asian: "hsl(var(--chart-2))",
    hispanic: "hsl(var(--chart-3))",
    black: "hsl(var(--chart-4))",
    other: "hsl(var(--chart-5))",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Demographics by Region</CardTitle>
        <p className="text-sm text-muted-foreground">Average demographic composition across different regions</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 h-80 overflow-y-auto">
          {demographicsData.map((region: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{region.region}</h4>
                <span className="text-xs text-muted-foreground">100%</span>
              </div>

              {/* Stacked bar */}
              <div className="w-full h-6 bg-muted rounded-full overflow-hidden flex">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${region.white}%`,
                    backgroundColor: colors.white,
                  }}
                  title={`White: ${region.white}%`}
                />
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${region.asian}%`,
                    backgroundColor: colors.asian,
                  }}
                  title={`Asian: ${region.asian}%`}
                />
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${region.hispanic}%`,
                    backgroundColor: colors.hispanic,
                  }}
                  title={`Hispanic: ${region.hispanic}%`}
                />
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${region.black}%`,
                    backgroundColor: colors.black,
                  }}
                  title={`Black: ${region.black}%`}
                />
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${region.other}%`,
                    backgroundColor: colors.other,
                  }}
                  title={`Other: ${region.other}%`}
                />
              </div>

              {/* Legend for this region */}
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.white }}></div>
                  <span>White ({region.white}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.asian }}></div>
                  <span>Asian ({region.asian}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.hispanic }}></div>
                  <span>Hispanic ({region.hispanic}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.black }}></div>
                  <span>Black ({region.black}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.other }}></div>
                  <span>Other ({region.other}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
