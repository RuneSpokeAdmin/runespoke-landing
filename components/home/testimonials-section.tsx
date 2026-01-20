'use client';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Coming Soon: Real Developer Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We're currently in beta and working with our first users.
            We hope to see your comments and success stories here soon.
          </p>

          <div className="bg-white/80 p-12 rounded-xl shadow-lg max-w-3xl mx-auto">
            <div className="text-gray-500 mb-6">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Be among the first to share your experience with RuneSpoke Hub.
              Join our beta program and help shape the future of AI-powered development.
            </p>
            <button
              onClick={() => {
                const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  emailInput.focus();
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Join the Beta Program
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}