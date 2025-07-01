import type { HomepageContent } from '@/types';

interface WhoItsForProps {
  content: HomepageContent | null;
}

export default function WhoItsFor({ content }: WhoItsForProps) {
  const whoItsForContent = content?.metadata?.who_its_for;
  
  const defaultAudiences = [
    {
      icon: "💑",
      title: "Long-term Couples",
      description: "Ready to reignite the spark and deepen your connection after years together"
    },
    {
      icon: "👶",
      title: "Parents with No Time",
      description: "Busy families looking to prioritize intimacy even with packed schedules"
    },
    {
      icon: "🏳️‍🌈",
      title: "LGBTQ+ Partners",
      description: "All identities and orientations welcome in our inclusive, affirming space"
    },
    {
      icon: "✨",
      title: "'We're Good, But...' Pairs",
      description: "Couples who want to take their already solid relationship to the next level"
    },
    {
      icon: "🔄",
      title: "Starting Over",
      description: "Partners working through challenges and ready to rebuild intimacy"
    },
    {
      icon: "📍",
      title: "Long-distance Couples",
      description: "Maintaining connection and intimacy across any distance"
    }
  ];

  const audiences = whoItsForContent?.audiences || defaultAudiences;

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {whoItsForContent?.heading || "Who This Course Is For"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {whoItsForContent?.subheading || "No matter your age, gender, or history — this work meets you where you are."}
          </p>
          <div className="bg-gradient-to-r from-accent-orange/10 to-accent-green/10 rounded-lg p-6">
            <p className="text-foreground font-medium">
              {whoItsForContent?.description || "Our approach is inclusive, judgment-free, and designed for real people with real lives."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <div key={index} className="group">
              <div className="bg-muted rounded-xl p-6 h-full border border-border hover:border-accent-orange/30 transition-all duration-300 hover:shadow-lg">
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent-orange transition-colors">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent-green/10 to-accent-orange/10 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {whoItsForContent?.not_sure_section?.heading || "Not Sure If This Is Right for You?"}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {whoItsForContent?.not_sure_section?.description || "This course is designed for committed couples ready to invest in their relationship. If you're dealing with serious relationship issues, consider couples therapy first. This program works best when both partners are committed to growth."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}