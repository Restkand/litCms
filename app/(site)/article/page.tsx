import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getI18n } from "@/lib/i18n"
import { pickArticle, hasEnglish } from "@/lib/articleLang"
import ArticleToolbar from "./ArticleToolbar"

export const revalidate = 60

const ARTICLES_PER_PAGE = 9

interface SearchParams {
  page?: string
  category?: string
  q?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n()
  return {
    title: locale === "en" ? "Articles" : "Artikel",
    description: dict.article.intro,
    alternates: { canonical: "/article" },
  }
}

export default async function ArticleListPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { locale, dict } = await getI18n()
  const t = dict.article
  const { page: pageParam, category: categoryParam, q: qParam } = await searchParams

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1)
  const skip = (page - 1) * ARTICLES_PER_PAGE
  const categoryFilter = categoryParam?.trim() || null
  const query = qParam?.trim() || ""

  const where = {
    published: true,
    ...(categoryFilter === "uncategorized"
      ? { categoryId: null }
      : categoryFilter
        ? { category: { slug: categoryFilter } }
        : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { titleEn: { contains: query } },
            { excerptEn: { contains: query } },
          ],
        }
      : {}),
  }

  const [articles, total, categories] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
        featuredImage: { select: { url: true, alt: true } },
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take: ARTICLES_PER_PAGE,
    }),
    prisma.article.count({ where }),
    prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } }),
  ])

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)
  if (page > 1 && articles.length === 0) notFound()

  const fmtDate = (d: Date) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(d)

  const showFeatured = page === 1 && !categoryFilter && !query
  const featured = showFeatured ? articles[0] : null
  const gridArticles = featured ? articles.slice(1) : articles

  const pageHref = (p: number) => {
    const params = new URLSearchParams()
    if (categoryFilter) params.set("category", categoryFilter)
    if (query) params.set("q", query)
    if (p > 1) params.set("page", String(p))
    const qs = params.toString()
    return `/article${qs ? `?${qs}` : ""}`
  }

  return (
    <>
      {/* header */}
      <header className="mx-auto max-w-[1200px] px-6 pb-9 pt-[60px] md:px-10">
        <div className="mb-5 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6C685D" }}>
          <Link href="/" className="hover:!text-[#BF6440]" style={{ color: "#6C685D", textDecoration: "none" }}>{dict.nav.home}</Link>{" "}
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

      {/* featured */}
      {featured && (
        <section className="mx-auto max-w-[1200px] px-6 pb-4 pt-2 md:px-10">
          <Link href={`/article/${featured.slug}`} className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[14px] md:grid-cols-[1.15fr_1fr]" style={{ background: "#16302A", textDecoration: "none" }}>
            <div className="relative min-h-[300px] md:min-h-[340px]">
              {featured.featuredImage?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.featuredImage.url} alt={featured.featuredImage.alt || pickArticle(featured, locale).title} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "repeating-linear-gradient(135deg,#16302A,#16302A 11px,#1b3a32 11px,#1b3a32 22px)" }}>
                  <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "#7E978B" }}>[ featured image ]</span>
                </div>
              )}
            </div>
            <div className="p-11 md:pl-1">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0F261F", background: "#BF6440", padding: "5px 11px", borderRadius: 99 }}>{t.featuredBadge}</span>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9FB3A8" }}>
                  {featured.category ? `${featured.category.name} · ` : ""}{fmtDate(featured.publishedAt ?? featured.createdAt)}
                </span>
                {locale === "en" && !hasEnglish(featured) && (
                  <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#E0B49E", border: "1px solid #6E5140", borderRadius: 99, padding: "3px 9px" }}>
                    {t.enUnavailable}
                  </span>
                )}
              </div>
              <h2 className="font-serif" style={{ fontSize: 36, lineHeight: 1.1, color: "#F1ECE0", marginBottom: 14, letterSpacing: "-0.01em" }}>{pickArticle(featured, locale).title}</h2>
              {pickArticle(featured, locale).excerpt && <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#B9C5BD", marginBottom: 22, maxWidth: "48ch" }}>{pickArticle(featured, locale).excerpt}</p>}
              <span className="font-mono" style={{ fontSize: 13, color: "#BF6440", fontWeight: 500 }}>{t.read}</span>
            </div>
          </Link>
        </section>
      )}

      {/* toolbar */}
      <section className="mx-auto max-w-[1200px] px-6 pb-2 pt-10 md:px-10">
        <ArticleToolbar categories={categories} currentCategory={categoryFilter} currentQuery={query} allLabel={t.catAll} searchPlaceholder={t.searchPlaceholder} />
      </section>

      {/* grid */}
      <section className="mx-auto max-w-[1200px] px-6 pb-10 pt-6 md:px-10">
        {gridArticles.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono" style={{ fontSize: 13, color: "#6C685D" }}>{categoryFilter || query ? t.emptyFiltered : t.emptyAll}</p>
            {(categoryFilter || query) && (
              <Link href="/article" className="mt-4 inline-block font-mono hover:!text-[#BF6440]" style={{ fontSize: 13, color: "#20413A" }}>{t.backAll}</Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((a) => {
              const ac = pickArticle(a, locale)
              return (
              <Link key={a.id} href={`/article/${a.slug}`} className="flex flex-col" style={{ textDecoration: "none" }}>
                {a.featuredImage?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.featuredImage.url} alt={a.featuredImage.alt || ac.title} className="mb-4 h-[184px] w-full rounded-[10px] object-cover" />
                ) : (
                  <div className="mb-4 flex h-[184px] items-center justify-center rounded-[10px]" style={{ background: "repeating-linear-gradient(135deg,#E0D6C0,#E0D6C0 10px,#D8CDB4 10px,#D8CDB4 20px)" }}>
                    <span className="font-mono" style={{ fontSize: 11, color: "#9A9078" }}>[ thumbnail ]</span>
                  </div>
                )}
                <div className="mb-[10px] flex items-center gap-3">
                  {a.category && <span className="font-mono" style={{ fontSize: 11, color: "#BF6440", textTransform: "uppercase", letterSpacing: "0.08em" }}>{a.category.name}</span>}
                  <span className="font-mono" style={{ fontSize: 11, color: "#9A9686" }}>{fmtDate(a.publishedAt ?? a.createdAt)}</span>
                  {locale === "en" && !hasEnglish(a) && (
                    <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase", color: "#BF6440", border: "1px solid #E4BCA9", borderRadius: 99, padding: "2px 8px" }}>
                      {t.enUnavailable}
                    </span>
                  )}
                </div>
                <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.2, color: "#16302A", marginBottom: 8 }}>{ac.title}</h3>
                {ac.excerpt && <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5A574C" }}>{ac.excerpt}</p>}
              </Link>
              )
            })}
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 font-mono" style={{ fontSize: 13 }}>
            {page > 1 && (
              <Link href={pageHref(page - 1)} style={{ padding: "9px 16px", border: "1.5px solid #C9C1AE", borderRadius: 99, color: "#20413A", textDecoration: "none" }}>
                ← {t.prev}
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 99, textDecoration: "none", border: `1.5px solid ${p === page ? "#20413A" : "#C9C1AE"}`, background: p === page ? "#20413A" : "transparent", color: p === page ? "#F1ECE0" : "#20413A" }}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={pageHref(page + 1)} style={{ padding: "9px 16px", border: "1.5px solid #C9C1AE", borderRadius: 99, color: "#20413A", textDecoration: "none" }}>
                {t.next} →
              </Link>
            )}
          </div>
        )}
      </section>
    </>
  )
}
