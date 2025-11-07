import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
  onBookingOpen: () => void;
}

const Footer = ({ onBookingOpen }: FooterProps) => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-16 border-t border-border gradient-hero">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold">NexaBot</span>
            </div>
            <p className="text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.services')}</h3>
            <nav className="flex flex-col space-y-2">
              <button onClick={() => scrollToSection('services')} className="text-muted-foreground hover:text-foreground transition-base text-left">
                {t('footer.services')}
              </button>
              <button onClick={() => scrollToSection('how-we-work')} className="text-muted-foreground hover:text-foreground transition-base text-left">
                {t('footer.howWeWork')}
              </button>
              <button onClick={() => scrollToSection('results')} className="text-muted-foreground hover:text-foreground transition-base text-left">
                {t('footer.results')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-muted-foreground hover:text-foreground transition-base text-left">
                {t('footer.faq')}
              </button>
            </nav>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.bookCall')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('hero.subtitle')}
            </p>
            <Button onClick={onBookingOpen} className="gradient-primary text-white border-0">
              {t('footer.bookCall')}
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
