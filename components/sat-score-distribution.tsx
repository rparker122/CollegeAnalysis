"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SATScoreDistributionProps {
  data: any
  loading: boolean
}

export function SATScoreDistribution({ data, loading }: SATScoreDistributionProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">SAT Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const satData = data?.sat_distribution || []
  const maxCount = Math.max(...satData.map((d: any) => d.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">SAT Score Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of average SAT scores across colleges</p>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-end justify-between gap-2 p-4">
          {satData.map((range: any, index: number) => {
            const height = (range.count / maxCount) * 100

            return (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full flex items-end justify-center" style={{ height: "240px" }}>
                  <div
                    className="w-full bg-accent rounded-t-md transition-all duration-500 ease-out hover:bg-accent/80 cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {range.count}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center font-medium">{range.range}</div>
              </div>
            )
          })}
        </div>
        <div className="text-center text-sm font-medium text-foreground mt-2">SAT Score Range</div>
      </CardContent>
    </Card>
  )
}
