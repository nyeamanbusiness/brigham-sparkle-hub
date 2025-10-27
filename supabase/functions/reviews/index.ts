import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const placeId = Deno.env.get("PLACES_ID_KEY");
    const apiKey = Deno.env.get("GOOGLE_KEY");

    if (!placeId || !apiKey) {
      throw new Error("Missing PLACES_ID_KEY or GOOGLE_KEY environment variables");
    }

    console.log("Fetching reviews from Google Places API...");

    // Fetch place details including reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`);
    }

    const result = data.result;

    // Transform Google Reviews data to match our interface
    const reviewsData = {
      businessName: result.name || "Sparkle Detailing & Performance",
      avgRating: result.rating || 5,
      totalRatings: result.user_ratings_total || 0,
      reviews: (result.reviews || []).map((review: any) => ({
        author: review.author_name,
        avatar: review.profile_photo_url || "https://via.placeholder.com/64",
        rating: review.rating,
        text: review.text,
        time: review.relative_time_description,
      })),
      source: "Google",
    };

    console.log(`Successfully fetched ${reviewsData.reviews.length} reviews`);

    return new Response(JSON.stringify(reviewsData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to fetch reviews" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
