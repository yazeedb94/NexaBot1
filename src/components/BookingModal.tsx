import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const bookingData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        whatsapp: formData.get('whatsapp') as string,
        website: formData.get('website') as string,
        businessType: formData.get('businessType') as string,
        needs: formData.get('needs') as string,
        revenue: formData.get('revenue') as string,
        description: formData.get('description') as string,
      };

      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: bookingData,
      });

      if (error) throw error;

      toast({
        title: t('booking.success'),
        description: t('booking.successMessage'),
      });

      onOpenChange(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: t('booking.error'),
        description: t('booking.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('booking.title')}</DialogTitle>
          <DialogDescription>
            {t('hero.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('booking.name')} *</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">{t('booking.whatsapp')} *</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('booking.email')} *</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">{t('booking.website')} *</Label>
              <Input id="website" name="website" type="url" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">{t('booking.businessType')} *</Label>
            <Select name="businessType" required>
              <SelectTrigger>
                <SelectValue placeholder={t('booking.businessType.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital-product">{t('booking.businessType.option1')}</SelectItem>
                <SelectItem value="local-business">{t('booking.businessType.option2')}</SelectItem>
                <SelectItem value="ecommerce">{t('booking.businessType.option3')}</SelectItem>
                <SelectItem value="agency">{t('booking.businessType.option4')}</SelectItem>
                <SelectItem value="freelancer">{t('booking.businessType.option5')}</SelectItem>
                <SelectItem value="developing-idea">{t('booking.businessType.option6')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="needs">{t('booking.needs')} *</Label>
            <Select name="needs" required>
              <SelectTrigger>
                <SelectValue placeholder={t('booking.needs.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase-sales">{t('booking.needs.option1')}</SelectItem>
                <SelectItem value="lead-generation">{t('booking.needs.option2')}</SelectItem>
                <SelectItem value="marketing-funnel">{t('booking.needs.option3')}</SelectItem>
                <SelectItem value="automation">{t('booking.needs.option4')}</SelectItem>
                <SelectItem value="clear-plan">{t('booking.needs.option5')}</SelectItem>
                <SelectItem value="dont-know">{t('booking.needs.option6')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue">{t('booking.revenue')} *</Label>
            <Select name="revenue" required>
              <SelectTrigger>
                <SelectValue placeholder={t('booking.revenue.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-1000">{t('booking.revenue.option1')}</SelectItem>
                <SelectItem value="1000-5000">{t('booking.revenue.option2')}</SelectItem>
                <SelectItem value="5000-10000">{t('booking.revenue.option3')}</SelectItem>
                <SelectItem value="more-10000">{t('booking.revenue.option4')}</SelectItem>
                <SelectItem value="no-business">{t('booking.revenue.option5')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('booking.description')} *</Label>
            <Textarea 
              id="description" 
              name="description" 
              rows={4} 
              required 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary text-white border-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : t('booking.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
