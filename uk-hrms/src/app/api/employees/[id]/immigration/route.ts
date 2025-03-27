import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const immigrationRecords = await prisma.immigrationRecord.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(immigrationRecords)
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

    const immigrationRecord = await prisma.immigrationRecord.create({
      data: {
        employeeId: params.id,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        issuedDate: new Date(body.issuedDate),
        expiryDate: new Date(body.expiryDate),
        country: body.country,
        status: body.status,
        reviewDate: body.reviewDate ? new Date(body.reviewDate) : null,
        comments: body.comments
      }
    })

    return successResponse(immigrationRecord)
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

    const immigrationRecord = await prisma.immigrationRecord.update({
      where: { id: body.id },
      data: {
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        issuedDate: new Date(body.issuedDate),
        expiryDate: new Date(body.expiryDate),
        country: body.country,
        status: body.status,
        reviewDate: body.reviewDate ? new Date(body.reviewDate) : null,
        comments: body.comments
      }
    })

    return successResponse(immigrationRecord)
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
    const recordId = searchParams.get('id')

    if (!recordId) {
      return handleError({ message: 'Record ID is required', status: 400 })
    }

    await prisma.immigrationRecord.delete({
      where: { id: recordId }
    })

    return successResponse({ message: 'Immigration record deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 