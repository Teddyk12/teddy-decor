'use client';

import { Save, Mail, Phone, MapPin, Clock, DollarSign, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your business information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  defaultValue="Teddy Decor"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="yonigoteddy@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="(206) 739-2365"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Service Area
                </label>
                <input
                  type="text"
                  defaultValue="Serving your area"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              <Clock className="w-5 h-5 inline mr-2" />
              Business Hours
            </h2>
            <div className="space-y-3">
              {[
                { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                { day: 'Sunday', hours: 'By Appointment' },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-900">{schedule.day}</span>
                  <input
                    type="text"
                    defaultValue={schedule.hours}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Pricing */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              <DollarSign className="w-5 h-5 inline mr-2" />
              Service Pricing
            </h2>
            <div className="space-y-4">
              {[
                { service: 'Wedding Decor', price: '3500' },
                { service: 'Birthday Party', price: '850' },
                { service: 'Baby Shower', price: '1200' },
                { service: 'Graduation', price: '650' },
                { service: 'Corporate Event', price: '2100' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-900">{item.service}</span>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">$</span>
                    <input
                      type="number"
                      defaultValue={item.price}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                Y
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Yohannes</h3>
              <p className="text-sm text-gray-600 mb-4">Administrator</p>
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Change Photo
              </button>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              <Palette className="w-5 h-5 inline mr-2" />
              Theme Color
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                'bg-rose-500',
                'bg-purple-500',
                'bg-blue-500',
                'bg-green-500',
                'bg-yellow-500',
                'bg-pink-500',
                'bg-indigo-500',
                'bg-red-500',
              ].map((color, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 ${color} rounded-lg hover:scale-110 transition-transform ${
                    index === 0 ? 'ring-2 ring-offset-2 ring-rose-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              {[
                'New Booking Alerts',
                'Payment Notifications',
                'Event Reminders',
                'Weekly Reports',
              ].map((item, index) => (
                <label key={index} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked={index < 3}
                    className="w-10 h-5 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-gradient-to-r checked:from-rose-500 checked:to-pink-500
                    before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-5"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
