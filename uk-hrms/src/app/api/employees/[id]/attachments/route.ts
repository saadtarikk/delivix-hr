import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'
import { put } from '@vercel/blob'
import { del } from '@vercel/blob'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const attachments = await prisma.attachment.findMany({
      where: { employeeId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(attachments)
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
    const formData = await request.formData()
    const file = formData.get('file') as File
    const comments = formData.get('comments') as string

    if (!file) {
      return handleError({ message: 'File is required', status: 400 })
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    })

    // Create attachment record in database
    const attachment = await prisma.attachment.create({
      data: {
        employeeId: params.id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: blob.url,
        comments
      }
    })

    return successResponse(attachment)
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
    const attachmentId = searchParams.get('id')

    if (!attachmentId) {
      return handleError({ message: 'Attachment ID is required', status: 400 })
    }

    // Get attachment details
    const attachment = await prisma.attachment.findUnique({
      where: { id: attachmentId }
    })

    if (!attachment) {
      return handleError({ message: 'Attachment not found', status: 404 })
    }

    // Delete file from Vercel Blob
    await del(attachment.url)

    // Delete attachment record from database
    await prisma.attachment.delete({
      where: { id: attachmentId }
    })

    return successResponse({ message: 'Attachment deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 