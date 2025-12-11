'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image,
  BarChart3,
  Settings,
  Menu,
  X,
  FileText,
  LogOut,
  Bell,
  Clock
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check authentication on mount
    const auth = localStorage.getItem('adminAuth');
    if (pathname !== '/admin/login' && !auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);

    // Simulate new booking notification (demo)
    const notificationInterval = setInterval(() => {
      if (auth && Math.random() > 0.95) { // 5% chance every 10 seconds
        toast.success('New Booking Inquiry!', {
          description: 'A new client has submitted a booking request',
          action: {
            label: 'View',
            onClick: () => router.push('/admin/bookings')
          }
        });
      }
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: FileText },
    { name: 'Calendar', href: '/admin/calendar', icon: Calendar },
    { name: 'Availability', href: '/admin/availability', icon: Clock },
    { name: 'Home Editor', href: '/admin/home-images', icon: Image },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Show loading or login page
  if (loading || pathname === '/admin/login') {
    return (
      <>
        <Toaster position="top-right" richColors />
        {children}
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Teddy Decor
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  Y
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Yohannes</p>
                  <p className="text-xs text-gray-500 truncate">Admin</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Mobile header */}
          <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Teddy Decor
            </span>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Page content */}
          {children}
        </div>
      </div>
    </>
  );
}
