import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    author: "John Flores",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/johnflores.webp",
    rating: 5,
    time: "2 months ago",
    text: "Definitely recommending to all of my friends! Nathan did a great job detailing my truck. Just came back from a camping trip and my interior was a mess. He did an excellent job on both the interior and exterior. Looks like a brand new truck! Thanks a lot!",
  },
  {
    author: "Ashley Marroquin",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/ashleymarroquin.webp",
    rating: 5,
    time: "4 months ago",
    text: "Nathan was amazing and has the BEST price around for car detailing. We have a two year old who destroys our car. He left it looking and smelling amazing. Highly recommend his business!",
  },
  {
    author: "Staraiedes N.",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/Staraiedes%20N).webp",
    rating: 5,
    time: "2 weeks ago",
    text: "He was prompt & showed up on time. Got out the dog hairs & the grime that the previous owners left. Great attitude & will give him a call again. Thank you, Nathan!",
  },
  {
    author: "Kelsey Noorda",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/Kelsey%20Noorda).webp",
    rating: 5,
    time: "8 months ago",
    text: "Nathan is awesome to work with. They were on time and very affordable. Very kind young honest guys! Plus they did an AMAZING JOB on my car. I have 3 kids and so my car was pretty messy! They did a fantastic job! Here’s a before and after! The pictures speak for themselves. Book with Nathan, you won’t regret it and you’ll want him to come back!",
  },
  {
    author: "Bryson Roberts",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/brysonroberts.webp",
    rating: 5,
    time: "4 months ago",
    text: "Super busy and couldn’t bring the truck to him but he showed up and did even better than I expected! Dirt in every crack and crevice completely gone. Most thorough around 🔥",
  },
  {
    author: "Chris Naylor",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/chrisnaylor.webp",
    rating: 5,
    time: "2 weeks ago",
    text: "Nice guy, Nathan showed up on time with all his own tools. Got the dog hair and grime out perfectly. Great experience and highly recommend!",
  },
  {
    author: "Bailey Flint",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/baileyflint.webp",
    rating: 5,
    time: "10 months ago",
    text: "I needed a quick detail before I listed my truck. Nathan was able to book me in next day and did an amazing job inside and out. Highly recommend Sparkle Auto Detailing!",
  },
  {
    author: "Collin Holland",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/collinholland.webp",
    rating: 5,
    time: "2 months ago",
    text: "Had a polish and ceramic coating done — turned out absolutely beautiful. Punctual, professional, and great communication. Best in the Logan-Ogden area!",
  },
  {
    author: "Andy Shill",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/andyshill.webp",
    rating: 5,
    time: "1 year ago",
    text: "Nathan showed up on time, very professional. Wish I had before pics to show how messy my wife's car was! Would strongly recommend anyone to use this service.",
  },
  {
    author: "Rebecca Birch",
    avatar: "https://dreeuacqovhldjhlynio.supabase.co/storage/v1/object/public/googlereviews/rebeccabirch.webp",
    rating: 5,
    time: "4 months ago",
    text: "Nathan did an amazing job on our truck! It had been sitting for two months and was filthy — he made it look new again. Reasonably priced, on time, and very thorough!",
  },
];

const CustomerReviews = () => {
  const renderStars = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <section
      id="customer-reviews"
      className="py-10 md:py-12 bg-black text-white relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">Customer Reviews</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
          See what our customers in Brigham City are saying about <strong>Sparkle Auto Detailing</strong>.
        </p>

        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full">
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 lg:basis-1/3"
                itemScope
                itemType="https://schema.org/Review"
              >
                <article className="bg-white text-gray-900 rounded-lg p-5 border border-gray-200 h-full flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={review.avatar}
                    alt={`${review.author} profile photo`}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 mb-2"
                    loading="lazy"
                    itemProp="image"
                  />
                  <h3 itemProp="author" className="font-semibold text-base mb-1">
                    {review.author}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2" itemProp="datePublished">
                    {review.time}
                  </p>
                  <div
                    className="text-yellow-400 text-base tracking-wider mb-2"
                    aria-label={`Rated ${review.rating} out of 5 stars`}
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org/Rating"
                  >
                    {renderStars(review.rating)}
                    <meta itemProp="ratingValue" content={String(review.rating)} />
                  </div>
                  <p
                    className="text-sm text-gray-900 leading-relaxed mb-3 flex-grow line-clamp-4 max-w-[260px]"
                    itemProp="reviewBody"
                  >
                    {review.text}
                  </p>
                  <img
                    src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
                    alt="Google Reviews"
                    className="h-4 object-contain"
                    loading="lazy"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 md:-left-12 bg-white text-black border border-white shadow-lg hover:shadow-2xl w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" />
          <CarouselNext className="right-2 md:-right-12 bg-white text-black border border-white shadow-lg hover:shadow-2xl w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" />
        </Carousel>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=sparkle+auto+detailing+brigham+city&rlz=1C1RXQR_enUS1052US1052"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded transition-all hover:shadow-lg inline-block"
          >
            Leave a review on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
