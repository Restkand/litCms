import OurExperience from "@/app/components/HomeComp/OurExperience"
import OurProducts from "@/app/components/HomeComp/OurProducts"
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
  description:
    "Nuii adalah firma konsultansi IT terpercaya yang membangun solusi digital — aplikasi mobile, web, backend, dan desktop — untuk komunitas dan bisnis Indonesia.",
  email: "nuiiapps3@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  sameAs: [
    "https://github.com/nuiiapps",
    "https://www.linkedin.com/in/angga-saputra16/",
  ],
  serviceType: [
    "Mobile App Development",
    "Web Development",
    "Backend Development",
    "Desktop Application Development",
    "IT Consulting",
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
        <OurExperience />
        <OurProducts />
        <AboutUs />
        <ContactUs />
        <Footer />
      </div>
    </>
  )
}
