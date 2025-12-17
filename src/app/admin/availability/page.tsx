'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AvailabilityPage() {
  const [weekDays, setWeekDays] = useState({
    monday: { open: true, hours: '9:00 AM - 6:00 PM' },
    tuesday: { open: true, hours: '9:00 AM - 6:00 PM' },
    wednesday: { open: true, hours: '9:00 AM - 6:00 PM' },
    thursday: { open: true, hours: '9:00 AM - 6:00 PM' },
    friday: { open: true, hours: '9:00 AM - 6:00 PM' },
    saturday: { open: true, hours: '10:00 AM - 4:00 PM' },
    sunday: { open: false, hours: 'By Appointment' }
  });

  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Load saved availability from localStorage
    const saved = localStorage.getItem('availability');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.weekDays) setWeekDays(data.weekDays);
      if (data.blockedDates) setBlockedDates(data.blockedDates);
    }
  }, []);

  const toggleDay = (day: string) => {
    setWeekDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        open: !prev[day as keyof typeof prev].open
      }
    }));
  };

  const updateHours = (day: string, hours: string) => {
    setWeekDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        hours
      }
    }));
  };

  const addBlockedDate = () => {
    if (!newBlockedDate) {
      toast.error('Please select a date');
      return;
    }

    const dateEntry = reason ? `${newBlockedDate}|${reason}` : newBlockedDate;

    if (blockedDates.some(d => d.startsWith(newBlockedDate))) {
      toast.error('This date is already blocked');
      return;
    }

    setBlockedDates([...blockedDates, dateEntry].sort());
    setNewBlockedDate('');
    setReason('');
    toast.success('Date blocked successfully');
  };

  const removeBlockedDate = (date: string) => {
    setBlockedDates(blockedDates.filter(d => d !== date));
    toast.success('Date unblocked');
  };

  const saveAvailability = () => {
    const data = {
      weekDays,
      blockedDates
    };
    localStorage.setItem('availability', JSON.stringify(data));
    toast.success('Availability settings saved!');
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Management</h1>
        <p className="text-gray-600">Control your working days and block specific dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Availability */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-teddy-green to-teddy-gold rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
              </div>
            </div>

            <div className="space-y-4">
              {days.map(({ key, label }) => {
                const dayData = weekDays[key as keyof typeof weekDays];
                return (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-teddy-green-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleDay(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          dayData.open
                            ? 'bg-gradient-to-r from-teddy-green to-teddy-gold'
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            dayData.open ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <div>
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className={`text-sm ${dayData.open ? 'text-green-600' : 'text-red-600'}`}>
                          {dayData.open ? 'Open for bookings' : 'Closed'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={dayData.hours}
                        onChange={(e) => updateHours(key, e.target.value)}
                        disabled={!dayData.open}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="9:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blocked Dates */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Blocked Dates</h2>

            {/* Add New Blocked Date */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Block a Specific Date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newBlockedDate}
                    onChange={(e) => setNewBlockedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason (Optional)
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Vacation, Holiday"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={addBlockedDate}
                className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Block Date</span>
              </button>
            </div>

            {/* List of Blocked Dates */}
            <div className="space-y-2">
              {blockedDates.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No blocked dates</p>
              ) : (
                blockedDates.map((dateEntry, index) => {
                  const [date, dateReason] = dateEntry.split('|');
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {dateReason && (
                          <p className="text-sm text-gray-600 mt-1">{dateReason}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeBlockedDate(dateEntry)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-teddy-green to-teddy-gold rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Availability Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Open Days</span>
                <span className="text-2xl font-bold">
                  {Object.values(weekDays).filter(d => d.open).length}/7
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Blocked Dates</span>
                <span className="text-2xl font-bold">{blockedDates.length}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const allOpen = Object.fromEntries(
                    Object.entries(weekDays).map(([key, val]) => [
                      key,
                      { ...val, open: true }
                    ])
                  ) as typeof weekDays;
                  setWeekDays(allOpen);
                  toast.success('All days opened');
                }}
                className="w-full px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors"
              >
                Open All Days
              </button>
              <button
                onClick={() => {
                  setBlockedDates([]);
                  toast.success('All blocked dates cleared');
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Blocked Dates
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveAvailability}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
}
