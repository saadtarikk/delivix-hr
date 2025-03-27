"use client"

import { ReactNode } from 'react'
import { EmployeeMenu } from '@/components/employee/employee-menu'

interface MyInfoLayoutProps {
  children: ReactNode
  params: {
    id: string
  }
}

export default function MyInfoLayout({ children, params }: MyInfoLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <EmployeeMenu employeeId={params.id} isSelf={true} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 