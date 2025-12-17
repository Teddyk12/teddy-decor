import Link from 'next/link';
import { Sparkles, Heart, Calendar, Users, Gift, GraduationCap, Building2, MessageSquare, Palette, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const decorServices = [
    {
      icon: Heart,
      title: 'Wedding Decor',
      items: [
        'Ceremony arches and backdrops',
        'Reception centerpieces',
        'Table settings and linens',
        'Ambient lighting design',
        'Floral arrangements',
        'Custom signage and displays'
      ]
    },
    {
      icon: Calendar,
      title: 'Birthday Decor',
      items: [
        'Themed backdrops and photo areas',
        'Balloon garlands and installations',
        'Dessert table styling',
        'Custom banners and signage',
        'Party favors and displays',
        'Age-appropriate themed setups'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Graduation Decor',
      items: [
        'School color themed setups',
        'Photo booth backdrops',
        'Balloon arches and columns',
        'Memory displays and photo walls',
        'Dessert table arrangements',
        'Custom congratulations signage'
      ]
    },
    {
      icon: Gift,
      title: 'Gender Reveal Decor',
      items: [
        'Creative reveal setups',
        'Themed color schemes',
        'Balloon arrangements',
        'Photo-worthy backdrops',
        'Dessert table styling',
        'Guest activity stations'
      ]
    },
    {
      icon: Sparkles,
      title: 'Baby Shower Decor',
      items: [
        'Elegant and sweet designs',
        'Themed decorations',
        'Centerpiece arrangements',
        'Welcome signage',
        'Gift table displays',
        'Photo backdrop areas'
      ]
    },
    {
      icon: Building2,
      title: 'Corporate & Social Events',
      items: [
        'Professional event setups',
        'Brand-aligned decor',
        'Networking area design',
        'Stage and podium styling',
        'Registration table decor',
        'Elegant ambient lighting'
      ]
    }
  ];

  const planningServices = [
    {
      icon: MessageSquare,
      title: 'Consultation & Discovery',
      description: 'We sit down (in person or online) to understand your vision, theme, and budget. This is where your dream event begins to take shape.'
    },
    {
      icon: Palette,
      title: 'Vision & Mood Board',
      description: 'We create a custom visual plan with mood boards, color schemes, and design concepts so you can see our ideas before we begin.'
    },
    {
      icon: CheckCircle,
      title: 'Full Event Planning',
      description: 'Comprehensive coordination including vendor management, timeline creation, budget tracking, and day-of execution. We handle everything so you can relax.'
    },
    {
      icon: Clock,
      title: 'Partial Planning & Day-Of Coordination',
      description: 'Perfect for clients who need help with specific elements, like planning a perfect marriage proposal or organizing the decor flow on your event day.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teddy-green to-teddy-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-teddy-green-50 max-w-3xl mx-auto">
            Stunning decor and stress-free planning for every occasion
          </p>
        </div>
      </section>

      {/* Event Decor Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Event Decor
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide complete decor solutions to set the perfect mood and atmosphere for your event.
              Every detail is carefully curated to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decorServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={`/booking?service=${encodeURIComponent(service.title)}`}
                  className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teddy-green to-teddy-gold rounded-full mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <ul className="space-y-2 mb-4">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-600">
                        <span className="text-teddy-green mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-teddy-green font-semibold group-hover:translate-x-2 transition-transform mt-4">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Planning Services */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Planning Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Let us handle the details. We offer tailored planning packages to suit your needs,
              ensuring a seamless and stress-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {planningServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teddy-green to-teddy-gold rounded-full">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss your vision and create something amazing together
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
