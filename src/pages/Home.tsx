import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Star, CheckCircle2 } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";
import { useEffect, useRef, useState } from "react";
import vehicleLottie from "@/assets/vehicle.lottie"; // ✅ Local Lottie file

/* Allow <lottie-player> element */
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

  // Load the Lottie player script dynamically
  useEffect(() => {
    const alreadyDefined = customElements.get("lottie-player");
    if (alreadyDefined) {
      setCanUseLottie(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    script.onload = () => {
      const check = () => {
        if (customElements.get("lottie-player")) setCanUseLottie(true);
        else setTimeout(check, 50);
      };
      check();
    };
    document.body.appendChild(script);
  }, []);

  // Handle potential load errors
  useEffect(() => {
    if (!canUseLottie || !lottieRef.current) return;
    const el = lottieRef.current as any;
    const handleError = () => setLottieFailed(true);
    el.addEventListener?.("error", handleError);
    el.addEventListener?.("loadError", handleError);
    return () => {
      el.removeEventListener?.("error", handleError);
      el.removeEventListener?.("loadError", handleError);
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
      <BreadcrumbsJsonLd items={[{ name: "Home", item: "https://sparkleautodetailingllc.com/" }]} />

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

            {/* ✅ Local Lottie animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {!lottieFailed && canUseLottie ? (
                <lottie-player
                  ref={(el) => (lottieRef.current = el)}
                  src={vehicleLottie}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  renderer="svg"
                  style={{
                    width: "100%",
                    height: "420px",
                    borderRadius: "0.75rem",
                  }}
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

      {/* Other sections below... */}
      <CustomerReviews />
    </>
  );
}
