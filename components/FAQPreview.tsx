// components/FAQPreview.tsx
import Link from 'next/link';
import type { FAQ } from '@/types';

interface FAQPreviewProps {
  faqs: FAQ[];
}

export default function FAQPreview({ faqs }: FAQPreviewProps) {
  const defaultFAQs = [
    {
      question: "Is this course for couples only?",
      answer: "While designed for couples, individuals can absolutely take the course too. Many people use it to better understand their own relationship patterns and prepare for future partnerships."
    },
    {
      question: "Do we have to do it together?",
      answer: "Not necessarily! While it's most effective when both partners participate, one person can start and share insights with their partner. We provide guidance on how to involve a hesitant partner."
    },
    {
      question: "Is this therapy?",
      answer: "This is educational content, not therapy. While created by a licensed therapist, it's designed as a self-guided learning experience. If you're dealing with serious relationship issues, we recommend professional counseling."
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs.slice(0, 3) : defaultFAQs;

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Common Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Here are the most frequently asked questions about our course
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {displayFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {faqs.length > 0 ? faq.metadata?.question : faq.question}
                </h3>
                <div className="text-muted-foreground leading-relaxed">
                  {faqs.length > 0 ? (
                    <div dangerouslySetInnerHTML={{ __html: faq.metadata?.answer || '' }} />
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-orange/10 to-accent-green/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Have More Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                We've compiled answers to dozens of questions about the course, pricing, and what to expect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/faq" className="btn-primary">
                  View All FAQs
                </Link>
                <a href="mailto:hello@hilove.co" className="btn-secondary">
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}