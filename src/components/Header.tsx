import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/sparkle-logo.webp';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Auto Detailing', 
      href: '/services',
      submenu: [
        { name: 'Interior Detailing', href: '/services/auto-detailing-interior' },
        { name: 'Exterior Detailing', href: '/services/auto-detailing-exterior' },
      ]
    },
    { name: 'Ceramic Coating', href: '/services/ceramic-coating' },
    { name: 'Paint Correction', href: '/services/paint-correction' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-md">
      {/* Top bar */}
      <div className="border-b border-primary-light/20">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <a href="tel:+14355356484" className="flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors">
            <Phone className="h-4 w-4" />
            +1 435-535-6484
          </a>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-accent transition-colors">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-accent transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Sparkle Auto Detailing Logo" 
              className="h-12 w-auto"
            />
            <span className="text-primary-foreground font-bold text-xl hidden sm:block">
              Sparkle Auto Detailing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-primary-foreground hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" className="gradient-cta">
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
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
                    isActive(item.href)
                      ? 'text-accent'
                      : 'text-primary-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="default" className="w-full gradient-cta">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
