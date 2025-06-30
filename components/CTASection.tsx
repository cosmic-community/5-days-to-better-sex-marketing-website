import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-accent-orange to-accent-green">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Relationship?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of couples who have already discovered the joy of deeper intimacy. 
            Your journey to better connection starts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#course"
              className="bg-white text-accent-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              Start Your 5-Day Journey
            </Link>
            <Link 
              href="/faq"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-accent-orange transition-all duration-200"
            >
              Have Questions?
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-75">
            30-day money-back guarantee • Secure checkout • Privacy protected
          </p>
        </div>
      </div>
    </section>
  );
}