import { createClient } from './client'
import { Database } from '@/types/database'
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'

type TableName = keyof Database['public']['Tables']
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row']
type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert']
type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update']

export async function getById<T extends TableName>(
  table: T,
  id: string
): Promise<ApiResponse<TableRow<T> | null>> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data }
}

export async function getPaginated<T extends TableName>(
  table: T,
  params: PaginationParams
): Promise<PaginatedResponse<TableRow<T>[]>> {
  const { page = 1, limit = 10, sortBy, sortOrder } = params
  const supabase = createClient()

  let query = supabase.from(table).select('*', { count: 'exact' })

  if (sortBy) {
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })
  }

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1)

  if (error) {
    return {
      data: [],
      error: error.message,
      total: 0,
      page,
      limit,
      totalPages: 0
    }
  }

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

export async function create<T extends TableName>(
  table: T,
  data: TableInsert<T>
): Promise<ApiResponse<TableRow<T> | null>> {
  const supabase = createClient()
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: result }
}

export async function update<T extends TableName>(
  table: T,
  id: string,
  data: TableUpdate<T>
): Promise<ApiResponse<TableRow<T> | null>> {
  const supabase = createClient()
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: result }
}

export async function remove<T extends TableName>(
  table: T,
  id: string
): Promise<ApiResponse<boolean>> {
  const supabase = createClient()
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)

  if (error) {
    return { data: false, error: error.message }
  }

  return { data: true }
} 