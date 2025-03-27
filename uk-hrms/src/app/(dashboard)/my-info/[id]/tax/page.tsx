"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default function TaxExemptionsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch tax exemption details from API
  const taxExemptions = {
    federalStatus: 'Single',
    federalExemptions: 1,
    state: 'England',
    stateStatus: 'Single',
    stateExemptions: 1,
    unemploymentState: 'England',
    workState: 'England',
    additionalAmount: '£0.00',
    additionalAmountYTD: '£0.00',
    taxExemptions: 'Standard',
    taxExemptionsYTD: 'Standard',
    taxExemptionsEffectiveDate: '2023-01-15',
    taxExemptionsExpiryDate: '2024-01-15',
    taxExemptionsComments: 'Standard tax exemptions applied'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tax Exemptions</h1>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Federal Status</p>
              <p className="mt-1">{taxExemptions.federalStatus}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Federal Exemptions</p>
              <p className="mt-1">{taxExemptions.federalExemptions}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">State</p>
              <p className="mt-1">{taxExemptions.state}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">State Status</p>
              <p className="mt-1">{taxExemptions.stateStatus}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">State Exemptions</p>
              <p className="mt-1">{taxExemptions.stateExemptions}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unemployment State</p>
              <p className="mt-1">{taxExemptions.unemploymentState}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work State</p>
              <p className="mt-1">{taxExemptions.workState}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Additional Amount</p>
              <p className="mt-1">{taxExemptions.additionalAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Additional Amount YTD</p>
              <p className="mt-1">{taxExemptions.additionalAmountYTD}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tax Exemptions</p>
              <p className="mt-1">{taxExemptions.taxExemptions}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tax Exemptions YTD</p>
              <p className="mt-1">{taxExemptions.taxExemptionsYTD}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Effective Date</p>
              <p className="mt-1">{taxExemptions.taxExemptionsEffectiveDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
              <p className="mt-1">{taxExemptions.taxExemptionsExpiryDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Comments</p>
              <p className="mt-1">{taxExemptions.taxExemptionsComments}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 