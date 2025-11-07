import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onBookingOpen: () => void;
}

const Header = ({ onBookingOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold">NexaBot</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-foreground/80 hover:text-foreground transition-base">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection('how-we-work')} className="text-foreground/80 hover:text-foreground transition-base">
              {t('nav.howWeWork')}
            </button>
            <button onClick={() => scrollToSection('results')} className="text-foreground/80 hover:text-foreground transition-base">
              {t('nav.results')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-foreground/80 hover:text-foreground transition-base">
              {t('nav.faq')}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="hidden md:flex"
            >
              <Globe className="h-5 w-5" />
            </Button>

            <Button onClick={onBookingOpen} className="hidden md:flex gradient-primary text-white border-0">
              {t('nav.bookCall')}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-left text-foreground/80 hover:text-foreground transition-base">
                {t('nav.services')}
              </button>
              <button onClick={() => scrollToSection('how-we-work')} className="text-left text-foreground/80 hover:text-foreground transition-base">
                {t('nav.howWeWork')}
              </button>
              <button onClick={() => scrollToSection('results')} className="text-left text-foreground/80 hover:text-foreground transition-base">
                {t('nav.results')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-foreground/80 hover:text-foreground transition-base">
                {t('nav.faq')}
              </button>
              <div className="flex items-center space-x-2 pt-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                  <Globe className="h-5 w-5" />
                </Button>
                <Button onClick={onBookingOpen} className="flex-1 gradient-primary text-white border-0">
                  {t('nav.bookCall')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
