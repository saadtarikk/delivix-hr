'use client'

import { useEffect, useState } from 'react'

export default function BodyWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the children, but use mounted state for any client-side-only features
  return (
    <div data-mounted={mounted}>
      {children}
    </div>
  )
} 