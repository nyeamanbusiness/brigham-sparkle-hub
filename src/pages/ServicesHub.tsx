import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServicesHub() {
  const services = [
    {
      title: 'Interior Auto Detailing',
      description: 'Deep clean, sanitize, and restore your vehicle\'s interior to pristine condition. From seats to dashboard, we handle it all.',
      href: '/services/auto-detailing-interior',
      features: ['Deep vacuuming', 'Leather conditioning', 'Odor elimination', 'Dashboard restoration']
    },
    {
      title: 'Exterior Auto Detailing',
      description: 'Professional hand wash, clay bar treatment, and wax application for a brilliant, lasting shine.',
      href: '/services/auto-detailing-exterior',
      features: ['Hand wash & dry', 'Clay bar treatment', 'Paint sealant', 'Tire & wheel shine']
    },
    {
      title: 'Paint Correction',
      description: 'Remove swirls, scratches, and haze to restore your paint to showroom perfection everytime.',
      href: '/services/paint-correction',
      features: ['Multi-stage polishing', 'Scratch removal', 'Swirl elimination', 'Gloss enhancement']
    },
    {
      title: 'Ceramic Coating',
      description: '2-5 year protection with hydrophobic properties, UV resistance, and unmatched gloss.',
      href: '/services/ceramic-coating',
      features: ['2-5 year warranty', 'Hydrophobic coating', 'UV protection', 'Enhanced gloss']
    },
  ];

  return (
    <>
      <Meta
        title="Auto Detailing Services in Brigham City, UT | Sparkle Auto Detailing"
        description="Complete auto detailing services: interior, exterior, paint correction, ceramic coating, engine bay cleaning, and headlight restoration. Professional car care in Brigham City, Utah."
        canonical="https://sparkleautodetailingllc.com/services"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Services', item: 'https://sparkleautodetailingllc.com/services' }
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
              Professional Auto Detailing Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              From interior deep cleaning to ceramic coating, we offer comprehensive detailing services to keep your vehicle in pristine condition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
              >
                <div className="gradient-primary h-2"></div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="default" className="w-full gradient-cta">
                    <Link to={service.href}>Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Transform Your Vehicle?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to schedule your detailing appointment and experience the Sparkle difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">Book Now</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
