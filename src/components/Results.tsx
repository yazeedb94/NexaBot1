import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface ResultsProps {
  onBookingOpen: () => void;
}

const Results = ({ onBookingOpen }: ResultsProps) => {
  const { t } = useLanguage();

  const results = [
    {
      type: t('result1.type'),
      challenge: t('result1.challenge'),
      solution: t('result1.solution'),
      result: t('result1.result'),
    },
    {
      type: t('result2.type'),
      challenge: t('result2.challenge'),
      solution: t('result2.solution'),
      result: t('result2.result'),
    },
  ];

  return (
    <section id="results" className="py-24 gradient-hero">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('results.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {results.map((result, index) => (
            <Card key={index} className="gradient-card border-border/50 hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">{result.type}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Challenge:</p>
                  <p>{result.challenge}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Solution:</p>
                  <p>{result.solution}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Result:</p>
                  <p className="font-bold text-primary">{result.result}</p>
                </div>
                <Button onClick={onBookingOpen} className="w-full gradient-primary text-white border-0">
                  {t('results.cta')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
