import { Helmet } from 'react-helmet-async';
import type { BabyName } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  name?: BabyName | null;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, name, url = 'https://peyar-amudham.web.app' }) => {
  const baseTitle = 'PEYAR AMUDHAM | Pure Linguistic Nectar';
  const baseDescription = 'A curated archive of 30k+ pure classical Tamil names with profound meanings and ancestral heritage.';
  
  const siteTitle = name 
    ? `${name.name_tamil} (${name.name_english}) | PEYAR AMUDHAM` 
    : title 
      ? `${title} | PEYAR AMUDHAM` 
      : baseTitle;
      
  const siteDescription = name 
    ? `Discover the meaning of "${name.name_tamil}": ${name.meaning_english}. Part of the premium collection of 30,000+ pure classical Tamil names.` 
    : description || baseDescription;

  const currentUrl = name 
    ? `${url}/?name=${encodeURIComponent(name.name_english)}` 
    : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content="https://peyar-amudham.web.app/pwa-512.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content="https://peyar-amudham.web.app/pwa-512.png" />

      {/* JSON-LD for shared name discovery */}
      {name && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Thing",
            "name": name.name_tamil,
            "alternateName": name.name_english,
            "description": name.meaning_english,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            }
          })}
        </script>
      )}
    </Helmet>
  );
};
