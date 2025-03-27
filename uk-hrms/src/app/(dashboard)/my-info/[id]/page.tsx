"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Upload, FileText, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MyInfoPage({ params }: { params: { id: string } }) {
  // TODO: Fetch employee data from API
  const employee = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'M',
    employeeId: 'EMP001',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'British',
    bloodType: 'O+',
    drivingLicense: 'Yes',
    drivingLicenseExpiry: '2025-01-01'
  }

  // TODO: Fetch attachments from API
  const attachments = [
    {
      id: 1,
      name: 'Passport Copy',
      description: 'UK Passport',
      uploadDate: '2024-01-15',
      expiryDate: '2034-01-15',
      size: '2.5 MB'
    },
    {
      id: 2,
      name: 'Driving License',
      description: 'UK Driving License',
      uploadDate: '2024-01-16',
      expiryDate: '2025-01-16',
      size: '1.8 MB'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Personal Details Section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Personal Details</h1>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">First Name</p>
                <p className="mt-1">{employee.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Middle Name</p>
                <p className="mt-1">{employee.middleName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                <p className="mt-1">{employee.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                <p className="mt-1">{employee.employeeId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="mt-1">{employee.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gender</p>
                <p className="mt-1">{employee.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Marital Status</p>
                <p className="mt-1">{employee.maritalStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                <p className="mt-1">{employee.nationality}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                <p className="mt-1">{employee.bloodType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Driving License</p>
                <p className="mt-1">{employee.drivingLicense}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">License Expiry</p>
                <p className="mt-1">{employee.drivingLicenseExpiry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attachments Section */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Attachments</h2>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Add Attachment
          </Button>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Personal Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">{attachment.description}</p>
                        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Uploaded: {attachment.uploadDate}</span>
                          <span>Expires: {attachment.expiryDate}</span>
                          <span>{attachment.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 