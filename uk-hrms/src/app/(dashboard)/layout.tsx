"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Bell, User, Users, FileText, Calendar, FolderOpen, UserCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // TODO: Get user role from auth context
  const isAdmin = true // Temporary for development

  const menuItems = [
    // Employee Menu Items
    {
      title: 'My Info',
      href: '/my-info/1', // TODO: Replace with actual user ID
      icon: UserCircle,
      adminOnly: false
    },
    {
      title: 'Attendance',
      href: '/attendance',
      icon: Calendar,
      adminOnly: false
    },
    // Admin Menu Items
    {
      title: 'Employee List',
      href: '/employees',
      icon: Users,
      adminOnly: true
    },
    {
      title: 'Visas',
      href: '/visas',
      icon: FileText,
      adminOnly: true
    },
    {
      title: 'Documents',
      href: '/documents',
      icon: FolderOpen,
      adminOnly: true
    },
    {
      title: 'Configuration',
      href: '/config',
      icon: Settings,
      adminOnly: true
    }
  ].filter(item => !item.adminOnly || isAdmin)

  const Navigation = () => (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname.startsWith(item.href)
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
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-card md:block md:w-64">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <User className="h-6 w-6" />
              <span>UK-HRMS</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Navigation />
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="flex h-14 items-center border-b bg-card px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-full flex-col">
                <div className="flex h-14 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <User className="h-6 w-6" />
                    <span>UK-HRMS</span>
                  </Link>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <Navigation />
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-2 flex-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <User className="h-6 w-6" />
              <span>UK-HRMS</span>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="h-[calc(100vh-3.5rem)] overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 