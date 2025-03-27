import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Upload } from "lucide-react"
import Link from "next/link"

const documents = [
  {
    id: 1,
    name: "Passport",
    employeeName: "John Doe",
    category: "Identity",
    uploadDate: "2024-03-27",
    expiryDate: "2025-03-27",
    status: "Valid",
  },
  {
    id: 2,
    name: "Right to Work",
    employeeName: "Jane Smith",
    category: "Work Authorization",
    uploadDate: "2024-03-26",
    expiryDate: "2024-09-26",
    status: "Valid",
  },
  {
    id: 3,
    name: "DBS Check",
    employeeName: "Mike Johnson",
    category: "Background Check",
    uploadDate: "2024-03-25",
    expiryDate: "2025-03-25",
    status: "Valid",
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Link href="/documents/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Document List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search documents..." className="pl-8" />
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
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Document Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Employee</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Upload Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Expiry Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id} className="border-b">
                    <td className="px-4 py-2 text-sm">{document.name}</td>
                    <td className="px-4 py-2 text-sm">{document.employeeName}</td>
                    <td className="px-4 py-2 text-sm">{document.category}</td>
                    <td className="px-4 py-2 text-sm">{document.uploadDate}</td>
                    <td className="px-4 py-2 text-sm">{document.expiryDate}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        document.status === "Valid"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                        {document.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link href={`/documents/${document.id}`}>
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