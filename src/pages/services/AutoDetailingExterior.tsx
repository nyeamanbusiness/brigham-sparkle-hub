import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AutoDetailingExterior() {
  const url = "https://sparkleautodetailingllc.com/services/auto-detailing-exterior";
  const benefits = [
    "Professional hand wash with pH-neutral foam",
    "Chemical decontamination (removes iron fallout)",
    "Clay bar treatment for smooth paint",
    "Multi-stage paint polishing",
    "Premium wax or sealant application",
    "Tire & wheel deep cleaning",
    "Trim restoration & dressing",
    "Window cleaning (inside & out)",
  ];
  const packages = [
    {
      name: "Wash & Wax",
      duration: "2 hrs",
      prices: [
        {
          vehicle: "Coupe/Sedan",
          price: "$99.00",
        },
        {
          vehicle: "SUV/Truck",
          price: "$109.00",
        },
      ],
      description: "Hand wash and premium wax for lasting shine and protection.",
    },
  ];

  return (
    <>
      <Meta
        title="Exterior Auto Detailing in Brigham City, UT | Wash, Clay & Wax"
        description="Professional exterior auto detailing in Brigham City, Utah. Hand wash, clay bar, wax, and paint protection to restore your car's shine."
        canonical={url}
      />
      <BreadcrumbsJsonLd
        items={[
          {
            name: "Home",
            item: "https://sparkleautodetailingllc.com/",
          },
          {
            name: "Services",
            item: "https://sparkleautodetailingllc.com/services",
          },
          {
            name: "Exterior Auto Detailing",
            item: url,
          },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Exterior Auto Detailing in Brigham City, UT</h1>
            <p className="text-xl md:text-2xl mb-8">Professional Wash, Clay Bar, and Wax Service</p>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Restore your vehicle's exterior to showroom condition with our comprehensive exterior detailing service.
              We remove contaminants, polish away imperfections, and protect your paint with premium products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Benefits Section */}
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
                Comprehensive Exterior Care
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-center">
                Our exterior detailing service goes beyond a basic wash. We use a multi-step process to clean,
                decontaminate, and protect your vehicle's paint, wheels, and trim.
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
              <h3 className="text-2xl font-bold mb-4">The Sparkle Difference</h3>
              <p className="text-lg leading-relaxed mb-4">
                We start with a gentle hand wash using pH-neutral foam and premium microfiber mitts to safely remove
                dirt without scratching. Our chemical decontamination process eliminates embedded iron particles and
                contaminants that regular washing can't remove.
              </p>
              <p className="text-lg leading-relaxed">
                Next, we use a clay bar treatment to create a perfectly smooth surface, followed by paint polishing to
                remove minor swirls and restore gloss. Finally, we apply a durable wax or sealant for long-lasting
                protection and shine. Your wheels, tires, and trim receive specialized attention to complete the
                transformation.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Exterior Detailing Packages</h2>
            <p className="text-xl text-muted-foreground">
              Professional exterior care with premium products and expert techniques
            </p>
          </motion.div>

          {/* Centered pricing card */}
          <div className="grid place-items-center max-w-5xl mx-auto mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift w-full sm:w-96"
              >
                <div className="bg-primary text-white p-6">
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{pkg.duration}</p>
                  <div className="space-y-2">
                    {pkg.prices.map((priceItem) => (
                      <div
                        key={priceItem.vehicle}
                        className="flex justify-between items-center border-t border-white/20 pt-2"
                      >
                        <span className="text-sm opacity-90">{priceItem.vehicle}</span>
                        <span className="text-2xl font-bold">{priceItem.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
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
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/sports-car-exterior-detailing.webp"
                alt="Professional truck exterior detailing showing clean paint and shine"
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
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/exterior-auto-detailing-northern-utah.webp"
                alt="Sparkle Auto Detailing SUV exterior detail showing pristine finish"
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
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/exterior-auto-detailing-northern-utah-suv.webp"
                alt="Professional exterior detailing job showcasing clean vehicle finish"
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
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/truck-exterior-detailing.webp"
                alt="Sports car exterior detailing showing professional results and shine"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Vehicle's Exterior</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule your exterior detailing service and see the difference professional care makes.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
