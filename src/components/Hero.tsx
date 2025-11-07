import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onBookingOpen: () => void;
}

const Hero = ({ onBookingOpen }: HeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="AI Technology Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <Button 
            onClick={onBookingOpen}
            size="lg"
            className="gradient-primary text-white border-0 text-lg px-8 py-6 h-auto"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
