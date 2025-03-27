import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const memberships = await prisma.membership.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(memberships)
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

    const membership = await prisma.membership.create({
      data: {
        employeeId: params.id,
        name: body.name,
        subscriptionPaidBy: body.subscriptionPaidBy,
        subscriptionAmount: parseFloat(body.subscriptionAmount),
        currency: body.currency,
        subscriptionPeriod: body.subscriptionPeriod,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        renewalDate: new Date(body.renewalDate),
        comments: body.comments
      }
    })

    return successResponse(membership)
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

    const membership = await prisma.membership.update({
      where: { id: body.id },
      data: {
        name: body.name,
        subscriptionPaidBy: body.subscriptionPaidBy,
        subscriptionAmount: parseFloat(body.subscriptionAmount),
        currency: body.currency,
        subscriptionPeriod: body.subscriptionPeriod,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        renewalDate: new Date(body.renewalDate),
        comments: body.comments
      }
    })

    return successResponse(membership)
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
    const membershipId = searchParams.get('id')

    if (!membershipId) {
      return handleError({ message: 'Membership ID is required', status: 400 })
    }

    await prisma.membership.delete({
      where: { id: membershipId }
    })

    return successResponse({ message: 'Membership deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 