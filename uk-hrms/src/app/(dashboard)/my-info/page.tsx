import { redirect } from 'next/navigation'

export default function MyInfoPage() {
  // TODO: Get actual user ID from auth context
  redirect('/my-info/1')
} 