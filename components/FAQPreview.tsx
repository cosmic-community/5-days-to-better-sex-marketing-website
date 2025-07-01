import Link from 'next/link';
import type { FAQ, HomepageContent } from '@/types';

interface FAQPreviewProps {
  faqs: FAQ[];
  content: HomepageContent | null;
}

interface DefaultFAQ {
  question: string;
  answer: string;
}

export default function FAQPreview({ faqs, content }: FAQPreviewProps) {
  const faqContent = content?.metadata?.faq_section;
  
  const defaultFAQs: DefaultFAQ[] = faqContent?.default_faqs || [
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

  // Create a unified display array
  const displayFAQs: (FAQ | DefaultFAQ)[] = faqs.length > 0 ? faqs.slice(0, 3) : defaultFAQs;

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {faqContent?.heading || "Common Questions"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {faqContent?.subheading || "Here are the most frequently asked questions about our course"}
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {displayFAQs.map((faq, index) => {
              // Type guard to check if this is a Cosmic FAQ object or default FAQ
              const isCosmicFAQ = 'metadata' in faq && faq.metadata;
              
              let question: string;
              let answer: string;

              if (isCosmicFAQ) {
                question = faq.metadata?.question || '';
                answer = faq.metadata?.answer || '';
              } else {
                question = (faq as DefaultFAQ).question;
                answer = (faq as DefaultFAQ).answer;
              }

              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {question}
                  </h3>
                  <div className="text-muted-foreground leading-relaxed">
                    {isCosmicFAQ && answer ? (
                      <div dangerouslySetInnerHTML={{ __html: answer }} />
                    ) : (
                      <p>{answer}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-orange/10 to-accent-green/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {faqContent?.more_questions?.heading || "Have More Questions?"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {faqContent?.more_questions?.description || "We've compiled answers to dozens of questions about the course, pricing, and what to expect."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/faq" className="btn-primary">
                  {faqContent?.more_questions?.view_all_text || "View All FAQs"}
                </Link>
                <a href={`mailto:${faqContent?.more_questions?.contact_email || 'hello@hilove.co'}`} className="btn-secondary">
                  {faqContent?.more_questions?.ask_question_text || "Ask a Question"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}