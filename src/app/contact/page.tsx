'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare contact data for database
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType || null,
        event_date: formData.eventDate || null,
        message: formData.message || null,
        status: 'New'
      };

      // Save to Supabase database (if configured)
      const supabase = await getSupabase();
      if (supabase) {
        const { data, error } = await supabase
          .from('contact_inquiries')
          .insert([contactData])
          .select();

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Contact inquiry saved to database:', data);
        }
      }

      // Also save to localStorage for offline access
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const localBooking = {
        id: Date.now(),
        ...formData,
        status: 'New',
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, localBooking]));

      // Send email notification using Web3Forms (if configured)
      try {
        const emailBody = `
NEW CONTACT INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFORMATION
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

🎉 EVENT INFORMATION
• Event Type: ${formData.eventType || 'Not specified'}
• Proposed Date: ${formData.eventDate || 'Not specified'}

💬 MESSAGE
${formData.message || 'No message provided'}

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
            subject: `💬 New Contact Inquiry - ${formData.name}`,
            from_name: 'Teddy Decor Website',
            to: 'yonigoteddy@gmail.com',
            message: emailBody,
            replyto: formData.email,
            // Additional fields
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
          })
        });
      } catch (emailError) {
        console.log('Email notification skipped - will rely on database storage');
      }

      // Redirect to thank you page
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        event: formData.eventType || 'your inquiry'
      });
      router.push(`/thank-you?${params.toString()}`);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Submission failed. Please try calling us directly at (206) 739-2365');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'yonigoteddy@gmail.com',
      link: 'mailto:yonigoteddy@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '(206) 739-2365',
      link: 'tel:+12067392365'
    },
    {
      icon: MapPin,
      title: 'Website',
      detail: 'www.teddydecor.com',
      link: null
    }
  ];

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Baby Shower',
    'Gender Reveal',
    'Graduation',
    'Corporate Event',
    'Other'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teddy-green to-teddy-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's Create Magic Together</h1>
          <p className="text-xl md:text-2xl text-teddy-green-50 max-w-3xl mx-auto">
            Ready to start planning your perfect event? Get in touch for a free consultation!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select an event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Proposed Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us a little about your vision!
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your ideas, theme, colors, guest count, or anything else you'd like us to know..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions? We're here to help! Reach out through any of these channels
                  and we'll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teddy-green to-teddy-gold rounded-full">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-600 hover:text-teddy-green transition-colors"
                            >
                              {info.detail}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.detail}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-teddy-green to-teddy-gold rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <p className="text-teddy-green-50 mb-6">
                  Stay inspired! Follow us on social media for the latest designs, behind-the-scenes,
                  and event inspiration.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
