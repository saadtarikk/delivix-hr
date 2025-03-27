import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const salaryComponents = await prisma.salaryComponent.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(salaryComponents)
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

    const salaryComponent = await prisma.salaryComponent.create({
      data: {
        employeeId: params.id,
        component: body.component,
        amount: parseFloat(body.amount),
        currency: body.currency,
        frequency: body.frequency,
        directDeposit: body.directDeposit,
        accountNumber: body.accountNumber,
        bankName: body.bankName,
        routingNumber: body.routingNumber,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(salaryComponent)
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

    const salaryComponent = await prisma.salaryComponent.update({
      where: { id: body.id },
      data: {
        component: body.component,
        amount: parseFloat(body.amount),
        currency: body.currency,
        frequency: body.frequency,
        directDeposit: body.directDeposit,
        accountNumber: body.accountNumber,
        bankName: body.bankName,
        routingNumber: body.routingNumber,
        effectiveDate: new Date(body.effectiveDate),
        comments: body.comments
      }
    })

    return successResponse(salaryComponent)
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
    const componentId = searchParams.get('id')

    if (!componentId) {
      return handleError({ message: 'Component ID is required', status: 400 })
    }

    await prisma.salaryComponent.delete({
      where: { id: componentId }
    })

    return successResponse({ message: 'Salary component deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 