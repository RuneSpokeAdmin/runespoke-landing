'use client';

import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Engineering Director',
    company: 'TechCorp',
    content: 'RuneSpoke Hub transformed our development workflow. We\'ve automated 80% of our code reviews and deployment processes.',
    avatar: '/api/placeholder/40/40'
  },
  {
    name: 'Sarah Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'The AI integrations are incredibly powerful. Our team productivity has increased by 300% since implementing RuneSpoke.',
    avatar: '/api/placeholder/40/40'
  },
  {
    name: 'Michael Foster',
    role: 'CTO',
    company: 'ScaleInc',
    content: 'Finally, a platform that connects all our tools intelligently. RuneSpoke Hub is the missing piece we needed.',
    avatar: '/api/placeholder/40/40'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Development Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how teams are transforming their development workflows with RuneSpoke Hub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/80 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}