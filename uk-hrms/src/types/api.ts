import { Database } from './database'

// Generic API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number
  page: number
  limit: number
  totalPages: number
}

// API request types
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams extends PaginationParams {
  search?: string
  status?: string
  startDate?: string
  endDate?: string
}

// Employee API types
export interface CreateEmployeeRequest {
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  nationality?: string
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  status?: string
}

// Visa API types
export interface CreateVisaRequest {
  employee_id: string
  visa_type: string
  visa_number: string
  issue_date: string
  expiry_date: string
  document_url?: string
}

export interface UpdateVisaRequest extends Partial<CreateVisaRequest> {
  status?: string
}

// Document API types
export interface UploadDocumentRequest {
  employee_id: string
  type: string
  title: string
  file: File
  expiry_date?: string
}

// Attendance API types
export interface CreateAttendanceRequest {
  employee_id: string
  date: string
  check_in?: string
  check_out?: string
  notes?: string
}

export interface UpdateAttendanceRequest extends Partial<CreateAttendanceRequest> {
  status?: string
}

// Database types
export type Tables = Database['public']['Tables']
export type TableName = keyof Tables
export type TableRow<T extends TableName> = Tables[T]['Row']
export type TableInsert<T extends TableName> = Tables[T]['Insert']
export type TableUpdate<T extends TableName> = Tables[T]['Update'] 