"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function SalaryPage({ params }: { params: { id: string } }) {
  // TODO: Fetch salary details from API
  const salaryComponents = [
    {
      id: 1,
      component: 'Basic Salary',
      amount: '£45,000.00',
      currency: 'GBP',
      frequency: 'Monthly',
      directDeposit: 'Yes',
      accountNumber: '****1234',
      bankName: 'HSBC Bank',
      routingNumber: '****5678',
      effectiveDate: '2023-01-15',
      comments: 'Standard monthly salary'
    },
    {
      id: 2,
      component: 'Annual Bonus',
      amount: '£5,000.00',
      currency: 'GBP',
      frequency: 'Annually',
      directDeposit: 'Yes',
      accountNumber: '****1234',
      bankName: 'HSBC Bank',
      routingNumber: '****5678',
      effectiveDate: '2023-01-15',
      comments: 'Performance based bonus'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Salary</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Salary Component
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salary Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salaryComponents.map((component) => (
              <div
                key={component.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{component.component}</p>
                    <span className="text-sm text-muted-foreground">({component.amount})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Currency: {component.currency}</span>
                    <span>Frequency: {component.frequency}</span>
                    <span>Direct Deposit: {component.directDeposit}</span>
                    <span>Effective Date: {component.effectiveDate}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Bank: {component.bankName}</span>
                    <span>Account: {component.accountNumber}</span>
                    <span>Routing: {component.routingNumber}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{component.comments}</p>
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