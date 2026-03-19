import HeroSection from "@/app/components/HomeComp/HeroSection"
import OurExperience from "@/app/components/HomeComp/OurExperience"
import OurProducts from "@/app/components/HomeComp/OurProducts"
import Testimonials from "@/app/components/HomeComp/Testimonials"
import AboutUs from "@/app/components/HomeComp/AboutUs"
import ContactUs from "@/app/components/HomeComp/ContactUs"
import Footer from "@/app/components/HomeComp/Footer"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nuii IT Consulting",
  url: SITE_URL,
  logo: `${SITE_URL}/nuiiLogo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Nuii adalah firma konsultansi IT terpercaya yang membangun solusi digital — aplikasi mobile, web, backend, dan desktop — untuk komunitas dan bisnis Indonesia.",
  email: "nuiiapps3@gmail.com",
  telephone: "+6289530974645",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2088,
    longitude: 106.8456,
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  sameAs: [
    "https://github.com/nuiiapps",
    "https://www.linkedin.com/in/angga-saputra16/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan IT Nuii",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend & API Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desktop Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "Masjid Al-Furqon Bekasi" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Nuii membantu kami membangun Website CMS untuk masjid. Konten jadwal sholat, kajian, dan berita masjid kini dapat dikelola langsung oleh pengurus tanpa perlu keahlian teknis.",
    },
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "FIFA Pay Indonesia" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Nuii membangun aplikasi mobile frontend PPOB kami dari nol. UI bersih, performa stabil, dan semua fitur yang kami butuhkan berjalan dengan baik.",
    },
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "PT Winata Elang Jaya" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Sistem asset management yang dibangun Nuii sangat membantu operasional perusahaan kami. Pencatatan dan pengelolaan aset yang sebelumnya manual kini terdigitalisasi.",
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-950 text-white">
        <HeroSection />
        <OurExperience />
        <OurProducts />
        <AboutUs />
        <Testimonials />
        <ContactUs />
        <Footer />
      </div>
    </>
  )
}
