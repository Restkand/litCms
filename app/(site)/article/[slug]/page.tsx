import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getI18n } from "@/lib/i18n"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com"

export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, published: true, featuredImage: { select: { url: true, alt: true } } },
  })
  if (!article || !article.published) return {}

  const title = article.title
  const description = article.excerpt ?? undefined
  const imageUrl = article.featuredImage?.url
    ? article.featuredImage.url.startsWith("http")
      ? article.featuredImage.url
      : `${SITE_URL}${article.featuredImage.url}`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/article/${slug}`,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl, alt: article.featuredImage?.alt ?? title }] }),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: { canonical: `${SITE_URL}/article/${slug}` },
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { locale, dict } = await getI18n()
  const t = dict.detail

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      featuredImage: true,
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
    },
  })
  if (!article || !article.published) notFound()

  const date = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { day: "numeric", month: "long", year: "numeric" }).format(
    article.publishedAt ?? article.createdAt,
  )
  const words = article.content.trim().split(/\s+/).length
  const readTime = Math.max(1, Math.round(words / 200))

  const related = await prisma.article.findMany({
    where: {
      published: true,
      slug: { not: slug },
      ...(article.categoryId ? { categoryId: article.categoryId } : {}),
    },
    include: { category: { select: { name: true } }, featuredImage: { select: { url: true, alt: true } } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  })

  const fmtShort = (d: Date) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(d)

  return (
    <>
      <article className="mx-auto max-w-[760px] px-6 pb-8 pt-12 md:px-10">
        {/* breadcrumb */}
        <div className="mb-8 font-mono" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6C685D" }}>
          <Link href="/" className="hover:!text-[#BF6440]" style={{ color: "#6C685D", textDecoration: "none" }}>{t.home}</Link>
          <span style={{ color: "#BFB7A4" }}> / </span>
          <Link href="/article" className="hover:!text-[#BF6440]" style={{ color: "#6C685D", textDecoration: "none" }}>{t.article}</Link>
          <span style={{ color: "#BFB7A4" }}> / </span>
          <span style={{ color: "#BF6440" }}>{article.title}</span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          {article.category && (
            <Link href={`/article?category=${article.category.slug}`} className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0F261F", background: "#BF6440", padding: "5px 11px", borderRadius: 99, textDecoration: "none" }}>
              {article.category.name}
            </Link>
          )}
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9A9686" }}>
            {date} · {readTime} {t.readTime}
          </span>
        </div>

        <h1 className="font-serif" style={{ fontWeight: 500, fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#16302A" }}>
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="font-serif" style={{ fontSize: 21, lineHeight: 1.5, color: "#3A382F", marginTop: 22, fontStyle: "italic" }}>
            {article.excerpt}
          </p>
        )}

        <div className="mt-7 flex items-center gap-3" style={{ paddingTop: 22, borderTop: "1px solid #DDD3BE" }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full font-serif" style={{ background: "#20413A", color: "#F1ECE0", fontSize: 15 }}>
            {article.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#20201B" }}>{t.by} {article.author.name}</div>
            <div className="font-mono" style={{ fontSize: 11, color: "#9A9686" }}>{date}</div>
          </div>
        </div>
      </article>

      {/* featured image */}
      {article.featuredImage?.url && (
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.featuredImage.url} alt={article.featuredImage.alt || article.title} className="w-full rounded-[14px] object-cover" style={{ maxHeight: 520 }} />
        </div>
      )}

      {/* body */}
      <article className="mx-auto max-w-[760px] px-6 pb-10 pt-10 md:px-10">
        <div>
          {article.content.split("\n").map((para, idx) =>
            para.trim() ? (
              <p key={idx} style={{ marginBottom: 22, color: "#2C2A22", fontSize: 18, lineHeight: 1.85 }}>
                {para}
              </p>
            ) : null,
          )}
        </div>

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link key={tag.slug} href={`/article?q=${encodeURIComponent(tag.name)}`} className="font-mono hover:!border-[#BF6440]" style={{ fontSize: 11, color: "#20413A", border: "1px solid #C9C1AE", borderRadius: 99, padding: "5px 12px", textDecoration: "none" }}>
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
          <div className="mb-8 flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#20413A" }}>
            <span style={{ width: 40, height: 1, background: "#20413A" }} />
            <span>{t.related}</span>
          </div>
          <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Link key={a.id} href={`/article/${a.slug}`} className="flex flex-col" style={{ textDecoration: "none" }}>
                {a.featuredImage?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.featuredImage.url} alt={a.featuredImage.alt || a.title} className="mb-4 h-[160px] w-full rounded-[10px] object-cover" />
                ) : (
                  <div className="mb-4 flex h-[160px] items-center justify-center rounded-[10px]" style={{ background: "repeating-linear-gradient(135deg,#E0D6C0,#E0D6C0 10px,#D8CDB4 10px,#D8CDB4 20px)" }}>
                    <span className="font-mono" style={{ fontSize: 11, color: "#9A9078" }}>[ thumbnail ]</span>
                  </div>
                )}
                <div className="mb-[10px] flex items-center gap-3">
                  {a.category && <span className="font-mono" style={{ fontSize: 11, color: "#BF6440", textTransform: "uppercase", letterSpacing: "0.08em" }}>{a.category.name}</span>}
                  <span className="font-mono" style={{ fontSize: 11, color: "#9A9686" }}>{fmtShort(a.publishedAt ?? a.createdAt)}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: 20, lineHeight: 1.2, color: "#16302A" }}>{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "#20413A", color: "#E3D9C3" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-20 text-center md:px-10">
          <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 38, lineHeight: 1.1, color: "#F1ECE0", letterSpacing: "-0.01em", maxWidth: "20ch" }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9FB3A8", marginTop: 18, maxWidth: "46ch" }}>{t.ctaBody}</p>
          <Link href="/#kontak" className="hover:!bg-[#cf724d]" style={{ display: "inline-block", marginTop: 28, background: "#BF6440", color: "#1A1208", fontWeight: 600, fontSize: 15, padding: "15px 28px", borderRadius: 8, textDecoration: "none" }}>
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  )
}
