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
        federalStatus: true,
        federalExemptions: true,
        state: true,
        stateStatus: true,
        stateExemptions: true,
        unemploymentState: true,
        workState: true,
        additionalAmount: true,
        additionalAmountYTD: true,
        taxExemptions: true,
        taxExemptionsYTD: true,
        taxExemptionsEffectiveDate: true,
        taxExemptionsExpiryDate: true,
        taxExemptionsComments: true
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
        federalStatus: body.federalStatus,
        federalExemptions: body.federalExemptions ? parseInt(body.federalExemptions) : null,
        state: body.state,
        stateStatus: body.stateStatus,
        stateExemptions: body.stateExemptions ? parseInt(body.stateExemptions) : null,
        unemploymentState: body.unemploymentState,
        workState: body.workState,
        additionalAmount: body.additionalAmount ? parseFloat(body.additionalAmount) : null,
        additionalAmountYTD: body.additionalAmountYTD ? parseFloat(body.additionalAmountYTD) : null,
        taxExemptions: body.taxExemptions,
        taxExemptionsYTD: body.taxExemptionsYTD,
        taxExemptionsEffectiveDate: body.taxExemptionsEffectiveDate ? new Date(body.taxExemptionsEffectiveDate) : null,
        taxExemptionsExpiryDate: body.taxExemptionsExpiryDate ? new Date(body.taxExemptionsExpiryDate) : null,
        taxExemptionsComments: body.taxExemptionsComments
      },
      select: {
        federalStatus: true,
        federalExemptions: true,
        state: true,
        stateStatus: true,
        stateExemptions: true,
        unemploymentState: true,
        workState: true,
        additionalAmount: true,
        additionalAmountYTD: true,
        taxExemptions: true,
        taxExemptionsYTD: true,
        taxExemptionsEffectiveDate: true,
        taxExemptionsExpiryDate: true,
        taxExemptionsComments: true
      }
    })

    return successResponse(employee)
  } catch (error) {
    return handleError(error)
  }
} 