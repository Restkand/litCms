import type { Metadata } from "next"
import Link from "next/link"
import { getI18n } from "@/lib/i18n"
import { PRODUCTS, PRODUCT_FILTERS } from "@/lib/products"
import ProdukTimeline, { type ResolvedProduct } from "./ProdukTimeline"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n()
  const title = locale === "en" ? "Products" : "Produk"
  return {
    title,
    description: dict.produk.intro,
    alternates: { canonical: "/produk" },
  }
}

export default async function ProdukPage() {
  const { locale, dict } = await getI18n()
  const t = dict.produk
  const isEn = locale === "en"

  const products: ResolvedProduct[] = PRODUCTS.map((p) => {
    const status =
      p.status === "dev"
        ? { text: t.statusDev, kind: "dev" as const }
        : p.status === "field"
          ? { text: t.statusField, kind: "field" as const }
          : null

    // pilih placeholder & caption sesuai platform utama
    const isMobileMain = p.shot === "portrait"
    let mainPlaceholder = t.placeholderWeb
    let caption = t.shotWeb
    if (p.platforms.includes("iot")) {
      mainPlaceholder = t.placeholderIoT
      caption = t.shotIoT
    } else if (isMobileMain) {
      mainPlaceholder = t.placeholderMobile
      caption = t.shotMobile
    } else if (p.platforms.includes("desktop")) {
      mainPlaceholder = t.placeholderDesktop
      caption = t.shotDesktop
    } else if (p.companion) {
      caption = t.shotCompanion
    }

    return {
      id: p.id,
      num: p.num,
      name: p.name,
      platforms: p.platforms,
      eyebrow: isEn ? p.eyebrowEn : p.eyebrowId,
      desc: isEn ? p.descEn : p.descId,
      features: isEn ? p.featuresEn : p.featuresId,
      tags: p.tags,
      status,
      mainLayout: p.shot,
      mainPlaceholder,
      companion: p.companion,
      companionPlaceholder: t.placeholderMobile,
      caption,
    }
  })

  const filters = PRODUCT_FILTERS.map((f) => ({ key: f.key, label: isEn ? f.labelEn : f.labelId }))

  return (
    <>
      {/* header */}
      <header className="mx-auto max-w-[1200px] px-6 pb-8 pt-16 md:px-10">
        <div className="mb-[18px] font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6C685D" }}>
          <Link href="/" className="hover:!text-[#BF6440]" style={{ color: "#6C685D", textDecoration: "none" }}>
            {dict.nav.home}
          </Link>{" "}
          <span style={{ color: "#BFB7A4" }}>/</span> <span style={{ color: "#BF6440" }}>{t.breadcrumb}</span>
        </div>
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-[1.5fr_1fr]">
          <h1 className="font-serif" style={{ fontWeight: 500, fontSize: "clamp(44px,6vw,64px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#16302A" }}>
            {t.titleLead}
            <em style={{ fontStyle: "italic", color: "#BF6440" }}>{t.titleEm}</em>
            {t.titleTail}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "#3A382F" }}>{t.intro}</p>
        </div>
      </header>

      <ProdukTimeline products={products} filters={filters} countWord={t.count} noResults={t.noResults} />

      {/* CTA band */}
      <section style={{ background: "#16302A", color: "#E3D9C3" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 px-6 py-[72px] md:px-10">
          <div>
            <div className="mb-[14px] font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BF6440" }}>
              {t.ctaEyebrow}
            </div>
            <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 40, lineHeight: 1.08, color: "#F1ECE0", letterSpacing: "-0.01em", maxWidth: "20ch" }}>
              {t.ctaTitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-[14px]">
            <Link href="/#kontak" className="hover:!bg-[#cf724d]" style={{ background: "#BF6440", color: "#1A1208", fontWeight: 600, fontSize: 15, padding: "15px 26px", borderRadius: 7, textDecoration: "none" }}>
              {t.ctaPrimary}
            </Link>
            <Link href="/#kerjasama" className="hover:!border-[#BF6440]" style={{ background: "transparent", color: "#F1ECE0", fontWeight: 600, fontSize: 15, padding: "14px 25px", borderRadius: 7, border: "1.5px solid #3C5A50", textDecoration: "none" }}>
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
