'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '../admincomponents/Header';
import Sidebar from '../admincomponents/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const storedToken = localStorage.getItem("adminToken");
    setToken(storedToken);

    if (!storedToken && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }

    if (storedToken && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [pathname]);

  if (!mounted) return null;

  const isLoginPage = pathname === "/admin/login";

  return isLoginPage ? (
    <>{children}</>
  ) : (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-1 md:p-6 h-[90vh] bg-[#f5f5f5] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
