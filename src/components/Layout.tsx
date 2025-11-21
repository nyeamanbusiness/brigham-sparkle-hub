import { ReactNode, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SparkleHero3DScene = lazy(() =>
  import("@/components/SparkleHero3DScene").then(module => ({ default: module.SparkleHero3DScene }))
);

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col relative">
        <Header />

        {/* Persistent Hero Scene - Caches the 3D model */}
        <div
          style={{
            position: 'absolute',
            top: '120px', // Matches main padding
            left: 0,
            width: '100%',
            height: '100vh', // Matches Home section height
            zIndex: 0,
            visibility: isHome ? 'visible' : 'hidden',
            pointerEvents: isHome ? 'auto' : 'none',
          }}
        >
          <Suspense fallback={null}>
            <SparkleHero3DScene />
          </Suspense>
        </div>

        <main className="flex-grow pt-[120px] z-10 relative">
          {children}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
