import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import logo from '@/assets/sparkle-logo.webp';

export default function Footer() {
  const services = [
    { name: 'Interior Detailing', href: '/services/auto-detailing-interior' },
    { name: 'Exterior Detailing', href: '/services/auto-detailing-exterior' },
    { name: 'Ceramic Coating', href: '/services/ceramic-coating' },
    { name: 'Paint Correction', href: '/services/paint-correction' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Sparkle Auto Detailing Logo" 
                className="h-12 w-auto"
              />
              <span className="font-bold text-lg">Sparkle Auto Detailing</span>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Welcome to Sparkle Auto Detailing Official Website. Proudly serving UTAH with expert auto detailing services.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href} 
                    className="text-sm text-secondary-foreground/80 hover:text-accent transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+14355356484" className="hover:text-accent transition-colors">
                  +1 435-535-6484
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:nyeamanbusiness@gmail.com" className="hover:text-accent transition-colors">
                  nyeamanbusiness@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-bold text-lg mb-4">Location</h3>
            <div className="flex items-start gap-2 text-sm mb-4">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span>121n 400w, Brigham City, UT, United States, 84302</span>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Sparkle Auto Detailing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
