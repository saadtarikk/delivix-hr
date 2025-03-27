"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function ReportToPage({ params }: { params: { id: string } }) {
  // TODO: Fetch reporting relationships from API
  const reportingRelationships = [
    {
      id: 1,
      supervisorName: 'John Manager',
      reportingMethod: 'Direct',
      department: 'Technology',
      effectiveDate: '2023-01-15',
      comments: 'Primary supervisor'
    },
    {
      id: 2,
      supervisorName: 'Jane Director',
      reportingMethod: 'Indirect',
      department: 'Technology',
      effectiveDate: '2023-01-15',
      comments: 'Secondary supervisor'
    }
  ]

  const subordinates = [
    {
      id: 1,
      name: 'Alice Developer',
      reportingMethod: 'Direct',
      department: 'Technology',
      effectiveDate: '2023-01-15',
      comments: 'Senior Developer'
    },
    {
      id: 2,
      name: 'Bob Developer',
      reportingMethod: 'Direct',
      department: 'Technology',
      effectiveDate: '2023-01-15',
      comments: 'Junior Developer'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Report-to</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Supervisor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supervisors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportingRelationships.map((relationship) => (
              <div
                key={relationship.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{relationship.supervisorName}</p>
                    <span className="text-sm text-muted-foreground">({relationship.reportingMethod})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Department: {relationship.department}</span>
                    <span>Effective Date: {relationship.effectiveDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{relationship.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subordinates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subordinates.map((subordinate) => (
              <div
                key={subordinate.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{subordinate.name}</p>
                    <span className="text-sm text-muted-foreground">({subordinate.reportingMethod})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Department: {subordinate.department}</span>
                    <span>Effective Date: {subordinate.effectiveDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{subordinate.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 