import Image from 'next/image';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Every event is a labor of love, infused with creativity and attention to detail'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We set the highest standards for quality and execution in everything we do'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your vision is our mission. We listen, collaborate, and bring your dreams to life'
    },
    {
      icon: Sparkles,
      title: 'Creativity',
      description: 'Unique, personalized designs that reflect your personality and style'
    }
  ];

  const stats = [
    { number: '200+', label: 'Events Decorated' },
    { number: '150+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Dedication' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Teddy Decor</h1>
          <p className="text-xl md:text-2xl text-rose-50 max-w-3xl mx-auto">
            Where creativity meets passion to create unforgettable moments
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                  alt="Teddy - Founder of Teddy Decor"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold text-rose-500">Hi, I'm</p>
                <p className="text-3xl font-bold text-gray-900">Teddy!</p>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                My Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  My passion for decor and event planning started when I was a kid.
                  I helped plan my brother's wedding and fell in love with creating
                  beautiful spaces that bring people together.
                </p>
                <p>
                  I believe that every event, big or small, is a story waiting to be told.
                  My mission is to listen to your vision and pour my creativity and attention
                  to detail into making it a reality, so you can focus on making memories
                  with your loved ones.
                </p>
                <p>
                  Over the years, I've had the privilege of transforming countless events—from
                  intimate baby showers to grand wedding celebrations. Each one is unique,
                  each one is special, and each one is created with the same dedication and love.
                </p>
                <p className="text-rose-600 font-semibold text-xl">
                  I can't wait to help you create something unforgettable!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-rose-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every event we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Let's Create Magic Together
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to start planning your dream event? I'd love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
