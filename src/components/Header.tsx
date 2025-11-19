import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/sparkle-logo.webp";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "All Services", href: "/services" },
    { name: "Interior Detailing", href: "/services/auto-detailing-interior" },
    { name: "Exterior Detailing", href: "/services/auto-detailing-exterior" },
    { name: "Ceramic Coating", href: "/services/ceramic-coating" },
    { name: "Paint Correction", href: "/services/paint-correction" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-md">
      {/* Top bar */}
      <div className="border-b border-primary-light/20">
        <div className="container mx-auto px-4 py-0.5 sm:py-1.5 flex justify-between items-center text-sm">
          <a
            href="tel:+14355356484"
            className="flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors"
          >
            <Phone className="h-4 w-4" />
            +1 435-535-6484
          </a>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              Facebook
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-1 sm:py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sparkle Auto Detailing Logo" className="h-10 w-auto sm:h-16" />

            <span className="text-primary-foreground font-bold text-xl hidden sm:block">Sparkle Auto Detailing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-accent" : "text-primary-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-primary-foreground hover:text-accent data-[state=open]:text-accent">
                    Services
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-background border border-border shadow-lg">
                    <div className="w-48 p-2">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.href}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                            isActive(service.href)
                              ? "text-accent bg-accent/10"
                              : "text-foreground hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild variant="default" className="gradient-cta">
              <a href="https://sparkleautodetailing.setmore.com/" target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden text-primary-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-primary-light/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    isActive(item.href) ? "text-accent" : "text-primary-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-primary-light/20 pt-3">
                <div className="text-sm font-medium text-primary-foreground mb-2">Services</div>

                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 pl-4 text-sm ${
                      isActive(service.href) ? "text-accent" : "text-primary-foreground/80"
                    }`}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Button asChild variant="default" className="w-full gradient-cta">
                <a
                  href="https://sparkleautodetailing.setmore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
