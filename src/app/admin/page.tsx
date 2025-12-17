'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Image, Mail, DollarSign, TrendingUp, Clock, CheckCircle, Palette, Settings } from 'lucide-react';
import Link from 'next/link';

interface SavedBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType?: string;
  eventDate?: string;
  status?: string;
  message?: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);
  const stats = [
    {
      title: 'Total Inquiries',
      value: '24',
      change: '+12%',
      icon: Mail,
      color: 'from-teddy-green to-teddy-gold'
    },
    {
      title: 'Upcoming Events',
      value: '8',
      change: '+3',
      icon: Calendar,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Total Clients',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Revenue (MTD)',
      value: '$12,450',
      change: '+23%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      client: 'Sarah Johnson',
      event: 'Wedding',
      date: '2025-12-15',
      status: 'Confirmed',
      value: '$3,500'
    },
    {
      id: 2,
      client: 'Mike Thompson',
      event: 'Birthday Party',
      date: '2025-11-28',
      status: 'Pending',
      value: '$850'
    },
    {
      id: 3,
      client: 'Emily Davis',
      event: 'Baby Shower',
      date: '2025-11-22',
      status: 'Confirmed',
      value: '$1,200'
    },
    {
      id: 4,
      client: 'James Wilson',
      event: 'Graduation',
      date: '2025-12-10',
      status: 'New',
      value: '$650'
    },
    {
      id: 5,
      client: 'Lisa Anderson',
      event: 'Corporate Event',
      date: '2025-12-05',
      status: 'Confirmed',
      value: '$2,100'
    }
  ];

  const quickActions = [
    { label: 'Upload to Gallery', icon: Image, href: '/admin/gallery', color: 'purple' },
    { label: 'Manage Logo', icon: Palette, href: '/admin/logo', color: 'rose' },
    { label: 'View Bookings', icon: Calendar, href: '/admin/bookings', color: 'blue' },
    { label: 'Change Password', icon: Settings, href: '/admin/password', color: 'gray' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'New': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-teddy-green transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${action.color}-100 mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${action.color}-600`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                  <Link
                    href="/admin/bookings"
                    className="text-sm font-medium text-teddy-green hover:text-teddy-green-dark"
                  >
                    View All →
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                              {booking.client.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{booking.client}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {booking.event}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {booking.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New inquiry from Sarah Johnson', time: '2 hours ago', icon: Mail },
                  { action: 'Event confirmed for Mike Thompson', time: '5 hours ago', icon: CheckCircle },
                  { action: 'Payment received - $3,500', time: '1 day ago', icon: DollarSign },
                  { action: '12 new gallery images uploaded', time: '2 days ago', icon: Image },
                  { action: 'Website traffic up 23%', time: '3 days ago', icon: TrendingUp }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-teddy-green" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
