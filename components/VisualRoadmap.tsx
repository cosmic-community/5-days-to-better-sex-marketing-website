import type { RoadmapDay, HomepageContent } from '@/types';

interface VisualRoadmapProps {
  days: RoadmapDay[];
  content: HomepageContent | null;
}

export default function VisualRoadmap({ days, content }: VisualRoadmapProps) {
  const sortedDays = days.sort((a, b) => (a.metadata?.day_number || 0) - (b.metadata?.day_number || 0));
  const roadmapContent = content?.metadata?.roadmap_section;

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {roadmapContent?.heading || "Your 5-Day Journey"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {roadmapContent?.subheading || "Each day builds on the last, creating lasting change in your relationship"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-accent-orange hidden md:block"></div>
            
            <div className="space-y-8">
              {sortedDays.map((day, index) => (
                <div key={day.id} className="relative flex items-start space-x-6">
                  {/* Day number circle */}
                  <div className="flex-shrink-0 w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                    {day.metadata?.icon || day.metadata?.day_number || index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        Day {day.metadata?.day_number}: {day.metadata?.title}
                      </h3>
                      {day.metadata?.image && (
                        <img 
                          src={`${day.metadata.image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                          alt={day.metadata?.title || 'Day image'}
                          width="80"
                          height="80"
                          className="rounded-lg mt-2 md:mt-0"
                        />
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {day.metadata?.summary}
                    </p>
                    {day.metadata?.key_takeaway && (
                      <div className="bg-accent-green/10 rounded-lg p-3">
                        <span className="text-sm font-medium text-accent-green">Key Takeaway: </span>
                        <span className="text-sm text-foreground">{day.metadata.key_takeaway}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}