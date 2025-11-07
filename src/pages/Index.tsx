import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowWeWork from '@/components/HowWeWork';
import Results from '@/components/Results';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onBookingOpen={() => setIsBookingOpen(true)} />
      <Hero onBookingOpen={() => setIsBookingOpen(true)} />
      <Services onBookingOpen={() => setIsBookingOpen(true)} />
      <HowWeWork />
      <Results onBookingOpen={() => setIsBookingOpen(true)} />
      <FAQ />
      <Footer onBookingOpen={() => setIsBookingOpen(true)} />
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </div>
  );
};

export default Index;
