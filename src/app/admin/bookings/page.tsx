'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Mail, Phone, Calendar, Check, X, MessageSquare, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Booking {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  event_time?: string;
  guest_count?: string;
  venue_name?: string;
  venue_address?: string;
  budget?: string;
  color_scheme?: string;
  theme?: string;
  special_requests?: string;
  status: string;
  admin_notes?: string;
  confirmed_at?: string;
  rejection_reason?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'confirm' | 'reject'>('confirm');
  const [adminMessage, setAdminMessage] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, bookings]);

  const loadBookings = async () => {
    const supabase = await getSupabase();

    if (supabase) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data);
        console.log('📊 Bookings loaded from Supabase:', data.length);
      }
    } else {
      // Fallback to localStorage
      const saved = localStorage.getItem('bookings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setBookings(parsed);
        } catch (error) {
          console.error('Error loading bookings:', error);
        }
      }
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(search) ||
        b.email.toLowerCase().includes(search) ||
        b.phone.includes(search) ||
        b.event_type.toLowerCase().includes(search)
      );
    }

    setFilteredBookings(filtered);
  };

  const openApprovalModal = (booking: Booking, action: 'confirm' | 'reject') => {
    setSelectedBooking(booking);
    setApprovalAction(action);
    setAdminMessage(action === 'confirm'
      ? `We're excited to work with you on your ${booking.event_type}! I'll be in touch within 24 hours to discuss the details and finalize everything.`
      : 'Unfortunately, we are unable to accommodate your booking for this date. Please contact us to discuss alternative dates that may work better.'
    );
    setShowApprovalModal(true);
  };

  const handleApproval = async () => {
    if (!selectedBooking) return;

    setLoading(true);

    try {
      const supabase = await getSupabase();
      const newStatus = approvalAction === 'confirm' ? 'Confirmed' : 'Rejected';

      if (supabase) {
        const updateData: any = {
          status: newStatus,
          admin_notes: adminMessage
        };

        if (approvalAction === 'confirm') {
          updateData.confirmed_at = new Date().toISOString();
        } else {
          updateData.rejection_reason = adminMessage;
        }

        const { error } = await supabase
          .from('bookings')
          .update(updateData)
          .eq('id', selectedBooking.id);

        if (error) throw error;

        // Send email if checkbox is checked
        if (sendEmail) {
          try {
            const emailResponse = await fetch('/api/send-booking-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                booking: selectedBooking,
                adminMessage,
                type: approvalAction === 'confirm' ? 'confirmation' : 'rejection'
              })
            });

            if (!emailResponse.ok) {
              console.error('Email sending failed');
              toast.error('Booking updated but email failed to send');
            } else {
              toast.success(`Booking ${newStatus.toLowerCase()} and email sent!`);
            }
          } catch (emailError) {
            console.error('Email error:', emailError);
            toast.error('Booking updated but email failed');
          }
        } else {
          toast.success(`Booking ${newStatus.toLowerCase()}!`);
        }

        // Reload bookings
        await loadBookings();
      }

      setShowApprovalModal(false);
      setSelectedBooking(null);
      setAdminMessage('');
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusCounts = {
    All: bookings.length,
    Pending: bookings.filter(b => b.status === 'Pending').length,
    Confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    Rejected: bookings.filter(b => b.status === 'Rejected').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600">Review and manage customer booking requests</p>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
        {['All', 'Pending', 'Confirmed', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold transition-all ${
              statusFilter === status
                ? 'bg-gradient-to-r from-teddy-green to-teddy-gold text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status} ({statusCounts[status as keyof typeof statusCounts]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or event type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teddy-green focus:border-transparent"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teddy-green to-teddy-gold flex items-center justify-center text-white font-bold">
                          {booking.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.name}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {booking.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{booking.event_type}</p>
                      {booking.guest_count && (
                        <p className="text-sm text-gray-600">{booking.guest_count} guests</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {new Date(booking.event_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      {booking.event_time && (
                        <p className="text-sm text-gray-600">{booking.event_time}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {booking.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => openApprovalModal(booking, 'confirm')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm Booking"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openApprovalModal(booking, 'reject')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Booking"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {approvalAction === 'confirm' ? '✅ Confirm Booking' : '❌ Reject Booking'}
              </h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-semibold text-gray-900 mb-2">{selectedBooking.name}</p>
              <p className="text-sm text-gray-600">{selectedBooking.event_type} - {new Date(selectedBooking.event_date).toLocaleDateString()}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Personal Message to Customer
              </label>
              <textarea
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teddy-green focus:border-transparent"
                placeholder="Add a personal message..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This message will be included in the email to the customer
              </p>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-5 h-5 text-teddy-green border-gray-300 rounded focus:ring-teddy-green"
                />
                <span className="text-sm font-medium text-gray-700">
                  Send email notification to customer
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApproval}
                disabled={loading}
                className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  approvalAction === 'confirm'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                    : 'bg-gradient-to-r from-red-600 to-rose-600'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {approvalAction === 'confirm' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    {approvalAction === 'confirm' ? 'Confirm Booking' : 'Reject Booking'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedBooking && !showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Client Name</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-medium text-gray-900">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Event Type</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.event_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Event Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedBooking.event_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {selectedBooking.event_time && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Event Time</p>
                    <p className="font-medium text-gray-900">{selectedBooking.event_time}</p>
                  </div>
                )}
                {selectedBooking.guest_count && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Guest Count</p>
                    <p className="font-medium text-gray-900">{selectedBooking.guest_count}</p>
                  </div>
                )}
                {selectedBooking.budget && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget</p>
                    <p className="font-medium text-gray-900">{selectedBooking.budget}</p>
                  </div>
                )}
                {selectedBooking.venue_name && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Venue</p>
                    <p className="font-medium text-gray-900">{selectedBooking.venue_name}</p>
                    {selectedBooking.venue_address && (
                      <p className="text-sm text-gray-600">{selectedBooking.venue_address}</p>
                    )}
                  </div>
                )}
                {selectedBooking.color_scheme && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Color Scheme</p>
                    <p className="font-medium text-gray-900">{selectedBooking.color_scheme}</p>
                  </div>
                )}
                {selectedBooking.theme && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Theme</p>
                    <p className="font-medium text-gray-900">{selectedBooking.theme}</p>
                  </div>
                )}
                {selectedBooking.special_requests && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                    <p className="font-medium text-gray-900">{selectedBooking.special_requests}</p>
                  </div>
                )}
                {selectedBooking.admin_notes && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Admin Notes</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-gray-900">{selectedBooking.admin_notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedBooking.status === 'Pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowApprovalModal(true);
                      setApprovalAction('confirm');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => {
                      setShowApprovalModal(true);
                      setApprovalAction('reject');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reject Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
