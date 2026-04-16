import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com"

export const revalidate = 0

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      published: true,
      featuredImage: { select: { url: true, alt: true } },
    },
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
    alternates: {
      canonical: `${SITE_URL}/article/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            featuredImage: true,
            author: { select: { name: true } },
            category: { select: { name: true, slug: true } },
            tags: { select: { name: true, slug: true } },
        }
    })

    if (!article || !article.published) {
        notFound()
    }

    const publishDate = new Date(article.publishedAt ?? article.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    })

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Floating back button */}
            <div className="fixed top-4 left-4 z-50 sm:top-6 sm:left-6">
                <Link
                    href="/article"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/85 backdrop-blur-md border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-all shadow-xl text-sm font-medium"
                >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="hidden sm:inline">Semua Artikel</span>
                </Link>
            </div>

            {/* Hero image */}
            {article.featuredImage ? (
                <div className="relative w-full" style={{ height: 'clamp(220px, 45vh, 520px)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={article.featuredImage.url}
                        alt={article.featuredImage.alt || article.title}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-gray-950" />
                </div>
            ) : (
                <div className="h-20" />
            )}

            {/* Main content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
                <article className={article.featuredImage ? '-mt-20 relative' : 'pt-8'}>
                    <div className="bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">

                        {/* Article header */}
                        <div className="px-6 sm:px-10 pt-8 sm:pt-12 pb-6">
                            {article.category && (
                                <div className="mb-4">
                                    <Link
                                        href={`/article?category=${article.category.slug}`}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30 hover:bg-blue-500/25 transition-colors"
                                    >
                                        {article.category.name}
                                    </Link>
                                </div>
                            )}

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400 pb-6 border-b border-gray-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {article.author.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-gray-300">{article.author.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{publishDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        {article.excerpt && (
                            <div className="px-6 sm:px-10 pb-4">
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                                    {article.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Article body */}
                        <div className="px-6 sm:px-10 pb-8 sm:pb-12">
                            <div className="prose prose-lg max-w-none">
                                {article.content.split('\n').map((paragraph: string, idx: number) =>
                                    paragraph.trim() ? (
                                        <p key={idx} className="mb-5 text-gray-300 text-base sm:text-[17px] leading-[1.85]">
                                            {paragraph}
                                        </p>
                                    ) : null
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        {article.tags.length > 0 && (
                            <div className="px-6 sm:px-10 pb-8 flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                    <Link
                                        key={tag.slug}
                                        href={`/article?tag=${tag.slug}`}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200 transition-colors"
                                    >
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-6 sm:px-10 py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-500">Dipublikasikan {publishDate}</p>
                            <Link
                                href="/article"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Lihat Semua Artikel
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    )
}
