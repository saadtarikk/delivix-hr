'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function testConnection() {
      try {
        // Test database connection
        const { data, error } = await supabase.from('test').select('*').limit(1)
        
        if (error) {
          throw error
        }

        setStatus('success')
        setMessage('Successfully connected to Supabase!')
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Failed to connect to Supabase')
      }
    }

    testConnection()
  }, [supabase])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Supabase Connection Test</h1>
        
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${
            status === 'loading' ? 'bg-yellow-400' :
            status === 'success' ? 'bg-green-500' :
            'bg-red-500'
          }`} />
          <span className="text-gray-700">
            {status === 'loading' ? 'Testing connection...' :
             status === 'success' ? 'Connected' :
             'Connection failed'}
          </span>
        </div>

        {message && (
          <div className={`rounded-md p-4 ${
            status === 'success' ? 'bg-green-50 text-green-700' :
            status === 'error' ? 'bg-red-50 text-red-700' :
            'bg-yellow-50 text-yellow-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
} 