import { NextResponse } from 'next/server'
import { getPaginated, create, getById, update, remove } from '@/lib/supabase/utils'
import { CreateVisaRequest, UpdateVisaRequest } from '@/types/api'
import { Status } from '@/types/database'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get('page') || '1')
  const limit = Number.parseInt(searchParams.get('limit') || '10')
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined
  const employeeId = searchParams.get('employeeId')

  const response = await getPaginated('visa_records', {
    page,
    limit,
    sortBy,
    sortOrder
  })

  // Filter by employee if specified
  if (employeeId) {
    response.data = response.data.filter(record => record.employee_id === employeeId)
  }

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body: CreateVisaRequest = await request.json()
  const response = await create('visa_records', {
    ...body,
    status: 'pending' as Status
  })

  return NextResponse.json(response)
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: UpdateVisaRequest = await request.json()

  if (!id) {
    return NextResponse.json(
      { error: 'Visa record ID is required' },
      { status: 400 }
    )
  }

  const response = await update('visa_records', id, {
    ...body,
    status: (body.status || 'pending') as Status
  })

  return NextResponse.json(response)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Visa record ID is required' },
      { status: 400 }
    )
  }

  const response = await remove('visa_records', id)
  return NextResponse.json(response)
} 