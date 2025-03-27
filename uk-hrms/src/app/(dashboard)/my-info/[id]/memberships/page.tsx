"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function MembershipsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch memberships from API
  const memberships = [
    {
      id: 1,
      name: 'British Computer Society',
      subscriptionPaidBy: 'Individual',
      subscriptionAmount: '£100.00',
      currency: 'GBP',
      subscriptionPeriod: 'Annual',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      renewalDate: '2024-01-01',
      comments: 'Professional membership'
    },
    {
      id: 2,
      name: 'AWS Certified Solutions Architect',
      subscriptionPaidBy: 'Company',
      subscriptionAmount: '£150.00',
      currency: 'GBP',
      subscriptionPeriod: '3 Years',
      startDate: '2023-01-01',
      endDate: '2026-01-01',
      renewalDate: '2026-01-01',
      comments: 'Professional certification'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Memberships</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Membership
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Memberships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{membership.name}</p>
                    <span className="text-sm text-muted-foreground">({membership.subscriptionPeriod})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Subscription: {membership.subscriptionAmount} {membership.currency}</span>
                    <span>Paid By: {membership.subscriptionPaidBy}</span>
                    <span>Period: {membership.startDate} to {membership.endDate}</span>
                    <span>Renewal: {membership.renewalDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{membership.comments}</p>
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