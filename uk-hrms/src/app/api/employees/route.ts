import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getPaginated, create, getById, update, remove } from '@/lib/supabase/utils'
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '@/types/api'
import { Status } from '@/types/database'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get('page') || '1')
  const limit = Number.parseInt(searchParams.get('limit') || '10')
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined

  const response = await getPaginated('employees', {
    page,
    limit,
    sortBy,
    sortOrder
  })

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body: CreateEmployeeRequest = await request.json()
  const supabase = createClient()

  // Create auth user first
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: body.email,
    email_confirm: true,
    user_metadata: {
      first_name: body.first_name,
      last_name: body.last_name
    }
  })

  if (authError) {
    return NextResponse.json(
      { error: authError.message },
      { status: 400 }
    )
  }

  // Create employee record
  const response = await create('employees', {
    ...body,
    user_id: authData.user.id,
    status: 'pending' as Status
  })

  return NextResponse.json(response)
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: UpdateEmployeeRequest = await request.json()

  if (!id) {
    return NextResponse.json(
      { error: 'Employee ID is required' },
      { status: 400 }
    )
  }

  const response = await update('employees', id, {
    ...body,
    status: body.status as Status
  })

  return NextResponse.json(response)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Employee ID is required' },
      { status: 400 }
    )
  }

  const response = await remove('employees', id)
  return NextResponse.json(response)
} 