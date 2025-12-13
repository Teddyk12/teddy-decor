import { Phone, Palette, Cog, Sparkles } from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      number: '01',
      icon: Phone,
      title: 'The Discovery Call',
      description: 'We connect for a free consultation to discuss your ideas, vision, and budget. This is where we get to know you and understand what makes your event special.',
      details: [
        'Free initial consultation',
        'Vision and theme discussion',
        'Budget planning',
        'Timeline overview',
        'Q&A session'
      ]
    },
    {
      number: '02',
      icon: Palette,
      title: 'The Creative Proposal',
      description: 'We create a customized plan and mood board based on our discussion, so you can visualize the final look before we begin. Every detail is thoughtfully curated.',
      details: [
        'Custom mood boards',
        'Color palette selection',
        'Decor concept designs',
        'Itemized proposal',
        'Revision rounds included'
      ]
    },
    {
      number: '03',
      icon: Cog,
      title: 'The Planning & Design',
      description: 'Once you approve the plan, we get to work! We source materials, coordinate with vendors, and handle all the details so you can focus on enjoying your journey.',
      details: [
        'Material sourcing',
        'Vendor coordination',
        'Timeline management',
        'Regular updates',
        'Quality assurance'
      ]
    },
    {
      number: '04',
      icon: Sparkles,
      title: 'The Big Day',
      description: 'We set up, style, and ensure everything is perfect, allowing you to relax and enjoy your moment. Your only job is to make memories!',
      details: [
        'Full setup and installation',
        'On-site styling',
        'Final touches and adjustments',
        'Photography coordination',
        'Post-event breakdown (optional)'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Simple Process</h1>
          <p className="text-xl md:text-2xl text-rose-50 max-w-3xl mx-auto">
            Working with Teddy Decor is a collaborative and enjoyable journey
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600 leading-relaxed">
            From our first conversation to your event day, we're with you every step of the way.
            Our process is designed to be stress-free, transparent, and tailored to your unique vision.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-12`}
                >
                  {/* Content Side */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="text-8xl md:text-9xl font-bold text-rose-100 absolute -top-8 -left-4 -z-10">
                        {step.number}
                      </div>
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-6">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                          {step.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        <ul className="space-y-3">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start text-gray-600">
                              <span className="text-rose-500 mr-3 mt-1">✓</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-200 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-32 h-32 text-white/30" />
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-12 bg-gradient-to-b from-rose-300 to-transparent" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-rose-50 mb-8">
            Let's start with a free consultation to discuss your vision
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-rose-500 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
          >
            Schedule Your Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
