'use client';

import { useState } from 'react';
import { Lock, Save, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    // Check current password
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
    if (currentPassword !== storedPassword) {
      toast.error('Current password is incorrect');
      return;
    }

    // Validate new password
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Check if new password is different from current
    if (newPassword === currentPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    setIsChanging(true);

    // Simulate password change
    setTimeout(() => {
      // Save new password to localStorage
      localStorage.setItem('adminPassword', newPassword);

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChanging(false);

      toast.success('Password changed successfully!', {
        description: 'Your admin password has been updated. Use it next time you log in.'
      });
    }, 500);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Manage your admin account and security settings</p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Security Recommendation</h3>
            <p className="text-sm text-blue-800">
              Use a strong password with at least 10 characters, including uppercase letters,
              lowercase letters, numbers, and special characters.
            </p>
          </div>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-100 rounded-xl">
            <Lock className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="text-sm text-gray-600">Update your admin password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-12"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Default password is: <code className="bg-gray-100 px-2 py-0.5 rounded">admin123</code>
            </p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-12"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Password Strength:</span>
                  <span className={`text-xs font-semibold ${
                    passwordStrength.strength === 100 ? 'text-green-600' :
                    passwordStrength.strength === 75 ? 'text-blue-600' :
                    passwordStrength.strength === 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${passwordStrength.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-12"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Match Indicator */}
            {confirmPassword && (
              <div className="mt-2 flex items-center gap-2">
                {newPassword === confirmPassword ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isChanging}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{isChanging ? 'Changing Password...' : 'Change Password'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">💡 Password Tips</h3>
        <ul className="text-sm text-yellow-800 space-y-2 ml-4 list-disc">
          <li>Use a unique password that you don't use for other accounts</li>
          <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid common words, names, or dates</li>
          <li>Consider using a password manager to generate and store strong passwords</li>
          <li>Change your password regularly (every 3-6 months)</li>
        </ul>
      </div>

      {/* Current Password Info */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📋 Important Information</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Default Password:</strong> <code className="bg-gray-100 px-2 py-0.5 rounded">admin123</code>
          </p>
          <p>
            <strong>Password Storage:</strong> Your password is stored locally in your browser.
            If you clear your browser data, the password will reset to the default.
          </p>
          <p>
            <strong>Lost Password:</strong> If you forget your password, you'll need to clear your browser's
            localStorage for this site and use the default password again.
          </p>
        </div>
      </div>
    </div>
  );
}
