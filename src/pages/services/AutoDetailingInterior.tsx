import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AutoDetailingInterior() {
  const url = "https://sparkleautodetailingllc.com/services/auto-detailing-interior";

  const standardFeatures = [
    "Full Interior Refresh (Seats, Floors, Panels, Dashboard, Windows)",
    "Light Stain Removal",
    "Interior Scenting",
    "Exterior Hand Wash (Gentle Foam + Hand Mitts)",
    "Chemical Decontamination (Iron Fallout Remover)",
    "Clay Bar Treatment (Light)",
    "Hand-Applied Wax (2–3 months protection)",
    "Tire Shine + Trim Dressing",
  ];

  const deepFeatures = [
    "Deep Interior Cleaning (Seats, Panels, Plastics, Windows)",
    "Full Surface Prep for Interior Ceramic Coating",
    "Interior Ceramic Coating (Fabrics, Leather, Plastics)",
    "Exterior Hand Wash + Full Chemical Decontamination",
    "Clay Bar Treatment (Medium)",
    "Premium Paint Sealant Application (6–9 months protection)",
    "Tire Shine + Trim Dressing",
  ];

  const packages = [
    {
      name: "Standard Full Detail",
      prices: [
        { vehicle: "Coupe/Sedan", price: "$295.00" },
        { vehicle: "SUV/Truck", price: "$299.00" }
      ],
      description: "Perfect for regular maintenance and keeping your interior fresh.",
      features: [
        "Full Interior Refresh (Seats, Floors, Panels, Dashboard, Windows)",
        "Light Stain Removal",
        "Interior Scenting",
        "Exterior Hand Wash (Gentle Foam + Hand Mitts)",
        "Chemical Decontamination (Iron Fallout Remover)",
        "Clay Bar Treatment (Light)",
        "Hand-Applied Wax (2–3 months protection)",
        "Tire Shine + Trim Dressing"
      ]
    },
    {
      name: "Deep Full Detail",
      prices: [
        { vehicle: "Coupe/Sedan", price: "$599.00" },
        { vehicle: "SUV/Truck", price: "$605.00" }
      ],
      description: "Intensive deep cleaning with ceramic coating preparation.",
      features: [
        "Deep Interior Cleaning (Seats, Panels, Plastics, Windows)",
        "Full Surface Prep for Interior Ceramic Coating",
        "Interior Ceramic Coating (Fabrics, Leather, Plastics)",
        "Exterior Hand Wash + Full Chemical Decontamination",
        "Clay Bar Treatment (Medium)",
        "Premium Paint Sealant Application (6–9 months protection)",
        "Tire Shine + Trim Dressing"
      ]
    },
  ];

  return (
    <>
      <Meta
        title="Interior Auto Detailing in Brigham City, UT | Deep Clean & Sanitize"
        description="Professional interior detailing in Brigham City. Deep clean, odor removal, shampoo, and protection for all vehicle interiors. Book today!"
        canonical={url}
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", item: "https://sparkleautodetailingllc.com/" },
          { name: "Services", item: "https://sparkleautodetailingllc.com/services" },
          { name: "Interior Auto Detailing", item: url },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Interior Auto Detailing in Brigham City, UT</h1>
            <p className="text-xl md:text-2xl mb-8">Deep Clean & Sanitize Every Surface</p>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Looking to restore that fresh, clean feeling inside your vehicle? At Sparkle Auto Detailing, our Interior
              Detail service delivers a deep, professional clean that goes far beyond surface-level. Our expert team
              meticulously cleans and sanitizes every inch of your car's interior — from the dashboard and center
              console to the seats, carpets, and door panels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="gradient-cta">
                <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">What's Included</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              We use premium, industry-grade products and proven techniques to reach every nook and cranny. From
              hard-to-reach crevices, nothing gets overlooked. Using advanced steam cleaning and deep shampooing
              techniques, we tackle the toughest grime and humidity-related wear unique to UTAH.
            </p>

            {/* Standard Full Detail */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">Standard Full Detail</h3>
              <p className="text-muted-foreground mb-4">Perfect for regular maintenance and keeping your interior fresh.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {standardFeatures.map((feature, index) => (
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
            </div>

            {/* Deep Full Detail */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">Deep Full Detail</h3>
              <p className="text-muted-foreground mb-4">Intensive deep cleaning with ceramic coating preparation.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {deepFeatures.map((feature, index) => (
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
            </div>

            <div className="mt-12 bg-muted p-8 rounded-lg">
              <p className="text-lg leading-relaxed">
                But we don't stop at spotless. Our services include <strong>odor elimination treatments</strong> that
                target cigarette smoke and other lingering smells, leaving your cabin fresh and inviting. We also apply{" "}
                <strong>protective coatings</strong> to your upholstery, leather, and interior plastics, helping guard
                against future spills and damage.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                With a <strong>meticulous approach</strong> and <strong>competitive local pricing</strong>, Sparkle Auto
                Detailing is your trusted choice for superior interior detailing in New Orleans. For the ultimate
                refresh, explore our full-service <strong>"In & Out" detailing packages</strong> — your vehicle deserves
                it.
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
              >
                <div className={`${index === 0 ? "bg-primary" : "bg-secondary"} text-white p-6`}>
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
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
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full gradient-cta">
                    <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                      Book Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/truck-interior-detailing.webp"
                alt="Professional truck interior detailing showing deep cleaned seats and surfaces"
                className="w-full h-auto hover-scale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/truck-seat-interior-detail.webp"
                alt="Close-up of pristine truck seat after professional interior detailing"
                className="w-full h-auto hover-scale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/suv-interior-detailing.webp"
                alt="Professional SUV interior detailing showcasing clean interior cabin"
                className="w-full h-auto hover-scale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/sports-car-interior-detailing.webp"
                alt="Sparkle Auto Detailing corvette interior detail work showing professional results"
                className="w-full h-auto hover-scale"
              />
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Refresh Your Interior?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your interior detailing service today and experience a showroom-fresh cabin.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">Schedule Service</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
