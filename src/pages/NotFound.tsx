import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Sparkle Auto Detailing</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
          </motion.div>
          
          <h2 className="mb-4 text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                <Search className="mr-2 h-4 w-4" />
                View Services
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
