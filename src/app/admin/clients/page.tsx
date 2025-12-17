'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Calendar, MapPin, Tag } from 'lucide-react';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      totalEvents: 1,
      totalSpent: '$3,500',
      lastEvent: '2025-12-15',
      tags: ['Wedding', 'High Value']
    },
    {
      id: 2,
      name: 'Mike Thompson',
      email: 'mike.t@email.com',
      phone: '(555) 234-5678',
      location: 'Los Angeles, CA',
      totalEvents: 2,
      totalSpent: '$1,700',
      lastEvent: '2025-11-28',
      tags: ['Birthday', 'Repeat Client']
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '(555) 345-6789',
      location: 'Chicago, IL',
      totalEvents: 1,
      totalSpent: '$1,200',
      lastEvent: '2025-11-22',
      tags: ['Baby Shower']
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@email.com',
      phone: '(555) 456-7890',
      location: 'Houston, TX',
      totalEvents: 1,
      totalSpent: '$650',
      lastEvent: '2025-12-10',
      tags: ['Graduation']
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      phone: '(555) 567-8901',
      location: 'Phoenix, AZ',
      totalEvents: 3,
      totalSpent: '$5,400',
      lastEvent: '2025-12-05',
      tags: ['Corporate', 'VIP', 'Repeat Client']
    },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Database</h1>
        <p className="text-gray-600">Manage your client relationships and history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Clients', value: clients.length, color: 'rose' },
          { label: 'Repeat Clients', value: clients.filter(c => c.totalEvents > 1).length, color: 'purple' },
          { label: 'VIP Clients', value: clients.filter(c => c.tags.includes('VIP')).length, color: 'blue' },
          { label: 'Total Revenue', value: `$${clients.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[$,]/g, '')), 0).toLocaleString()}`, color: 'green' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {client.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {client.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {client.phone}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600 mb-1">Events</p>
                <p className="text-lg font-bold text-gray-900">{client.totalEvents}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Spent</p>
                <p className="text-lg font-bold text-gray-900">{client.totalSpent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Last Event</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(client.lastEvent).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-teddy-green-dark rounded-full text-xs font-semibold flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <p className="text-gray-500">No clients found matching your search</p>
        </div>
      )}
    </div>
  );
}
