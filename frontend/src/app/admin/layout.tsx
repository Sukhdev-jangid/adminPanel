'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../admincomponents/Header'
import Sidebar from '../admincomponents/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/login')
    }
    else{
      router.push('/admin')
    }
  }, [])

  return (
    <div>
      <Header />
      <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 h-[90vh] bg-[#F1EFFF] overflow-y-auto">{children}</main>
    </div>
    </div>
  )
}
