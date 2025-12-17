'use client';

import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Eye, MousePointer, Heart } from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    { title: 'Total Revenue', value: '$45,280', change: '+23%', trend: 'up', icon: DollarSign },
    { title: 'Website Visitors', value: '12,456', change: '+18%', trend: 'up', icon: Eye },
    { title: 'Conversions', value: '156', change: '+12%', trend: 'up', icon: Users },
    { title: 'Avg. Booking Value', value: '$1,850', change: '-5%', trend: 'down', icon: Heart },
  ];

  const popularServices = [
    { name: 'Wedding Decor', bookings: 45, revenue: '$18,500', percentage: 40 },
    { name: 'Birthday Parties', bookings: 38, revenue: '$12,800', percentage: 25 },
    { name: 'Baby Showers', bookings: 32, revenue: '$8,400', percentage: 18 },
    { name: 'Graduations', bookings: 24, revenue: '$4,200', percentage: 10 },
    { name: 'Corporate Events', bookings: 17, revenue: '$8,900', percentage: 7 },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 3200 },
    { month: 'Feb', revenue: 2800 },
    { month: 'Mar', revenue: 4100 },
    { month: 'Apr', revenue: 3900 },
    { month: 'May', revenue: 4500 },
    { month: 'Jun', revenue: 5200 },
    { month: 'Jul', revenue: 4800 },
    { month: 'Aug', revenue: 5500 },
    { month: 'Sep', revenue: 6200 },
    { month: 'Oct', revenue: 5800 },
    { month: 'Nov', revenue: 6500 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
        <p className="text-gray-600">Track your business performance and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teddy-green to-teddy-gold">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Revenue</h2>
          <div className="space-y-3">
            {monthlyRevenue.map((data, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1 ml-4">
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teddy-green to-teddy-gold rounded-lg flex items-center justify-end pr-3"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    >
                      <span className="text-white text-xs font-semibold">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Services</h2>
          <div className="space-y-4">
            {popularServices.map((service, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{service.revenue}</p>
                    <p className="text-sm text-gray-600">{service.percentage}%</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teddy-green to-teddy-gold rounded-full"
                    style={{ width: `${service.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Best Month</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">November</p>
            <p className="text-sm text-gray-600">$6,500 in revenue</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Most Popular</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">Weddings</p>
            <p className="text-sm text-gray-600">45 bookings this year</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Repeat Rate</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">32%</p>
            <p className="text-sm text-gray-600">Clients booking again</p>
          </div>
        </div>
      </div>
    </div>
  );
}
