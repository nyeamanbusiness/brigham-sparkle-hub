import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const faqs = [
    {
      question: 'What services does Sparkle Auto Detailing offer?',
      answer: 'We offer comprehensive auto detailing services including interior detailing, exterior detailing, paint correction, ceramic coating, headlight restoration, and engine bay cleaning. Each service is customized to meet your vehicle\'s specific needs.'
    },
    {
      question: 'Do you provide mobile auto detailing near me?',
      answer: 'Yes! We offer mobile detailing services in Brigham City and surrounding areas in Utah. We bring professional-grade equipment and products directly to your location for maximum convenience.'
    },
    {
      question: 'How long does a full car detailing take?',
      answer: 'A standard full detail typically takes 3-5 hours, while our deep detail packages can take 6-8 hours. Ceramic coating services may require 1-2 days depending on paint condition. We never rush the process to ensure exceptional results.'
    },
    {
      question: 'What is the cost of car detailing?',
      answer: 'Our pricing varies based on vehicle size and service level. Interior detailing starts at $295 for coupes/sedans and $299 for SUVs/trucks. Our ceramic coating packages start at $689. Visit our pricing page for detailed package information.'
    },
    {
      question: 'How often should I get my car detailed?',
      answer: 'We recommend professional detailing every 3-6 months for optimal maintenance. However, frequency depends on usage, storage conditions, and personal preferences. Regular detailing protects your vehicle\'s value and appearance.'
    },
    {
      question: 'What\'s included in interior detailing?',
      answer: 'Our interior detailing includes thorough vacuuming, steam cleaning, leather conditioning, dashboard and console cleaning, window cleaning, stain removal, odor elimination, and protective treatments. We clean every surface from floor to ceiling.'
    },
    {
      question: 'How long does ceramic coating last?',
      answer: 'Professional ceramic coating typically lasts 2-5 years depending on the product, application quality, and maintenance. Our coatings come with warranties and provide superior protection against UV rays, chemicals, and environmental contaminants.'
    },
    {
      question: 'Do I need paint correction before ceramic coating?',
      answer: 'Yes, paint correction is essential before ceramic coating. It removes swirls, scratches, and imperfections, creating a flawless surface for the coating to bond to. This ensures maximum shine and longevity of the ceramic coating.'
    },
    {
      question: 'Can you remove pet hair from my car?',
      answer: 'Absolutely! We specialize in pet hair removal using professional tools and techniques. Our deep interior cleaning service effectively removes embedded pet hair from seats, carpets, and hard-to-reach areas.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, credit cards (Visa, Mastercard, American Express, Discover), and digital payments. Payment is due upon completion of service. We also offer package deals for multiple vehicles.'
    },
  ];

  return (
    <>
      <Meta
        title="FAQ | Frequently Asked Questions - Sparkle Auto Detailing"
        description="Get answers to common questions about auto detailing services, pricing, ceramic coating, and more. Professional car care in Brigham City, UT."
        canonical="https://sparkleautodetailingllc.com/faq"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'FAQ', item: 'https://sparkleautodetailingllc.com/faq' }
      ]} />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Sparkle Auto Detailing
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="bg-card rounded-lg px-6 shadow-md"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're here to help! Contact us and we'll be happy to answer any questions about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+14355356484">Call Us</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
