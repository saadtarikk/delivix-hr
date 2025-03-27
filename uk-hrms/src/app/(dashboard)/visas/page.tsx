import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"

const visas = [
  {
    id: 1,
    employeeName: "John Doe",
    visaType: "Skilled Worker",
    startDate: "2024-01-01",
    endDate: "2027-01-01",
    status: "Active",
    sponsorLicense: "ABC123",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    visaType: "Tier 2",
    startDate: "2023-06-01",
    endDate: "2026-06-01",
    status: "Active",
    sponsorLicense: "ABC123",
  },
  {
    id: 3,
    employeeName: "Mike Johnson",
    visaType: "Skilled Worker",
    startDate: "2022-12-01",
    endDate: "2025-12-01",
    status: "Active",
    sponsorLicense: "ABC123",
  },
]

export default function VisasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Visa Management</h1>
        <Link href="/visas/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Visa
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Visa List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search visas..." className="pl-8" />
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
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Visa Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">End Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Sponsor License</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visas.map((visa) => (
                  <tr key={visa.id} className="border-b">
                    <td className="px-4 py-2 text-sm">{visa.employeeName}</td>
                    <td className="px-4 py-2 text-sm">{visa.visaType}</td>
                    <td className="px-4 py-2 text-sm">{visa.startDate}</td>
                    <td className="px-4 py-2 text-sm">{visa.endDate}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {visa.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{visa.sponsorLicense}</td>
                    <td className="px-4 py-2 text-right">
                      <Link href={`/visas/${visa.id}`}>
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