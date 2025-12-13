'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    { date: '2025-11-22', title: 'Emily Davis - Baby Shower', color: 'bg-pink-500', guests: 30 },
    { date: '2025-11-28', title: 'Mike Thompson - Birthday', color: 'bg-purple-500', guests: 50 },
    { date: '2025-11-30', title: 'Rachel Green - Baby Shower', color: 'bg-pink-500', guests: 40 },
    { date: '2025-12-05', title: 'Lisa Anderson - Corporate Event', color: 'bg-blue-500', guests: 200 },
    { date: '2025-12-10', title: 'James Wilson - Graduation', color: 'bg-green-500', guests: 75 },
    { date: '2025-12-15', title: 'Sarah Johnson - Wedding', color: 'bg-rose-500', guests: 150 },
    { date: '2025-12-18', title: 'Tom Harris - Birthday', color: 'bg-purple-500', guests: 60 },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Calendar</h1>
        <p className="text-gray-600">View all scheduled events at a glance</p>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
          <div className="flex items-center justify-between text-white">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-6 h-6" />
              <h2 className="text-2xl font-bold">{monthName}</h2>
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dayEvents = getEventsForDate(day);
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`aspect-square border-2 rounded-xl p-2 transition-all hover:shadow-md ${
                    isToday
                      ? 'border-rose-500 bg-rose-50'
                      : dayEvents.length > 0
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    isToday ? 'text-rose-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`${event.color} text-white text-xs rounded px-1.5 py-0.5 truncate font-medium`}
                        title={event.title}
                      >
                        {event.title.split(' - ')[1] || event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${event.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                  {new Date(event.date).getDate()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{event.guests} guests</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
