'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  PlusCircle,
  ListChecks,
  MessageSquare,
  UserCircle,
  Users,
  ShoppingCart,
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'All Courses',
    href: '/admin/courses',
    icon: <ListChecks className="w-5 h-5" />,
  },
  {
    label: 'Add Course',
    href: '/admin/add-course',
    icon: <PlusCircle className="w-5 h-5" />,
  },
  {
    label: 'All Users',
    href: '/admin/users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: 'Profile',
    href: '/admin/profile',
    icon:<UserCircle className="w-5 h-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 bg-white border-r">
      <nav className="mt-4 space-y-1 ">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-8 py-4
                ${isActive ? 'bg-[#f1efff] border-r-4 border-[#5a4bff] text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
