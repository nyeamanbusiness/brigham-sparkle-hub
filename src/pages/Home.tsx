import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Star, CheckCircle2 } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";
import { useEffect, useRef, useState } from "react";

// ✅ Import local .lottie as a URL so Vite treats it like an asset
import vehicleLottieUrl from "@/assets/vehicle.lottie?url";

/* Allow the Lottie web component in TSX */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string | number;
        loop?: boolean;
        autoplay?: boolean;
        controls?: boolean;
        mode?: string;
        renderer?: "svg" | "canvas";
        style?: React.CSSProperties;
      };
    }
  }
}

export default function Home() {
  const [canUseLottie, setCanUseLottie] = useState(false);
  const [lottieFailed, setLottieFailed] = useState(false);
  const lottieRef = useRef<HTMLElement | null>(null);

  // Load the lottie-player script once and wait until the element is registered
  useEffect(() => {
    const defined = customElements.get("lottie-player");
    if (defined) {
      setCanUseLottie(true);
      return;
    }
    const existing = document.querySelector('script[src*="@lottiefiles/lottie-player"]') as HTMLScriptElement | null;

    const ensureDefined = () => {
      if (customElements.get("lottie-player")) setCanUseLottie(true);
      else setTimeout(ensureDefined, 50);
    };

    if (existing) {
      ensureDefined();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      script.onload = ensureDefined;
      document.body.appendChild(script);
    }
  }, []);

  // Capture load errors to fallback gracefully
  useEffect(() => {
    if (!canUseLottie || !lottieRef.current) return;
    const el = lottieRef.current as any;
    const onErr = () => setLottieFailed(true);
    el.addEventListener?.("error", onErr);
    el.addEventListener?.("loadError", onErr);
    return () => {
      el.removeEventListener?.("error", onErr);
      el.removeEventListener?.("loadError", onErr);
    };
  }, [canUseLottie]);

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

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Northern Utah’s Trusted Car Detailing Experts – Sparkle Auto Detailing
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

            {/* Lottie animation (local file via ?url) with graceful fallback */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {!lottieFailed && canUseLottie ? (
                <lottie-player
                  ref={(el) => (lottieRef.current = el)}
                  src={vehicleLottieUrl}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  renderer="svg"
                  style={{ width: "100%", height: "420px", borderRadius: "0.75rem" }}
                ></lottie-player>
              ) : (
                <img
                  src="https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/interior-detaling-job.webp"
                  alt="Luxury car detailing"
                  className="rounded-lg shadow-2xl"
                />
              )}
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

          <div className="flex justify-center items-center min-h-[300px]">
            <div className="carousel-3d">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="carousel-3d-card rotating-border-card">
                  <div className="rotating-border-card-content h-full">
                    <div className="text-accent">{benefit.icon}</div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Customer Reviews Section */}
      <CustomerReviews />

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
