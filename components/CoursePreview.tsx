// components/CoursePreview.tsx
export default function CoursePreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/50 to-accent-orange/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Message from Justine
            </h2>
            <p className="text-lg text-muted-foreground">
              Not sure if this course is for you? Let's talk about it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    🎥 Course Preview Video
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Get a sneak peek into what you'll learn and discover if this journey is right for your relationship.
                  </p>
                  <button className="btn-primary w-full">
                    Watch Preview (3 minutes)
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    🎧 Audio Introduction
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Listen to Justine explain her approach and what makes this course different from other relationship programs.
                  </p>
                  <button className="btn-secondary w-full">
                    Listen Now (5 minutes)
                  </button>
                </div>

                <div className="bg-gradient-to-r from-accent-green/10 to-accent-orange/10 rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">
                    What You'll Discover:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ Whether this course matches your relationship goals</li>
                    <li>✓ Justine's warm, inclusive teaching style</li>
                    <li>✓ Real examples from the course content</li>
                    <li>✓ How to know if you're ready for this work</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-accent-orange/20 to-accent-green/20 rounded-2xl aspect-video flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <div className="w-0 h-0 border-l-[12px] border-l-accent-orange border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Course Introduction
                    </h3>
                    <p className="text-muted-foreground">
                      3-minute preview
                    </p>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-accent-green">●</span>
                    <span className="text-foreground font-medium">Free Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@hilove.co" 
                className="btn-secondary"
              >
                📧 Email Us Your Questions
              </a>
              <a 
                href="/faq" 
                className="btn-outline"
              >
                💭 Browse FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}