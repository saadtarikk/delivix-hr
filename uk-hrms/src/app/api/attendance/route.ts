import { NextResponse } from 'next/server'
import { getPaginated, create, getById, update, remove } from '@/lib/supabase/utils'
import { CreateAttendanceRequest, UpdateAttendanceRequest } from '@/types/api'
import { AttendanceStatus } from '@/types/database'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get('page') || '1')
  const limit = Number.parseInt(searchParams.get('limit') || '10')
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined
  const employeeId = searchParams.get('employeeId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const response = await getPaginated('attendance_records', {
    page,
    limit,
    sortBy,
    sortOrder
  })

  // Filter by employee and date range if specified
  if (employeeId) {
    response.data = response.data.filter(record => record.employee_id === employeeId)
  }

  if (startDate && endDate) {
    response.data = response.data.filter(record => {
      const recordDate = new Date(record.date)
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate)
    })
  }

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body: CreateAttendanceRequest = await request.json()
  const response = await create('attendance_records', {
    ...body,
    status: 'present' as AttendanceStatus
  })

  return NextResponse.json(response)
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: UpdateAttendanceRequest = await request.json()

  if (!id) {
    return NextResponse.json(
      { error: 'Attendance record ID is required' },
      { status: 400 }
    )
  }

  const response = await update('attendance_records', id, {
    ...body,
    status: (body.status || 'present') as AttendanceStatus
  })

  return NextResponse.json(response)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Attendance record ID is required' },
      { status: 400 }
    )
  }

  const response = await remove('attendance_records', id)
  return NextResponse.json(response)
} 