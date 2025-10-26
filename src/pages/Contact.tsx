import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to a backend
    toast.success('Thank you! We\'ll contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicle: '',
      service: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Meta
        title="Contact Us | Book Auto Detailing in Brigham City, UT"
        description="Contact Sparkle Auto Detailing in Brigham City, Utah. Call +1 435-535-6484 or fill out our form to schedule your detailing service today."
        canonical="https://sparkleautodetailingllc.com/contact"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Contact', item: 'https://sparkleautodetailingllc.com/contact' }
      ]} />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Service Today
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Give your vehicle the luxury treatment it deserves. Experience a shine that lasts, protection you can count on, and effortless maintenance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gradient">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(435) 555-0123" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <Input 
                      id="vehicle" 
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      placeholder="e.g., 2020 Honda Accord" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select a service</option>
                      <option value="interior">Interior Detailing</option>
                      <option value="exterior">Exterior Detailing</option>
                      <option value="ceramic">Ceramic Coating</option>
                      <option value="paint">Paint Correction</option>
                      <option value="full">Full Detail Package</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your vehicle and what service you're interested in..." 
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-cta" size="lg">
                    Book Now
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a href="tel:+14355356484" className="text-muted-foreground hover:text-accent transition-colors">
                        +1 435-535-6484
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:nyeamanbusiness@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                        nyeamanbusiness@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        121n 400w, Brigham City, UT<br />
                        United States, 84302
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 8:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-3">Why Choose Sparkle?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ 5.0 Rating on Google Reviews</li>
                  <li>✓ Professional-Grade Products</li>
                  <li>✓ Experienced Technicians</li>
                  <li>✓ Mobile Service Available</li>
                  <li>✓ Satisfaction Guaranteed</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
