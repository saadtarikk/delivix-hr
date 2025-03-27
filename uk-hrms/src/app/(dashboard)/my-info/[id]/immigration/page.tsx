"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function ImmigrationPage({ params }: { params: { id: string } }) {
  // TODO: Fetch immigration records from API
  const immigrationRecords = [
    {
      id: 1,
      documentType: 'Passport',
      documentNumber: '123456789',
      issuedDate: '2020-01-15',
      expiryDate: '2030-01-15',
      country: 'United Kingdom',
      status: 'Valid',
      reviewDate: '2025-01-15',
      comments: 'UK Passport'
    },
    {
      id: 2,
      documentType: 'Work Permit',
      documentNumber: 'WP123456',
      issuedDate: '2023-01-01',
      expiryDate: '2026-01-01',
      country: 'United Kingdom',
      status: 'Valid',
      reviewDate: '2025-01-01',
      comments: 'Skilled Worker Visa'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Immigration</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Immigration Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Immigration Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {immigrationRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{record.documentType}</p>
                    <span className="text-sm text-muted-foreground">({record.documentNumber})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Issued Date: {record.issuedDate}</span>
                    <span>Expiry Date: {record.expiryDate}</span>
                    <span>Country: {record.country}</span>
                    <span>Status: {record.status}</span>
                    <span>Review Date: {record.reviewDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{record.comments}</p>
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