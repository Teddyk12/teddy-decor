'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Calendar, Mail, Phone, Home, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const email = searchParams.get('email') || '';
  const eventType = searchParams.get('event') || 'your event';

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Thank You, {name}!
            </h1>
            <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
          </div>
          <p className="text-2xl text-rose-600 font-semibold mb-2">
            Your booking request has been received! 🎉
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We're thrilled to help you create an unforgettable experience for{' '}
              <span className="font-semibold text-rose-600">{eventType}</span>!
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">We Review Your Request</h3>
                  <p className="text-gray-600 text-sm">
                    Our team will carefully review all the details you provided about your event.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">You'll Hear From Us Within 24 Hours</h3>
                  <p className="text-gray-600 text-sm">
                    We'll reach out via email or phone to discuss your vision, answer questions, and schedule a consultation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Let's Create Magic Together!</h3>
                  <p className="text-gray-600 text-sm">
                    We'll work together to bring your dream event to life with stunning decor and flawless execution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Confirmation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Email Sent To:</p>
                  <p>{email || 'your provided email'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Event Type:</p>
                  <p>{eventType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 text-white text-center mb-8">
          <h3 className="text-xl font-bold mb-3">Need to Reach Us Sooner?</h3>
          <p className="mb-4 text-rose-50">
            We're here to help! Feel free to contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+12067392365"
              className="flex items-center space-x-2 hover:text-rose-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(206) 739-2365</span>
            </a>
            <a
              href="mailto:yonigoteddy@gmail.com"
              className="flex items-center space-x-2 hover:text-rose-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold">yonigoteddy@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-500 hover:bg-rose-50 transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View Our Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
