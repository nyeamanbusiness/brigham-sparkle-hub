import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  const pricingTiers = [
    {
      name: 'Interior Detailing',
      plans: [
        {
          type: 'Standard Full Detail',
          vehicles: [
            { name: 'Coupe/Sedan', price: '$295.00' },
            { name: 'SUV/Truck', price: '$299.00' }
          ],
          features: [
            'Full Interior Refresh',
            'Light Stain Removal',
            'Interior Scenting',
            'Exterior Hand Wash',
            'Chemical Decontamination',
            'Clay Bar Treatment (Light)',
            'Hand-Applied Wax (2-3 months)',
            'Tire Shine + Trim Dressing'
          ]
        },
        {
          type: 'Deep Full Detail',
          vehicles: [
            { name: 'Coupe/Sedan', price: '$599.00' },
            { name: 'SUV/Truck', price: '$605.00' }
          ],
          features: [
            'Deep Interior Cleaning',
            'Full Surface Prep for Interior Ceramic Coating',
            'Interior Ceramic Coating',
            'Exterior Hand Wash + Full Chemical Decontamination',
            'Clay Bar Treatment (Medium)',
            'Premium Paint Sealant Application (6-9 months)',
            'Tire Shine + Trim Dressing'
          ]
        }
      ]
    },
    {
      name: 'Ceramic Coating',
      plans: [
        {
          type: 'Professional Ceramic Coating',
          vehicles: [
            { name: 'Coupe/Sedan', price: '$689.00' },
            { name: 'SUV/Truck', price: '$799.00' }
          ],
          features: [
            'Professional Paint Correction',
            '2-5 Year Protection',
            'Hydrophobic Properties',
            'UV & Oxidation Resistance',
            'Enhanced Gloss & Shine',
            'Easy Maintenance',
            'Chemical Resistance'
          ]
        }
      ]
    }
  ];

  return (
    <>
      <Meta
        title="Auto Detailing Pricing in Brigham City, UT | Sparkle Auto Detailing"
        description="Transparent pricing for auto detailing services in Brigham City. Interior detailing from $295, ceramic coating from $689. View all packages."
        canonical="https://sparkleautodetailingllc.com/pricing"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Pricing', item: 'https://sparkleautodetailingllc.com/pricing' }
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
              Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Quality detailing services at competitive prices. No hidden fees, just exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {pricingTiers.map((tier, tierIndex) => (
            <div key={tier.name} className={tierIndex > 0 ? 'mt-20' : ''}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                  {tier.name}
                </h2>
              </motion.div>

              {tier.plans.map((plan, planIndex) => (
                <div key={plan.type} className={planIndex > 0 ? 'mt-16' : ''}>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold text-center mb-8"
                  >
                    {plan.type}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plan.vehicles.map((vehicle, vehicleIndex) => (
                      <motion.div
                        key={vehicle.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: vehicleIndex * 0.1 }}
                        className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
                      >
                        <div className={`${vehicleIndex === 0 ? 'bg-primary' : 'bg-secondary'} text-white p-6 text-center`}>
                          <h4 className="text-xl font-bold mb-2">{vehicle.name}</h4>
                          <p className="text-4xl font-bold">{vehicle.price}</p>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button asChild className="w-full gradient-cta">
                            <Link to="/contact">Book Now</Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
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
              Questions About Pricing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us for custom quotes or to discuss which package is right for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <Link to="/contact">Get a Quote</Link>
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
