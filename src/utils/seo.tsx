import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export const Meta = ({ title, description, canonical, ogImage }: MetaProps) => {
  const defaultImage = "https://sparkleautodetailingllc.com/og-image.jpg";
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage || defaultImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
    </Helmet>
  );
};
