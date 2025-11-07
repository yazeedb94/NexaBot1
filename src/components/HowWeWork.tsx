import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Pencil, Rocket } from 'lucide-react';

const HowWeWork = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('step1.title'),
      description: t('step1.desc'),
    },
    {
      icon: Pencil,
      title: t('step2.title'),
      description: t('step2.desc'),
    },
    {
      icon: Rocket,
      title: t('step3.title'),
      description: t('step3.desc'),
    },
  ];

  return (
    <section id="how-we-work" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('howWeWork.title')}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" 
                 style={{ top: '4rem', left: '10%', right: '10%' }} />

            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 relative z-10 shadow-elegant">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
