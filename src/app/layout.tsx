import type { Metadata } from 'next';
import './globals.css';
import { GYM_DETAILS, FAQS } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://gymholicfitness.com'),
  title: 'Gym Holic, The Fitness Club | Best Gym in Ambikapur, Chhattisgarh',
  description:
    'Join Gym Holic (4.8 ★, 140+ Google Reviews) in Ambikapur. Premier unisex fitness club featuring imported strength equipment, certified coaches, steam bath, live crowd busy meter, and AI Indian diet generator.',
  keywords: [
    'Gym in Ambikapur',
    'Best Gym Ambikapur',
    'Gym Holic Ambikapur',
    'The Fitness Club Ambikapur',
    'Gym above Bank of India Ambikapur',
    'Ram Mandir Road Gym Ambikapur',
    'Manendragarh Road Gym',
    'Personal Trainer Ambikapur',
    'Unisex Gym Chhattisgarh',
    'Diet Plan Ambikapur',
    'Weight Loss Ambikapur',
    'CrossFit Gym Surguja',
  ],
  authors: [{ name: 'Gym Holic, The Fitness Club' }],
  creator: 'Gym Holic Ambikapur',
  publisher: 'Gym Holic, The Fitness Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Gym Holic, The Fitness Club | Ambikapur Premier Gym',
    description:
      "Transform your physique with Ambikapur's highest-rated fitness club. Imported biomechanical equipment, steam recovery suites, and certified K11/ISSA coaching.",
    url: 'https://gymholicfitness.com',
    siteName: 'Gym Holic, The Fitness Club',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Gym Holic, The Fitness Club Interior Floor',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gym Holic, The Fitness Club | Ambikapur',
    description:
      'Premier strength & conditioning club in Ambikapur. 4.8 Rating, 140+ Google Reviews. Claim your 1-Day Free VIP Pass today!',
    images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org LocalBusiness / ExerciseGym JSON-LD
  const gymSchema = {
    '@context': 'https://schema.org',
    '@type': ['ExerciseGym', 'HealthClub', 'SportsActivityLocation'],
    name: GYM_DETAILS.name,
    alternateName: ['Gym Holic', 'Gym Holic Ambikapur', 'Gym Holic The Fitness Club'],
    image: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    ],
    '@id': 'https://gymholicfitness.com/#gym',
    url: 'https://gymholicfitness.com',
    telephone: GYM_DETAILS.phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: GYM_DETAILS.address,
      addressLocality: GYM_DETAILS.city,
      addressRegion: GYM_DETAILS.state,
      postalCode: GYM_DETAILS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GYM_DETAILS.coordinates.lat,
      longitude: GYM_DETAILS.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday'],
        opens: '00:00',
        closes: '23:59',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:00',
        closes: '22:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '06:00',
        closes: '13:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '142',
    },
    hasMap: GYM_DETAILS.googleMapsUrl,
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gymSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
