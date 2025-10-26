import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Gallery() {
  // Placeholder gallery items
  const galleryItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    before: '/placeholder.svg',
    after: '/placeholder.svg',
    title: `Detailing Project ${i + 1}`,
    description: 'Professional auto detailing transformation'
  }));

  return (
    <>
      <Meta
        title="Before & After Gallery | Sparkle Auto Detailing in Brigham City, UT"
        description="View our auto detailing before and after photos. See the transformation from our interior detailing, ceramic coating, and paint correction services."
        canonical="https://sparkleautodetailingllc.com/gallery"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Gallery', item: 'https://sparkleautodetailingllc.com/gallery' }
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
              Before & After Gallery
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              See the incredible transformations we've achieved for our clients. From heavily soiled interiors to oxidized paint, we restore vehicles to showroom condition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover-lift"
              >
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square">
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded z-10">
                      BEFORE
                    </div>
                    <img 
                      src={item.before} 
                      alt={`${item.title} - Before`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-square">
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded z-10">
                      AFTER
                    </div>
                    <img 
                      src={item.after} 
                      alt={`${item.title} - After`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us transform your vehicle. Book your detailing service today and see the Sparkle difference.
            </p>
            <Button asChild size="lg" className="gradient-cta">
              <Link to="/contact">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
