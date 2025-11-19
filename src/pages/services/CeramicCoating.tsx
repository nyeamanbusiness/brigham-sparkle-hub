import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Droplet, Sun, Sparkles } from "lucide-react";
import ceramicCoatingTruck from "@/assets/ceramic-coating-truck.webp";
import ceramicCoatingTesla from "@/assets/ceramic-coating-tesla.webp";
export default function CeramicCoating() {
  const url = "https://sparkleautodetailingllc.com/services/ceramic-coating";
  const benefits = [{
    icon: <Shield className="h-8 w-8" />,
    title: "Long-Lasting Protection",
    description: "Ceramic coating forms a durable, protective layer over your vehicle's paint, lasting 2-5 years or more depending on the product and maintenance."
  }, {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Superior Gloss and Shine",
    description: "It enhances your car's appearance with a deep, mirror-like gloss that keeps your vehicle looking freshly detailed every day."
  }, {
    icon: <Sun className="h-8 w-8" />,
    title: "UV & Oxidation Resistance",
    description: "Ceramic coating protects against harmful UV rays, preventing paint from fading, dulling, and oxidizing over time."
  }, {
    icon: <Droplet className="h-8 w-8" />,
    title: "Hydrophobic Properties",
    description: "Water, dirt, and grime bead up and roll off easily, making your car easier to clean and helping it stay cleaner for longer."
  }];
  const package_info = {
    name: "Professional Ceramic Coating",
    prices: [{
      vehicle: "Coupe/Sedan",
      price: "$689.00"
    }, {
      vehicle: "SUV/Truck",
      price: "$799.00"
    }],
    description: "Give your vehicle the ultimate protection and showroom shine with our professional ceramic coating service."
  };
  return <>
      <Meta title="Ceramic Coating in Brigham City, UT | 2-5 Year Protection" description="Professional ceramic coating in Brigham City. Industry-leading protection with hydrophobic properties, UV resistance, and enhanced gloss. 2-5 year warranty." canonical={url} />
      <BreadcrumbsJsonLd items={[{
      name: "Home",
      item: "https://sparkleautodetailingllc.com/"
    }, {
      name: "Services",
      item: "https://sparkleautodetailingllc.com/services"
    }, {
      name: "Ceramic Coating",
      item: url
    }]} />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ceramic Coating in Brigham City, UT</h1>
            <p className="text-xl md:text-2xl mb-8">Ultimate Protection. Unmatched Shine.</p>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Looking for the ultimate protection and shine for your vehicle? At Sparkle Auto Detailing, our Ceramic
              Coating service offers industry-leading defense against the elements — and a stunning, long-lasting gloss.
              Ceramic coating forms a durable, hydrophobic layer over your paint that shields your vehicle from UV
              damage, oxidation, chemical etching, and road grime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-cta">
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+14355356484">Call Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Why Choose Ceramic Coating?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="bg-card p-6 rounded-lg shadow-md hover-lift">
                <div className="text-accent mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>)}
          </div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto mt-12 bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">The Preparation Process</h3>
            <p className="text-lg leading-relaxed mb-4">
              Before applying the coating, we perform a professional paint correction to eliminate imperfections and
              ensure a flawless finish — setting the foundation for a coating that can last years, not months.
            </p>
            <p className="text-lg leading-relaxed">
              With easier maintenance, enhanced depth, and unmatched shine, ceramic coating from Sparkle is the gold
              standard in vehicle protection. Whether you drive daily or showcase your car, ceramic coating keeps it
              looking immaculate with minimal effort.
            </p>
          </motion.div>

          {/* Gallery */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="rounded-lg overflow-hidden shadow-lg hover-lift h-[400px] md:h-[500px]">
              <img src={ceramicCoatingTruck} alt="Ceramic coating applied to truck showing glossy finish" className="w-full h-full object-cover object-center" />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="rounded-lg overflow-hidden shadow-lg hover-lift h-[400px] md:h-[500px]">
              <img src={ceramicCoatingTesla} alt="Ceramic coating on Tesla showcasing superior shine and protection" className="w-full h-full object-cover object-center" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Ceramic Coating Packages</h2>
            <p className="text-xl text-muted-foreground">
              Professional-grade ceramic coating with paint correction included
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift">
              <div className="gradient-primary text-primary-foreground p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">{package_info.name}</h3>
                <div className="space-y-3">
                  {package_info.prices.map(priceItem => <div key={priceItem.vehicle} className="flex justify-between items-center border-t border-white/20 pt-3">
                      <span className="text-lg opacity-90">{priceItem.vehicle}</span>
                      <span className="text-3xl font-bold">{priceItem.price}</span>
                    </div>)}
                </div>
              </div>
              <div className="p-8">
                
                <Button asChild className="w-full gradient-cta">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="mt-12 text-center bg-accent/10 p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">5-Year Ceramic Coating Package</h3>
            <p className="text-lg mb-4">
              <strong>Ultimate Protection. Unmatched Shine.</strong>
            </p>
            <p className="text-muted-foreground">
              Our most popular package — perfect balance of long-term durability and high-gloss luxury. This
              professional-grade ceramic coating delivers 5 full years of protection against UV damage, oxidation,
              chemical etching, and road grime. It enhances paint depth significantly, giving your vehicle that "wet
              look" finish you see on magazine covers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Investment Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule your ceramic coating service and enjoy years of protection and shine.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <Link to="/booking">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>;
}