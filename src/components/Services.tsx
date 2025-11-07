import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mic, MessageSquare, Target, Workflow, BarChart3 } from 'lucide-react';

interface ServicesProps {
  onBookingOpen: () => void;
}

const Services = ({ onBookingOpen }: ServicesProps) => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Mic,
      title: t('service1.title'),
      description: t('service1.desc'),
    },
    {
      icon: MessageSquare,
      title: t('service2.title'),
      description: t('service2.desc'),
    },
    {
      icon: Target,
      title: t('service3.title'),
      description: t('service3.desc'),
    },
    {
      icon: Workflow,
      title: t('service4.title'),
      description: t('service4.desc'),
    },
    {
      icon: BarChart3,
      title: t('service5.title'),
      description: t('service5.desc'),
    },
  ];

  return (
    <section id="services" className="py-24 gradient-hero">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="gradient-card border-border/50 hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                <Button onClick={onBookingOpen} variant="outline" className="w-full">
                  {t('nav.bookCall')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
