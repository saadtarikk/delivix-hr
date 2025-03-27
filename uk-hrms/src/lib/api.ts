import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { employee: true }
  })

  return user
}

export async function getEmployeeById(id: string) {
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      emergencyContacts: true,
      dependents: true,
      immigrationRecords: true,
      salaryComponents: true,
      supervisors: true,
      subordinates: true,
      education: true,
      workExperience: true,
      skills: true,
      languages: true,
      memberships: true,
      attachments: true
    }
  })

  return employee
}

export function handleError(error: any) {
  console.error('API Error:', error)
  return NextResponse.json(
    { error: error.message || 'Internal Server Error' },
    { status: error.status || 500 }
  )
}

export function successResponse(data: any) {
  return NextResponse.json(data)
}

export async function validateEmployeeAccess(employeeId: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  // Admin can access all employees
  if (user.role === 'admin') {
    return true
  }

  // Users can only access their own data
  if (user.employee?.id === employeeId) {
    return true
  }

  throw new Error('Forbidden')
} 