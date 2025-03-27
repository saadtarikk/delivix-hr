import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const [supervisors, subordinates] = await Promise.all([
      prisma.supervisor.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.subordinate.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      })
    ])

    return successResponse({ supervisors, subordinates })
  } catch (error) {
    return handleError(error)
  }
}

// Supervisors endpoints
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const supervisor = await prisma.supervisor.create({
      data: {
        employeeId: params.id,
        supervisorName: body.supervisorName,
        reportingMethod: body.reportingMethod,
        department: body.department,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(supervisor)
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

    const supervisor = await prisma.supervisor.update({
      where: { id: body.id },
      data: {
        supervisorName: body.supervisorName,
        reportingMethod: body.reportingMethod,
        department: body.department,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(supervisor)
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
    const supervisorId = searchParams.get('id')

    if (!supervisorId) {
      return handleError({ message: 'Supervisor ID is required', status: 400 })
    }

    await prisma.supervisor.delete({
      where: { id: supervisorId }
    })

    return successResponse({ message: 'Supervisor deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}

// Subordinates endpoints
export async function POST_SUBORDINATE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const subordinate = await prisma.subordinate.create({
      data: {
        employeeId: params.id,
        name: body.name,
        reportingMethod: body.reportingMethod,
        department: body.department,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(subordinate)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH_SUBORDINATE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const subordinate = await prisma.subordinate.update({
      where: { id: body.id },
      data: {
        name: body.name,
        reportingMethod: body.reportingMethod,
        department: body.department,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(subordinate)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE_SUBORDINATE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const subordinateId = searchParams.get('id')

    if (!subordinateId) {
      return handleError({ message: 'Subordinate ID is required', status: 400 })
    }

    await prisma.subordinate.delete({
      where: { id: subordinateId }
    })

    return successResponse({ message: 'Subordinate deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 