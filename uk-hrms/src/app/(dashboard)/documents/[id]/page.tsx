import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

interface DocumentFormPageProps {
  params: {
    id: string
  }
}

export default function DocumentFormPage({ params }: DocumentFormPageProps) {
  const isEditing = params.id !== "new"

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/documents">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">
          {isEditing ? "Edit Document" : "Add New Document"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                    <SelectItem value="3">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input id="name" placeholder="Enter document name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="identity">Identity</SelectItem>
                    <SelectItem value="work-auth">Work Authorization</SelectItem>
                    <SelectItem value="background">Background Check</SelectItem>
                    <SelectItem value="qualification">Qualification</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input type="date" id="expiryDate" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Document File</Label>
              <div className="flex items-center space-x-4">
                <Input type="file" id="file" className="hidden" />
                <Button variant="outline" type="button">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <span className="text-sm text-gray-500">No file selected</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes" />
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/documents">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 