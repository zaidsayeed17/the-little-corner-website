import React from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../config/site";

export function Seo({
  title,
  description,
  path = "",
  type = "website",
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.brandName} | Handmade Flowers, Keychains & Gifts`;

  const metaDesc =
    description ||
    "Handmade flowers, keychains, and thoughtful little gifts crafted with care by The Little Corner. Browse sample designs and order directly via Instagram DM.";

  const canonicalUrl = siteConfig.siteUrl
    ? `${siteConfig.siteUrl.replace(/\/$/, "")}${path}`
    : null;

  // JSON-LD structured data: Organization/Store (sameAs includes Instagram profile; no phone, email, price or rating)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.brandName,
    description: siteConfig.tagline,
  };

  if (canonicalUrl) {
    schema.url = canonicalUrl;
  }

  if (siteConfig.instagramUrl) {
    schema.sameAs = [siteConfig.instagramUrl];
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content="/og-placeholder.svg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content="/og-placeholder.svg" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
