"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch job details from API
  const jobDetails = {
    jobTitle: 'Senior Software Engineer',
    employmentStatus: 'Full Time',
    jobCategory: 'Engineering',
    joinedDate: '2023-01-15',
    department: 'Technology',
    location: 'London Office',
    contractStartDate: '2023-01-15',
    contractEndDate: '2026-01-15',
    workShift: 'Day Shift',
    workSchedule: '9:00 AM - 5:00 PM',
    probationEndDate: '2023-04-15',
    noticePeriod: '1 Month',
    reportingTo: 'John Manager',
    costCenter: 'TECH-001'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Job Details</h1>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Title</p>
              <p className="mt-1">{jobDetails.jobTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Employment Status</p>
              <p className="mt-1">{jobDetails.employmentStatus}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Category</p>
              <p className="mt-1">{jobDetails.jobCategory}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
              <p className="mt-1">{jobDetails.joinedDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="mt-1">{jobDetails.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="mt-1">{jobDetails.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contract Start Date</p>
              <p className="mt-1">{jobDetails.contractStartDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contract End Date</p>
              <p className="mt-1">{jobDetails.contractEndDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work Shift</p>
              <p className="mt-1">{jobDetails.workShift}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work Schedule</p>
              <p className="mt-1">{jobDetails.workSchedule}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Probation End Date</p>
              <p className="mt-1">{jobDetails.probationEndDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notice Period</p>
              <p className="mt-1">{jobDetails.noticePeriod}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reporting To</p>
              <p className="mt-1">{jobDetails.reportingTo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cost Center</p>
              <p className="mt-1">{jobDetails.costCenter}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 