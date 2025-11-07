import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.services': 'Services',
    'nav.howWeWork': 'How We Work',
    'nav.results': 'Results',
    'nav.faq': 'FAQ',
    'nav.bookCall': 'Book a Call',
    
    // Hero
    'hero.title': 'Transform Your Business with AI Automation',
    'hero.subtitle': 'We automate your workflows, connect your tools, and create smart systems that boost performance and sales.',
    'hero.cta': 'Book Your Free Consultation',
    
    // Services
    'services.title': 'We put AI at the heart of your operations',
    'services.subtitle': 'We automate your workflows, connect your tools, and create smart systems that boost performance and sales.',
    
    'service1.title': 'AI Voice Agent',
    'service1.desc': 'Smart voice assistant for customer service and booking.',
    
    'service2.title': 'Custom AI Chatbots',
    'service2.desc': 'Tailor-made AI chatbots that understand your business.',
    
    'service3.title': 'Automated Lead Qualification',
    'service3.desc': 'Smart lead scoring and nurturing funnels.',
    
    'service4.title': 'Workflow Automation',
    'service4.desc': 'Full automation of repetitive tasks and smart reporting.',
    
    'service5.title': 'Data Analysis & AI Insights',
    'service5.desc': 'AI-driven analytics with actionable recommendations.',
    
    // How We Work
    'howWeWork.title': 'A simple and fast process to transform your business',
    
    'step1.title': 'Discover',
    'step1.desc': 'Quick call to understand your challenges.',
    
    'step2.title': 'Design',
    'step2.desc': 'Custom, actionable solution in 7 days.',
    
    'step3.title': 'Launch & Measure',
    'step3.desc': 'Deploy, monitor, and optimize rapidly.',
    
    // Results
    'results.title': 'Real Results – Client Success Stories',
    
    'result1.type': 'E-commerce Business',
    'result1.challenge': 'Low-quality and few leads.',
    'result1.solution': 'Automated lead funnel + CRM integration.',
    'result1.result': '3x increase in qualified leads within 6 weeks.',
    
    'result2.type': 'Service Company',
    'result2.challenge': 'Manual tasks taking hours.',
    'result2.solution': 'Automated workflow and smart alerts.',
    'result2.result': 'Reduced processing time from 4 hours to 20 minutes.',
    
    'results.cta': 'Book to Get Similar Results',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    
    'faq1.q': 'How long does a project take?',
    'faq1.a': '1–3 weeks depending on complexity.',
    
    'faq2.q': "What's the pricing?",
    'faq2.a': 'Tailored to your goals, discussed during consultation.',
    
    'faq3.q': 'Is post-launch support available?',
    'faq3.a': 'Yes, maintenance and optimization plans offered.',
    
    'faq4.q': 'Do I need tech experience?',
    'faq4.a': 'Not at all; everything is managed for you.',
    
    'faq5.q': 'Can you integrate with my tools?',
    'faq5.a': 'Yes, we support tools like Zapier, HubSpot, Notion, etc.',
    
    // Booking Form
    'booking.title': 'Book Your Free Consultation',
    'booking.name': 'Full Name',
    'booking.whatsapp': 'WhatsApp Number',
    'booking.email': 'Email',
    'booking.website': 'Website or Social Link',
    'booking.businessType': 'What type of business do you currently run?',
    'booking.businessType.option1': 'Digital product (courses/subscriptions/online services)',
    'booking.businessType.option2': 'Local business (clinic, lounge, restaurant...)',
    'booking.businessType.option3': 'E-commerce store',
    'booking.businessType.option4': 'Agency or service company',
    'booking.businessType.option5': 'Freelancer',
    'booking.businessType.option6': 'Still developing an idea',
    'booking.businessType.placeholder': 'Select business type',
    
    'booking.needs': 'What do you need most right now?',
    'booking.needs.option1': 'Increase sales',
    'booking.needs.option2': 'Lead generation',
    'booking.needs.option3': 'Marketing funnel building',
    'booking.needs.option4': 'Automation',
    'booking.needs.option5': 'Clear plan or direction',
    'booking.needs.option6': "Don't know where to start",
    'booking.needs.placeholder': 'Select your need',
    
    'booking.revenue': 'What is your current approximate number of clients or monthly sales volume?',
    'booking.revenue.option1': 'Less than $1,000',
    'booking.revenue.option2': 'Between $1,000 and $5,000',
    'booking.revenue.option3': 'Between $5,000 and $10,000',
    'booking.revenue.option4': 'More than $10,000',
    'booking.revenue.option5': "I don't have a business currently operating",
    'booking.revenue.placeholder': 'Select revenue range',
    
    'booking.description': 'Describe your project briefly',
    'booking.submit': 'Book Your Consultation',
    'booking.success': 'Request submitted successfully!',
    'booking.successMessage': 'We will contact you within 24 hours',
    'booking.error': 'Error',
    'booking.errorMessage': 'Failed to send booking. Please try again.',
    
    // Footer
    'footer.tagline': 'NexaBot helps businesses scale with AI-driven automation and intelligent workflows.',
    'footer.services': 'Services',
    'footer.howWeWork': 'How We Work',
    'footer.results': 'Results',
    'footer.faq': 'FAQ',
    'footer.bookCall': 'Book a Call',
    'footer.rights': '© 2024 NexaBot. All rights reserved.',
  },
  ar: {
    // Header
    'nav.services': 'الخدمات',
    'nav.howWeWork': 'كيف نعمل',
    'nav.results': 'النتائج',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.bookCall': 'احجز مكالمة',
    
    // Hero
    'hero.title': 'حوّل عملك باستخدام الأتمتة بالذكاء الاصطناعي',
    'hero.subtitle': 'نقوم بأتمتة سير العمل، وربط أدواتك، وإنشاء أنظمة ذكية تعزز الأداء والمبيعات.',
    'hero.cta': 'احجز استشارتك المجانية',
    
    // Services
    'services.title': 'نضع الذكاء الاصطناعي في قلب عملياتك',
    'services.subtitle': 'نقوم بأتمتة سير العمل، وربط أدواتك، وإنشاء أنظمة ذكية تعزز الأداء والمبيعات.',
    
    'service1.title': 'وكيل الصوت الذكي',
    'service1.desc': 'مساعد صوتي ذكي لخدمة العملاء والحجز.',
    
    'service2.title': 'روبوتات محادثة ذكية مخصصة',
    'service2.desc': 'روبوتات محادثة مصممة خصيصاً تفهم عملك.',
    
    'service3.title': 'تأهيل العملاء المحتملين الآلي',
    'service3.desc': 'تقييم ذكي للعملاء المحتملين ومسارات رعاية.',
    
    'service4.title': 'أتمتة سير العمل',
    'service4.desc': 'أتمتة كاملة للمهام المتكررة وتقارير ذكية.',
    
    'service5.title': 'تحليل البيانات والرؤى الذكية',
    'service5.desc': 'تحليلات مدعومة بالذكاء الاصطناعي مع توصيات قابلة للتنفيذ.',
    
    // How We Work
    'howWeWork.title': 'عملية بسيطة وسريعة لتحويل عملك',
    
    'step1.title': 'اكتشف',
    'step1.desc': 'مكالمة سريعة لفهم تحدياتك.',
    
    'step2.title': 'صمم',
    'step2.desc': 'حل مخصص وقابل للتنفيذ في 7 أيام.',
    
    'step3.title': 'أطلق وقِس',
    'step3.desc': 'نشر ومراقبة وتحسين سريع.',
    
    // Results
    'results.title': 'نتائج حقيقية – قصص نجاح العملاء',
    
    'result1.type': 'أعمال التجارة الإلكترونية',
    'result1.challenge': 'عملاء محتملون قليلون وذوو جودة منخفضة.',
    'result1.solution': 'مسار عملاء محتملين آلي + تكامل CRM.',
    'result1.result': 'زيادة 3 أضعاف في العملاء المحتملين المؤهلين في 6 أسابيع.',
    
    'result2.type': 'شركة خدمات',
    'result2.challenge': 'مهام يدوية تستغرق ساعات.',
    'result2.solution': 'سير عمل آلي وتنبيهات ذكية.',
    'result2.result': 'تقليل وقت المعالجة من 4 ساعات إلى 20 دقيقة.',
    
    'results.cta': 'احجز للحصول على نتائج مماثلة',
    
    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    
    'faq1.q': 'كم من الوقت يستغرق المشروع؟',
    'faq1.a': '1-3 أسابيع حسب التعقيد.',
    
    'faq2.q': 'ما هي الأسعار؟',
    'faq2.a': 'مخصصة لأهدافك، يتم مناقشتها أثناء الاستشارة.',
    
    'faq3.q': 'هل الدعم بعد الإطلاق متاح؟',
    'faq3.a': 'نعم، نقدم خطط صيانة وتحسين.',
    
    'faq4.q': 'هل أحتاج إلى خبرة تقنية؟',
    'faq4.a': 'لا على الإطلاق؛ كل شيء يُدار من أجلك.',
    
    'faq5.q': 'هل يمكنكم التكامل مع أدواتي؟',
    'faq5.a': 'نعم، ندعم أدوات مثل Zapier وHubSpot وNotion وغيرها.',
    
    // Booking Form
    'booking.title': 'احجز استشارتك المجانية',
    'booking.name': 'الاسم الكامل',
    'booking.whatsapp': 'رقم الواتساب',
    'booking.email': 'البريد الإلكتروني',
    'booking.website': 'الموقع أو رابط وسائل التواصل',
    'booking.businessType': 'ما نوع العمل الذي تديره حالياً؟',
    'booking.businessType.option1': 'منتج رقمي (دورات/اشتراكات/خدمات عبر الإنترنت)',
    'booking.businessType.option2': 'عمل محلي (عيادة، صالة، مطعم...)',
    'booking.businessType.option3': 'متجر تجارة إلكترونية',
    'booking.businessType.option4': 'وكالة أو شركة خدمات',
    'booking.businessType.option5': 'عامل مستقل',
    'booking.businessType.option6': 'لا أزال أطور فكرة',
    'booking.businessType.placeholder': 'اختر نوع العمل',
    
    'booking.needs': 'ماذا تحتاج أكثر الآن؟',
    'booking.needs.option1': 'زيادة المبيعات',
    'booking.needs.option2': 'توليد العملاء المحتملين',
    'booking.needs.option3': 'بناء مسار تسويقي',
    'booking.needs.option4': 'الأتمتة',
    'booking.needs.option5': 'خطة أو اتجاه واضح',
    'booking.needs.option6': 'لا أعرف من أين أبدأ',
    'booking.needs.placeholder': 'اختر احتياجك',
    
    'booking.revenue': 'ما هو عدد العملاء أو حجم المبيعات الشهرية الحالي تقريباً؟',
    'booking.revenue.option1': 'أقل من 1,000 دولار',
    'booking.revenue.option2': 'بين 1,000 و 5,000 دولار',
    'booking.revenue.option3': 'بين 5,000 و 10,000 دولار',
    'booking.revenue.option4': 'أكثر من 10,000 دولار',
    'booking.revenue.option5': 'ليس لدي عمل يعمل حالياً',
    'booking.revenue.placeholder': 'اختر نطاق الإيرادات',
    
    'booking.description': 'صِف مشروعك بإيجاز',
    'booking.submit': 'احجز استشارتك',
    'booking.success': 'تم إرسال الطلب بنجاح!',
    'booking.successMessage': 'سنتواصل معك خلال 24 ساعة',
    'booking.error': 'خطأ',
    'booking.errorMessage': 'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.',
    
    // Footer
    'footer.tagline': 'يساعد NexaBot الشركات على النمو باستخدام الأتمتة المدعومة بالذكاء الاصطناعي وسير العمل الذكي.',
    'footer.services': 'الخدمات',
    'footer.howWeWork': 'كيف نعمل',
    'footer.results': 'النتائج',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.bookCall': 'احجز مكالمة',
    'footer.rights': '© 2024 NexaBot. جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'ar') return saved;
    
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ar') ? 'ar' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
