import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: 'Total Employees',
    value: '0',
    icon: Users,
    href: '/employees',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Active Visas',
    value: '0',
    icon: FileText,
    href: '/visas',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'On Leave Today',
    value: '0',
    icon: Calendar,
    href: '/attendance',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Expiring Documents',
    value: '0',
    icon: AlertCircle,
    href: '/documents',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New employee added</p>
                <p className="text-sm text-gray-500">John Doe was added to the system</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Visa document updated</p>
                <p className="text-sm text-gray-500">Jane Smith's visa was renewed</p>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Leave request submitted</p>
                <p className="text-sm text-gray-500">Mike Johnson requested annual leave</p>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Visa Expiry</p>
                <p className="text-sm text-gray-500">3 visas expiring in the next 30 days</p>
              </div>
              <Link href="/visas" className="text-sm text-purple-600 hover:text-purple-700">
                View
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Leave Requests</p>
                <p className="text-sm text-gray-500">5 pending leave requests</p>
              </div>
              <Link href="/attendance" className="text-sm text-purple-600 hover:text-purple-700">
                View
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 