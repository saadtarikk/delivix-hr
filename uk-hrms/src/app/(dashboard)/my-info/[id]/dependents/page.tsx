"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function DependentsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch dependents from API
  const dependents = [
    {
      id: 1,
      name: 'Sarah Doe',
      relationship: 'Child',
      dateOfBirth: '2015-06-15',
      relationshipType: 'Child',
      description: 'Daughter'
    },
    {
      id: 2,
      name: 'Michael Doe',
      relationship: 'Child',
      dateOfBirth: '2018-03-22',
      relationshipType: 'Child',
      description: 'Son'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dependents</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Dependent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Dependents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dependents.map((dependent) => (
              <div
                key={dependent.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{dependent.name}</p>
                    <span className="text-sm text-muted-foreground">({dependent.relationship})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Date of Birth: {dependent.dateOfBirth}</span>
                    <span>Relationship Type: {dependent.relationshipType}</span>
                    <span>Description: {dependent.description}</span>
                  </div>
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