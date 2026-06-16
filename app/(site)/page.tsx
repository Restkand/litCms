import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getI18n } from "@/lib/i18n"
import { PRODUCTS } from "@/lib/products"
import Reveal from "@/app/components/site/Reveal"
import Contact from "@/app/components/site/home/Contact"

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com"

function platformLabel(platforms: string[]): string {
  if (platforms.includes("iot")) return "IoT"
  return platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" · ")
}

const mono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: "var(--font-mono)",
  ...extra,
})

function SectionEyebrow({ num, label, dark = false }: { num: string; label: string; dark?: boolean }) {
  const color = dark ? "#BF6440" : "#20413A"
  return (
    <div className="mb-[18px] flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color }}>
      <span>{num}</span>
      <span style={{ width: 40, height: 1, background: color }} />
      <span>{label}</span>
    </div>
  )
}

export default async function BerandaPage() {
  const { locale, dict } = await getI18n()
  const featured = PRODUCTS[0]
  const gridProducts = PRODUCTS.slice(1)
  const heroIndex = PRODUCTS.slice(0, 6)

  const latest = await prisma.article.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
      featuredImage: { select: { url: true, alt: true } },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  })

  const fmtDate = (d: Date) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { day: "numeric", month: "short", year: "numeric" }).format(d)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NUII",
    url: SITE_URL,
    logo: `${SITE_URL}/nuiiLogo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: dict.footer.tagline,
    email: "nuiiapps3@gmail.com",
    foundingDate: "2022",
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    areaServed: { "@type": "Country", name: "Indonesia" },
    sameAs: ["https://github.com/nuiiapps", "https://www.linkedin.com/in/angga-saputra16/"],
    makesOffer: PRODUCTS.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: p.name, description: locale === "en" ? p.descEn : p.descId },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===================== HERO ===================== */}
      <header className="mx-auto max-w-[1200px] px-6 pb-10 pt-[72px] md:px-10">
        <div className="grid grid-cols-1 items-end gap-14 md:grid-cols-[1.55fr_1fr]">
          <div>
            <div className="mb-[26px] font-mono" style={{ fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BF6440" }}>
              {dict.hero.eyebrow}
            </div>
            <h1 className="font-serif" style={{ fontWeight: 500, fontSize: "clamp(48px,7vw,74px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#16302A" }}>
              {dict.hero.titleLead}
              <em style={{ fontStyle: "italic", color: "#BF6440" }}>{dict.hero.titleEm}</em>
              {dict.hero.titleTail}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#3A382F", maxWidth: "52ch", marginTop: 28 }}>{dict.hero.subtitle}</p>
            <div className="mt-[34px] flex flex-wrap gap-[14px]">
              <Link href="#produk" style={{ background: "#20413A", color: "#F1ECE0", fontWeight: 600, fontSize: 15, padding: "15px 26px", borderRadius: 7, textDecoration: "none" }}>
                {dict.hero.ctaProducts}
              </Link>
              <Link href="#kerjasama" style={{ background: "transparent", color: "#20413A", fontWeight: 600, fontSize: 15, padding: "14px 25px", borderRadius: 7, border: "1.5px solid #20413A", textDecoration: "none" }}>
                {dict.hero.ctaPartner}
              </Link>
            </div>
          </div>
          <div style={{ borderTop: "1.5px solid #20413A", paddingTop: 18 }}>
            <div className="mb-[14px] font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6C685D" }}>
              {dict.hero.indexTitle}
            </div>
            {heroIndex.map((p, i) => (
              <Link
                key={p.id}
                href="/produk"
                className="flex items-baseline justify-between gap-[10px] hover:bg-[#E9E2D2]"
                style={{ padding: "11px 0", borderBottom: i === heroIndex.length - 1 ? "none" : "1px solid #DDD3BE", textDecoration: "none" }}
              >
                <span className="font-mono" style={{ fontSize: 12, color: "#BF6440" }}>{p.num}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#20413A", flex: 1 }}>{p.name}</span>
                <span className="font-mono" style={{ fontSize: 11, color: "#6C685D" }}>{platformLabel(p.platforms)}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* image band */}
      <div className="mx-auto mt-6 max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "#16302A" }}>
            <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(135deg,#16302A,#16302A 11px,#1b3a32 11px,#1b3a32 22px)", opacity: 0.9 }} />
            <span className="relative font-mono" style={{ fontSize: 12, letterSpacing: "0.12em", color: "#7E978B" }}>{dict.hero.imageBand}</span>
          </div>
        </Reveal>
      </div>

      {/* ===================== KEAHLIAN ===================== */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionEyebrow num={dict.expertise.num} label={dict.expertise.label} />
            <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.08, color: "#16302A", letterSpacing: "-0.01em" }}>{dict.expertise.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#3A382F", marginTop: 20, maxWidth: "42ch" }}>{dict.expertise.body}</p>
          </div>
          <div>
            {dict.expertise.items.map((it, i) => (
              <div
                key={it.tag}
                className="flex items-baseline justify-between gap-4"
                style={{ padding: "22px 0", borderTop: i === 0 ? "1.5px solid #20413A" : "1px solid #DDD3BE", borderBottom: i === dict.expertise.items.length - 1 ? "1px solid #DDD3BE" : "none" }}
              >
                <div className="font-mono" style={{ fontSize: 11, color: "#BF6440", width: 34 }}>{it.tag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#16302A" }}>{it.title}</div>
                  <div style={{ fontSize: 14.5, color: "#6C685D", marginTop: 4 }}>{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PORTOFOLIO ===================== */}
      <section id="produk" style={{ scrollMarginTop: 80, marginTop: 104, background: "#EAE3D3", borderTop: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow num={dict.portfolio.num} label={dict.portfolio.label} />
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 44, lineHeight: 1.05, color: "#16302A", letterSpacing: "-0.01em" }}>{dict.portfolio.title}</h2>
            </div>
            <p style={{ fontSize: 15, color: "#5A574C", maxWidth: "34ch", lineHeight: 1.6 }}>{dict.portfolio.intro}</p>
          </div>

          {/* featured SAFAR */}
          <Reveal>
            <div className="grid grid-cols-1 overflow-hidden rounded-[12px] md:grid-cols-[1.1fr_1fr]" style={{ background: "#16302A" }}>
              <div className="relative flex min-h-[380px] items-center justify-center">
                <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(135deg,#16302A,#16302A 11px,#1b3a32 11px,#1b3a32 22px)" }} />
                <span className="relative font-mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "#7E978B" }}>[ {featured.name} ]</span>
              </div>
              <div className="flex flex-col justify-center p-11">
                <div className="mb-[18px] flex flex-wrap gap-2">
                  <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0F261F", background: "#BF6440", padding: "5px 11px", borderRadius: 99 }}>{dict.portfolio.featuredBadge}</span>
                  <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#D9C4A0", border: "1px solid #3C5A50", padding: "5px 11px", borderRadius: 99 }}>{dict.portfolio.featuredStatus}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: 38, lineHeight: 1.06, color: "#F1ECE0", marginBottom: 14, letterSpacing: "-0.01em" }}>{featured.name}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "#C2CEC6", marginBottom: 18 }}>{dict.portfolio.featuredDesc}</p>
                <div className="flex flex-wrap gap-6" style={{ paddingTop: 18, borderTop: "1px solid #2E4A41" }}>
                  <div>
                    <div className="font-mono" style={{ fontSize: 11, color: "#7E978B", textTransform: "uppercase", letterSpacing: "0.08em" }}>{dict.portfolio.mitraLabel}</div>
                    <div style={{ fontSize: 14, color: "#E3D9C3", marginTop: 3 }}>{dict.portfolio.mitraDesc}</div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: 11, color: "#7E978B", textTransform: "uppercase", letterSpacing: "0.08em" }}>{dict.portfolio.personalLabel}</div>
                    <div style={{ fontSize: 14, color: "#E3D9C3", marginTop: 3 }}>{dict.portfolio.personalDesc}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* grid */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ borderTop: "1.5px solid #20413A", borderLeft: "1px solid #D6CBB0" }}>
            {gridProducts.map((p) => (
              <div key={p.id} className="flex flex-col" style={{ padding: "24px 22px", borderRight: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0" }}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono" style={{ fontSize: 11, color: "#BF6440", textTransform: "uppercase", letterSpacing: "0.08em" }}>{locale === "en" ? p.gridLabelEn : p.gridLabelId}</span>
                  <span className="font-mono" style={{ fontSize: 10, color: "#5A574C" }}>{p.num}</span>
                </div>
                <h4 className="font-serif" style={{ fontSize: 22, color: "#16302A", marginBottom: 8, lineHeight: 1.15 }}>{p.name}</h4>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5A574C" }}>{locale === "en" ? p.gridEn : p.gridId}</p>
                <div className="mt-auto pt-4 font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8473" }}>{p.gridPlatform}</div>
              </div>
            ))}
            <Link
              href="/produk"
              className="flex flex-col justify-center gap-[6px] sm:col-span-2 hover:!bg-[#20413A]"
              style={{ padding: "24px 28px", borderRight: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0", background: "#16302A", textDecoration: "none" }}
            >
              <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#BF6440" }}>{dict.portfolio.ctaEyebrow}</span>
              <span className="font-serif" style={{ fontSize: 28, color: "#F1ECE0", lineHeight: 1.05 }}>{dict.portfolio.ctaTitle}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== KERJA SAMA ===================== */}
      <section id="kerjasama" style={{ scrollMarginTop: 70, background: "#16302A", color: "#E3D9C3" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-[88px] md:px-10">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2">
            <div>
              <SectionEyebrow num={dict.partnership.num} label={dict.partnership.label} dark />
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 46, lineHeight: 1.05, color: "#F1ECE0", letterSpacing: "-0.01em" }}>{dict.partnership.title}</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#B9C5BD", marginTop: 22, maxWidth: "46ch" }}>{dict.partnership.body}</p>
              <Link href="#kontak" className="hover:!bg-[#cf724d]" style={{ display: "inline-block", marginTop: 30, background: "#BF6440", color: "#1A1208", fontWeight: 600, fontSize: 15, padding: "15px 26px", borderRadius: 7, textDecoration: "none" }}>
                {dict.partnership.cta}
              </Link>
            </div>
            <div>
              {dict.partnership.modes.map((m, i) => (
                <div key={m.key} className="flex gap-[18px]" style={{ padding: "22px 0", borderTop: i === 0 ? "1.5px solid #3C5A50" : "1px solid #2E4A41", borderBottom: i === dict.partnership.modes.length - 1 ? "1px solid #2E4A41" : "none" }}>
                  <div className="font-mono" style={{ fontSize: 12, color: "#7E978B" }}>{m.key}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: "#F1ECE0" }}>{m.title}</div>
                    <div style={{ fontSize: 14.5, color: "#9FB3A8", marginTop: 5 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
              <div className="mt-6 flex flex-wrap items-center gap-[10px] font-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7E978B" }}>
                {dict.partnership.flow.map((step, i) => (
                  <span key={step} className="flex items-center gap-[10px]">
                    <span>{step}</span>
                    {i < dict.partnership.flow.length - 1 && <span>→</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TENTANG ===================== */}
      <section id="tentang" style={{ scrollMarginTop: 80 }}>
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
          <SectionEyebrow num={dict.about.num} label={dict.about.label} />
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 40, lineHeight: 1.18, color: "#16302A", letterSpacing: "-0.01em" }}>
              {dict.about.titleLead}
              <em style={{ fontStyle: "italic", color: "#BF6440" }}>{dict.about.titleEm}</em>
              {dict.about.titleTail}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3A382F", paddingTop: 6 }}>{dict.about.body}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1.5px solid #20413A" }}>
            {dict.about.values.map((v, i) => (
              <div key={v.num} style={{ padding: "26px 22px", borderLeft: i === 0 ? "none" : "1px solid #D6CBB0" }}>
                <div className="font-mono" style={{ fontSize: 11, color: "#BF6440" }}>{v.num}</div>
                <div className="font-serif" style={{ fontSize: 26, color: "#16302A", margin: "10px 0 8px" }}>{v.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5A574C" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONI ===================== */}
      <section style={{ background: "#EAE3D3", borderTop: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
          <SectionEyebrow num={dict.testimonials.num} label={dict.testimonials.label} />
          <div className="grid grid-cols-1 items-end gap-14 md:grid-cols-[1.4fr_1fr]">
            <blockquote style={{ margin: 0 }}>
              <p className="font-serif" style={{ fontStyle: "italic", fontWeight: 400, fontSize: 34, lineHeight: 1.3, color: "#16302A", letterSpacing: "-0.01em" }}>{dict.testimonials.quote1}</p>
              <footer className="mt-6 font-mono" style={{ fontSize: 12, color: "#5A574C", letterSpacing: "0.04em" }}>
                {dict.testimonials.footer1} <span style={{ color: "#9A9686" }}>{dict.testimonials.footer1Note}</span>
              </footer>
            </blockquote>
            <div style={{ borderLeft: "1.5px solid #C2BAA6", paddingLeft: 28 }}>
              <p className="font-serif" style={{ fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: "#3A382F" }}>{dict.testimonials.quote2}</p>
              <footer className="mt-4 font-mono" style={{ fontSize: 11, color: "#5A574C", letterSpacing: "0.04em" }}>{dict.testimonials.footer2}</footer>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ARTIKEL TERBARU ===================== */}
      <section id="artikel" style={{ scrollMarginTop: 80 }}>
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow num={dict.homeArticles.num} label={dict.homeArticles.label} />
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.05, color: "#16302A", letterSpacing: "-0.01em" }}>{dict.homeArticles.title}</h2>
            </div>
            <Link href="/article" className="font-mono hover:!text-[#BF6440]" style={{ fontSize: 13, color: "#20413A", textDecoration: "none", fontWeight: 500, borderBottom: "1.5px solid #BF6440", paddingBottom: 3 }}>
              {dict.homeArticles.all}
            </Link>
          </div>
          {latest.length === 0 ? (
            <p className="font-mono" style={{ fontSize: 13, color: "#6C685D" }}>{dict.homeArticles.empty}</p>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((a) => (
                <Link key={a.id} href={`/article/${a.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  {a.featuredImage?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.featuredImage.url} alt={a.featuredImage.alt || a.title} className="mb-4 h-[180px] w-full rounded-lg object-cover" />
                  ) : (
                    <div className="mb-4 flex h-[180px] items-center justify-center rounded-lg" style={{ background: "repeating-linear-gradient(135deg,#E0D6C0,#E0D6C0 10px,#D8CDB4 10px,#D8CDB4 20px)" }}>
                      <span className="font-mono" style={{ fontSize: 11, color: "#9A9078" }}>[ thumbnail ]</span>
                    </div>
                  )}
                  <div className="mb-[10px] flex items-center gap-3">
                    {a.category && <span className="font-mono" style={{ fontSize: 11, color: "#BF6440", textTransform: "uppercase", letterSpacing: "0.08em" }}>{a.category.name}</span>}
                    <span className="font-mono" style={{ fontSize: 11, color: "#9A9686" }}>{fmtDate(a.publishedAt ?? a.createdAt)}</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.2, color: "#16302A", marginBottom: 8 }}>{a.title}</h3>
                  {a.excerpt && <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5A574C" }}>{a.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== KONTAK ===================== */}
      <section id="kontak" style={{ scrollMarginTop: 70, background: "#20413A", color: "#E3D9C3" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-[88px] md:px-10">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionEyebrow num={dict.contact.num} label={dict.contact.label} dark />
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 44, lineHeight: 1.05, color: "#F1ECE0", letterSpacing: "-0.01em" }}>{dict.contact.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9FB3A8", marginTop: 20, maxWidth: "40ch" }}>{dict.contact.body}</p>
              <div className="mt-[34px] flex flex-col gap-[14px]">
                <a href="mailto:nuiiapps3@gmail.com" className="flex items-center gap-3 font-mono hover:!text-[#BF6440]" style={{ fontSize: 13, color: "#C2CEC6", textDecoration: "none" }}>
                  <span style={{ color: "#7E978B" }}>E</span> nuiiapps3@gmail.com
                </a>
                <div className="flex items-center gap-3 font-mono" style={{ fontSize: 13, color: "#C2CEC6" }}>
                  <span style={{ color: "#7E978B" }}>L</span> {dict.contact.location}
                </div>
              </div>
            </div>
            <Contact dict={dict} />
          </div>
        </div>
      </section>
    </>
  )
}
