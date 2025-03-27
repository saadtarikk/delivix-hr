import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const emergencyContacts = await prisma.emergencyContact.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(emergencyContacts)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const emergencyContact = await prisma.emergencyContact.create({
      data: {
        employeeId: params.id,
        name: body.name,
        relationship: body.relationship,
        homePhone: body.homePhone,
        mobilePhone: body.mobilePhone,
        workPhone: body.workPhone
      }
    })

    return successResponse(emergencyContact)
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

    const emergencyContact = await prisma.emergencyContact.update({
      where: { id: body.id },
      data: {
        name: body.name,
        relationship: body.relationship,
        homePhone: body.homePhone,
        mobilePhone: body.mobilePhone,
        workPhone: body.workPhone
      }
    })

    return successResponse(emergencyContact)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('id')

    if (!contactId) {
      return handleError({ message: 'Contact ID is required', status: 400 })
    }

    await prisma.emergencyContact.delete({
      where: { id: contactId }
    })

    return successResponse({ message: 'Emergency contact deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 