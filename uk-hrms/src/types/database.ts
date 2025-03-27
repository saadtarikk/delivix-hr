// Common types
export type Status = 'active' | 'inactive' | 'pending' | 'expired' | 'rejected' | 'revoked'
export type DocumentType = 'passport' | 'visa' | 'right_to_work' | 'other'
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'early_leave'

// Base interface for all entities
export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

// Employee types
export interface Employee extends BaseEntity {
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  nationality?: string
  status: Status
}

// Visa types
export interface VisaRecord extends BaseEntity {
  employee_id: string
  visa_type: string
  visa_number: string
  issue_date: string
  expiry_date: string
  status: Status
  document_url?: string
}

// Sponsor License types
export interface SponsorLicense extends BaseEntity {
  company_name: string
  license_number: string
  issue_date: string
  expiry_date: string
  status: Status
  document_url?: string
}

// Attendance types
export interface AttendanceRecord extends BaseEntity {
  employee_id: string
  date: string
  check_in?: string
  check_out?: string
  status: AttendanceStatus
  notes?: string
}

// Document types
export interface Document extends BaseEntity {
  employee_id: string
  type: DocumentType
  title: string
  file_url: string
  expiry_date?: string
  status: Status
}

// Department types
export interface Department extends BaseEntity {
  name: string
  description?: string
  manager_id?: string
  status: Status
}

// Position types
export interface Position extends BaseEntity {
  title: string
  department_id: string
  description?: string
  status: Status
}

// Employee Position types
export interface EmployeePosition extends BaseEntity {
  employee_id: string
  position_id: string
  start_date: string
  end_date?: string
  status: Status
}

// Right to Work types
export interface RightToWork extends BaseEntity {
  employee_id: string
  document_type: string
  document_number: string
  issue_date: string
  expiry_date: string
  status: Status
  document_url: string
  verified_by?: string
  verified_at?: string
}

// Work Shift types
export interface WorkShift extends BaseEntity {
  name: string
  start_time: string
  end_time: string
  break_duration?: number
  status: Status
}

// Employee Shift types
export interface EmployeeShift extends BaseEntity {
  employee_id: string
  shift_id: string
  start_date: string
  end_date?: string
  status: Status
}

// Audit Log types
export interface AuditLog extends BaseEntity {
  user_id?: string
  action: string
  entity_type: string
  entity_id: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
}

// Database schema type
export interface Database {
  public: {
    Tables: {
      employees: {
        Row: Employee
        Insert: Omit<Employee, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Employee, 'id' | 'created_at' | 'updated_at'>>
      }
      visa_records: {
        Row: VisaRecord
        Insert: Omit<VisaRecord, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VisaRecord, 'id' | 'created_at' | 'updated_at'>>
      }
      sponsor_licenses: {
        Row: SponsorLicense
        Insert: Omit<SponsorLicense, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SponsorLicense, 'id' | 'created_at' | 'updated_at'>>
      }
      attendance_records: {
        Row: AttendanceRecord
        Insert: Omit<AttendanceRecord, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AttendanceRecord, 'id' | 'created_at' | 'updated_at'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Document, 'id' | 'created_at' | 'updated_at'>>
      }
      departments: {
        Row: Department
        Insert: Omit<Department, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Department, 'id' | 'created_at' | 'updated_at'>>
      }
      positions: {
        Row: Position
        Insert: Omit<Position, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Position, 'id' | 'created_at' | 'updated_at'>>
      }
      employee_positions: {
        Row: EmployeePosition
        Insert: Omit<EmployeePosition, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EmployeePosition, 'id' | 'created_at' | 'updated_at'>>
      }
      right_to_work: {
        Row: RightToWork
        Insert: Omit<RightToWork, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<RightToWork, 'id' | 'created_at' | 'updated_at'>>
      }
      work_shifts: {
        Row: WorkShift
        Insert: Omit<WorkShift, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<WorkShift, 'id' | 'created_at' | 'updated_at'>>
      }
      employee_shifts: {
        Row: EmployeeShift
        Insert: Omit<EmployeeShift, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EmployeeShift, 'id' | 'created_at' | 'updated_at'>>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AuditLog, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 