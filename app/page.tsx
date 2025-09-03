"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { CollegeSelector } from "@/components/college-selector"
import { MetricsOverview } from "@/components/metrics-overview"
import { AcceptanceRateChart } from "@/components/acceptance-rate-chart"
import { TuitionAnalysis } from "@/components/tuition-analysis"
import { SATScoreDistribution } from "@/components/sat-score-distribution"
import { DemographicsChart } from "@/components/demographics-chart"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export default function HomePage() {
  const { data, loading, error, selectedColleges, setSelectedColleges, exportData, colleges } = useDashboardData()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onExportData={exportData} />
      <CollegeSelector colleges={colleges} selectedColleges={selectedColleges} onCollegeSelect={setSelectedColleges} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MetricsOverview data={data} loading={loading} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AcceptanceRateChart data={data} loading={loading} />
          <TuitionAnalysis data={data} loading={loading} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SATScoreDistribution data={data} loading={loading} />
          <DemographicsChart data={data} loading={loading} />
        </div>
      </main>
    </div>
  )
}
