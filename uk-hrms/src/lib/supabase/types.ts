import { Database } from '@/types/database'

export type SupabaseClient = {
  database: Database
  auth: {
    user: {
      id: string
      email: string
      role: string
    } | null
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>
    signOut: () => Promise<{ error: Error | null }>
  }
} 