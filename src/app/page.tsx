'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Calendar, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const defaultContent = {
    images: {
      heroBackground: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000',
      services: {
        wedding: 'https://m.media-amazon.com/images/I/81pLBZipH+L._AC_UF894,1000_QL80_.jpg',
        birthday: 'https://i.etsystatic.com/14397413/r/il/e549bc/1768374862/il_570xN.1768374862_p67d.jpg',
        babyShower: 'https://www.babysavers.com/wp-content/uploads/2024/11/baby-shower-ideas-boho-baby-theme.jpg',
        graduation: 'https://m.media-amazon.com/images/I/81FMRGc-3HL._AC_UF894,1000_QL80_.jpg',
        special: 'https://cdn.shopify.com/s/files/1/0841/6968/7334/files/baby-shower-themes-girls-13-683x1024.jpg'
      }
    },
    text: {
      heroTitle: 'Creating Unforgettable Moments, One Detail at a Time',
      heroSubtitle: 'Full-Service Event Decor and Planning for Life\'s Most Celebrated Occasions',
      services: {
        wedding: { title: 'Wedding Decor', description: 'Elegant ceremony arches and reception styling' },
        birthday: { title: 'Birthday Party Decor', description: 'Vibrant themed celebrations for all ages' },
        babyShower: { title: 'Baby Shower & Gender Reveal', description: 'Sweet and memorable celebrations' },
        graduation: { title: 'Graduation Decor', description: 'Celebrate achievements in style' },
        special: { title: 'Special Events', description: 'Corporate and social gatherings' }
      }
    }
  };

  const [content, setContent] = useState(defaultContent);

  // Load content from localStorage (synced with admin changes)
  useEffect(() => {
    const saved = localStorage.getItem('homeContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent(parsed);
      } catch (error) {
        console.error('Error loading home content:', error);
      }
    }
  }, []);

  const services = [
    {
      title: content.text.services.wedding.title,
      image: content.images.services.wedding,
      description: content.text.services.wedding.description
    },
    {
      title: content.text.services.birthday.title,
      image: content.images.services.birthday,
      description: content.text.services.birthday.description
    },
    {
      title: content.text.services.babyShower.title,
      image: content.images.services.babyShower,
      description: content.text.services.babyShower.description
    },
    {
      title: content.text.services.graduation.title,
      image: content.images.services.graduation,
      description: content.text.services.graduation.description
    },
    {
      title: content.text.services.special.title,
      image: content.images.services.special,
      description: content.text.services.special.description
    }
  ];

  const features = [
    {
      icon: Heart,
      title: 'Custom Decor',
      description: 'Unique designs tailored to your theme'
    },
    {
      icon: Calendar,
      title: 'Full Planning',
      description: 'Stress-free coordination from start to finish'
    },
    {
      icon: Star,
      title: 'Memorable Experiences',
      description: 'We make your event unforgettable'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.images.heroBackground}
            alt="Elegant Event Decor - Pink & Gold Balloon Arch"
            fill
            className="object-cover brightness-110"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teddy-green-dark/60 via-teddy-green/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              {content.text.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              {content.text.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="px-8 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all text-center"
              >
                View Our Services
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-teddy-green transition-all text-center"
              >
                See Our Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Your Vision, Brought to Life
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to Teddy Decor! We are passionate about transforming your event dreams
              into breathtaking reality. From intimate baby showers to grand wedding celebrations,
              we handle every detail with creativity and precision.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teddy-green to-teddy-gold rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of event decor and planning services designed to make your special day perfect
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/booking?service=${encodeURIComponent(service.title)}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-200 text-sm mb-3">{service.description}</p>
                    <div className="flex items-center text-teddy-green-300 font-semibold group-hover:translate-x-2 transition-transform">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-teddy-green to-teddy-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Something Magical?
          </h2>
          <p className="text-xl mb-8 text-teddy-green-50">
            Let's bring your vision to life. Schedule a free consultation today!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-teddy-green font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
