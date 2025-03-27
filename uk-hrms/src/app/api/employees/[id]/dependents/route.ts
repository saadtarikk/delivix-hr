import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const dependents = await prisma.dependent.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(dependents)
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

    const dependent = await prisma.dependent.create({
      data: {
        employeeId: params.id,
        name: body.name,
        relationship: body.relationship,
        dateOfBirth: new Date(body.dateOfBirth),
        relationshipType: body.relationshipType,
        description: body.description
      }
    })

    return successResponse(dependent)
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

    const dependent = await prisma.dependent.update({
      where: { id: body.id },
      data: {
        name: body.name,
        relationship: body.relationship,
        dateOfBirth: new Date(body.dateOfBirth),
        relationshipType: body.relationshipType,
        description: body.description
      }
    })

    return successResponse(dependent)
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
    const dependentId = searchParams.get('id')

    if (!dependentId) {
      return handleError({ message: 'Dependent ID is required', status: 400 })
    }

    await prisma.dependent.delete({
      where: { id: dependentId }
    })

    return successResponse({ message: 'Dependent deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 