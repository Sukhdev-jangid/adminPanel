'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Home,
  PlusCircle,
  ListChecks,
  UserCircle,
  Users,
  ShoppingCart,
  Menu,
  X,
  PlusSquare,
  Library,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    label: 'All E-Books',
    href: '/admin/ebooks',
    icon: <Library className="w-5 h-5" />,
  },
  {
    label: 'Add E-Book',
    href: '/admin/add-ebook',
    icon: <PlusSquare className="w-5 h-5" />,
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
    icon: <UserCircle className="w-5 h-5" />,
  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.replace("/admin/login");
  }

  return (
    <header className="h-[10vh] w-full px-4 sm:px-10 border-b py-3 flex items-center justify-between bg-white  relative z-50">
      {/* Left: Logo + Brand */}
      <div onClick={()=>router.push('/admin')} className="flex items-center space-x-3 cursor-pointer">
        <Image
          src="/images/profileImage.jpg"
          alt="Sunil Logo"
          width={42}
          height={42}
          className="rounded-full"
        />
        <span className="text-lg font-semibold text-black">Sunil Soni</span>
      </div>

      {/* Right: Menu + Logout */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleLogout}
          variant="blue"
          size="sm"
          className="text-sm"
        >
          Logout
        </Button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 border-b ${
                    isActive
                      ? 'bg-[#f1efff] border-l-4 border-[#5a4bff] text-black font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
