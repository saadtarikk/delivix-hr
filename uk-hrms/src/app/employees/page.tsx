'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Employee } from '@/types/database'
import { useRouter } from 'next/navigation'

const columns = [
  {
    key: 'first_name',
    header: 'First Name',
  },
  {
    key: 'last_name',
    header: 'Last Name',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'phone',
    header: 'Phone',
  },
  {
    key: 'status',
    header: 'Status',
    cell: (employee: Employee) => (
      <span className={`capitalize ${
        employee.status === 'active' ? 'text-green-600' :
        employee.status === 'inactive' ? 'text-red-600' :
        employee.status === 'pending' ? 'text-yellow-600' :
        'text-gray-600'
      }`}>
        {employee.status}
      </span>
    ),
  },
]

export default function EmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sortBy, setSortBy] = useState<string>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [page, limit, sortBy, sortOrder])

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      })

      const response = await fetch(`/api/employees?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch employees')
      }

      setEmployees(data.data)
      setTotal(data.total)
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return
    }

    try {
      const response = await fetch(`/api/employees?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete employee')
      }

      fetchEmployees()
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => router.push('/employees/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSortChange={(sortBy, sortOrder) => {
          setSortBy(sortBy)
          setSortOrder(sortOrder)
        }}
        sortBy={sortBy}
        sortOrder={sortOrder}
        isLoading={isLoading}
      />
    </div>
  )
} 