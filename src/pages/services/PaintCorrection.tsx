import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function PaintCorrection() {
  const url = 'https://sparkleautodetailingllc.com/services/paint-correction';

  const benefits = [
    'Remove swirls, scratches, and oxidation',
    'Restore paint depth and clarity',
    'Multi-stage polishing process',
    'Professional-grade compounds & polishes',
    'Machine polishing for even results',
    'Paint thickness measurements',
    'Perfect prep for ceramic coating',
    'Showroom-quality finish',
  ];

  const packages = [
    {
      name: 'Stage 2 Paint Correction',
      duration: '2 hrs',
      prices: [
        { vehicle: 'Coupe/Sedan', price: '$549.00' },
        { vehicle: 'SUV/Truck', price: '$559.00' }
      ],
      description: 'Multi-stage polishing to remove moderate to heavy swirls and scratches.',
    },
    {
      name: 'Stage One Paint Correction',
      duration: '2 hrs',
      prices: [
        { vehicle: 'Coupe/Sedan', price: '$399.00' },
        { vehicle: 'SUV/Truck', price: '$409.00' }
      ],
      description: 'Single-stage polish perfect for newer vehicles with minor swirls.',
    },
    {
      name: 'Enhancement Polish - Gloss Reset',
      duration: '2 hrs',
      prices: [
        { vehicle: 'Coupe/Sedan', price: '$269.00' },
        { vehicle: 'SUV/Truck', price: '$279.00' }
      ],
      description: 'Quick gloss enhancement ideal for well-maintained paint.',
    },
  ];

  return (
    <>
      <Meta
        title="Paint Correction in Brigham City, UT | Remove Swirls & Haze"
        description="Professional paint correction in Brigham City. Multi-stage polishing to remove swirls, scratches, and restore your paint to flawless condition."
        canonical={url}
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Services', item: 'https://sparkleautodetailingllc.com/services' },
        { name: 'Paint Correction', item: url }
      ]} />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Paint Correction in Brigham City, UT
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Restore Your Paint's Depth, Gloss, and Clarity
            </p>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Our Paint Correction service is designed to restore the depth, gloss, and clarity of your paint — making your vehicle look showroom-ready. Whether you're prepping for ceramic coating or just want your car to turn heads again, trust Sparkle to bring out the flawless finish your vehicle deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">Book Now</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+14355356484">Call Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
                Professional Paint Restoration
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-center">
                Our skilled technicians use advanced tools and proven techniques to safely remove surface imperfections through precision sanding, machine polishing, and buffing. Every correction is done with care to ensure your paint is smooth, vibrant, and protected.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Why Paint Correction?</h3>
              <p className="text-lg leading-relaxed mb-4">
                Over time, your vehicle's paint accumulates swirl marks, light scratches, oxidation, and other imperfections from washing, environmental exposure, and daily wear. These defects dull the paint and reduce its visual appeal.
              </p>
              <p className="text-lg leading-relaxed">
                Paint correction removes these imperfections through a systematic, multi-stage polishing process. The result is restored paint clarity, enhanced gloss, and a mirror-like finish that looks better than new. It's also the perfect foundation for applying ceramic coating for long-term protection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Paint Correction Packages
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional paint restoration with precision polishing and correction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
              >
                <div className={`${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'} text-white p-6`}>
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{pkg.duration}</p>
                  <div className="space-y-2">
                    {pkg.prices.map((priceItem) => (
                      <div key={priceItem.vehicle} className="flex justify-between items-center border-t border-white/20 pt-2">
                        <span className="text-sm opacity-90">{priceItem.vehicle}</span>
                        <span className="text-2xl font-bold">{priceItem.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <Button asChild className="w-full gradient-cta">
                    <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">Book Now</a>
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
              Ready for a Flawless Finish?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule your paint correction service and rediscover your vehicle's true beauty.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <Link to="/contact">Schedule Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
