import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Star, CheckCircle2 } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense, useEffect, useState } from "react";

const SparkleHero3DScene = lazy(() => 
  import("@/components/SparkleHero3DScene").then(module => ({ default: module.SparkleHero3DScene }))
);

export default function Home() {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Premium Protection",
      description: "Long-lasting protection against UV rays, dirt, and environmental damage.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Showroom Shine",
      description: "Restore your vehicle to showroom quality with our expert detailing services.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving",
      description: "Professional service that saves you time while delivering superior results.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "5-Star Service",
      description: "Rated 5.0 on Google Reviews with over 100+ satisfied customers.",
    },
  ];

  const services = [
    {
      title: "Interior Detailing",
      description: "Deep clean and restore your vehicle's interior to pristine condition.",
      href: "/services/auto-detailing-interior",
      image:
        "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/interior-detailing-car.webp",
    },
    {
      title: "Exterior Detailing",
      description: "Professional wash, clay bar, and wax for a brilliant shine everytime.",
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
      image: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/paint-correction-car.webp",
    },
  ];

  const [shouldRender3DHero, setShouldRender3DHero] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia?.("(max-width: 768px)").matches;

    if (prefersReducedMotion || isSmallScreen) {
      setShouldRender3DHero(false);
      return;
    }

    const win = window as any;
    const idleCallback =
      win.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 1200));

    const id = idleCallback(() => setShouldRender3DHero(true));

    return () => {
      if (win.cancelIdleCallback) {
        win.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  return (
    <>
      <Meta
        title="Sparkle Auto Detailing | Professional Car Detailing in Brigham City, UT"
        description="Expert auto detailing services in Brigham City, Utah. Interior & exterior detailing, ceramic coating, paint correction. 5.0 rating. Book now!"
        canonical="https://sparkleautodetailingllc.com/"
      />
      <BreadcrumbsJsonLd
        items={[
          {
            name: "Home",
            item: "https://sparkleautodetailingllc.com/",
          },
        ]}
      />

      {/* Hero Section - 3D Scene */}
      <section className="relative w-full h-screen overflow-hidden">
        {shouldRender3DHero ? (
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-b from-primary/20 to-background flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                  <Skeleton className="h-8 w-64 mx-auto" />
                  <Skeleton className="h-6 w-48 mx-auto" />
                </div>
              </div>
            }
          >
            <SparkleHero3DScene />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center text-center px-4">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Brigham City's Premier Mobile Detailing
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
              Showroom Shine, Every Time
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8">
              Professional interior &amp; exterior detailing, ceramic coating, and paint correction  booked in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Our Most Popular Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect service for your vehicle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Interior Detailing Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Interior Detailing</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary">$149</span>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[48px]">
                  Deep clean and restore your vehicle's interior
                </p>
                <Link to="/booking" className="block">
                  <Button className="w-full text-lg py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Full Detail Card — FIXED */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary relative"
            >
              {/* FIXED BADGE */}
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold z-10">
                Most Popular
              </div>

              {/* FIXED PADDING TOP */}
              <div className="p-8 pt-12 text-center">
                <h3 className="text-2xl font-bold mb-2">Full Detail</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary">$229</span>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[48px]">
                  Complete interior and exterior detailing package
                </p>
                <Link to="/booking" className="block">
                  <Button className="w-full text-lg py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Ceramic Coating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Ceramic Coating</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary">$799</span>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[48px]">Premium protection with 2-5 year durability</p>
                <Link to="/booking" className="block">
                  <Button className="w-full text-lg py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gradient">Popular Detailing Services</h2>
            <p className="text-xl text-muted-foreground">
              Professional auto detailing services designed to keep your vehicle looking its absolute best
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                    <span className="text-accent font-semibold inline-flex items-center gap-2 text-sm">
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gradient">Why Choose Sparkle Auto Detailing?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional auto detailing services designed to keep your vehicle looking its absolute best
            </p>
          </motion.div>

          <div className="flex justify-center items-center min-h-[245px]">
            <div className="carousel-3d">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="carousel-3d-card rotating-border-card">
                  <div className="rotating-border-card-content h-full">
                    <div className="text-accent">{benefit.icon}</div>
                    <h3 className="text-base font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-xs">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Service Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
                Proudly Serving Brigham City & Surrounding Areas
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                As a local business, we understand the unique needs of vehicles in Northern Utah. Our team provides
                reliable auto detailing service throughout Box Elder County and beyond.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
                <ul className="space-y-2">
                  <li className="text-foreground list-disc ml-5">Ogden</li>
                  <li className="text-foreground list-disc ml-5">North Ogden</li>
                  <li className="text-foreground list-disc ml-5">South Ogden</li>
                  <li className="text-foreground list-disc ml-5">Riverdale</li>
                  <li className="text-foreground list-disc ml-5">Roy</li>
                  <li className="text-foreground list-disc ml-5">Hooper</li>
                  <li className="text-foreground list-disc ml-5">West Haven</li>
                </ul>
                <ul className="space-y-2">
                  <li className="text-foreground list-disc ml-5">Layton</li>
                  <li className="text-foreground list-disc ml-5">Kaysville</li>
                  <li className="text-foreground list-disc ml-5">Farmington</li>
                  <li className="text-foreground list-disc ml-5">Clearfield</li>
                  <li className="text-foreground list-disc ml-5">Syracuse</li>
                  <li className="text-foreground list-disc ml-5">Clinton</li>
                  <li className="text-foreground list-disc ml-5">Farr West</li>
                </ul>
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

      {/* CTA */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">Ready to Make Your Car Sparkle?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't wait - give your vehicle the premium care it deserves. Book your appointment today and experience
              the Sparkle difference.
            </p>
            <Button asChild size="lg" className="gradient-cta text-lg">
              <Link to="/booking">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
