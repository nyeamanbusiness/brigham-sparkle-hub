import { Meta } from "@/utils/seo";
import BreadcrumbsJsonLd from "@/components/BreadcrumbsJsonLd";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AutoDetailingInterior() {
  const url = "https://sparkleautodetailingllc.com/services/auto-detailing-interior";

  const features = [
    "Full interior refresh (seats, floors, panels, dashboard, windows)",
    "Light stain removal",
    "Interior scenting",
    "Exterior hand wash (gentle foam + hand mitts)",
    "Chemical decontamination (iron fallout remover)",
    "Clay bar treatment (light)",
    "Hand-applied wax (2-3 months protection)",
    "Tire shine + trim dressing",
  ];

  const packages = [
    {
      name: "Standard Full Detail",
      price: "$295.00",
      vehicle: "Coupe/Sedan",
      description: "Perfect for regular maintenance and keeping your interior fresh.",
    },
    {
      name: "Standard Full Detail",
      price: "$299.00",
      vehicle: "SUV/Truck",
      description: "Comprehensive cleaning for larger vehicles.",
    },
    {
      name: "Deep Full Detail",
      price: "$599.00",
      vehicle: "Coupe/Sedan",
      description: "Intensive deep cleaning with ceramic coating preparation.",
    },
    {
      name: "Deep Full Detail",
      price: "$605.00",
      vehicle: "SUV/Truck",
      description: "Maximum care for larger vehicles with full protection.",
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
              meticulously cleans and sanitizes every inch of your car&apos;s interior — from the dashboard and center
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

            {/* The image block that used to load
                https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/imagebucket/sports-car-interior-detailing.webp
                has been removed */}
          </motion.div>
        </div>
      </section>
    </>
  );
}
