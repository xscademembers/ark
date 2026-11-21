import type { Metadata } from "next";

export const SITE_URL = "https://thearkadevelopers.com";
export const SITE_NAME = "Arka Developers";
export const SITE_TAGLINE =
  "Arka Developers is a design-driven real estate firm that curates environments where architectural excellence, modern lifestyle, and enduring value converge.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [
      "Arka Developers",
      "real estate Visakhapatnam",
      "construction",
      "Rushikonda",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1336,
          height: 1170,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  alternateName: "Arka Elements",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description: SITE_TAGLINE,
  email: "thearkadevelopers@gmail.com",
  telephone: "+91-9581616789",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27-B-484, Rushikonda",
    addressLocality: "Visakhapatnam",
    postalCode: "530045",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.8002179,
    longitude: 83.3861866,
  },
  sameAs: [],
  areaServed: {
    "@type": "City",
    name: "Visakhapatnam",
  },
};
