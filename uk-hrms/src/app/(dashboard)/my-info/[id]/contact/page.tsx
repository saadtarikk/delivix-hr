"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default function ContactDetailsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch employee data from API
  const employee = {
    street1: '123 Main Street',
    street2: 'Apt 4B',
    city: 'London',
    province: 'Greater London',
    zipcode: 'SW1A 1AA',
    country: 'United Kingdom',
    homeTelephone: '+44 20 7123 4567',
    workTelephone: '+44 20 7123 4568',
    mobile: '+44 7700 900123',
    workEmail: 'john.doe@company.com',
    otherEmail: 'john.doe@personal.com'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contact Details</h1>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Street Address</p>
              <p className="mt-1">{employee.street1}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Street Address 2</p>
              <p className="mt-1">{employee.street2}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p className="mt-1">{employee.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">State/Province</p>
              <p className="mt-1">{employee.province}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ZIP/Postal Code</p>
              <p className="mt-1">{employee.zipcode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Country</p>
              <p className="mt-1">{employee.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Home Telephone</p>
              <p className="mt-1">{employee.homeTelephone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work Telephone</p>
              <p className="mt-1">{employee.workTelephone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mobile</p>
              <p className="mt-1">{employee.mobile}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work Email</p>
              <p className="mt-1">{employee.workEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Other Email</p>
              <p className="mt-1">{employee.otherEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 