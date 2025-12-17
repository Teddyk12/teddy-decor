'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Lock, Palette } from 'lucide-react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'logo', label: 'Logo', icon: Palette },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and website settings</p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Settings Card */}
        <Link
          href="/admin/password"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-teddy-green" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-600">Update your admin password</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>• Password strength indicator</p>
            <p>• Secure password validation</p>
            <p>• Real-time matching</p>
          </div>
          <div className="mt-4 flex items-center text-teddy-green font-semibold group-hover:translate-x-2 transition-transform">
            Manage Password →
          </div>
        </Link>

        {/* Logo Settings Card */}
        <Link
          href="/admin/logo"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Manage Logo</h3>
              <p className="text-sm text-gray-600">Upload and customize your logo</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>• Upload custom logo</p>
            <p>• Live preview</p>
            <p>• Reset to default</p>
          </div>
          <div className="mt-4 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
            Manage Logo →
          </div>
        </Link>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          Settings Overview
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Password:</strong> Change your admin login password. Default is{' '}
            <code className="bg-blue-100 px-2 py-0.5 rounded">admin123</code>
          </p>
          <p>
            <strong>Logo:</strong> Upload your custom logo to appear in the navigation bar. Supports PNG, JPG, SVG.
          </p>
          <p>
            <strong>Storage:</strong> Settings are saved locally in your browser. Logo can be saved to cloud if Supabase is configured.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">💡 Pro Tips</h3>
        <ul className="text-sm text-yellow-800 space-y-2 ml-4 list-disc">
          <li>Change your password regularly for better security</li>
          <li>Use a strong password with at least 10 characters</li>
          <li>Upload a square logo (500x500px) for best results</li>
          <li>Logo should have a transparent background (PNG format)</li>
          <li>Test your logo on both light and dark backgrounds</li>
        </ul>
      </div>
    </div>
  );
}
