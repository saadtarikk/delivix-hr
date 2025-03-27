import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      select: {
        jobTitle: true,
        employmentStatus: true,
        jobCategory: true,
        joinedDate: true,
        department: true,
        location: true,
        contractStartDate: true,
        contractEndDate: true,
        workShift: true,
        workSchedule: true,
        probationEndDate: true,
        noticePeriod: true,
        reportingTo: true,
        costCenter: true
      }
    })

    if (!employee) {
      return handleError({ message: 'Employee not found', status: 404 })
    }

    return successResponse(employee)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: {
        jobTitle: body.jobTitle,
        employmentStatus: body.employmentStatus,
        jobCategory: body.jobCategory,
        joinedDate: body.joinedDate ? new Date(body.joinedDate) : null,
        department: body.department,
        location: body.location,
        contractStartDate: body.contractStartDate ? new Date(body.contractStartDate) : null,
        contractEndDate: body.contractEndDate ? new Date(body.contractEndDate) : null,
        workShift: body.workShift,
        workSchedule: body.workSchedule,
        probationEndDate: body.probationEndDate ? new Date(body.probationEndDate) : null,
        noticePeriod: body.noticePeriod,
        reportingTo: body.reportingTo,
        costCenter: body.costCenter
      },
      select: {
        jobTitle: true,
        employmentStatus: true,
        jobCategory: true,
        joinedDate: true,
        department: true,
        location: true,
        contractStartDate: true,
        contractEndDate: true,
        workShift: true,
        workSchedule: true,
        probationEndDate: true,
        noticePeriod: true,
        reportingTo: true,
        costCenter: true
      }
    })

    return successResponse(employee)
  } catch (error) {
    return handleError(error)
  }
} 