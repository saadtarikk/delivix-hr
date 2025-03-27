"use client"

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User, Phone, Users, FileText, Briefcase, CreditCard, Receipt, UserPlus, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface EmployeeMenuProps {
  employeeId: string
  isSelf?: boolean
}

export function EmployeeMenu({ employeeId, isSelf = false }: EmployeeMenuProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Personal Details',
      href: `/my-info/${employeeId}`,
      icon: User,
      adminOnly: false
    },
    {
      title: 'Contact Details',
      href: `/my-info/${employeeId}/contact`,
      icon: Phone,
      adminOnly: false
    },
    {
      title: 'Emergency Contacts',
      href: `/my-info/${employeeId}/emergency`,
      icon: Users,
      adminOnly: false
    },
    {
      title: 'Dependents',
      href: `/my-info/${employeeId}/dependents`,
      icon: UserPlus,
      adminOnly: false
    },
    {
      title: 'Immigration',
      href: `/my-info/${employeeId}/immigration`,
      icon: FileText,
      adminOnly: false
    },
    {
      title: 'Job Details',
      href: `/my-info/${employeeId}/job`,
      icon: Briefcase,
      adminOnly: true
    },
    {
      title: 'Salary',
      href: `/my-info/${employeeId}/salary`,
      icon: CreditCard,
      adminOnly: true
    },
    {
      title: 'Tax Exemptions',
      href: `/my-info/${employeeId}/tax`,
      icon: Receipt,
      adminOnly: true
    },
    {
      title: 'Report-to',
      href: `/my-info/${employeeId}/report-to`,
      icon: Users,
      adminOnly: true
    },
    {
      title: 'Qualifications',
      href: `/my-info/${employeeId}/qualifications`,
      icon: GraduationCap,
      adminOnly: false
    },
    {
      title: 'Memberships',
      href: `/my-info/${employeeId}/memberships`,
      icon: Award,
      adminOnly: false
    }
  ]

  return (
    <div className="w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-sm font-semibold">
            {isSelf ? 'My Information' : 'Employee Information'}
          </h2>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
} 