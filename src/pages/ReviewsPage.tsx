import { Meta } from '@/utils/seo';
import BreadcrumbsJsonLd from '@/components/BreadcrumbsJsonLd';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'John Smith',
      rating: 5,
      date: '2 weeks ago',
      text: 'Absolutely amazing service! My car looks brand new after the ceramic coating. The team was professional, thorough, and the attention to detail was outstanding. Highly recommend!'
    },
    {
      name: 'Sarah Johnson',
      rating: 5,
      date: '1 month ago',
      text: 'Best detailing service in Utah! They completely transformed my interior. The deep cleaning removed stains I thought were permanent. Worth every penny!'
    },
    {
      name: 'Mike Davis',
      rating: 5,
      date: '1 month ago',
      text: 'Professional paint correction that exceeded my expectations. My black car\'s paint now looks flawless with no swirl marks. The team really knows what they\'re doing.'
    },
    {
      name: 'Emily Wilson',
      rating: 5,
      date: '2 months ago',
      text: 'Fantastic experience from start to finish. Scheduling was easy, the work was completed on time, and the results are incredible. My SUV has never looked better!'
    },
    {
      name: 'David Martinez',
      rating: 5,
      date: '2 months ago',
      text: 'I\'ve tried several detailing services in the area, and Sparkle is by far the best. The ceramic coating has made maintenance so much easier, and the shine is unreal.'
    },
    {
      name: 'Lisa Anderson',
      rating: 5,
      date: '3 months ago',
      text: 'Outstanding work on my truck\'s interior. They removed years of dirt and grime, and now it looks and smells like new. Very professional and friendly service!'
    },
  ];

  return (
    <>
      <Meta
        title="Customer Reviews | Sparkle Auto Detailing in Brigham City, UT"
        description="Read what our customers say about Sparkle Auto Detailing. 5.0 rating with 100+ reviews. Professional car detailing in Brigham City, Utah."
        canonical="https://sparkleautodetailingllc.com/reviews"
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://sparkleautodetailingllc.com/' },
        { name: 'Reviews', item: 'https://sparkleautodetailingllc.com/reviews' }
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
              Customer Reviews
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-current text-accent" />
              ))}
              <span className="text-3xl font-bold ml-2">5.0</span>
            </div>
            <p className="text-xl md:text-2xl">
              Based on 100+ Google Reviews
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <motion.div
                key={`${review.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-card p-6 rounded-lg shadow-md hover-lift"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline">
              <a 
                href="https://www.google.com/search?q=sparkle+auto+detailing+brigham+city" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View All Google Reviews
              </a>
            </Button>
          </motion.div>
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
              Experience 5-Star Service
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers. Book your detailing appointment today!
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
