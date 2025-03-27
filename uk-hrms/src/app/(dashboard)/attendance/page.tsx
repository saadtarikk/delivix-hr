import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Calendar } from "lucide-react"
import Link from "next/link"

const attendance = [
  {
    id: 1,
    employeeName: "John Doe",
    date: "2024-03-27",
    checkIn: "09:00",
    checkOut: "17:00",
    status: "Present",
    leaveType: null,
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    date: "2024-03-27",
    checkIn: "08:45",
    checkOut: "17:30",
    status: "Present",
    leaveType: null,
  },
  {
    id: 3,
    employeeName: "Mike Johnson",
    date: "2024-03-27",
    checkIn: null,
    checkOut: null,
    status: "On Leave",
    leaveType: "Annual Leave",
  },
]

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Attendance Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Link href="/attendance/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Attendance
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search attendance..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Employee</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Check In</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Check Out</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Leave Type</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="px-4 py-2 text-sm">{record.employeeName}</td>
                    <td className="px-4 py-2 text-sm">{record.date}</td>
                    <td className="px-4 py-2 text-sm">{record.checkIn || "-"}</td>
                    <td className="px-4 py-2 text-sm">{record.checkOut || "-"}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{record.leaveType || "-"}</td>
                    <td className="px-4 py-2 text-right">
                      <Link href={`/attendance/${record.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 