import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AutoDetailingInterior() {
  const url = 'https://sparkleautodetailingllc.com/services/auto-detailing-interior';

  const features = [
    'Full interior refresh (seats, floors, panels, dashboard, windows)',
    'Light stain removal',
    'Interior scenting',
    'Exterior hand wash (gentle foam + hand mitts)',
    'Chemical decontamination (iron fallout remover)',
    'Clay bar treatment (light)',
    'Hand-applied wax (2-3 months protection)',
    'Tire shine + trim dressing',
  ];

  const packages = [
    {
      name: 'Standard Full Detail',
      price: '$295.00',
      vehicle: 'Coupe/Sedan',
      description: 'Perfect for regular maintenance and keeping your interior fresh.',
    },
    {
      name: 'Standard Full Detail',
      price: '$299.00',
      vehicle: 'SUV/Truck',
      description: 'Comprehensive cleaning for larger vehicles.',
    },
    {
      name: 'Deep Full Detail',
      price: '$599.00',
      vehicle: 'Coupe/Sedan',
      description: 'Intensive deep cleaning with ceramic coating preparation.',
    },
    {
      name: 'Deep Full Detail',
      price: '$605.00',
      vehicle: 'SUV/Truck',
      description: 'Maximum care for larger vehicles with full protection.',
    },
  ];

  return (
    <>
      <Meta
        title="Interior Auto Detailing in Brigham City, UT | Deep Clean & Sanitize"
        description="Professional interior detailing in Brigham City. Deep clean, odor removal, shampoo, and protection for all vehicle interiors. Book today!"
        canonical={url}
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Services', item: 'https://sparkleautodetailingllc.com/services' },
        { name: 'Interior Auto Detailing', item: url }
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
              Interior Auto Detailing in Brigham City, UT
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Deep Clean & Sanitize Every Surface
            </p>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Looking to restore that fresh, clean feeling inside your vehicle? At Sparkle Auto Detailing, our Interior Detail service delivers a deep, professional clean that goes far beyond surface-level. Our expert team meticulously cleans and sanitizes every inch of your car's interior — from the dashboard and center console to the seats, carpets, and door panels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <Link to="/contact">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+14355356484">Call Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
              What's Included
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              We use premium, industry-grade products and proven techniques to reach every nook and cranny. From hard-to-reach crevices, nothing gets overlooked. Using advanced steam cleaning and deep shampooing techniques, we tackle the toughest grime and humidity-related wear unique to UTAH.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-muted p-8 rounded-lg">
              <p className="text-lg leading-relaxed">
                But we don't stop at spotless. Our services include <strong>odor elimination treatments</strong> that target cigarette smoke and other lingering smells, leaving your cabin fresh and inviting. We also apply <strong>protective coatings</strong> to your upholstery, leather, and interior plastics, helping guard against future spills and damage.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                With a <strong>meticulous approach</strong> and <strong>competitive local pricing</strong>, Sparkle Auto Detailing is your trusted choice for superior interior detailing in New Orleans. For the ultimate refresh, explore our full-service <strong>"In & Out" detailing packages</strong> — your vehicle deserves it.
              </p>
            </div>
          </motion.div>
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
              Our Interior Detailing Packages & Pricing
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={`${pkg.name}-${pkg.vehicle}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
              >
                <div className={`${index < 2 ? 'bg-primary' : 'bg-secondary'} text-white p-6`}>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold mb-1">{pkg.price}</p>
                  <p className="text-sm opacity-90">{pkg.vehicle}</p>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <Button asChild className="w-full gradient-cta">
                    <Link to="/contact">Book Now</Link>
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
              Ready to Refresh Your Interior?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your interior detailing service today and experience a showroom-fresh cabin.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
