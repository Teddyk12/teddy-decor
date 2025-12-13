'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, MapPin, Users, Phone, Mail, MessageSquare, Video, Home, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get('service') || 'Wedding Decor';

  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',

    // Event Details
    eventType: serviceType,
    eventDate: '',
    eventTime: '',
    guestCount: '',

    // Location
    venueKnown: 'no',
    venueName: '',
    venueAddress: '',
    city: '',
    state: '',
    zipCode: '',

    // Meeting Preference
    meetingPreference: 'online',
    preferredMeetingDate: '',
    preferredMeetingTime: '',

    // Additional Details
    budget: '',
    colorScheme: '',
    theme: '',
    specialRequests: '',
    howDidYouHear: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update eventType when service parameter changes
  useEffect(() => {
    if (serviceType) {
      setFormData(prev => ({
        ...prev,
        eventType: serviceType
      }));
    }
  }, [serviceType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare booking data for database
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate || null,
        event_time: formData.eventTime || null,
        guest_count: formData.guestCount || null,
        venue_known: formData.venueKnown,
        venue_name: formData.venueName || null,
        venue_address: formData.venueAddress || null,
        city: formData.city || null,
        state: formData.state || null,
        zip_code: formData.zipCode || null,
        meeting_preference: formData.meetingPreference,
        preferred_meeting_date: formData.preferredMeetingDate || null,
        preferred_meeting_time: formData.preferredMeetingTime || null,
        budget: formData.budget || null,
        color_scheme: formData.colorScheme || null,
        theme: formData.theme || null,
        special_requests: formData.specialRequests || null,
        how_did_you_hear: formData.howDidYouHear || null,
        status: 'New'
      };

      // Save to Supabase database (if configured)
      const supabase = await getSupabase();
      if (supabase) {
        const { data, error } = await supabase
          .from('bookings')
          .insert([bookingData])
          .select();

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Booking saved to database:', data);
        }
      }

      // Also save to localStorage for offline access
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const localBooking = {
        id: Date.now(),
        ...formData,
        status: 'New',
        submittedAt: new Date().toISOString(),
        value: formData.budget || 'TBD'
      };
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, localBooking]));

      // Send email notification using Web3Forms (if configured)
      try {
        const emailBody = `
NEW EVENT BOOKING REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL INFORMATION
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

🎉 EVENT DETAILS
• Type: ${formData.eventType}
• Date: ${formData.eventDate || 'Not specified'}
• Time: ${formData.eventTime || 'Not specified'}
• Guest Count: ${formData.guestCount || 'Not specified'}

📍 VENUE INFORMATION
• Venue Known: ${formData.venueKnown === 'yes' ? 'Yes' : 'No'}
${formData.venueKnown === 'yes' ? `• Venue Name: ${formData.venueName || 'N/A'}
• Address: ${formData.venueAddress || 'N/A'}
• City: ${formData.city || 'N/A'}
• State: ${formData.state || 'N/A'}
• ZIP: ${formData.zipCode || 'N/A'}` : ''}

🤝 MEETING PREFERENCE
• Type: ${formData.meetingPreference === 'online' ? 'Online Meeting (Video Call)' : 'In-Person Meeting'}
• Preferred Date: ${formData.preferredMeetingDate || 'Not specified'}
• Preferred Time: ${formData.preferredMeetingTime || 'Not specified'}

💰 BUDGET & STYLE
• Budget Range: ${formData.budget || 'Not specified'}
• Color Scheme: ${formData.colorScheme || 'Not specified'}
• Theme/Style: ${formData.theme || 'Not specified'}

💬 SPECIAL REQUESTS
${formData.specialRequests || 'None'}

📢 HOW THEY FOUND US
${formData.howDidYouHear || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'short'
})}

🔗 Reply directly to: ${formData.email}
📞 Call them at: ${formData.phone}
        `;

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
            subject: `🎉 New Event Booking: ${formData.eventType} - ${formData.name}`,
            from_name: 'Teddy Decor Website',
            to: 'yonigoteddy@gmail.com',
            message: emailBody,
            replyto: formData.email,
            // Additional fields for better email formatting
            event_type: formData.eventType,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            event_date: formData.eventDate,
          })
        });
      } catch (emailError) {
        console.log('Email notification skipped - will rely on database storage');
      }

      // Redirect to thank you page with details
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        event: formData.eventType
      });
      router.push(`/thank-you?${params.toString()}`);

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Submission failed. Please try calling us directly at (206) 739-2365');
      setIsSubmitting(false);
    }
  };

  const services = [
    'Wedding Decor',
    'Birthday Party Decor',
    'Baby Shower & Gender Reveal',
    'Graduation Decor',
    'Special Events',
    'Corporate Event',
    'Anniversary Celebration',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Event
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's create something magical together! Fill out the form below and we'll contact you to discuss your vision.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Personal Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-rose-500" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="(206) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-rose-500" />
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Time
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Guest Count
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Approximate number of guests"
                />
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-rose-500" />
              Event Location
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is your event venue already confirmed? *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="venueKnown"
                    value="yes"
                    checked={formData.venueKnown === 'yes'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Yes, I have a venue</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="venueKnown"
                    value="no"
                    checked={formData.venueKnown === 'no'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Not yet</span>
                </label>
              </div>
            </div>

            {formData.venueKnown === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Name of the venue"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="venueAddress"
                    value={formData.venueAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Seattle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="WA"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="98101"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Meeting Preference */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-rose-500" />
              Consultation Preference
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How would you prefer to meet for consultation? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-rose-500 transition-colors">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="online"
                    checked={formData.meetingPreference === 'online'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500"
                  />
                  <Video className="w-5 h-5 mx-3 text-rose-500" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Online Meeting</span>
                    <span className="text-sm text-gray-600">Video call (Zoom, FaceTime, etc.)</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-rose-500 transition-colors">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="in-person"
                    checked={formData.meetingPreference === 'in-person'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500"
                  />
                  <Home className="w-5 h-5 mx-3 text-rose-500" />
                  <div>
                    <span className="font-semibold text-gray-900 block">In-Person Meeting</span>
                    <span className="text-sm text-gray-600">Meet at your location or ours</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Consultation Date
                </label>
                <input
                  type="date"
                  name="preferredMeetingDate"
                  value={formData.preferredMeetingDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="preferredMeetingTime"
                  value={formData.preferredMeetingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-rose-500" />
              Event Details & Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color Scheme
                </label>
                <input
                  type="text"
                  name="colorScheme"
                  value={formData.colorScheme}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="e.g., Rose gold and white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Theme or Style
                </label>
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="e.g., Rustic, Modern, Vintage, Boho"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests or Additional Details
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your vision, any specific requirements, or questions you have..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Friend/Family">Friend or Family Referral</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Wedding Planner">Wedding Planner</option>
                  <option value="Previous Event">Saw Your Work at an Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              We'll review your request and contact you within 24 hours to discuss next steps!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
