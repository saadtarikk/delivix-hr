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
        street1: true,
        street2: true,
        city: true,
        province: true,
        zipcode: true,
        country: true,
        homeTelephone: true,
        workTelephone: true,
        mobile: true,
        workEmail: true,
        otherEmail: true
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
        street1: body.street1,
        street2: body.street2,
        city: body.city,
        province: body.province,
        zipcode: body.zipcode,
        country: body.country,
        homeTelephone: body.homeTelephone,
        workTelephone: body.workTelephone,
        mobile: body.mobile,
        workEmail: body.workEmail,
        otherEmail: body.otherEmail
      },
      select: {
        street1: true,
        street2: true,
        city: true,
        province: true,
        zipcode: true,
        country: true,
        homeTelephone: true,
        workTelephone: true,
        mobile: true,
        workEmail: true,
        otherEmail: true
      }
    })

    return successResponse(employee)
  } catch (error) {
    return handleError(error)
  }
} 