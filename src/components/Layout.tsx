import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-[120px]">
          {children}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
