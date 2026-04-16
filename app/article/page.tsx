import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ArticleFilters from "./ArticleFilters"

export const revalidate = 60

const ARTICLES_PER_PAGE = 10

interface SearchParams {
  page?: string
  category?: string
  time?: string
  sort?: string
}

export default async function ArticleListPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page: pageParam, category: categoryParam, time: timeParam, sort: sortParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const skip = (page - 1) * ARTICLES_PER_PAGE
  const categoryFilter = categoryParam?.trim() || null
  const timeFilter = timeParam?.trim() || 'all'
  const sortFilter = sortParam?.trim() || 'newest'

  // Date range filter
  let dateGte: Date | undefined
  const now = new Date()
  if (timeFilter === '7d')  dateGte = new Date(now.getTime() - 7   * 24 * 60 * 60 * 1000)
  else if (timeFilter === '30d') dateGte = new Date(now.getTime() - 30  * 24 * 60 * 60 * 1000)
  else if (timeFilter === '3m')  dateGte = new Date(now.getTime() - 90  * 24 * 60 * 60 * 1000)
  else if (timeFilter === '1y')  dateGte = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

  // Sort order
  const orderBy =
    sortFilter === 'oldest' ? { createdAt: 'asc'  as const } :
    sortFilter === 'az'     ? { title:     'asc'  as const } :
                              { createdAt: 'desc' as const }

  const where = {
    published: true,
    ...(dateGte ? { createdAt: { gte: dateGte } } : {}),
    ...(categoryFilter === 'uncategorized'
      ? { categoryId: null }
      : categoryFilter
        ? { category: { slug: categoryFilter } }
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
      orderBy,
      skip,
      take: ARTICLES_PER_PAGE,
    }),
    prisma.article.count({ where }),
    prisma.category.findMany({
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
    }),
  ])

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)

  if (page > 1 && articles.length === 0) notFound()

  const pageHref = (p: number) => {
    const qs = new URLSearchParams()
    if (categoryFilter) qs.set('category', categoryFilter)
    if (timeFilter !== 'all') qs.set('time', timeFilter)
    if (sortFilter !== 'newest') qs.set('sort', sortFilter)
    if (p > 1) qs.set('page', String(p))
    const s = qs.toString()
    return `/article${s ? `?${s}` : ''}`
  }

  const accentColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ef4444']

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Beranda
          </Link>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nuii Blog
          </h1>
          <div className="text-xs text-gray-500">{total} artikel</div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative py-14 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.09) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Artikel & Insights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {categoryFilter ? (
              <>
                Kategori:{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent capitalize">
                  {categoryFilter === 'uncategorized'
                    ? 'Tanpa Kategori'
                    : categories.find(c => c.slug === categoryFilter)?.name ?? categoryFilter}
                </span>
              </>
            ) : (
              <>
                Semua{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Artikel
                </span>
              </>
            )}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Kumpulan artikel, tips, dan update terbaru dari tim Nuii seputar teknologi dan pengembangan digital.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Suspense fallback={
          <div className="flex gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-10 w-40 rounded-xl bg-gray-800 animate-pulse" />
            ))}
          </div>
        }>
          <ArticleFilters
            categories={categories}
            currentCategory={categoryFilter}
            currentTime={timeFilter}
            currentSort={sortFilter}
          />
        </Suspense>
      </div>

      {/* Article Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium">
              {categoryFilter ? 'Belum ada artikel di kategori ini.' : 'Belum ada artikel dipublikasikan.'}
            </p>
            {categoryFilter && (
              <Link href="/article" className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                ← Lihat semua artikel
              </Link>
            )}
            {!categoryFilter && (
              <Link href="/" className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                ← Kembali ke Beranda
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => {
              const accent = accentColors[i % accentColors.length]
              const preview = article.excerpt?.trim()
                || article.content.replace(/\n+/g, ' ').slice(0, 120) + '...'
              const date = new Date(article.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric',
              })

              return (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group flex flex-col bg-gray-800 rounded-2xl border border-gray-700
                             hover:border-gray-500 hover:shadow-2xl hover:-translate-y-1
                             transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  {article.featuredImage ? (
                    <div className="relative aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.featuredImage.url}
                        alt={article.featuredImage.alt || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                    </div>
                  ) : (
                    <div
                      className="aspect-video flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)` }}
                    >
                      <svg className="w-12 h-12 opacity-20" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {article.category && (
                      <span
                        className="self-start px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border"
                        style={{ color: accent, borderColor: `${accent}50`, background: `${accent}18` }}
                      >
                        {article.category.name}
                      </span>
                    )}

                    <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                      {preview}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-700 mt-auto">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: accent }}
                        >
                          {article.author.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-gray-300 text-xs font-medium">{article.author.name}</p>
                          <p className="text-gray-500 text-xs">{date}</p>
                        </div>
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0"
                        style={{ color: accent, background: `${accent}18` }}
                      >
                        Baca
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
            {page > 1 && (
              <Link
                href={pageHref(page - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700
                           text-gray-300 hover:text-white hover:border-gray-500 text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={pageHref(p)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all border ${
                  p === page
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {p}
              </Link>
            ))}

            {page < totalPages && (
              <Link
                href={pageHref(page + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700
                           text-gray-300 hover:text-white hover:border-gray-500 text-sm font-medium transition-all"
              >
                Berikutnya
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
