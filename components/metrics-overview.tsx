import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsOverviewProps {
  data: any
  loading: boolean
}

export function MetricsOverview({ data, loading }: MetricsOverviewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = data?.summary_stats

  const metrics = [
    {
      title: "Average Acceptance Rate",
      value: `${stats?.avg_acceptance_rate || 0}%`,
      change: "+2.1%",
      icon: "📈",
      trend: "up",
    },
    {
      title: "Total Applications",
      value: stats?.total_applications || "0",
      change: "+5.3%",
      icon: "👥",
      trend: "up",
    },
    {
      title: "Average Tuition",
      value: `$${stats?.avg_tuition?.toLocaleString() || 0}`,
      change: "+3.8%",
      icon: "💰",
      trend: "up",
    },
    {
      title: "Average SAT Score",
      value: stats?.avg_sat?.toLocaleString() || "0",
      change: "+12",
      icon: "📚",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <span className="text-lg">{metric.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-serif">{metric.value}</div>
            <p className="text-xs text-accent font-medium">{metric.change} from last year</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
