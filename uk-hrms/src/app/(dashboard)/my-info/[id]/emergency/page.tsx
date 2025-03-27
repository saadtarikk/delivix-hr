"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function EmergencyContactsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch emergency contacts from API
  const emergencyContacts = [
    {
      id: 1,
      name: 'Jane Doe',
      relationship: 'Spouse',
      homePhone: '+44 20 7123 4569',
      mobilePhone: '+44 7700 900124',
      workPhone: '+44 20 7123 4570'
    },
    {
      id: 2,
      name: 'John Smith',
      relationship: 'Parent',
      homePhone: '+44 20 7123 4571',
      mobilePhone: '+44 7700 900125',
      workPhone: '+44 20 7123 4572'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Emergency Contacts</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Emergency Contact
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{contact.name}</p>
                    <span className="text-sm text-muted-foreground">({contact.relationship})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Home: {contact.homePhone}</span>
                    <span>Mobile: {contact.mobilePhone}</span>
                    <span>Work: {contact.workPhone}</span>
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