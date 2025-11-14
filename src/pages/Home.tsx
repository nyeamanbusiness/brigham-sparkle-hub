import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Star, CheckCircle2 } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";
import CarSpinModel from "@/components/CarSpinModel";

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
      image: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/pain-correction-car.webp",
    },
  ];

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

      {/* HERO SECTION */}
      <section className="gradient-hero text-primary-foreground pt-8 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* 3D MODEL — FIXED HEIGHT + NEAR NAV */}
          <div className="w-full flex justify-center mb-6">
            <div className="w-[260px] h-[160px] md:w-[330px] md:h-[200px]">
              <CarSpinModel />
            </div>
          </div>

          {/* TEXT + IMAGE ROW */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mt-4">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Northern Utah’s Trusted Car Detailing Experts
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gradient-cta text-lg">
                  <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="tel:+14355356484">Call Now</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/interior-detaling-job.webp"
                  alt="Luxury car detailing"
                  className="rounded-lg"
                />
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="rounded-xl px-5 py-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm bg-purple-700/85 text-white">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="text-xl font-bold">5.0</span>
                    </div>
                    <p className="text-xs opacity-90">Google Reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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

      {/* BENEFITS */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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

      {/* CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* SERVICE AREAS */}
      <section className="py-16 bg-background">
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
                  <li className="text-foreground list-disc ml-5">Brigham City</li>
                  <li className="text-foreground list-disc ml-5">Perry</li>
                  <li className="text-foreground list-disc ml-5">Willard</li>
                  <li className="text-foreground list-disc ml-5">Mantua</li>
                  <li className="text-foreground list-disc ml-5">Corinne</li>
                  <li className="text-foreground list-disc ml-5">Tremonton</li>
                  <li className="text-foreground list-disc ml-5">Pleasant View</li>
                </ul>

                <ul className="space-y-2">
                  <li className="text-foreground list-disc ml-5">West Haven</li>
                  <li className="text-foreground list-disc ml-5">Honeyville</li>
                  <li className="text-foreground list-disc ml-5">Bear River City</li>
                  <li className="text-foreground list-disc ml-5">Hooper</li>
                  <li className="text-foreground list-disc ml-5">Ogden</li>
                  <li className="text-foreground list-disc ml-5">Plain City</li>
                  <li className="text-foreground list-disc ml-5">Farr West</li>
                </ul>
              </div>

              <p className="text-muted-foreground italic">
                Don't see your area listed? Give us a call - we may still be able to help!
              </p>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
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
      <section className="gradient-hero text-primary-foreground py-16">
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
              <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
