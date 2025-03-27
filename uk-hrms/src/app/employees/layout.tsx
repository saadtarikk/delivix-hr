export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto py-4">
          <nav className="flex items-center space-x-4">
            <a
              href="/employees"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Employees
            </a>
            <a
              href="/visas"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Visas
            </a>
            <a
              href="/attendance"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Attendance
            </a>
          </nav>
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
} 