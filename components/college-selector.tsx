"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CollegeSelectorProps {
  colleges: Array<{
    name: string
    location: string
    type: string
  }>
  selectedColleges: string[]
  onCollegeSelect: (collegeNames: string[]) => void
}

export function CollegeSelector({ colleges, selectedColleges, onCollegeSelect }: CollegeSelectorProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedColleges = showAll ? colleges : colleges.slice(0, 20)

  const toggleCollege = (collegeName: string) => {
    if (selectedColleges.includes(collegeName)) {
      onCollegeSelect(selectedColleges.filter((name) => name !== collegeName))
    } else {
      onCollegeSelect([...selectedColleges, collegeName])
    }
  }

  const clearAll = () => {
    onCollegeSelect([])
  }

  const selectAll = () => {
    onCollegeSelect(colleges.map((c) => c.name))
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Select Colleges to Compare ({selectedColleges.length} selected)
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAll} size="sm" disabled={selectedColleges.length === 0}>
              Clear All
            </Button>
            <Button
              variant="outline"
              onClick={selectAll}
              size="sm"
              disabled={selectedColleges.length === colleges.length}
            >
              Select All
            </Button>
            <Button variant="outline" onClick={() => setShowAll(!showAll)} size="sm">
              {showAll ? "Show Less" : `Show All ${colleges.length} Colleges`}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {displayedColleges.map((college) => (
            <Button
              key={college.name}
              variant={selectedColleges.includes(college.name) ? "default" : "outline"}
              onClick={() => toggleCollege(college.name)}
              className="text-left justify-start h-auto py-2 px-3 relative"
              size="sm"
            >
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm truncate">{college.name}</span>
                  {selectedColleges.includes(college.name) && <span className="text-xs ml-1">✓</span>}
                </div>
                <span className="text-xs text-muted-foreground">{college.location}</span>
                <span className="text-xs text-muted-foreground">{college.type}</span>
              </div>
            </Button>
          ))}
        </div>

        {selectedColleges.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              📊 Comparing <strong>{selectedColleges.length}</strong> college{selectedColleges.length !== 1 ? "s" : ""}:{" "}
              <span className="font-medium">
                {selectedColleges.slice(0, 3).join(", ")}
                {selectedColleges.length > 3 && ` and ${selectedColleges.length - 3} more`}
              </span>
            </p>
          </div>
        )}

        {selectedColleges.length === 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 Select one or more colleges above to compare their data side by side.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
