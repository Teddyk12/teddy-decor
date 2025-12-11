'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Mail, Phone, Calendar, DollarSign } from 'lucide-react';

interface Booking {
  id: number;
  client: string;
  email: string;
  phone: string;
  event: string;
  date: string;
  guests: number;
  status: string;
  value: string;
  notes: string;
}

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

export default function BookingsPage() {
  const demoBookings: Booking[] = [
    {
      id: 1,
      client: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      event: 'Wedding',
      date: '2025-12-15',
      guests: 150,
      status: 'Confirmed',
      value: '$3,500',
      notes: 'Rose gold theme, outdoor ceremony'
    },
    {
      id: 2,
      client: 'Mike Thompson',
      email: 'mike.t@email.com',
      phone: '(555) 234-5678',
      event: 'Birthday Party',
      date: '2025-11-28',
      guests: 50,
      status: 'Pending',
      value: '$850',
      notes: '30th birthday, superhero theme'
    },
    {
      id: 3,
      client: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '(555) 345-6789',
      event: 'Baby Shower',
      date: '2025-11-22',
      guests: 30,
      status: 'Confirmed',
      value: '$1,200',
      notes: 'Gender neutral colors, afternoon'
    },
    {
      id: 4,
      client: 'James Wilson',
      email: 'james.w@email.com',
      phone: '(555) 456-7890',
      event: 'Graduation',
      date: '2025-12-10',
      guests: 75,
      status: 'New',
      value: '$650',
      notes: 'Blue and gold school colors'
    },
    {
      id: 5,
      client: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      phone: '(555) 567-8901',
      event: 'Corporate Event',
      date: '2025-12-05',
      guests: 200,
      status: 'Confirmed',
      value: '$2,100',
      notes: 'Annual company celebration'
    },
    {
      id: 6,
      client: 'David Brown',
      email: 'david.b@email.com',
      phone: '(555) 678-9012',
      event: 'Wedding',
      date: '2026-01-20',
      guests: 120,
      status: 'New',
      value: '$4,200',
      notes: 'Winter wonderland theme'
    },
    {
      id: 7,
      client: 'Rachel Green',
      email: 'rachel.g@email.com',
      phone: '(555) 789-0123',
      event: 'Baby Shower',
      date: '2025-11-30',
      guests: 40,
      status: 'Pending',
      value: '$950',
      notes: 'Pink and white, girl baby'
    },
    {
      id: 8,
      client: 'Tom Harris',
      email: 'tom.h@email.com',
      phone: '(555) 890-1234',
      event: 'Birthday Party',
      date: '2025-12-18',
      guests: 60,
      status: 'Confirmed',
      value: '$1,100',
      notes: '50th milestone birthday'
    }
  ];

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>(demoBookings);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const parsed: SavedBooking[] = JSON.parse(savedBookings);
      // Convert to expected format
      const formatted: Booking[] = parsed.map((b) => ({
        id: b.id,
        client: b.name,
        email: b.email,
        phone: b.phone,
        event: b.eventType || 'Not Specified',
        date: b.eventDate || new Date().toISOString().split('T')[0],
        guests: 50, // Default
        status: b.status || 'New',
        value: '$1,200', // Default
        notes: b.message || ''
      }));
      setBookings(formatted);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filters = [
    { value: 'all', label: 'All Bookings', count: bookings.length },
    { value: 'new', label: 'New', count: bookings.filter(b => b.status === 'New').length },
    { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'Pending').length },
    { value: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'Confirmed').length },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status.toLowerCase() === filter;
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h1>
        <p className="text-gray-600">View and manage all client inquiries and bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === f.value
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full lg:w-64"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Guests
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {booking.client.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">{booking.client}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {booking.email}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Phone className="w-3 h-3 mr-1" />
                          {booking.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{booking.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.notes}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900 mb-1">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <p className="text-xs text-gray-500">{booking.guests} guests</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4 mr-0.5" />
                      {booking.value.replace('$', '')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
