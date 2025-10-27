import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Star, CheckCircle2 } from "lucide-react";

export default function Home() {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Premium Protection",
      description: "Long-lasting protection against UV rays, dirt, and environmental damage.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Showroom Shine",
      description: "Restore your vehicle to showroom quality with our expert detailing services.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time-Saving",
      description: "Professional service that saves you time while delivering superior results.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "5-Star Service",
      description: "Rated 5.0 on Google Reviews with over 100+ satisfied customers.",
    },
  ];

  const services = [
    {
      title: "Interior Detailing",
      description: "Deep clean and restore your vehicle's interior to pristine condition.",
      href: "/services/auto-detailing-interior",
      image: "/placeholder.svg",
    },
    {
      title: "Exterior Detailing",
      description: "Professional wash, clay bar, and wax for a brilliant shine.",
      href: "/services/auto-detailing-exterior",
      image:
        "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/exterior-detailing-sports-car.webp",
    },
    {
      title: "Ceramic Coating",
      description: "2-5 year protection with hydrophobic properties and gloss enhancement.",
      href: "/services/ceramic-coating",
      image: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/ceramic-coating-sedan.webp",
    },
    {
      title: "Paint Correction",
      description: "Remove swirls, scratches, and imperfections for a flawless finish.",
      href: "/services/paint-correction",
      image: "/placeholder.svg",
    },
  ];

  return (
    <>
      <Meta
        title="Sparkle Auto Detailing | Professional Car Detailing in Brigham City, UT"
        description="Expert auto detailing services in Brigham City, Utah. Interior & exterior detailing, ceramic coating, paint correction. 5.0 rating. Book now!"
        canonical="https://sparkleautodetailingllc.com/"
      />
      <BreadcrumbsJsonLd items={[{ name: "Home", item: "https://sparkleautodetailingllc.com/" }]} />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Car Detailing in Northern Utah: Restore your ride's shine without breaking the bank!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                From deep cleaning and paint protection to wheel, trim, and headlight restoration, we ensure every inch
                of your car shines like new. Trust us to bring out the best in your vehicle, leaving it spotless,
                protected, and showroom-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gradient-cta text-lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="tel:+14355356484">Call Now</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/interior-detaling-job.webp"
                alt="Luxury car detailing"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-2xl font-bold">5.0</span>
                </div>
                <p className="text-sm">Google Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Why Choose Sparkle Auto Detailing?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional auto detailing services designed to keep your vehicle looking its absolute best
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-md hover-lift"
              >
                <div className="text-accent mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Popular Detailing Services</h2>
            <p className="text-xl text-muted-foreground">
              Professional auto detailing services designed to keep your vehicle looking its absolute best
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.href} className="group block bg-card rounded-lg overflow-hidden shadow-md hover-lift">
                  <div className="aspect-video bg-gradient-hero relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <span className="text-accent font-semibold inline-flex items-center gap-2">
                      Learn More
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Proudly Serving Brigham City & Surrounding Areas
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                As a local business, we understand the unique needs of vehicles in Northern Utah. Our team provides
                reliable auto detailing service throughout Box Elder County and beyond.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Brigham City</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Perry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Willard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Mantua</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Corinne</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Tremonton</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Pleasant View</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">West Haven</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Honeyville</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Bear River City</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Hooper</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Ogden</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Plain City</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-foreground">Farr West</span>
                </div>
              </div>

              <p className="text-muted-foreground italic">
                Don't see your area listed? Give us a call - we may still be able to help!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47800.31595114912!2d-112.04515505!3d41.51468105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2830d73ff227efe1%3A0x3e3a3d58e3d5a3aa!2sSparkle%20Auto%20Detailing!5e0!3m2!1sen!2sus!4v1761578977290!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sparkle Auto Detailing service area map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Car Sparkle?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't wait - give your vehicle the premium care it deserves. Book your appointment today and experience
              the Sparkle difference.
            </p>
            <Button asChild size="lg" className="gradient-cta text-lg">
              <Link to="/contact">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
