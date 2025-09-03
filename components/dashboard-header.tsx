"use client"

import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onExportData: () => void
}

export function DashboardHeader({ onExportData }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <h1 className="text-2xl font-bold text-foreground font-serif">College Admissions Analysis</h1>
          </div>
          <Button variant="outline" onClick={onExportData}>
            📊 Export Data
          </Button>
        </div>
      </div>
    </header>
  )
}
